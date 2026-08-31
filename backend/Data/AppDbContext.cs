using Microsoft.EntityFrameworkCore;
using StockControl.Api.Models;

namespace StockControl.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Supplier> Suppliers => Set<Supplier>();
    public DbSet<StockMovement> StockMovements => Set<StockMovement>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Supplier>(entity =>
        {
            entity.Property(s => s.Name).HasMaxLength(120).IsRequired();
            entity.Property(s => s.ContactName).HasMaxLength(120);
            entity.Property(s => s.Phone).HasMaxLength(50);
            entity.Property(s => s.Email).HasMaxLength(160);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(p => p.Name).HasMaxLength(140).IsRequired();
            entity.Property(p => p.Sku).HasMaxLength(60).IsRequired();
            entity.Property(p => p.Category).HasMaxLength(100).IsRequired();
            entity.Property(p => p.Price).HasPrecision(12, 2);
            entity.HasIndex(p => p.Sku).IsUnique();
            entity.HasOne(p => p.Supplier)
                .WithMany(s => s.Products)
                .HasForeignKey(p => p.SupplierId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<StockMovement>(entity =>
        {
            entity.Property(m => m.Type).HasConversion<string>().HasMaxLength(20);
            entity.Property(m => m.Description).HasMaxLength(300);
            entity.HasOne(m => m.Product)
                .WithMany(p => p.StockMovements)
                .HasForeignKey(m => m.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
