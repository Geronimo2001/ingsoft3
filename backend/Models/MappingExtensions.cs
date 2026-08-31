namespace StockControl.Api.Models;

public static class MappingExtensions
{
    public static ProductDto ToDto(this Product product)
    {
        return new ProductDto(
            product.Id,
            product.Name,
            product.Sku,
            product.Category,
            product.CurrentStock,
            product.MinimumStock,
            product.Price,
            product.SupplierId,
            product.Supplier?.Name ?? "",
            product.CurrentStock <= product.MinimumStock ? "Stock bajo" : "Disponible");
    }

    public static SupplierDto ToDto(this Supplier supplier, bool includeProducts = false)
    {
        return new SupplierDto(
            supplier.Id,
            supplier.Name,
            supplier.ContactName,
            supplier.Phone,
            supplier.Email,
            supplier.Products.Count,
            includeProducts ? supplier.Products.Select(p => p.ToDto()).ToList() : null);
    }
}
