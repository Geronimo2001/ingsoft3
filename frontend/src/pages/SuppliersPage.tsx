import { useEffect, useState } from 'react';
import { Message } from '../components/Message';
import { Modal } from '../components/Modal';
import { SupplierForm } from '../components/SupplierForm';
import { api } from '../services/api';
import type { Supplier, SupplierRequest } from '../types';

export function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadSuppliers = async () => {
    const data = await api.getSuppliers();
    setSuppliers(data);
  };

  useEffect(() => {
    setLoading(true);
    loadSuppliers()
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const submitSupplier = async (data: SupplierRequest) => {
    setError('');
    try {
      if (editingSupplier) {
        await api.updateSupplier(editingSupplier.id, data);
        setMessage('Proveedor actualizado.');
      } else {
        await api.createSupplier(data);
        setMessage('Proveedor creado.');
      }
      setShowForm(false);
      setEditingSupplier(null);
      await loadSuppliers();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const deleteSupplier = async (supplier: Supplier) => {
    const confirmed = window.confirm(`Eliminar el proveedor "${supplier.name}"?`);
    if (!confirmed) return;

    setError('');
    try {
      await api.deleteSupplier(supplier.id);
      setMessage('Proveedor eliminado.');
      await loadSuppliers();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const showProducts = async (supplier: Supplier) => {
    setError('');
    try {
      const detail = await api.getSupplier(supplier.id);
      setSelectedSupplier(detail);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const openCreateForm = () => {
    setEditingSupplier(null);
    setShowForm(true);
  };

  const openEditForm = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setShowForm(true);
  };

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Catalogo</p>
          <h2>Proveedores</h2>
        </div>
        <button onClick={openCreateForm}>Crear proveedor</button>
      </div>

      {message && <Message type="success" text={message} />}
      {error && <Message type="error" text={error} />}

      {loading ? (
        <p className="muted">Cargando proveedores...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Telefono</th>
                <th>Email</th>
                <th>Productos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.contactName || '-'}</td>
                  <td>{supplier.phone || '-'}</td>
                  <td>{supplier.email || '-'}</td>
                  <td>{supplier.productsCount}</td>
                  <td>
                    <div className="row-actions">
                      <button className="secondary" onClick={() => showProducts(supplier)}>
                        Ver productos
                      </button>
                      <button className="secondary" onClick={() => openEditForm(supplier)}>
                        Editar
                      </button>
                      <button className="danger" onClick={() => deleteSupplier(supplier)}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {suppliers.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty-cell">
                    No hay proveedores para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <Modal
          title={editingSupplier ? 'Editar proveedor' : 'Crear proveedor'}
          onClose={() => setShowForm(false)}
        >
          <SupplierForm
            supplier={editingSupplier ?? undefined}
            onSubmit={submitSupplier}
            onCancel={() => setShowForm(false)}
          />
        </Modal>
      )}

      {selectedSupplier && (
        <Modal title={`Productos de ${selectedSupplier.name}`} onClose={() => setSelectedSupplier(null)}>
          {selectedSupplier.products && selectedSupplier.products.length > 0 ? (
            <div className="associated-list">
              {selectedSupplier.products.map((product) => (
                <div key={product.id} className="associated-item">
                  <strong>{product.name}</strong>
                  <span>{product.sku}</span>
                  <span>Stock: {product.currentStock}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="muted">Este proveedor no tiene productos asociados.</p>
          )}
        </Modal>
      )}
    </section>
  );
}
