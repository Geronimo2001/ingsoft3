namespace StockControl.Api.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Sku { get; set; } = "";
    public string Category { get; set; } = "";
    public int CurrentStock { get; set; }
    public int MinimumStock { get; set; }
    public decimal Price { get; set; }
    public int SupplierId { get; set; }
    public Supplier? Supplier { get; set; }
    public List<StockMovement> StockMovements { get; set; } = [];
}
