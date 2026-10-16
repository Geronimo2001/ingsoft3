import { describe, expect, it, vi } from 'vitest';
import { deleteAfterConfirmation } from './deletion';

describe('borrado confirmado', () => {
  it('al cancelar no solicita el borrado', async () => {
    const confirm = vi.fn().mockReturnValue(false);
    const remove = vi.fn();
    expect(await deleteAfterConfirmation('Eliminar Resma?', confirm, remove)).toBe(false);
    expect(confirm).toHaveBeenCalledExactlyOnceWith('Eliminar Resma?');
    expect(remove).not.toHaveBeenCalled();
  });

});
