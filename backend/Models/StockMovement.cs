namespace StockControl.Api.Models;

public enum StockMovementType
{
    Entrada,
    Salida
}

public class StockMovement
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public Product? Product { get; set; }
    public StockMovementType Type { get; set; }
    public int Quantity { get; set; }
    public DateTime Date { get; set; }
    public string? Description { get; set; }
}
