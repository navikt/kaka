import { MAIN_REASONS } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v2/data';
import { TotalMangelfullCommon } from '@app/components/statistikk/charts/common/total-mangelfull';
import type { MainReasonDataset } from '@app/components/statistikk/charts/v2/kvalitetsvurderinger/types';
import type { ReactNode } from 'react';

interface Props {
  stats: MainReasonDataset[];
  title: string;
  helpText?: ReactNode;
}

export const TotalMangelfull = ({ stats, title, helpText }: Props) => (
  <TotalMangelfullCommon
    stats={stats}
    title={title}
    helpText={helpText}
    mainReasons={MAIN_REASONS}
    braLabel="Bra / godt nok"
    mangelfullLabel="Mangelfullt"
  />
);
