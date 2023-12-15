import { MagnifyingGlassIcon } from '@navikt/aksel-icons';
import { HelpText, Label } from '@navikt/ds-react';
import React from 'react';
import { styled } from 'styled-components';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { useSaksdataId } from '@app/hooks/use-saksdata-id';
import { useValidationError } from '@app/hooks/use-validation-error';
import { useSetHjemlerMutation } from '@app/redux-api/saksdata';
import { useUser } from '@app/simple-api-state/use-user';
import { LovhjemmelSelect } from './lovhjemmel-select';
import { SelectedHjemlerList } from './selected-hjemler-list';

export const Lovhjemmel = () => {
  const { data: user } = useUser();
  const [updateHjemler] = useSetHjemlerMutation();
  const saksdataId = useSaksdataId();
  const { data: saksdata } = useSaksdata();
  const canEdit = useCanEdit();
  const validationError = useValidationError('hjemmelIdList');

  const selected = saksdata?.hjemmelIdList ?? [];

  if (!canEdit) {
    return (
      <section>
        <LabelWithHelpText />
        <SelectedHjemlerList selected={selected} />
      </section>
    );
  }

  const onLovhjemmelChange = (hjemmelIdList: string[]) => {
    if (typeof user === 'undefined') {
      return;
    }

    updateHjemler({ id: saksdataId, hjemmelIdList, saksbehandlerIdent: user.ident });
  };

  return (
    <section>
      <LabelWithHelpText />
      <LovhjemmelSelect
        disabled={!canEdit}
        selected={saksdata?.hjemmelIdList ?? []}
        onChange={onLovhjemmelChange}
        error={validationError}
        data-testid="lovhjemmel"
        showFjernAlle={false}
        show={canEdit}
        id="hjemmelIdList"
        icon={<MagnifyingGlassIcon aria-hidden />}
      >
        Hjemmel
      </LovhjemmelSelect>
      <SelectedHjemlerList selected={selected} />
    </section>
  );
};

const StyledLabel = styled(Label)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LabelWithHelpText = () => (
  <StyledLabel size="medium" spacing>
    Utfallet er basert på lovhjemmel:
    <HelpText placement="right">
      Hjemlene skal i utgangspunktet være de samme som i klagevedtaket. Dersom saken har flere klagetemaer og kvaliteten
      er bra nok på det ene og mangelfull på det andre, velger du de hjemlene kvalitetsavviket gjelder.
    </HelpText>
  </StyledLabel>
);
