using StockControl.Api.Models;

namespace StockControl.Api.Data;

public static class SeedData
{
    public static void EnsureSeeded(AppDbContext db)
    {
        if (db.Suppliers.Any() || db.Products.Any())
        {
            return;
        }

        var suppliers = new List<Supplier>
        {
            new()
            {
                Name = "Distribuidora Norte",
                ContactName = "Laura Gomez",
                Phone = "351-555-1200",
                Email = "ventas@norte.example"
            },
            new()
            {
                Name = "Insumos Centro",
                ContactName = "Martin Ruiz",
                Phone = "351-555-2400",
                Email = "contacto@centro.example"
            }
        };

        db.Suppliers.AddRange(suppliers);
        db.SaveChanges();

        db.Products.AddRange(
            new Product
            {
                Name = "Cuaderno A4",
                Sku = "CUA4-001",
                Category = "Libreria",
                CurrentStock = 18,
                MinimumStock = 10,
                Price = 2800,
                SupplierId = suppliers[0].Id
            },
            new Product
            {
                Name = "Lapicera azul",
                Sku = "LAP-AZ-010",
                Category = "Libreria",
                CurrentStock = 4,
                MinimumStock = 20,
                Price = 450,
                SupplierId = suppliers[1].Id
            },
            new Product
            {
                Name = "Resma A4",
                Sku = "RES-A4-500",
                Category = "Oficina",
                CurrentStock = 7,
                MinimumStock = 8,
                Price = 6200,
                SupplierId = suppliers[0].Id
            });

        db.SaveChanges();
    }
}
