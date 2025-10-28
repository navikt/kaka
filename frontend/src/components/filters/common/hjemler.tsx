import { HjemlerMode } from '@app/components/filters/common/hjemler-mode';
import { SelectHjemler } from '@app/components/filters/common/select-hjemler';
import type { IYtelse } from '@app/types/kodeverk';
import { ChevronDownIcon } from '@navikt/aksel-icons';
import { Button, VStack } from '@navikt/ds-react';

interface Props {
  relevantYtelser: IYtelse[];
  selectedHjemler: string[];
  setSelectedHjemler: (hjemler: string[]) => void;
}

export const Hjemler = (props: Props) => {
  return (
    <VStack gap="1" className="grow">
      <HjemlerMode />

      <SelectHjemler
        {...props}
        trigger={
          <Button
            size="small"
            variant="secondary-neutral"
            icon={<ChevronDownIcon aria-hidden />}
            iconPosition="right"
            className="!justify-between grow"
          >
            Hjemler ({props.selectedHjemler.length})
          </Button>
        }
      />
    </VStack>
  );
};
