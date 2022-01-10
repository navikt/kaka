import { useMemo } from 'react';

export const useBuckets = (data: number[], bucketSize: number): [string[], number[]] =>
  useMemo<[string[], number[]]>(() => {
    const buckets = data
      .reduce((bucketMap, v) => {
        const bucketKey = Math.ceil(v / bucketSize);

        const existing = bucketMap.get(bucketKey);

        if (typeof existing === 'number') {
          bucketMap.set(bucketKey, existing + 1);
        } else {
          bucketMap.set(bucketKey, 1);
        }

        return bucketMap;
      }, new Map<number, number>())
      .entries();

    const sortedBuckets = Array.from(buckets).sort((a, b) => a[0] - b[0]);

    const labels = sortedBuckets.map(([bucketKey]) => `${bucketKey}`);
    const values = sortedBuckets.map((bucket) => bucket[1]);

    return [labels, values];
  }, [data, bucketSize]);
