import { KvalitetsvurderingVersion } from '@app/types/saksdata';
import type { JSX } from 'react';

interface Props {
  version: KvalitetsvurderingVersion;
  V1Content: JSX.Element;
  V2Content: JSX.Element;
  V3Content: JSX.Element;
}

export const ContentLoader = ({ version, V1Content, V2Content, V3Content }: Props): JSX.Element => {
  switch (version) {
    case KvalitetsvurderingVersion.V1:
      return V1Content;
    case KvalitetsvurderingVersion.V2:
      return V2Content;
    case KvalitetsvurderingVersion.V3:
      return V3Content;
  }
};
