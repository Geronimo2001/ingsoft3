import type { ReactNode } from 'react';

export type Page = 'inicio' | 'productos' | 'proveedores';

type LayoutProps = {
  currentPage: Page;
  onChangePage: (page: Page) => void;
  children: ReactNode;
};

const navItems: Array<{ key: Page; label: string }> = [
  { key: 'inicio', label: 'Inicio' },
  { key: 'productos', label: 'Productos y stock' },
  { key: 'proveedores', label: 'Proveedores' }
];

export function Layout({ currentPage, onChangePage, children }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">MVP</p>
          <h1>Control de stock</h1>
        </div>
        <nav className="nav-tabs" aria-label="Navegacion principal">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={currentPage === item.key ? 'active' : ''}
              onClick={() => onChangePage(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
