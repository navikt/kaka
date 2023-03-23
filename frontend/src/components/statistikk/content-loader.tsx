import { KvalitetsvurderingVersion } from '@app/types/saksdata';

interface Props {
  version: KvalitetsvurderingVersion;
  V1Content: JSX.Element;
  V2Content: JSX.Element;
}

export const ContentLoader = ({ version, V1Content, V2Content }: Props) => {
  switch (version) {
    case KvalitetsvurderingVersion.V1:
      return V1Content;
    case KvalitetsvurderingVersion.V2:
      return V2Content;
  }
};
