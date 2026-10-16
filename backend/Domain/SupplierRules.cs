using StockControl.Api.Models;

namespace StockControl.Api.Domain;

public static class SupplierRules
{
    public static string? Validate(SupplierRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name)) return "El nombre es obligatorio.";
        if (!string.IsNullOrWhiteSpace(request.Email) && !request.Email.Contains('@'))
            return "El email no tiene un formato valido.";
        return null;
    }

    public static bool CanDelete(Supplier supplier) => supplier.Products.Count == 0;
}
