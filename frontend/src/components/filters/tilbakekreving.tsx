import { BodyShort, HelpText, Label, ToggleGroup } from '@navikt/ds-react';
import React from 'react';
import styled from 'styled-components';
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
    <ToggleGroup.Item value={TilbakekrevingEnum.INCLUDE}>Med §22-15</ToggleGroup.Item>
    <ToggleGroup.Item value={TilbakekrevingEnum.EXCLUDE}>Uten §22-15</ToggleGroup.Item>
    <ToggleGroup.Item value={TilbakekrevingEnum.ONLY}>Kun §22-15</ToggleGroup.Item>
  </ToggleGroup>
);

const TILBAKEKREVING_VALUES = Object.values(TilbakekrevingEnum);

const isTilbakekrevingEnum = (value: string): value is TilbakekrevingEnum =>
  TILBAKEKREVING_VALUES.some((v) => v === value);

const ToggleGroupLabel = () => (
  <StyledLabel>
    Tilbakekreving
    <HelpText placement="right">
      <Label>Med §22-15</Label>
      <BodyShort spacing>Ikke vis saker med tilbakekrevingshjemler.</BodyShort>
      <Label>Uten §22-15</Label>
      <BodyShort spacing>Vis alle saker.</BodyShort>
      <Label>Kun §22-15</Label>
      <BodyShort spacing>Vis kun saker med tilbakekrevingshjemler.</BodyShort>
      <StyledTitle>Gjelder følgende hjemler:</StyledTitle>
      <StyledList>
        <StyledListItem>§22-15 første ledd første punktum</StyledListItem>
        <StyledListItem>§22-15 første ledd andre punktum</StyledListItem>
        <StyledListItem>§22-15 andre ledd</StyledListItem>
        <StyledListItem>§22-15 tredje ledd</StyledListItem>
        <StyledListItem>§22-15 fjerde ledd</StyledListItem>
        <StyledListItem>§22-15 femte ledd</StyledListItem>
        <StyledListItem>§22-15 sjette ledd</StyledListItem>
      </StyledList>
    </HelpText>
  </StyledLabel>
);

const StyledLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledList = styled.ul`
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 16px;
`;

const StyledListItem = styled.li`
  font-size: 16px;
`;

const StyledTitle = styled.p`
  font-size: 16px;
  font-style: italic;
  margin-top: 16px;
  margin-bottom: 4px;
`;
