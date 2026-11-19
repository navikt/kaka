import { getHeaders } from '@app/headers';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';

export interface State<T> {
  data: T | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isUninitialized: boolean;
  isError: boolean;
  isSuccess: boolean;
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
  private isFetching = false;
  private isUninitialized = true;
  private isError = false;
  private isSuccess = false;
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
    if (this.isFetching) {
      return;
    }

    clearTimeout(this.retryTimeout);
    this.isLoading = this.isUninitialized && this.data === undefined;
    this.isUninitialized = false;
    this.isFetching = true;
    this.isError = false;
    this.isSuccess = false;
    this.onChange();

    try {
      const response = await fetch(this.url, { method: 'GET', headers: getHeaders() });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      this.data = (await response.json()) as T;
      this.isSuccess = true;
      this.error = undefined;
      this.retryCount = 0;
    } catch (e) {
      this.isError = true;
      this.isSuccess = false;

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
    this.isFetching = false;

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
    isFetching: this.isFetching,
    isUninitialized: this.isUninitialized,
    isError: this.isError,
    isSuccess: this.isSuccess,
    error: this.error,
  });

  public listen = (listener: Listener<T>): void => {
    clearTimeout(this.dataTimeout);

    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
      listener(this.getState());
    }

    if (!(this.options.prefetch || this.isFetching) && typeof this.data === 'undefined') {
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
    this.isSuccess = false;
    this.isUninitialized = !this.isFetching;
    this.onChange();
  };
}

const SKIP_STATE = {
  data: undefined,
  isLoading: false,
  isFetching: false,
  isUninitialized: true,
  isError: false,
  isSuccess: false,
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
