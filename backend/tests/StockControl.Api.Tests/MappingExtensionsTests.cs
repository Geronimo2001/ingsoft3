using StockControl.Api.Models;
using Xunit;

namespace StockControl.Api.Tests;

public class MappingExtensionsTests
{
    [Theory]
    [InlineData(4, 5, "Stock bajo")]
    [InlineData(5, 5, "Stock bajo")]
    public void EstadoStock_RespetaElLimiteDelMinimo(int stock, int minimum, string expected)
    {
        // Arrange
        var product = new Product { CurrentStock = stock, MinimumStock = minimum };
        // Act
        var dto = product.ToDto();
        // Assert
        Assert.Equal(expected, dto.Status);
    }
}
