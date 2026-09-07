import { BodyShort, HelpText, HStack, Label, ToggleGroup } from '@navikt/ds-react';
import { TilbakekrevingEnum } from './types';

interface Props {
  selected: TilbakekrevingEnum | undefined;
  setSelected: (tilbakekreving: TilbakekrevingEnum) => void;
}

export const TilbakekrevingFilter = ({ selected, setSelected }: Props) => (
  <ToggleGroup
    onChange={(value) => {
      if (isTilbakekrevingEnum(value)) {
        setSelected(value);
      }
    }}
    value={selected ?? TilbakekrevingEnum.INCLUDE}
    size="small"
    label={<ToggleGroupLabel />}
  >
    <ToggleGroup.Item value={TilbakekrevingEnum.INCLUDE}>Med tilbakekreving</ToggleGroup.Item>
    <ToggleGroup.Item value={TilbakekrevingEnum.EXCLUDE}>Uten tilbakekreving</ToggleGroup.Item>
    <ToggleGroup.Item value={TilbakekrevingEnum.ONLY}>Kun tilbakekreving</ToggleGroup.Item>
  </ToggleGroup>
);

const TILBAKEKREVING_VALUES = Object.values(TilbakekrevingEnum);

const isTilbakekrevingEnum = (value: string): value is TilbakekrevingEnum =>
  TILBAKEKREVING_VALUES.some((v) => v === value);

const ToggleGroupLabel = () => (
  <HStack wrap={false} align="center" gap="space-8">
    Tilbakekreving
    <HelpText placement="right">
      <Label>Med tilbakekreving</Label>
      <BodyShort spacing>Vis alle saker, også saker som er registrert som tilbakekrevingssak.</BodyShort>
      <Label>Uten tilbakekreving</Label>
      <BodyShort spacing>Vis alle saker, uten de som er registrert som tilbakekrevingssak.</BodyShort>
      <Label>Kun tilbakekreving</Label>
      <BodyShort spacing>Vis kun saker som er registrert som tilbakekrevingssak.</BodyShort>
    </HelpText>
  </HStack>
);
