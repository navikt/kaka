import { ISaksdataComplete } from '@app/types/saksdata';

export interface TilbakemeldingerCommonProps {
  saksdata: ISaksdataComplete[];
  statsIsLoading: boolean;
  saksdataIsLoading: boolean;
}
