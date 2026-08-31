using Microsoft.EntityFrameworkCore;
using StockControl.Api.Data;
using StockControl.Api.Models;

namespace StockControl.Api.Services;

public class StockService
{
    private readonly AppDbContext _db;

    public StockService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<(StockMovement? Movement, string? Error)> RegisterMovementAsync(StockMovementRequest request)
    {
        if (request.Quantity <= 0)
        {
            return (null, "La cantidad debe ser mayor a cero.");
        }

        var product = await _db.Products.FirstOrDefaultAsync(p => p.Id == request.ProductId);
        if (product is null)
        {
            return (null, "El producto no existe.");
        }

        if (request.Type == StockMovementType.Salida && request.Quantity > product.CurrentStock)
        {
            return (null, "No se puede registrar una salida mayor al stock disponible.");
        }

        product.CurrentStock += request.Type == StockMovementType.Entrada
            ? request.Quantity
            : -request.Quantity;

        var movement = new StockMovement
        {
            ProductId = product.Id,
            Product = product,
            Type = request.Type,
            Quantity = request.Quantity,
            Date = DateTime.UtcNow,
            Description = request.Description
        };

        _db.StockMovements.Add(movement);
        await _db.SaveChangesAsync();

        return (movement, null);
    }
}
