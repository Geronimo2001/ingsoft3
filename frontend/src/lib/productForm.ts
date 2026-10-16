import type { Product, ProductRequest, Supplier } from '../types';

export function initialProductForm(suppliers: Supplier[], product?: Product): ProductRequest {
  return {
    name: '', sku: '', category: '', currentStock: 0, minimumStock: 0, price: 0,
    ...product,
    supplierId: product?.supplierId ?? suppliers[0]?.id ?? 0
  };
}

export function updateProductField(form: ProductRequest, name: keyof ProductRequest, value: string): ProductRequest {
  const numericFields = ['currentStock', 'minimumStock', 'price', 'supplierId'];
  return { ...form, [name]: numericFields.includes(name) ? Number(value) : value };
}

export function canSaveProduct(saving: boolean, supplierCount: number): boolean {
  return !saving && supplierCount > 0;
}
