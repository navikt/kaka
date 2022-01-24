import { useMemo } from 'react';

export const useBuckets = (data: number[], bucketSize: number, restBucket?: number): [string[], number[]] =>
  useMemo<[string[], number[]]>(() => {
    const realMax = Math.max(...data);

    const max = typeof restBucket === 'number' ? Math.min(restBucket * bucketSize, realMax) : realMax;

    const buckets: number[] = Array.from({ length: Math.ceil(max / bucketSize) }, (_, i) => i + 1);

    const labels = buckets.map((bucket) => `${bucket}`);

    const normalizedData = data.map((value) => Math.ceil(value / bucketSize));

    const values = buckets.map((bucket) => normalizedData.filter((v) => v <= bucket && v > bucket - 1).length);

    if (typeof restBucket === 'number' && realMax > max) {
      labels[labels.length - 1] = `${labels[labels.length - 1]}+`;
      values[values.length - 1] = normalizedData.filter((v) => v > buckets[buckets.length - 1]).length;
    }

    return [labels, values];
  }, [data, bucketSize, restBucket]);
