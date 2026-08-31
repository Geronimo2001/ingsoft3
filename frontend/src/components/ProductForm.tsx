import { useState, type FormEvent } from 'react';
import type { Product, ProductRequest, Supplier } from '../types';

type ProductFormProps = {
  suppliers: Supplier[];
  product?: Product;
  onSubmit: (data: ProductRequest) => Promise<void>;
  onCancel: () => void;
};

const emptyProduct: ProductRequest = {
  name: '',
  sku: '',
  category: '',
  currentStock: 0,
  minimumStock: 0,
  price: 0,
  supplierId: 0
};

export function ProductForm({ suppliers, product, onSubmit, onCancel }: ProductFormProps) {
  const [form, setForm] = useState<ProductRequest>(() => ({
    ...emptyProduct,
    ...product,
    supplierId: product?.supplierId ?? suppliers[0]?.id ?? 0
  }));
  const [saving, setSaving] = useState(false);

  const updateField = (name: keyof ProductRequest, value: string) => {
    const numericFields = ['currentStock', 'minimumStock', 'price', 'supplierId'];
    setForm((current) => ({
      ...current,
      [name]: numericFields.includes(name) ? Number(value) : value
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <label>
        Nombre
        <input value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
      </label>
      <label>
        SKU
        <input value={form.sku} onChange={(e) => updateField('sku', e.target.value)} required />
      </label>
      <label>
        Categoria
        <input value={form.category} onChange={(e) => updateField('category', e.target.value)} required />
      </label>
      <label>
        Stock actual
        <input
          type="number"
          min="0"
          value={form.currentStock}
          onChange={(e) => updateField('currentStock', e.target.value)}
          required
        />
      </label>
      <label>
        Stock minimo
        <input
          type="number"
          min="0"
          value={form.minimumStock}
          onChange={(e) => updateField('minimumStock', e.target.value)}
          required
        />
      </label>
      <label>
        Precio
        <input
          type="number"
          min="0"
          step="0.01"
          value={form.price}
          onChange={(e) => updateField('price', e.target.value)}
          required
        />
      </label>
      <label className="span-two">
        Proveedor
        <select
          value={form.supplierId}
          onChange={(e) => updateField('supplierId', e.target.value)}
          required
        >
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
      </label>
      <div className="form-actions span-two">
        <button type="button" className="secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" disabled={saving || suppliers.length === 0}>
          {saving ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
