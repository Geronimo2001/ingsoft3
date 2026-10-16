using StockControl.Api.Domain;
using StockControl.Api.Models;
using Xunit;

namespace StockControl.Api.Tests;

public class InventorySummaryTests
{
    [Fact]
    public void Resumen_CalculaTotalesYLimitaLaReposicionALosCincoMasUrgentes()
    {
        // Arrange: seis productos en el mínimo o debajo y uno disponible.
        var products = Enumerable.Range(0, 7).Select(i => new Product
        {
            Id = i + 1, CurrentStock = i, MinimumStock = 5, Price = 10m
        }).Reverse().ToList();
        // Act
        var result = InventorySummary.Create(products, 3);
        // Assert: incluye igualdad, ordena por déficit y limita a cinco.
        Assert.Equal(7, result.TotalProducts);
        Assert.Equal(3, result.TotalSuppliers);
        Assert.Equal(6, result.LowStockProducts);
        Assert.Equal(210m, result.StockValue);
        Assert.Equal(new[] { 1, 2, 3, 4, 5 }, result.ProductsToRestock.Select(p => p.Id));
    }

    [Fact]
    public void ResumenSinProductos_NoInventaStockNiReposiciones()
    {
        var result = InventorySummary.Create([], 0);
        Assert.Equal(0, result.TotalProducts);
        Assert.Equal(0, result.TotalSuppliers);
        Assert.Equal(0, result.LowStockProducts);
        Assert.Equal(0m, result.StockValue);
        Assert.Empty(result.ProductsToRestock);
    }
}
