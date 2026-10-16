using StockControl.Api.Models;

namespace StockControl.Api.Domain;

public static class InventorySummary
{
    public static DashboardDto Create(IReadOnlyCollection<Product> products, int supplierCount)
    {
        var lowStock = products.Where(p => p.CurrentStock <= p.MinimumStock).ToList();
        var toRestock = lowStock
            .OrderBy(p => p.CurrentStock - p.MinimumStock)
            .Take(5)
            .Select(p => p.ToDto())
            .ToList();

        return new DashboardDto(products.Count, supplierCount, lowStock.Count,
            products.Sum(p => p.CurrentStock * p.Price), toRestock);
    }
}
