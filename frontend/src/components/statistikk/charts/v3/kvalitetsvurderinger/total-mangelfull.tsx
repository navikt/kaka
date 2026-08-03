import { MAIN_REASONS } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/data';
import { TotalMangelfullCommon } from '@app/components/statistikk/charts/common/total-mangelfull';
import type { MainReasonV3Dataset } from '@app/components/statistikk/charts/v3/kvalitetsvurderinger/types';
import type { ReactNode } from 'react';

interface Props {
  stats: MainReasonV3Dataset[];
  title: string;
  helpText?: ReactNode;
}

export const TotalMangelfull = ({ stats, title, helpText }: Props) => (
  <TotalMangelfullCommon
    stats={stats}
    title={title}
    helpText={helpText}
    mainReasons={MAIN_REASONS}
    braLabel="Riktig / ikke kvalitetsavvik"
    mangelfullLabel="Mangelfullt/kvalitetsavvik"
  />
);
