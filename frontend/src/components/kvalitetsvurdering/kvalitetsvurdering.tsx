import { KvalitetsskjemaV2 } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/kvalitetsskjema';
import { KvalitetsskjemaV3 } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/kvalitetsskjema';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { BoxNew } from '@navikt/ds-react';
import { KvalitetsskjemaV1 } from './kvalitetsskjema/v1/kvalitetsskjema';
import { Saksdata } from './saksdata/saksdata';

export const Kvalitetsvurdering = () => (
  <BoxNew className="grow overflow-y-scroll" padding="space-24">
    <BoxNew className="flex max-w-[850px] flex-col gap-12">
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
    case 3:
      return <KvalitetsskjemaV3 />;
    default:
      return null;
  }
};
