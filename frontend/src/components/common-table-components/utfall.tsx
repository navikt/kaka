import { useKodeverkUtfall } from '@app/hooks/use-kodeverk-value';
import { skipToken } from '@reduxjs/toolkit/query';

interface Props {
  utfall: string | null;
}

export const Utfall = ({ utfall }: Props) => <>{useKodeverkUtfall(utfall ?? skipToken)?.navn ?? ''}</>;
