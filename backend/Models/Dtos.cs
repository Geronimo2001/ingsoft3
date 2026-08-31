namespace StockControl.Api.Models;

public record ProductDto(
    int Id,
    string Name,
    string Sku,
    string Category,
    int CurrentStock,
    int MinimumStock,
    decimal Price,
    int SupplierId,
    string SupplierName,
    string Status);

public record ProductRequest(
    string Name,
    string Sku,
    string Category,
    int CurrentStock,
    int MinimumStock,
    decimal Price,
    int SupplierId);

public record SupplierDto(
    int Id,
    string Name,
    string ContactName,
    string Phone,
    string Email,
    int ProductsCount,
    List<ProductDto>? Products = null);

public record SupplierRequest(
    string Name,
    string ContactName,
    string Phone,
    string Email);

public record StockMovementRequest(
    int ProductId,
    StockMovementType Type,
    int Quantity,
    string? Description);

public record StockMovementDto(
    int Id,
    int ProductId,
    StockMovementType Type,
    int Quantity,
    DateTime Date,
    string? Description,
    int NewStock);

public record DashboardDto(
    int TotalProducts,
    int TotalSuppliers,
    int LowStockProducts,
    decimal StockValue,
    List<ProductDto> ProductsToRestock);

public record ApiError(string Message);
