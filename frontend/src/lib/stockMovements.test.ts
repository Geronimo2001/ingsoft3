import { describe, expect, it } from 'vitest';
import { prepareStockMovement } from './stockMovements';

describe('preparación de movimientos', () => {
  it('prepara una salida omitiendo la descripción si solo tiene espacios', () => {
    // Arrange: datos que el formulario entrega a la función, sin usar DOM.
    const productId = 7;
    const quantity = 3;

    // Act
    const request = prepareStockMovement(productId, 'Salida', quantity, '   ');

    // Assert
    expect(request).toEqual({ productId, type: 'Salida', quantity, description: undefined });
  });
});
