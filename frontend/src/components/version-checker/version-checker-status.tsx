import { AutomaticSystem, Success } from '@navikt/ds-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { VersionChecker } from './version-checker';

export const VersionCheckerStatus = () => {
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    if (process.env.VERSION === 'dev') {
      return;
    }

    const versionChecker = new VersionChecker(setNeedsUpdate);

    return () => versionChecker.close();
  }, []);

  if (!needsUpdate) {
    return <Version />;
  }

  return (
    <Button
      title="Det finnes en ny versjon av Kaka. Versjonen du ser på nå er ikke siste versjon. Trykk her for å laste siste versjon."
      onClick={() => window.location.reload()}
      size="small"
      icon={<AutomaticSystem aria-hidden />}
    >
      Oppdater til siste versjon
    </Button>
  );
};

const Version = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(false), 20 * 1000);
  }, [setShow]);

  if (!show) {
    return null;
  }

  return (
    <StyledBodyShort>
      <Success /> Kaka er klar til bruk!
    </StyledBodyShort>
  );
};

const StyledBodyShort = styled(BodyShort)`
  display: flex;
  gap: 8px;
  align-items: center;
  color: #fff;
`;
