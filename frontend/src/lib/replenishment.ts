export type Replenishment = {
  units: number;
  priority: 'urgente' | 'normal' | 'sin-reposicion';
};

// Propone reponer hasta el mínimo y prioriza los productos agotados.
export function recommendReplenishment(currentStock: number, minimumStock: number): Replenishment {
  if (!Number.isInteger(currentStock) || currentStock < 0) {
    throw new Error('El stock actual debe ser un entero no negativo.');
  }
  if (!Number.isInteger(minimumStock) || minimumStock < 0) {
    throw new Error('El stock mínimo debe ser un entero no negativo.');
  }
  if (currentStock >= minimumStock) {
    return { units: 0, priority: 'sin-reposicion' };
  }

  const units = minimumStock - currentStock;
  if (currentStock === 0) {
    return { units, priority: 'urgente' };
  }
  return { units, priority: 'normal' };
}
