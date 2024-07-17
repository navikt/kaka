export const NONE_SELECTED = 'NONE_SELECTED';

export const NoneSelected = ({ value }: { value: string | undefined }) =>
  typeof value === 'undefined' || value === '' ? (
    <option disabled value={NONE_SELECTED}>
      Ingen valgt
    </option>
  ) : null;
