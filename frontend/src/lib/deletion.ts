export async function deleteAfterConfirmation(
  message: string,
  confirm: (message: string) => boolean,
  remove: () => Promise<void>
): Promise<boolean> {
  if (!confirm(message)) return false;
  await remove();
  return true;
}
