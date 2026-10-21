import { test, expect } from './support/inventory-test.js';

async function openProducts(page) {
  await page.goto('/');
  await expect(page).toHaveTitle('Control de stock');
  await page.getByRole('button', { name: 'Productos y stock', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Productos y stock', exact: true })).toBeVisible();
}

function productRow(page, sku) {
  return page.getByRole('row').filter({
    has: page.getByRole('cell', { name: sku, exact: true })
  });
}

async function fillProductForm(page, product) {
  await page.getByRole('button', { name: 'Crear producto', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Crear producto', exact: true });
  await dialog.getByLabel('Nombre', { exact: true }).fill(product.name);
  await dialog.getByLabel('SKU', { exact: true }).fill(product.sku);
  await dialog.getByLabel('Categoria', { exact: true }).fill(product.category);
  await dialog.getByLabel('Stock actual', { exact: true }).fill(String(product.currentStock));
  await dialog.getByLabel('Stock minimo', { exact: true }).fill(String(product.minimumStock));
  await dialog.getByLabel('Precio', { exact: true }).fill(String(product.price));
  await dialog.getByRole('combobox', { name: 'Proveedor', exact: true }).selectOption(String(product.supplierId));
  return dialog;
}

test('crear y eliminar un producto desde la pantalla', async ({ page, request, inventory }) => {
  const { productData, apiUrl, supplierId } = inventory;
  await openProducts(page);

  await test.step('Completar el formulario y ver el producto propio en la tabla', async () => {
    const dialog = await fillProductForm(page, productData);
    await dialog.getByRole('button', { name: 'Guardar', exact: true }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByText('Producto creado.', { exact: true })).toBeVisible();
    const row = productRow(page, productData.sku);
    await expect(row).toHaveCount(1);
    await expect(row.getByRole('cell', { name: productData.name, exact: true })).toBeVisible();
  });

  await test.step('Eliminar desde la fila propia y comprobar que desapareció', async () => {
    const row = productRow(page, productData.sku);
    page.once('dialog', async (dialog) => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toContain(productData.name);
      await dialog.accept();
    });
    await row.getByRole('button', { name: 'Eliminar', exact: true }).click();
    await expect(page.getByText('Producto eliminado.', { exact: true })).toBeVisible();
    await expect(row).toHaveCount(0);
    const response = await request.get(apiUrl('/api/products'), { params: { supplierId } });
    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual([]);
  });
});

test('mostrar el error por SKU repetido sin crear otro producto', async ({ page, request, inventory }) => {
  const { productData, apiUrl, supplierId, unique } = inventory;
  const response = await request.post(apiUrl('/api/products'), { data: productData });
  expect(response.status()).toBe(201);
  const existing = await response.json();
  const duplicateName = `TP7 Duplicado ${unique}`;
  await openProducts(page);
  await expect(productRow(page, productData.sku)).toHaveCount(1);

  await test.step('Intentar un alta con SKU repetido y ver el mensaje real del backend', async () => {
    const dialog = await fillProductForm(page, { ...productData, name: duplicateName });
    const rejected = page.waitForResponse((res) =>
      new URL(res.url()).pathname === '/api/products' && res.request().method() === 'POST'
    );
    await dialog.getByRole('button', { name: 'Guardar', exact: true }).click();
    expect((await rejected).status()).toBe(409);
    await expect(page.getByText('Ya existe un producto con ese SKU.', { exact: true })).toBeVisible();
    await expect(dialog).toBeVisible();
    await dialog.getByRole('button', { name: 'Cancelar', exact: true }).click();
  });

  await test.step('Comprobar que sigue solo el producto original', async () => {
    await expect(productRow(page, productData.sku)).toHaveCount(1);
    await expect(page.getByRole('cell', { name: duplicateName, exact: true })).toHaveCount(0);
    const response = await request.get(apiUrl('/api/products'), { params: { supplierId } });
    expect(response.status()).toBe(200);
    const products = await response.json();
    expect(products).toHaveLength(1);
    expect(products[0]).toMatchObject({ id: existing.id, name: productData.name, sku: productData.sku });
  });
});

test('registrar una entrada desde la pantalla y conservar el stock al recargar', async ({ page, request, inventory }) => {
  const { productData, apiUrl, unique } = inventory;
  const response = await request.post(apiUrl('/api/products'), { data: productData });
  expect(response.status()).toBe(201);
  await openProducts(page);
  const row = productRow(page, productData.sku);
  await expect(row.getByRole('cell', { name: '5', exact: true })).toBeVisible();

  await test.step('Registrar una entrada de 3 y ver 8 unidades', async () => {
    await row.getByRole('button', { name: 'Movimiento', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'Registrar movimiento', exact: true });
    await dialog.getByRole('combobox', { name: 'Tipo', exact: true }).selectOption('Entrada');
    await dialog.getByLabel('Cantidad', { exact: true }).fill('3');
    await dialog.getByLabel('Descripcion', { exact: true }).fill(`Entrada E2E ${unique}`);
    await dialog.getByRole('button', { name: 'Registrar', exact: true }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByText('Movimiento registrado.', { exact: true })).toBeVisible();
    await expect(row.getByRole('cell', { name: '8', exact: true })).toBeVisible();
  });

  await test.step('Recargar la app y comprobar que el producto conserva 8 unidades', async () => {
    await page.reload();
    await page.getByRole('button', { name: 'Productos y stock', exact: true }).click();
    await expect(productRow(page, productData.sku).getByRole('cell', { name: '8', exact: true })).toBeVisible();
  });
});
