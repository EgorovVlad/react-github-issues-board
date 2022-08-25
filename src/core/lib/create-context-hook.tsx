import { useContext, createContext, PropsWithChildren } from "react";

export const createContextHook = <
  F extends (payload: object) => any,
  P extends Parameters<F>[0] extends object ? Parameters<F>[0] : {},
  R extends ReturnType<F>,
>(
  useHook: F
) => {
  const context = createContext({} as R);
  return [
    () => useContext(context),
    ({ children, ...payload }: PropsWithChildren<P>) => (
      <context.Provider value={useHook(payload as P)} children={children} />
    ),
  ] as const;
};
