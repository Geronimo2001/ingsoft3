using System.Linq.Expressions;
using StockControl.Api.Models;

namespace StockControl.Api.Domain;

public static class ProductRules
{
    // Cantidad necesaria para alcanzar el mínimo; recibe stocks válidos (no negativos).
    public static int UnitsToRestock(int currentStock, int minimumStock)
    {
        if (currentStock >= minimumStock)
        {
            return 0;
        }

        return minimumStock - currentStock;
    }

    public static string? ValidateFields(ProductRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name)) return "El nombre es obligatorio.";
        if (string.IsNullOrWhiteSpace(request.Sku)) return "El SKU es obligatorio.";
        if (string.IsNullOrWhiteSpace(request.Category)) return "La categoria es obligatoria.";
        if (request.CurrentStock < 0 || request.MinimumStock < 0) return "El stock no puede ser negativo.";
        if (request.Price < 0) return "El precio no puede ser negativo.";
        return null;
    }

    public static string? ValidateSupplier(bool exists) =>
        exists ? null : "El proveedor seleccionado no existe.";

    // La misma expresión se ejecuta en PostgreSQL y se compila en los unit tests.
    public static Expression<Func<Product, bool>> DuplicateSku(string sku, int? currentId = null)
    {
        var normalized = sku.Trim().ToLower();
        return product => (!currentId.HasValue || product.Id != currentId.Value)
            && product.Sku.ToLower() == normalized;
    }

    public static Expression<Func<Product, bool>> Filter(string? search, bool lowStock, int? supplierId)
    {
        var term = search?.Trim().ToLower() ?? "";
        return product => (term == "" || product.Name.ToLower().Contains(term) || product.Sku.ToLower().Contains(term))
            && (!lowStock || product.CurrentStock <= product.MinimumStock)
            && (!supplierId.HasValue || product.SupplierId == supplierId.Value);
    }
}
