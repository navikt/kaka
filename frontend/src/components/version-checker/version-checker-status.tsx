import { ENVIRONMENT } from '@app/environment';
import { CheckmarkIcon, CogRotationIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { VersionChecker } from './version-checker';

export const VersionCheckerStatus = () => {
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    if (ENVIRONMENT.version === 'local') {
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
      icon={<CogRotationIcon aria-hidden />}
    >
      Oppdater til siste versjon
    </Button>
  );
};

const Version = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(false), 20 * 1000);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <StyledBodyShort>
      <CheckmarkIcon /> Kaka er klar til bruk!
    </StyledBodyShort>
  );
};

const StyledBodyShort = styled(BodyShort)`
  display: flex;
  gap: 8px;
  align-items: center;
  color: #fff;
`;
