import { useState, type FormEvent } from 'react';
import type { Product, StockMovementRequest, StockMovementType } from '../types';

type StockMovementFormProps = {
  product: Product;
  onSubmit: (data: StockMovementRequest) => Promise<void>;
  onCancel: () => void;
};

export function StockMovementForm({ product, onSubmit, onCancel }: StockMovementFormProps) {
  const [type, setType] = useState<StockMovementType>('Entrada');
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        productId: product.id,
        type,
        quantity,
        description: description.trim() || undefined
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="readonly-field span-two">
        <span>Producto</span>
        <strong>{product.name}</strong>
        <small>Stock actual: {product.currentStock}</small>
      </div>
      <label>
        Tipo
        <select value={type} onChange={(e) => setType(e.target.value as StockMovementType)}>
          <option value="Entrada">Entrada</option>
          <option value="Salida">Salida</option>
        </select>
      </label>
      <label>
        Cantidad
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
      </label>
      <label className="span-two">
        Descripcion
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
      </label>
      <div className="form-actions span-two">
        <button type="button" className="secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" disabled={saving}>
          {saving ? 'Registrando...' : 'Registrar'}
        </button>
      </div>
    </form>
  );
}
