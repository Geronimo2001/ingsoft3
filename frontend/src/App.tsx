import { useState } from 'react';
import { Layout, type Page } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { ProductsPage } from './pages/ProductsPage';
import { SuppliersPage } from './pages/SuppliersPage';

export default function App() {
  const [page, setPage] = useState<Page>('inicio');

  return (
    <Layout currentPage={page} onChangePage={setPage}>
      {page === 'inicio' && <DashboardPage />}
      {page === 'productos' && <ProductsPage />}
      {page === 'proveedores' && <SuppliersPage />}
    </Layout>
  );
}
