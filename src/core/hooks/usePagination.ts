import { useCallback, useMemo, useRef, useState } from "react";

import TypedEmitter from "typed-emitter";
import Emitter from "events";
import { v4 } from "uuid";

export type PaginationEvents<T extends unknown[]> = {
  reload: (page: T) => void;
  next: (page: T) => void;
};

export type PaginationOptions<P extends object> = {
  adapter: (payload: P) => {
    pageSize: number;
    payload: P;
  };
  defaultPayload: P;
};

export type PaginationOptionsOverride<P extends object> = Omit<
  PaginationOptions<P>,
  "adapter"
>;

const DEFAULT_PAGINATION_ID = v4();
const newEventEmitter = <R extends unknown[]>() =>
  new Emitter() as TypedEmitter<PaginationEvents<R>>;

export const usePagination = <T extends object, P extends object = {}>(
  getPage: (payload: P) => Promise<T[]>,
  { defaultPayload, adapter }: PaginationOptions<P>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const events = useMemo(() => newEventEmitter<T[]>(), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultPayloadCache = useMemo(() => ({ ...defaultPayload }), []);

  // Mutates every update.
  const payloadRef = useRef({ ...defaultPayloadCache } as P);

  // Same object till the end.
  const paginationRef = useRef({
    isLoading,
    isNewReload: true,
    isEndOfList: false,
    isShadow: false,
    id: DEFAULT_PAGINATION_ID,
  });

  const loadPage = useCallback(async () => {
    const pagination = paginationRef.current;
    const prevId = pagination.id;
    const loadEvent = pagination.isNewReload ? "reload" : "next";

    !pagination.isShadow && setIsLoading(true);
    pagination.isLoading = true;
    pagination.isNewReload = false;

    const { payload, pageSize } = adapter(payloadRef.current);
    payloadRef.current = payload;

    try {
      const page = await getPage(payload);
      pagination.isEndOfList = page.length < pageSize;

      if (!page.length || prevId !== pagination.id) return;
      events.emit(loadEvent, page);
      return page;
    } catch {
    } finally {
      if (prevId !== pagination.id) return;
      !pagination.isShadow && setIsLoading(false);
      pagination.isLoading = false;
      pagination.isShadow = false;
    }
  }, [events, getPage, adapter]);

  const subscriber = useCallback(
    (...args: Parameters<typeof events.addListener>) => {
      events.addListener(...args);
      return () => {
        events.removeListener(...args);
      };
    },
    [events]
  );

  const pages = useMemo(
    () => ({
      next: (shadow: boolean = false) => {
        const pagination = paginationRef.current;
        if (pagination.isLoading || pagination.isEndOfList) return;
        pagination.isShadow = shadow;
        return loadPage();
      },
      reload: (payload: P | false = false, shadow: boolean = false) => {
        if (payload === false) payload = defaultPayloadCache;
        payloadRef.current = { ...payload } as P;

        const pagination = paginationRef.current;
        pagination.id = v4();
        pagination.isEndOfList = false;
        pagination.isNewReload = true;
        pagination.isShadow = shadow;

        return loadPage();
      },
    }),
    [defaultPayloadCache, loadPage]
  );

  return [subscriber, pages, isLoading] as const;
};
