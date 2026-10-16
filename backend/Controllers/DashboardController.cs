using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StockControl.Api.Data;
using StockControl.Api.Domain;
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
        var dashboard = InventorySummary.Create(products, totalSuppliers);

        return Ok(dashboard);
    }
}
