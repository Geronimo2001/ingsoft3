using Moq;
using StockControl.Api.Models;
using StockControl.Api.Services;
using Xunit;

namespace StockControl.Api.Tests;

public class StockServiceTests
{
    private readonly Mock<IStockRepository> _repository = new(MockBehavior.Strict);
    private readonly Product _product = new() { Id = 7, CurrentStock = 5 };

    private StockService CreateService()
    {
        _repository.Setup(r => r.FindProductAsync(7)).ReturnsAsync(_product);
        _repository.Setup(r => r.SaveMovementAsync(It.IsAny<StockMovement>())).Returns(Task.CompletedTask);
        return new StockService(_repository.Object);
    }

    [Fact]
    public async Task Entrada_SumaStockYGuardaMovimiento()
    {
        // Arrange: producto con 5 unidades y entrada de 3.
        var service = CreateService();
        var request = new StockMovementRequest(7, StockMovementType.Entrada, 3, null);
        // Act
        var (movement, error) = await service.RegisterMovementAsync(request);
        // Assert
        Assert.Null(error);
        Assert.Equal(8, _product.CurrentStock);
        Assert.NotNull(movement);
        Assert.Equal(7, movement.ProductId);
        Assert.Same(_product, movement.Product);
        Assert.Equal(StockMovementType.Entrada, movement.Type);
        Assert.Equal(3, movement.Quantity);
        _repository.Verify(r => r.SaveMovementAsync(movement), Times.Once);
    }

    [Fact]
    public async Task Salida_RestaStockYGuardaMovimiento()
    {
        var service = CreateService();
        var (movement, error) = await service.RegisterMovementAsync(new(7, StockMovementType.Salida, 3, null));
        Assert.Null(error);
        Assert.NotNull(movement);
        Assert.Equal(2, _product.CurrentStock);
        Assert.Equal(StockMovementType.Salida, movement.Type);
        _repository.Verify(r => r.SaveMovementAsync(movement), Times.Once);
    }

    [Fact]
    public async Task SalidaIgualAlStock_DejaCero()
    {
        var service = CreateService();
        var (movement, error) = await service.RegisterMovementAsync(new(7, StockMovementType.Salida, 5, null));
        Assert.Null(error);
        Assert.NotNull(movement);
        Assert.Equal(0, _product.CurrentStock);
        _repository.Verify(r => r.SaveMovementAsync(movement), Times.Once);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public async Task CantidadNoPositiva_RechazaSinConsultarNiGuardar(int quantity)
    {
        var service = new StockService(_repository.Object);
        var (movement, error) = await service.RegisterMovementAsync(new(7, StockMovementType.Entrada, quantity, null));
        Assert.Null(movement);
        Assert.Equal("La cantidad debe ser mayor a cero.", error);
        _repository.VerifyNoOtherCalls();
    }

    [Fact]
    public async Task ProductoInexistente_RechazaSinGuardar()
    {
        _repository.Setup(r => r.FindProductAsync(99)).ReturnsAsync((Product?)null);
        var service = new StockService(_repository.Object);
        var (movement, error) = await service.RegisterMovementAsync(new(99, StockMovementType.Entrada, 1, null));
        Assert.Null(movement);
        Assert.Equal("El producto no existe.", error);
        _repository.Verify(r => r.SaveMovementAsync(It.IsAny<StockMovement>()), Times.Never);
    }

    [Fact]
    public async Task SalidaExcesiva_RechazaSinModificarStockNiGuardar()
    {
        var service = CreateService();
        var (movement, error) = await service.RegisterMovementAsync(new(7, StockMovementType.Salida, 6, null));
        Assert.Null(movement);
        Assert.Equal("No se puede registrar una salida mayor al stock disponible.", error);
        Assert.Equal(5, _product.CurrentStock);
        _repository.Verify(r => r.SaveMovementAsync(It.IsAny<StockMovement>()), Times.Never);
    }

}
