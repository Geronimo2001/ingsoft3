import type { StockMovementRequest, StockMovementType } from '../types';

export function prepareStockMovement(
  productId: number,
  type: StockMovementType,
  quantity: number,
  description: string
): StockMovementRequest {
  return {
    productId,
    type,
    quantity,
    description: description.trim() || undefined
  };
}
