using StockControl.Api.Models;

namespace StockControl.Api.Services;

public interface IStockRepository
{
    Task<Product?> FindProductAsync(int productId);
    Task SaveMovementAsync(StockMovement movement);
}
