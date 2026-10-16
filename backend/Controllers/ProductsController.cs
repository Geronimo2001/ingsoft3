using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockControl.Api.Data;
using StockControl.Api.Domain;
using StockControl.Api.Models;

namespace StockControl.Api.Controllers;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProductsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductDto>>> GetAll(
        [FromQuery] string? search,
        [FromQuery] bool lowStock = false,
        [FromQuery] int? supplierId = null)
    {
        var query = _db.Products.Include(p => p.Supplier)
            .Where(ProductRules.Filter(search, lowStock, supplierId));

        var products = await query
            .OrderBy(p => p.Name)
            .ToListAsync();

        return Ok(products.Select(p => p.ToDto()).ToList());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductDto>> GetById(int id)
    {
        var product = await _db.Products
            .Include(p => p.Supplier)
            .FirstOrDefaultAsync(p => p.Id == id);

        return product is null
            ? NotFound(new ApiError("El producto no existe."))
            : Ok(product.ToDto());
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create(ProductRequest request)
    {
        var error = await ValidateProductRequest(request);
        if (error is not null)
        {
            return BadRequest(new ApiError(error));
        }

        var skuExists = await _db.Products.AnyAsync(ProductRules.DuplicateSku(request.Sku));
        if (skuExists)
        {
            return Conflict(new ApiError("Ya existe un producto con ese SKU."));
        }

        var product = new Product();
        ApplyRequest(product, request);

        _db.Products.Add(product);
        await _db.SaveChangesAsync();
        await _db.Entry(product).Reference(p => p.Supplier).LoadAsync();

        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product.ToDto());
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ProductDto>> Update(int id, ProductRequest request)
    {
        var product = await _db.Products.Include(p => p.Supplier).FirstOrDefaultAsync(p => p.Id == id);
        if (product is null)
        {
            return NotFound(new ApiError("El producto no existe."));
        }

        var error = await ValidateProductRequest(request);
        if (error is not null)
        {
            return BadRequest(new ApiError(error));
        }

        var skuExists = await _db.Products.AnyAsync(ProductRules.DuplicateSku(request.Sku, id));

        if (skuExists)
        {
            return Conflict(new ApiError("Ya existe otro producto con ese SKU."));
        }

        ApplyRequest(product, request);
        await _db.SaveChangesAsync();
        await _db.Entry(product).Reference(p => p.Supplier).LoadAsync();

        return Ok(product.ToDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _db.Products.FirstOrDefaultAsync(p => p.Id == id);
        if (product is null)
        {
            return NotFound(new ApiError("El producto no existe."));
        }

        _db.Products.Remove(product);
        await _db.SaveChangesAsync();

        return NoContent();
    }

    private async Task<string?> ValidateProductRequest(ProductRequest request)
    {
        var error = ProductRules.ValidateFields(request);
        if (error is not null) return error;

        var supplierExists = await _db.Suppliers.AnyAsync(s => s.Id == request.SupplierId);
        return ProductRules.ValidateSupplier(supplierExists);
    }

    private static void ApplyRequest(Product product, ProductRequest request)
    {
        product.Name = request.Name.Trim();
        product.Sku = request.Sku.Trim();
        product.Category = request.Category.Trim();
        product.CurrentStock = request.CurrentStock;
        product.MinimumStock = request.MinimumStock;
        product.Price = request.Price;
        product.SupplierId = request.SupplierId;
    }
}
