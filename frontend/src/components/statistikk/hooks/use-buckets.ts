import { useMemo } from 'react';

export const useBuckets = (data: number[], bucketSize: number, restBucket?: number): [string[], number[]] =>
  useMemo<[string[], number[]]>(() => {
    const realMax = Math.max(...data);

    const max = typeof restBucket === 'number' ? Math.min(restBucket * bucketSize, realMax) : realMax;

    const buckets: number[] = Array.from({ length: Math.ceil(max / bucketSize) }, (_, i) => i + 1);

    const labels = buckets.map((bucket) => `${bucket}`);

    const normalizedData = data.map((value) => Math.ceil(value / bucketSize));

    const values = buckets.map((bucket) => normalizedData.filter((v) => v <= bucket && v > bucket - 1).length);

    const lastBucket = buckets.at(-1) ?? Number.POSITIVE_INFINITY;

    if (typeof restBucket === 'number' && realMax > max) {
      labels[labels.length - 1] = `${labels.at(-1) ?? ''}+`;
      values[values.length - 1] = normalizedData.filter((v) => v > lastBucket).length;
    }

    return [labels, values];
  }, [data, bucketSize, restBucket]);
