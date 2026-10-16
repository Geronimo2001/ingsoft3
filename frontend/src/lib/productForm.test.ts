import { describe, expect, it } from 'vitest';
import { canSaveProduct, initialProductForm, updateProductField } from './productForm';
import type { ProductRequest, Supplier } from '../types';

const suppliers: Supplier[] = [{ id: 4, name: 'Papelera', contactName: '', phone: '', email: '', productsCount: 0 }];

describe('datos de productos', () => {
  it.each([
    ['currentStock', '0', 0], ['price', '12.50', 12.50],
    ['minimumStock', '2', 2], ['supplierId', '4', 4], ['name', 'Resma', 'Resma']
  ] as const)('convierte %s sin modificar los otros datos', (field, input, expected) => {
    const before = initialProductForm(suppliers);
    const result = updateProductField(before, field as keyof ProductRequest, input);
    expect(result).toEqual({ ...before, [field]: expected });
    expect(before).toEqual(initialProductForm(suppliers));
  });

  it.each([
    [true, 1, false], [false, 0, false], [false, 1, true]
  ])('permiso de guardado: pendiente=%s proveedores=%s', (saving, count, expected) => {
    expect(canSaveProduct(saving, count)).toBe(expected);
  });

  it('conserva el proveedor al editar y usa cero cuando no hay proveedores', () => {
    const product = {
      id: 7, name: 'Resma', sku: 'RES', category: 'Papel', currentStock: 3,
      minimumStock: 5, price: 10, supplierId: 9, supplierName: 'Otro', status: 'Stock bajo' as const
    };
    expect(initialProductForm(suppliers, product)).toEqual(product);
    expect(initialProductForm([]).supplierId).toBe(0);
  });
});
