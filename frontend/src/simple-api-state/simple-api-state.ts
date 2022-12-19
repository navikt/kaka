import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { useEffect, useState } from 'react';

export interface State<T> {
  data: T | undefined;
  isLoading: boolean;
  isUninitialized: boolean;
  isError: boolean;
  error: Error | undefined;
}

interface Options {
  prefetch: boolean;
  cacheTime: number;
}

type Listener<T> = (state: State<T>) => void;

export class SimpleApiState<T> {
  private data: T | undefined = undefined;
  private isLoading = false;
  private isUninitialized = true;
  private isError = false;
  private error: Error | undefined = undefined;
  private listeners: Listener<T>[] = [];
  private options: Options = {
    prefetch: false,
    cacheTime: 60000,
  };

  constructor(private url: string, options?: Partial<Options>) {
    this.options = Object.assign(this.options, options);

    if (this.options.prefetch) {
      this.fetchData();
    }
  }

  private fetchData = async () => {
    this.isUninitialized = false;
    this.isLoading = true;
    this.onChange();

    try {
      const response = await fetch(this.url, { method: 'GET' });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      this.data = (await response.json()) as T;
    } catch (e) {
      this.data = undefined;
      this.isError = true;

      if (e instanceof Error) {
        this.error = e;
      } else {
        this.error = new Error('Unknown error');
      }
    }

    this.isLoading = false;

    this.onChange();
  };

  private onChange = (): void => {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  };

  public getState = (): State<T> => ({
    data: this.data,
    isLoading: this.isLoading,
    isUninitialized: this.isUninitialized,
    isError: this.isError,
    error: this.error,
  });

  public listen = (listener: Listener<T>): void => {
    clearTimeout(this.dataTimeout);

    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
      listener(this.getState());
    }

    if (!this.options.prefetch && !this.isLoading && typeof this.data === 'undefined') {
      this.fetchData();
    }
  };

  private dataTimeout: NodeJS.Timeout | undefined;

  public unlisten = (listener: Listener<T>): void => {
    clearTimeout(this.dataTimeout);

    this.listeners = this.listeners.filter((l) => l !== listener);

    if (this.listeners.length === 0) {
      if (this.options.cacheTime > 0) {
        this.dataTimeout = setTimeout(this.clear, this.options.cacheTime);
      }
    }
  };

  private clear = (): void => {
    console.info('Clearing cached data for', this.url);
    this.data = undefined;
  };
}

const SKIP_STATE = {
  data: undefined,
  isLoading: false,
  isUninitialized: false,
  isError: false,
  error: undefined,
};

export const useSimpleApiState = <T>(store: SimpleApiState<T> | typeof skipToken): State<T> => {
  const [state, setState] = useState<State<T> | typeof skipToken>(store === skipToken ? skipToken : store.getState());

  useEffect(() => {
    if (store === skipToken) {
      return;
    }

    store.listen(setState);

    return () => store.unlisten(setState);
  }, [store]);

  if (state === skipToken) {
    return SKIP_STATE;
  }

  return state;
};
