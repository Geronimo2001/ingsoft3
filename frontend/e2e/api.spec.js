import { randomUUID } from 'node:crypto';
import { test, expect } from '@playwright/test';

const apiBaseUrl = process.env.API_BASE_URL;
if (!apiBaseUrl) {
  throw new Error('Definí API_BASE_URL con la dirección del backend a probar.');
}
const apiUrl = (path) => new URL(path, apiBaseUrl).toString();

test('crear un producto, consultarlo y borrarlo en la base real', async ({ request }) => {
  // Nombre propio de esta ejecución: no usamos ni borramos datos ajenos.
  const unique = `${Date.now()}-${randomUUID()}`;
  const name = `TP7 Producto ${unique}`;
  const sku = `TP7-${unique}`;
  let supplierId;
  let productId;

  try {
    await test.step('Preparar un proveedor propio para el producto', async () => {
      const response = await request.post(apiUrl('/api/suppliers'), {
        data: {
          name: `TP7 Proveedor ${unique}`,
          contactName: 'Prueba de integración',
          phone: '',
          email: ''
        },
        timeout: 60_000
      });
      if (response.ok()) supplierId = (await response.json()).id;
      expect(response.status()).toBe(201);
      expect(supplierId).toEqual(expect.any(Number));
    });

    await test.step('POST: crear el producto', async () => {
      const response = await request.post(apiUrl('/api/products'), {
        data: {
          name,
          sku,
          category: 'Pruebas TP7',
          currentStock: 5,
          minimumStock: 2,
          price: 100,
          supplierId
        }
      });
      if (response.ok()) productId = (await response.json()).id;
      expect(response.status()).toBe(201);
      expect(productId).toEqual(expect.any(Number));
    });

    await test.step('GET: comprobar que los datos quedaron guardados', async () => {
      const response = await request.get(apiUrl(`/api/products/${productId}`));
      expect(response.status()).toBe(200);
      expect(await response.json()).toMatchObject({
        id: productId,
        name,
        sku,
        currentStock: 5,
        minimumStock: 2,
        price: 100,
        supplierId
      });
    });

    await test.step('DELETE y GET: borrar el producto y comprobar que ya no existe', async () => {
      const deleted = await request.delete(apiUrl(`/api/products/${productId}`));
      expect(deleted.status()).toBe(204);
      const missing = await request.get(apiUrl(`/api/products/${productId}`));
      expect(missing.status()).toBe(404);
      productId = undefined;
    });
  } finally {
    // También intentamos limpiar si falla una comprobación intermedia.
    // El proveedor se elimina después del producto por su relación en la base.
    try {
      if (productId !== undefined) {
        const deleted = await request.delete(apiUrl(`/api/products/${productId}`));
        expect([204, 404]).toContain(deleted.status());
        const missing = await request.get(apiUrl(`/api/products/${productId}`));
        expect(missing.status()).toBe(404);
      }
    } finally {
      if (supplierId !== undefined) {
        await test.step('Limpiar el proveedor y comprobar que desapareció', async () => {
          const deleted = await request.delete(apiUrl(`/api/suppliers/${supplierId}`));
          expect(deleted.status()).toBe(204);
          const missing = await request.get(apiUrl(`/api/suppliers/${supplierId}`));
          expect(missing.status()).toBe(404);
        });
      }
    }
  }
});
