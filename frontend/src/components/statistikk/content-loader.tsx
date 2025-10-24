import { StatisticsVersion } from '@app/types/saksdata';
import type { JSX } from 'react';

interface Props {
  version: StatisticsVersion;
  V1Content: JSX.Element;
  V2Content: JSX.Element;
}

export const ContentLoader = ({ version, V1Content, V2Content }: Props) => {
  switch (version) {
    case StatisticsVersion.V1:
      return V1Content;
    case StatisticsVersion.V2:
      return V2Content;
  }
};
