import { skipToken } from '@reduxjs/toolkit/query';
import { useKodeverkUtfall } from '@app/hooks/use-kodeverk-value';

interface Props {
  utfall: string | null;
}

export const Utfall = ({ utfall }: Props) => <>{useKodeverkUtfall(utfall ?? skipToken)?.navn ?? ''}</>;
