import { describe, expect, it } from 'vitest';
import { canSaveProduct, initialProductForm, updateProductField } from './productForm';
import type { ProductRequest, Supplier } from '../types';

const suppliers: Supplier[] = [{ id: 4, name: 'Papelera', contactName: '', phone: '', email: '', productsCount: 0 }];

describe('datos de productos', () => {
  it.each([
    ['currentStock', '0', 0], ['price', '12.50', 12.50]
  ] as const)('convierte %s sin modificar los otros datos', (field, input, expected) => {
    const before = initialProductForm(suppliers);
    const result = updateProductField(before, field as keyof ProductRequest, input);
    expect(result).toEqual({ ...before, [field]: expected });
    expect(before).toEqual(initialProductForm(suppliers));
  });

  it('impide guardar mientras hay una operación pendiente', () => {
    expect(canSaveProduct(true, 1)).toBe(false);
  });
});
