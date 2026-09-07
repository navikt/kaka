import { useSaksdataId } from '@app/hooks/use-saksdata-id';
import { useGetSaksdataQuery, useReopenSaksdataMutation } from '@app/redux-api/saksdata';
import { useUser } from '@app/simple-api-state/use-user';
import { Button } from '@navikt/ds-react';
import { BackLink } from './back-link';
import { Footer, StyledButtons } from './styled-components';

export const FinishedFooter = () => (
  <Footer className="border-ax-border-success bg-ax-bg-success-moderate" data-testid="finished-vurdering-footer">
    <StyledButtons>
      <Reopen />
      <BackLink />
    </StyledButtons>
  </Footer>
);

const Reopen = () => {
  const id = useSaksdataId();
  const userData = useUser();
  const { data: saksdata } = useGetSaksdataQuery(id);
  const [reopenVurdering, { isLoading: isReopening }] = useReopenSaksdataMutation();

  if (typeof saksdata === 'undefined') {
    return null;
  }

  const canReopen = saksdata.avsluttetAvSaksbehandler !== null && saksdata.utfoerendeSaksbehandler === userData.ident;

  if (!canReopen) {
    return null;
  }

  const reopen = () => reopenVurdering({ saksbehandlerIdent: userData.ident, saksdata });

  return (
    <Button variant="secondary" size="small" onClick={reopen} loading={isReopening} data-testid="reopen-button">
      Endre
    </Button>
  );
};
