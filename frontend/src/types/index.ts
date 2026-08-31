export type ProductStatus = 'Disponible' | 'Stock bajo';
export type StockMovementType = 'Entrada' | 'Salida';

export type Product = {
  id: number;
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  price: number;
  supplierId: number;
  supplierName: string;
  status: ProductStatus;
};

export type ProductRequest = {
  name: string;
  sku: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  price: number;
  supplierId: number;
};

export type Supplier = {
  id: number;
  name: string;
  contactName: string;
  phone: string;
  email: string;
  productsCount: number;
  products?: Product[];
};

export type SupplierRequest = {
  name: string;
  contactName: string;
  phone: string;
  email: string;
};

export type StockMovementRequest = {
  productId: number;
  type: StockMovementType;
  quantity: number;
  description?: string;
};

export type Dashboard = {
  totalProducts: number;
  totalSuppliers: number;
  lowStockProducts: number;
  stockValue: number;
  productsToRestock: Product[];
};
