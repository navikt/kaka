import { useSaksdata } from '@app/hooks/use-saksdata';
import { BoxNew } from '@navikt/ds-react';
import { KvalitetsskjemaV1 } from './kvalitetsskjema/v1/kvalitetsskjema';
import { KvalitetsskjemaV2 } from './kvalitetsskjema/v2/kvalitetsskjema';
import { Saksdata } from './saksdata/saksdata';

export const Kvalitetsvurdering = () => (
  <BoxNew className="grow overflow-y-scroll" padding="space-24">
    <BoxNew className="flex max-w-[800px] flex-col gap-12">
      <Saksdata />
      <Kvalitetsskjema />
    </BoxNew>
  </BoxNew>
);

const Kvalitetsskjema = () => {
  const { data } = useSaksdata();

  switch (data?.kvalitetsvurderingReference.version) {
    case 1:
      return <KvalitetsskjemaV1 />;
    case 2:
      return <KvalitetsskjemaV2 />;
    default:
      return null;
  }
};
