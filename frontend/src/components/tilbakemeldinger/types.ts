import { ISaksdataComplete } from '../../types/saksdata';

export interface TilbakemeldingerCommonProps {
  saksdata: ISaksdataComplete[];
  statsIsLoading: boolean;
  saksdataIsLoading: boolean;
}
