using Microsoft.EntityFrameworkCore;
using StockControl.Api.Data;
using StockControl.Api.Models;

namespace StockControl.Api.Services;

public class StockRepository(AppDbContext db) : IStockRepository
{
    public Task<Product?> FindProductAsync(int productId) =>
        db.Products.FirstOrDefaultAsync(product => product.Id == productId);

    public async Task SaveMovementAsync(StockMovement movement)
    {
        db.StockMovements.Add(movement);
        await db.SaveChangesAsync();
    }
}
