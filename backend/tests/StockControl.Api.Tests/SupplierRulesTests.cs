using StockControl.Api.Domain;
using StockControl.Api.Models;
using Xunit;

namespace StockControl.Api.Tests;

public class SupplierRulesTests
{
    [Theory]
    [InlineData("")]
    [InlineData("ventas@example.com")]
    public void ProveedorValido_AceptaEmailOpcional(string email)
    {
        var request = new SupplierRequest("Papelera", "", "", email);
        Assert.Null(SupplierRules.Validate(request));
    }

    [Fact]
    public void ProveedorSinProductos_SePuedeEliminar()
    {
        Assert.True(SupplierRules.CanDelete(new Supplier()));
    }

    [Fact]
    public void ProveedorSinNombre_SeRechaza()
    {
        var request = new SupplierRequest("  ", "", "", "");
        Assert.Equal("El nombre es obligatorio.", SupplierRules.Validate(request));
    }

    [Fact]
    public void EmailSinArroba_SeRechaza()
    {
        var request = new SupplierRequest("Papelera", "", "", "ventas.example.com");
        Assert.Equal("El email no tiene un formato valido.", SupplierRules.Validate(request));
    }

    [Fact]
    public void ProveedorConProductos_NoSePuedeEliminar()
    {
        var supplier = new Supplier { Products = [new Product { Id = 1 }] };
        Assert.False(SupplierRules.CanDelete(supplier));
    }
}
