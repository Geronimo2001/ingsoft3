import { useEffect, useState } from 'react';
import { Message } from '../components/Message';
import { api } from '../services/api';
import type { Dashboard } from '../types';

const money = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 2
});

export function DashboardPage() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getDashboard()
      .then(setDashboard)
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) {
    return <Message type="error" text={error} />;
  }

  if (!dashboard) {
    return <p className="muted">Cargando resumen...</p>;
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Resumen</p>
          <h2>Inicio</h2>
        </div>
      </div>

      <div className="metrics-grid">
        <article className="metric">
          <span>Productos</span>
          <strong>{dashboard.totalProducts}</strong>
        </article>
        <article className="metric">
          <span>Proveedores</span>
          <strong>{dashboard.totalSuppliers}</strong>
        </article>
        <article className="metric warning">
          <span>Stock bajo</span>
          <strong>{dashboard.lowStockProducts}</strong>
        </article>
        <article className="metric">
          <span>Valor del stock</span>
          <strong>{money.format(dashboard.stockValue)}</strong>
        </article>
      </div>

      <section className="panel">
        <div className="section-title">
          <h3>Productos que necesitan reposicion</h3>
        </div>
        {dashboard.productsToRestock.length === 0 ? (
          <p className="muted">No hay productos con stock bajo.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>SKU</th>
                  <th>Stock</th>
                  <th>Minimo</th>
                  <th>Proveedor</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.productsToRestock.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.currentStock}</td>
                    <td>{product.minimumStock}</td>
                    <td>{product.supplierName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}
