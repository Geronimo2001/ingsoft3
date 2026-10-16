import { describe, expect, it, vi } from 'vitest';
import { deleteAfterConfirmation } from './deletion';

describe('borrado confirmado', () => {
  it('al confirmar espera el borrado y devuelve éxito', async () => {
    const confirm = vi.fn().mockReturnValue(true);
    const remove = vi.fn().mockResolvedValue(undefined);
    expect(await deleteAfterConfirmation('Eliminar Resma?', confirm, remove)).toBe(true);
    expect(remove).toHaveBeenCalledExactlyOnceWith();
  });

  it('al cancelar no solicita el borrado', async () => {
    const confirm = vi.fn().mockReturnValue(false);
    const remove = vi.fn();
    expect(await deleteAfterConfirmation('Eliminar Resma?', confirm, remove)).toBe(false);
    expect(confirm).toHaveBeenCalledExactlyOnceWith('Eliminar Resma?');
    expect(remove).not.toHaveBeenCalled();
  });

});
