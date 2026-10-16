import { describe, expect, it, vi } from 'vitest';
import { createApi } from './api';

describe('cliente API', () => {
  it('envía el movimiento como JSON y acepta una respuesta sin contenido', async () => {
    const movement = { productId: 7, type: 'Entrada' as const, quantity: 2 };
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 204 }));
    const api = createApi(fetchMock, 'http://api.test');
    await expect(api.registerMovement(movement)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledExactlyOnceWith('http://api.test/stock-movements', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(movement)
    });
  });

  it('envía el filtro de stock bajo aunque no haya búsqueda', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response('[]'));
    await createApi(fetchMock, 'http://api.test').getProducts('', true);
    expect(fetchMock).toHaveBeenCalledExactlyOnceWith('http://api.test/products?lowStock=true', {
      method: 'GET', headers: undefined, body: undefined
    });
  });

  it.each([
    ['{}', '', 'Ocurrio un error inesperado.'],
    ['no es JSON', 'Service Unavailable', 'Service Unavailable'],
    ['no es JSON', '', 'Ocurrio un error inesperado.']
  ])('resuelve el error sin mensaje útil: %s / %s', async (body, statusText, expected) => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response(body, { status: 503, statusText }));
    await expect(createApi(fetchMock).getDashboard()).rejects.toThrow(expected);
  });

  it('sin búsqueda útil no envía parámetros vacíos', async () => {
    const search = '   ';
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response('[]'));
    const api = createApi(fetchMock);
    await api.getProducts(search);
    const baseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5055/api';
    expect(fetchMock).toHaveBeenCalledExactlyOnceWith(`${baseUrl}/products`, {
      method: 'GET', headers: undefined, body: undefined
    });
  });

  it('propaga el mensaje del servidor cuando falla la consulta del dashboard', async () => {
    // Arrange: simular una respuesta real del backend sin hacer una petición de red.
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify({
      message: 'No se pudo obtener el resumen.'
    }), { status: 503, headers: { 'Content-Type': 'application/json' } }));
    const api = createApi(fetchMock, 'http://api.test');
    // Act + Assert: la promesa debe rechazar con el mensaje del servidor.
    await expect(api.getDashboard()).rejects.toThrow('No se pudo obtener el resumen.');
    expect(fetchMock).toHaveBeenCalledExactlyOnceWith('http://api.test/dashboard', {
      method: 'GET', headers: undefined, body: undefined
    });
  });

  it('recorta y codifica la búsqueda de productos', async () => {
    // Arrange
    const products = [{ id: 7, name: 'Resma A4' }];
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(new Response(JSON.stringify(products)));
    const api = createApi(fetchMock, 'http://api.test');

    // Act
    const result = await api.getProducts('  RES&A4  ', false);

    // Assert: verificar la interacción con el mock y el resultado.
    expect(fetchMock).toHaveBeenCalledExactlyOnceWith('http://api.test/products?search=RES%26A4', {
      method: 'GET', headers: undefined, body: undefined
    });
    expect(result).toEqual(products);
  });

});
