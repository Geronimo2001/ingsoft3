using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockControl.Api.Data;
using StockControl.Api.Models;

namespace StockControl.Api.Controllers;

[ApiController]
[Route("api/suppliers")]
public class SuppliersController : ControllerBase
{
    private readonly AppDbContext _db;

    public SuppliersController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<List<SupplierDto>>> GetAll()
    {
        var suppliers = await _db.Suppliers
            .Include(s => s.Products)
            .OrderBy(s => s.Name)
            .ToListAsync();

        return Ok(suppliers.Select(s => s.ToDto(false)).ToList());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<SupplierDto>> GetById(int id)
    {
        var supplier = await _db.Suppliers
            .Include(s => s.Products)
            .ThenInclude(p => p.Supplier)
            .FirstOrDefaultAsync(s => s.Id == id);

        return supplier is null
            ? NotFound(new ApiError("El proveedor no existe."))
            : Ok(supplier.ToDto(true));
    }

    [HttpPost]
    public async Task<ActionResult<SupplierDto>> Create(SupplierRequest request)
    {
        var error = ValidateSupplierRequest(request);
        if (error is not null)
        {
            return BadRequest(new ApiError(error));
        }

        var supplier = new Supplier();
        ApplyRequest(supplier, request);

        _db.Suppliers.Add(supplier);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = supplier.Id }, supplier.ToDto());
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<SupplierDto>> Update(int id, SupplierRequest request)
    {
        var supplier = await _db.Suppliers.Include(s => s.Products).FirstOrDefaultAsync(s => s.Id == id);
        if (supplier is null)
        {
            return NotFound(new ApiError("El proveedor no existe."));
        }

        var error = ValidateSupplierRequest(request);
        if (error is not null)
        {
            return BadRequest(new ApiError(error));
        }

        ApplyRequest(supplier, request);
        await _db.SaveChangesAsync();

        return Ok(supplier.ToDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var supplier = await _db.Suppliers
            .Include(s => s.Products)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (supplier is null)
        {
            return NotFound(new ApiError("El proveedor no existe."));
        }

        if (supplier.Products.Count > 0)
        {
            return Conflict(new ApiError("No se puede eliminar un proveedor con productos asociados."));
        }

        _db.Suppliers.Remove(supplier);
        await _db.SaveChangesAsync();

        return NoContent();
    }

    private static string? ValidateSupplierRequest(SupplierRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return "El nombre es obligatorio.";
        }

        if (!string.IsNullOrWhiteSpace(request.Email) && !request.Email.Contains('@'))
        {
            return "El email no tiene un formato valido.";
        }

        return null;
    }

    private static void ApplyRequest(Supplier supplier, SupplierRequest request)
    {
        supplier.Name = request.Name.Trim();
        supplier.ContactName = request.ContactName.Trim();
        supplier.Phone = request.Phone.Trim();
        supplier.Email = request.Email.Trim();
    }
}
