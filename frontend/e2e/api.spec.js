import { test, expect } from './support/inventory-test.js';

test('crear un producto, consultarlo y borrarlo en la base real', async ({ request, inventory }) => {
  const { apiUrl, productData } = inventory;
  let productId;

  await test.step('POST: crear el producto', async () => {
    const response = await request.post(apiUrl('/api/products'), { data: productData });
    expect(response.status()).toBe(201);
    const product = await response.json();
    expect(product.id).toEqual(expect.any(Number));
    productId = product.id;
  });

  await test.step('GET: comprobar que los datos quedaron guardados', async () => {
    const response = await request.get(apiUrl(`/api/products/${productId}`));
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({ id: productId, ...productData });
  });

  await test.step('DELETE y GET: borrar el producto y comprobar que ya no existe', async () => {
    const deleted = await request.delete(apiUrl(`/api/products/${productId}`));
    expect(deleted.status()).toBe(204);
    const missing = await request.get(apiUrl(`/api/products/${productId}`));
    expect(missing.status()).toBe(404);
  });
});

test('rechazar un producto con nombre vacío sin guardarlo', async ({ request, inventory }) => {
  const { apiUrl, productData, supplierId } = inventory;

  await test.step('Comprobar que el SKU propio todavía no existe', async () => {
    const response = await request.get(apiUrl('/api/products'), {
      params: { search: productData.sku }
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual([]);
  });

  await test.step('POST inválido: recibir 400 y el mensaje de validación', async () => {
    const response = await request.post(apiUrl('/api/products'), {
      data: { ...productData, name: '' }
    });
    expect(response.status()).toBe(400);
    expect(await response.json()).toMatchObject({ message: 'El nombre es obligatorio.' });
  });

  await test.step('GET: comprobar que el alta rechazada no dejó un producto', async () => {
    const response = await request.get(apiUrl('/api/products'), {
      params: { supplierId }
    });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual([]);
  });
});

test('registrar una entrada y comprobar que el stock quedó guardado', async ({ request, inventory }) => {
  const { apiUrl, productData, unique } = inventory;
  let productId;

  await test.step('Crear un producto propio con 5 unidades', async () => {
    const response = await request.post(apiUrl('/api/products'), { data: productData });
    expect(response.status()).toBe(201);
    const product = await response.json();
    expect(product.id).toEqual(expect.any(Number));
    productId = product.id;
    expect(product.currentStock).toBe(5);
  });

  await test.step('POST: registrar una entrada real de 3 unidades', async () => {
    const description = `Entrada TP7 ${unique}`;
    const response = await request.post(apiUrl('/api/stock-movements'), {
      data: { productId, type: 'Entrada', quantity: 3, description }
    });
    expect(response.status()).toBe(201);
    expect(await response.json()).toMatchObject({
      productId,
      type: 'Entrada',
      quantity: 3,
      newStock: 8,
      description
    });
  });

  await test.step('GET independiente: comprobar 8 unidades persistidas', async () => {
    const response = await request.get(apiUrl(`/api/products/${productId}`));
    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({
      id: productId,
      sku: productData.sku,
      currentStock: 8
    });
  });
});
