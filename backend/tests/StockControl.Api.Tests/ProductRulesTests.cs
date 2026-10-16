using StockControl.Api.Domain;
using StockControl.Api.Models;
using Xunit;

namespace StockControl.Api.Tests;

public class ProductRulesTests
{
    private static readonly ProductRequest Valid = new("Resma", "RES-A4", "Papel", 5, 2, 100m, 1);

    [Theory]
    [InlineData(" ", "RES", "Papel", "El nombre es obligatorio.")]
    [InlineData("Resma", " ", "Papel", "El SKU es obligatorio.")]
    [InlineData("Resma", "RES", "\t", "La categoria es obligatoria.")]
    public void CamposObligatorios_NoAceptanBlancos(string name, string sku, string category, string expected)
    {
        var request = Valid with { Name = name, Sku = sku, Category = category };
        var error = ProductRules.ValidateFields(request);
        Assert.Equal(expected, error);
    }

    [Theory]
    [InlineData(-1, 0, 0, "El stock no puede ser negativo.")]
    [InlineData(0, 0, -1, "El precio no puede ser negativo.")]
    [InlineData(0, -1, 0, "El stock no puede ser negativo.")]
    public void ValoresNegativos_SeRechazan(int stock, int minimum, int price, string expected)
    {
        var request = Valid with { CurrentStock = stock, MinimumStock = minimum, Price = price };
        var error = ProductRules.ValidateFields(request);
        Assert.Equal(expected, error);
    }

    [Fact]
    public void Producto_RequiereUnProveedorExistente()
    {
        Assert.Equal("El proveedor seleccionado no existe.", ProductRules.ValidateSupplier(false));
    }

    [Theory]
    [InlineData("  res-a4  ", null, true)]
    [InlineData("RES-A4", 7, false)]
    [InlineData("RES-A4", 8, true)]
    [InlineData("OTRO", null, false)]
    public void SkuDuplicado_IgnoraMayusculasYNoConfundeElMismoProducto(string sku, int? currentId, bool expected)
    {
        // Arrange: compilar la misma expresión que el controlador envía a EF.
        var product = new Product { Id = 7, Sku = "ReS-A4" };
        var predicate = ProductRules.DuplicateSku(sku, currentId).Compile();
        // Act
        var duplicates = predicate(product);
        // Assert
        Assert.Equal(expected, duplicates);
    }

    [Theory]
    [InlineData(3, 5, 2)]
    [InlineData(5, 5, 0)]
    [InlineData(7, 5, 0)]
    [InlineData(0, 0, 0)]
    public void Reposicion_CalculaSoloLasUnidadesFaltantes(int stock, int minimum, int expected)
    {
        var units = ProductRules.UnitsToRestock(stock, minimum);
        Assert.Equal(expected, units);
    }

    [Fact]
    public void ProductoValido_SeAceptaConProveedorExistente()
    {
        Assert.Null(ProductRules.ValidateFields(Valid));
        Assert.Null(ProductRules.ValidateSupplier(true));
    }

    [Theory]
    [InlineData(null, false, null, true)]
    [InlineData("  resma  ", false, null, true)]
    [InlineData(" RES-A4 ", false, null, true)]
    [InlineData("otro", false, null, false)]
    [InlineData(null, true, null, true)]
    [InlineData(null, false, 2, true)]
    [InlineData(null, false, 3, false)]
    public void Filtro_RespetaBusquedaStockYProveedor(string? search, bool lowStock, int? supplierId, bool expected)
    {
        var product = new Product { Name = "Resma", Sku = "RES-A4", CurrentStock = 5, MinimumStock = 5, SupplierId = 2 };
        var filter = ProductRules.Filter(search, lowStock, supplierId).Compile();
        Assert.Equal(expected, filter(product));
    }

    [Fact]
    public void FiltroStockBajo_ExcluyeProductosPorEncimaDelMinimo()
    {
        var product = new Product { CurrentStock = 6, MinimumStock = 5 };
        Assert.False(ProductRules.Filter(null, true, null).Compile()(product));
    }
}
