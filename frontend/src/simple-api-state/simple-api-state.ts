import { getHeaders } from '@app/headers';
import { skipToken } from '@reduxjs/toolkit/query';
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
  private retryCount = 0;
  private dataTimeout: Timer | undefined;
  private retryTimeout: Timer | undefined;
  private url: string;

  constructor(url: string, options?: Partial<Options>) {
    this.url = url;
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
      const response = await fetch(this.url, { method: 'GET', headers: getHeaders() });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      this.data = (await response.json()) as T;
      this.retryCount = 0;
    } catch (e) {
      this.data = undefined;
      this.isError = true;

      if (e instanceof Error) {
        this.error = e;
      } else {
        this.error = new Error('Unknown error');
      }

      if (this.retryCount < 2) {
        this.retryCount++;

        this.retryTimeout = setTimeout(this.fetchData, 2 ** this.retryCount * 2_000);
      }
    }

    this.isLoading = false;

    this.onChange();
  };

  private onChange = (): void => {
    const state = this.getState();
    for (const listener of this.listeners) {
      listener(state);
    }
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

    if (!(this.options.prefetch || this.isLoading) && typeof this.data === 'undefined') {
      this.fetchData();
    }
  };

  public unlisten = (listener: Listener<T>): void => {
    clearTimeout(this.dataTimeout);
    clearTimeout(this.retryTimeout);

    this.listeners = this.listeners.filter((l) => l !== listener);

    if (this.listeners.length === 0 && this.options.cacheTime > 0) {
      this.dataTimeout = setTimeout(this.clear, this.options.cacheTime);
    }
  };

  private clear = (): void => {
    console.info('Clearing cached data for', this.url);
    this.data = undefined;
    this.error = undefined;
    this.isError = false;
    this.onChange();
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
