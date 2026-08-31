import type {
  Dashboard,
  Product,
  ProductRequest,
  StockMovementRequest,
  Supplier,
  SupplierRequest
} from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5055/api';

type RequestOptions = {
  method?: string;
  body?: unknown;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: options.body ? { 'Content-Type': 'application/json' } : undefined,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (!response.ok) {
    let message = 'Ocurrio un error inesperado.';
    try {
      const error = await response.json();
      message = error.message ?? message;
    } catch {
      message = response.statusText || message;
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  getDashboard: () => request<Dashboard>('/dashboard'),
  getProducts: (search = '', lowStock = false) => {
    const params = new URLSearchParams();
    if (search.trim()) params.set('search', search.trim());
    if (lowStock) params.set('lowStock', 'true');
    const query = params.toString();
    return request<Product[]>(`/products${query ? `?${query}` : ''}`);
  },
  createProduct: (data: ProductRequest) =>
    request<Product>('/products', { method: 'POST', body: data }),
  updateProduct: (id: number, data: ProductRequest) =>
    request<Product>(`/products/${id}`, { method: 'PUT', body: data }),
  deleteProduct: (id: number) =>
    request<void>(`/products/${id}`, { method: 'DELETE' }),
  getSuppliers: () => request<Supplier[]>('/suppliers'),
  getSupplier: (id: number) => request<Supplier>(`/suppliers/${id}`),
  createSupplier: (data: SupplierRequest) =>
    request<Supplier>('/suppliers', { method: 'POST', body: data }),
  updateSupplier: (id: number, data: SupplierRequest) =>
    request<Supplier>(`/suppliers/${id}`, { method: 'PUT', body: data }),
  deleteSupplier: (id: number) =>
    request<void>(`/suppliers/${id}`, { method: 'DELETE' }),
  registerMovement: (data: StockMovementRequest) =>
    request<void>('/stock-movements', { method: 'POST', body: data })
};
