export const ejectEventValue =
  (result: (value: string) => void) =>
  <T extends { value: string }>(e: React.ChangeEvent<T>) =>
    result(e.target.value);
