using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockControl.Api.Data;
using StockControl.Api.Models;

namespace StockControl.Api.Controllers;

[ApiController]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _db;

    public DashboardController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<DashboardDto>> GetSummary()
    {
        var products = await _db.Products.Include(p => p.Supplier).ToListAsync();
        var totalSuppliers = await _db.Suppliers.CountAsync();
        var lowStock = products
            .Where(p => p.CurrentStock <= p.MinimumStock)
            .OrderBy(p => p.CurrentStock - p.MinimumStock)
            .Take(5)
            .Select(p => p.ToDto())
            .ToList();

        var dashboard = new DashboardDto(
            products.Count,
            totalSuppliers,
            products.Count(p => p.CurrentStock <= p.MinimumStock),
            products.Sum(p => p.CurrentStock * p.Price),
            lowStock);

        return Ok(dashboard);
    }
}
