import { useEffect, useState } from 'react';
import { Message } from '../components/Message';
import { Modal } from '../components/Modal';
import { ProductForm } from '../components/ProductForm';
import { StockMovementForm } from '../components/StockMovementForm';
import { api } from '../services/api';
import type { Product, ProductRequest, StockMovementRequest, Supplier } from '../types';

const money = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 2
});

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState('');
  const [lowStock, setLowStock] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [movingProduct, setMovingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadProducts = async () => {
    const data = await api.getProducts(search, lowStock);
    setProducts(data);
  };

  const loadInitialData = async () => {
    setLoading(true);
    setError('');
    try {
      const [productsData, suppliersData] = await Promise.all([
        api.getProducts(search, lowStock),
        api.getSuppliers()
      ]);
      setProducts(productsData);
      setSuppliers(suppliersData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      setInitialLoadDone(true);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!initialLoadDone) return;
    loadProducts().catch((err: Error) => setError(err.message));
  }, [lowStock, initialLoadDone]);

  const submitProduct = async (data: ProductRequest) => {
    setError('');
    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct.id, data);
        setMessage('Producto actualizado.');
      } else {
        await api.createProduct(data);
        setMessage('Producto creado.');
      }
      setShowProductForm(false);
      setEditingProduct(null);
      await loadProducts();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const deleteProduct = async (product: Product) => {
    const confirmed = window.confirm(`Eliminar el producto "${product.name}"?`);
    if (!confirmed) return;

    setError('');
    try {
      await api.deleteProduct(product.id);
      setMessage('Producto eliminado.');
      await loadProducts();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const submitMovement = async (data: StockMovementRequest) => {
    setError('');
    try {
      await api.registerMovement(data);
      setMessage('Movimiento registrado.');
      setMovingProduct(null);
      await loadProducts();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const openCreateForm = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Inventario</p>
          <h2>Productos y stock</h2>
        </div>
        <button onClick={openCreateForm}>Crear producto</button>
      </div>

      <div className="toolbar">
        <label className="search-box">
          Buscar por nombre o SKU
          <div className="inline-control">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ej: Resma o RES-A4"
            />
            <button className="secondary" onClick={() => loadProducts()}>
              Buscar
            </button>
          </div>
        </label>
        <label className="check-row">
          <input type="checkbox" checked={lowStock} onChange={(e) => setLowStock(e.target.checked)} />
          Solo stock bajo
        </label>
      </div>

      {message && <Message type="success" text={message} />}
      {error && <Message type="error" text={error} />}

      {loading ? (
        <p className="muted">Cargando productos...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>SKU</th>
                <th>Categoria</th>
                <th>Stock</th>
                <th>Minimo</th>
                <th>Precio</th>
                <th>Proveedor</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.category}</td>
                  <td>{product.currentStock}</td>
                  <td>{product.minimumStock}</td>
                  <td>{money.format(product.price)}</td>
                  <td>{product.supplierName}</td>
                  <td>
                    <span className={`status ${product.status === 'Stock bajo' ? 'low' : 'ok'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="secondary" onClick={() => setMovingProduct(product)}>
                        Movimiento
                      </button>
                      <button className="secondary" onClick={() => openEditForm(product)}>
                        Editar
                      </button>
                      <button className="danger" onClick={() => deleteProduct(product)}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={9} className="empty-cell">
                    No hay productos para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showProductForm && (
        <Modal
          title={editingProduct ? 'Editar producto' : 'Crear producto'}
          onClose={() => setShowProductForm(false)}
        >
          {suppliers.length === 0 ? (
            <Message type="error" text="Primero crea un proveedor." />
          ) : (
            <ProductForm
              suppliers={suppliers}
              product={editingProduct ?? undefined}
              onSubmit={submitProduct}
              onCancel={() => setShowProductForm(false)}
            />
          )}
        </Modal>
      )}

      {movingProduct && (
        <Modal title="Registrar movimiento" onClose={() => setMovingProduct(null)}>
          <StockMovementForm
            product={movingProduct}
            onSubmit={submitMovement}
            onCancel={() => setMovingProduct(null)}
          />
        </Modal>
      )}
    </section>
  );
}
