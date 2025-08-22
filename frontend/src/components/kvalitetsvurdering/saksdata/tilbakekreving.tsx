import { TILBAKEKREVING_IDS } from '@app/domain/tilbakekreving-ids';
import { useCanEdit } from '@app/hooks/use-can-edit';
import { useSaksdata } from '@app/hooks/use-saksdata';
import { useSetTilbakekrevingMutation } from '@app/redux-api/saksdata';
import { Alert, BodyShort, Checkbox, CheckboxGroup, Heading, HelpText } from '@navikt/ds-react';
import { styled } from 'styled-components';

const PARTSINNSYN_YTELSE_ID = '53';

export const Tilbakekreving = () => {
  const { data: saksdata } = useSaksdata();
  const [setTilbakekreving] = useSetTilbakekrevingMutation();
  const canEdit = useCanEdit();

  if (saksdata === undefined || saksdata.ytelseId === PARTSINNSYN_YTELSE_ID) {
    return null;
  }

  const { id, tilbakekreving, hjemmelIdList } = saksdata;

  if (!canEdit) {
    return (
      <div>
        <Heading size="xsmall">Tilbakekreving</Heading>
        <BodyShort size="small">Gjelder{tilbakekreving ? ' ' : ' ikke '}en tilbakekrevingssak</BodyShort>
      </div>
    );
  }

  const showWarning = !tilbakekreving && TILBAKEKREVING_IDS.some((id) => hjemmelIdList.includes(id));

  const legend = (
    <LegendContainer>
      Velg om det gjelder en tilbakekrevingssak
      <HelpText>
        Du skal huke av for at det gjelder en tilbakekrevingssak uavhengig av ytelse eller hjemmel for tilbakekreving.
        Du skal også huke av for at det gjelder en tilbakekrevingssak selv om du omgjør på det stønadsrettslige, og ikke
        går videre til spørsmålet om tilbakekreving, eller om tilbakekrevingssaken for eksempel gjelder klage- eller
        ankefrist.
      </HelpText>
    </LegendContainer>
  );

  return (
    <div>
      <CheckboxGroup
        legend={legend}
        value={[tilbakekreving]}
        onChange={(v) => setTilbakekreving({ id, tilbakekreving: v.includes(true) })}
      >
        <Checkbox value={true}>Tilbakekreving</Checkbox>
      </CheckboxGroup>

      {showWarning ? <Warning /> : null}
    </div>
  );
};

const Warning = () => (
  <Alert variant="warning">
    Saken inneholder hjemler som er knyttet til tilbakekreving, men tilbakekreving er ikke huket av for. Er du sikker på
    at dette er riktig?
  </Alert>
);

const LegendContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
