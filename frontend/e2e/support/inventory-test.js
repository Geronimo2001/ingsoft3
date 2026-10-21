import { randomUUID } from 'node:crypto';
import { test as base, expect } from '@playwright/test';

export { expect };

// Cada prueba recibe su propio proveedor y limpia todo lo que creó bajo él.
export const test = base.extend({
  inventory: async ({ request }, use) => {
    const apiBaseUrl = process.env.API_BASE_URL;
    if (!apiBaseUrl) {
      throw new Error('Definí API_BASE_URL con la dirección del backend a probar.');
    }
    const apiUrl = (path) => new URL(path, apiBaseUrl).toString();
    const unique = `${Date.now()}-${randomUUID()}`;
    let supplierId;

    try {
      await base.step('Preparar un proveedor exclusivo de esta prueba', async () => {
        const response = await request.post(apiUrl('/api/suppliers'), {
          data: {
            name: `TP7 Proveedor ${unique}`,
            contactName: 'Prueba automatizada',
            phone: '',
            email: ''
          },
          timeout: 60_000
        });
        if (response.ok()) supplierId = (await response.json()).id;
        expect(response.status()).toBe(201);
        expect(supplierId).toEqual(expect.any(Number));
      });

      await use({
        apiUrl,
        unique,
        supplierId,
        productData: {
          name: `TP7 Producto ${unique}`,
          sku: `TP7-${unique}`,
          category: 'Pruebas TP7',
          currentStock: 5,
          minimumStock: 2,
          price: 100,
          supplierId
        }
      });
    } finally {
      if (supplierId !== undefined) {
        await base.step('Limpiar los datos propios y comprobar que desaparecieron', async () => {
          // Buscar por nuestro proveedor también encuentra un alta que devolvió
          // una respuesta inesperada antes de que el test pudiera guardar su ID.
          const response = await request.get(apiUrl('/api/products'), {
            params: { supplierId }
          });
          expect(response.status()).toBe(200);
          const products = await response.json();

          for (const product of products) {
            expect(product.supplierId).toBe(supplierId);
            const deleted = await request.delete(apiUrl(`/api/products/${product.id}`));
            expect([204, 404]).toContain(deleted.status());
            const missing = await request.get(apiUrl(`/api/products/${product.id}`));
            expect(missing.status()).toBe(404);
          }

          const remaining = await request.get(apiUrl('/api/products'), {
            params: { supplierId }
          });
          expect(remaining.status()).toBe(200);
          expect(await remaining.json()).toEqual([]);

          const deleted = await request.delete(apiUrl(`/api/suppliers/${supplierId}`));
          expect(deleted.status()).toBe(204);
          const missing = await request.get(apiUrl(`/api/suppliers/${supplierId}`));
          expect(missing.status()).toBe(404);
        });
      }
    }
  }
});
