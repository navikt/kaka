import { BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';
import styled from 'styled-components';
import { useStatistics } from '../../hooks/use-statistics';
import { RegistreringTimeDistribution } from './charts/registrering-time-distribution';
import { UtfallGraph } from './charts/utfall-graph';
import { Filters } from './filters';
import { KeyStats } from './key-stats';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Oversikt = () => (
  <>
    <LoadingOverlay />
    <Sections>
      <FilterSection>
        <Filters />
      </FilterSection>
      <Section>
        <KeyStats />
        <StyledCharts>
          <UtfallGraph />
          <RegistreringTimeDistribution />
        </StyledCharts>
      </Section>
    </Sections>
  </>
);

const LoadingOverlay = () => {
  const { isLoading } = useStatistics();

  if (isLoading) {
    return (
      <Overlay>
        <NavFrontendSpinner type="XXL" />
      </Overlay>
    );
  }

  return null;
};

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30vh;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
`;

const Sections = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  position: relative;
`;

const Section = styled.section`
  padding: 40px 16px;
  padding-top: 0;
  width: 100%;
`;

const FilterSection = styled(Section)`
  border-right: 1px solid #c6c2bf;
  padding-top: 2em;
  max-width: 320px;
`;

const StyledCharts = styled.section`
  max-width: 1000px;
`;
