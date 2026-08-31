import { useState, type FormEvent } from 'react';
import type { Supplier, SupplierRequest } from '../types';

type SupplierFormProps = {
  supplier?: Supplier;
  onSubmit: (data: SupplierRequest) => Promise<void>;
  onCancel: () => void;
};

const emptySupplier: SupplierRequest = {
  name: '',
  contactName: '',
  phone: '',
  email: ''
};

export function SupplierForm({ supplier, onSubmit, onCancel }: SupplierFormProps) {
  const [form, setForm] = useState<SupplierRequest>(() => ({ ...emptySupplier, ...supplier }));
  const [saving, setSaving] = useState(false);

  const updateField = (name: keyof SupplierRequest, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
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
        Persona de contacto
        <input value={form.contactName} onChange={(e) => updateField('contactName', e.target.value)} />
      </label>
      <label>
        Telefono
        <input value={form.phone} onChange={(e) => updateField('phone', e.target.value)} />
      </label>
      <label>
        Email
        <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} />
      </label>
      <div className="form-actions span-two">
        <button type="button" className="secondary" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" disabled={saving}>
          {saving ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
