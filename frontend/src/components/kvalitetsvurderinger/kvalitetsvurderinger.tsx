import { useCreateSaksdataMutation } from '@app/redux-api/saksdata';
import { useUser } from '@app/simple-api-state/use-user';
import { DocPencilIcon } from '@navikt/aksel-icons';
import { Button, Heading } from '@navikt/ds-react';
import { useNavigate } from 'react-router';
import { FullfoerteVurderingerTable } from './fullfoerte-vurderinger-table';
import { PaabegynteVurderingerTable } from './paabegynte-vurderinger-table';

export const Kvalitetsvurderinger = () => {
  const userData = useUser();
  const [createSaksdata] = useCreateSaksdataMutation();
  const navigate = useNavigate();

  const createNewSaksdata = () => {
    createSaksdata({
      saksbehandlerIdent: userData.ident,
    })
      .unwrap()
      .then(({ id }) => navigate(`/kvalitetsvurderinger/${id}`));
  };

  return (
    <div className="flex flex-col gap-8 overflow-y-auto p-8">
      <Button
        onClick={() => createNewSaksdata()}
        data-testid="new-kvalitetsvurdering-button"
        icon={<DocPencilIcon aria-hidden />}
        className="w-fit"
      >
        Ny kvalitetsvurdering
      </Button>

      <section aria-labelledby="paabegynte-vurderinger-heading">
        <Heading size="small" id="paabegynte-vurderinger-heading">
          Påbegynte vurderinger
        </Heading>
        <PaabegynteVurderingerTable />
      </section>

      <section aria-labelledby="fullfoerte-vurderinger-heading">
        <Heading size="small" id="fullfoerte-vurderinger-heading">
          Fullførte vurderinger siste 7 dager
        </Heading>
        <FullfoerteVurderingerTable />
      </section>
    </div>
  );
};
