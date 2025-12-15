import { useSakstypeFilter } from '@app/components/filters/hooks/use-query-filter';
import {
  type CheckboxParams,
  type InputParams,
  TypeEnum,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/common/types';
import { MainReason } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/data';
import { HEADER as SAKSBEHANDLINGSREGLENE_HEADER } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/saksbehandlingsreglene/data';
import { getSaksbehandlingsregeleneCheckboxes } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/saksbehandlingsreglene/saksbehandlingsreglene';
import {
  HEADER as SÆRREGELVERKET_HEADER,
  SÆRREGELVERKET_HELP_TEXTS,
  SÆRREGELVERKET_LABELS,
  SærregelverketBoolean,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/særregelverket/data';
import { SÆRREGELVERKET_CHECKBOXES } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/særregelverket/særregelverket';
import {
  HEADER as TRYGDEMEDISIN_HEADER,
  TRYGDEMEDISIN_RADIO_HELP_TEXTS,
} from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/trygdemedisin/data';
import { TRYGDEMEDISIN_CHECKBOXES } from '@app/components/kvalitetsvurdering/kvalitetsskjema/v3/trygdemedisin/trygdemedisin';
import { Radiovalg, RadiovalgExtended } from '@app/types/kvalitetsvurdering/radio';
import type { KvalitetsvurderingV3Boolean } from '@app/types/kvalitetsvurdering/v3';
import { SakstypeEnum } from '@app/types/sakstype';
import { BulletListIcon, GavelIcon, ParagraphIcon } from '@navikt/aksel-icons';
import {
  Button,
  Checkbox,
  Heading,
  HelpText,
  HStack,
  Modal,
  Radio,
  RadioGroup,
  Tag,
  ToggleGroup,
  VStack,
} from '@navikt/ds-react';
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';

export const KvalitetsvurderingModal = ({ focus }: { focus?: keyof KvalitetsvurderingV3Boolean | MainReason }) => {
  const ref = useRef<HTMLDialogElement>(null);

  const onClick =
    focus === undefined
      ? () => ref.current?.showModal()
      : () => {
          if (ref.current == null) {
            return;
          }

          ref.current.showModal();

          const element = ref.current.querySelector(`#${focus}`);

          if (!(element instanceof HTMLElement)) {
            return;
          }

          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.style.transition = 'box-shadow 0.5s ease-in-out';
          element.style.boxShadow = '0 0 20px 10px var(--ax-border-danger)';
          element.style.borderRadius = 'var(--ax-border-radius-large)';

          setTimeout(() => {
            element.style.boxShadow = '';
          }, 3000);
        };

  return (
    <>
      <Button
        variant="tertiary-neutral"
        size="small"
        onClick={onClick}
        icon={<BulletListIcon aria-hidden />}
        className="w-min self-center whitespace-nowrap"
      >
        Se info om struktur og hjelpetekster
      </Button>
      <Content ref={ref} />
    </>
  );
};

const isKlageOrAnke = (value: string) => value === SakstypeEnum.KLAGE || value === SakstypeEnum.ANKE;

const Content = ({ ref }: { ref: React.Ref<HTMLDialogElement> }) => {
  const types = useSakstypeFilter();
  const showsOnlyAnke = useMemo(() => types.length === 1 && types[0] === SakstypeEnum.ANKE, [types]);
  const [selectedType, setSelectedType] = useState<SakstypeEnum.KLAGE | SakstypeEnum.ANKE>(
    showsOnlyAnke ? SakstypeEnum.ANKE : SakstypeEnum.KLAGE,
  );

  useEffect(() => {
    setSelectedType(showsOnlyAnke ? SakstypeEnum.ANKE : SakstypeEnum.KLAGE);
  }, [showsOnlyAnke]);

  return (
    <Modal
      ref={ref}
      header={{ heading: 'Struktur og hjelpetekster i kvalitetsvurdering' }}
      width="1000px"
      closeOnBackdropClick
    >
      <Modal.Body className="flex flex-col gap-6">
        <ToggleGroup
          className="self-center"
          size="small"
          value={selectedType}
          onChange={(v) => {
            if (isKlageOrAnke(v)) {
              setSelectedType(v);
            }
          }}
        >
          <ToggleGroup.Item value={SakstypeEnum.KLAGE}>Klage</ToggleGroup.Item>
          <ToggleGroup.Item value={SakstypeEnum.ANKE}>Anke</ToggleGroup.Item>
        </ToggleGroup>

        <HStack gap="8">
          <section>
            <Heading size="small" spacing>
              {SÆRREGELVERKET_HEADER}
            </Heading>

            <ReadOnlyCheckbox
              checked={false}
              helpText={SÆRREGELVERKET_HELP_TEXTS[SærregelverketBoolean.saerregelverkAutomatiskVedtak]}
            >
              {SÆRREGELVERKET_LABELS[SærregelverketBoolean.saerregelverkAutomatiskVedtak]}
            </ReadOnlyCheckbox>

            <ReadOnlyRadioGroup mainReason={MainReason.Særregelverket}>
              <VStack gap="2">
                <Checkboxes checkboxes={SÆRREGELVERKET_CHECKBOXES} />
              </VStack>
            </ReadOnlyRadioGroup>
          </section>

          <section>
            <Heading size="small" spacing>
              {SAKSBEHANDLINGSREGLENE_HEADER}
            </Heading>
            <ReadOnlyRadioGroup mainReason={MainReason.Saksbehandlingsreglene}>
              <VStack gap="2">
                <Checkboxes checkboxes={getSaksbehandlingsregeleneCheckboxes(selectedType)} />
              </VStack>
            </ReadOnlyRadioGroup>
          </section>

          <section>
            <Heading size="small" spacing>
              {TRYGDEMEDISIN_HEADER}
            </Heading>
            <TrygdemedisinRadioGroup>
              <VStack gap="2">
                <Checkboxes checkboxes={TRYGDEMEDISIN_CHECKBOXES} />
              </VStack>
            </TrygdemedisinRadioGroup>
          </section>
        </HStack>
      </Modal.Body>
    </Modal>
  );
};

interface ReadOnlyCheckboxProps {
  children: string;
  helpText?: string;
  checked?: boolean;
}

const ReadOnlyCheckbox = ({ children, helpText, checked = true }: ReadOnlyCheckboxProps) => (
  <div className="[&_*::after]:content-none!">
    <Checkbox checked={checked} size="small" aria-disabled>
      {children}

      {helpText ? (
        <HelpText placement="right" wrapperClassName="inline-block ml-2 align-bottom [&>button]:h-5">
          {helpText}
        </HelpText>
      ) : null}
    </Checkbox>
  </div>
);

const ReadOnlyRadioGroup = ({ mainReason, children }: { mainReason: MainReason; children: ReactNode }) => (
  <VStack gap="2" id={mainReason} className="[&_*::after]:content-none!">
    <RadioGroup value={Radiovalg.MANGELFULLT} legend="Radiovalg" hideLegend aria-disabled>
      <HStack gap="2">
        <Radio size="small" value={Radiovalg.BRA}>
          Riktig / ikke kvalitetsavvik
        </Radio>
        <Radio size="small" value={Radiovalg.MANGELFULLT}>
          Mangelfullt/kvalitetsavvik
        </Radio>
      </HStack>
    </RadioGroup>
    <Heading size="xsmall">Hva er mangelfullt/kvalitetsavviket?</Heading>
    {children}
  </VStack>
);

const TrygdemedisinRadioGroup = ({ children }: { children: ReactNode }) => (
  <VStack gap="2" id={MainReason.Trygdemedisin} className="[&_*::after]:content-none!">
    <RadioGroup value={Radiovalg.MANGELFULLT} legend="Radiovalg" hideLegend aria-disabled>
      <HStack gap="2">
        <HStack align="center" gap="1">
          <Radio size="small" value={RadiovalgExtended.IKKE_AKTUELT}>
            Ikke aktuelt for den konkrete saken
          </Radio>
          <HelpText>{TRYGDEMEDISIN_RADIO_HELP_TEXTS[RadiovalgExtended.IKKE_AKTUELT]}</HelpText>
        </HStack>

        <HStack align="center" gap="1">
          <Radio size="small" value={RadiovalgExtended.BRA}>
            Riktig / ikke kvalitetsavvik
          </Radio>
          <HelpText>{TRYGDEMEDISIN_RADIO_HELP_TEXTS[RadiovalgExtended.BRA]}</HelpText>
        </HStack>

        <Radio size="small" value={RadiovalgExtended.MANGELFULLT}>
          Mangelfullt/kvalitetsavvik
        </Radio>
      </HStack>
    </RadioGroup>
    <Heading size="xsmall">Hva er mangelfullt/kvalitetsavviket?</Heading>
    {children}
  </VStack>
);

const Checkboxes = ({ checkboxes }: { checkboxes: CheckboxParams[] }) => (
  <>
    {checkboxes.map((c) => (
      <VStack key={c.field} className="ml-2 pl-2" id={c.field}>
        <ReadOnlyCheckbox key={c.field} helpText={c.helpText}>
          {c.label}
        </ReadOnlyCheckbox>

        {c.childList ? <Checkboxes checkboxes={c.childList.filter(isCheckbox)} /> : null}
        {c.saksdatahjemler ? (
          <HStack align="center" gap="1" marginInline="7">
            <Tag variant="alt1" size="xsmall">
              <ParagraphIcon aria-hidden fontSize={24} /> Hjemler fra saksdata
            </Tag>
          </HStack>
        ) : null}
        {c.allRegistreringshjemler ? (
          <HStack align="center" gap="1" marginInline="7">
            <Tag variant="alt2" size="xsmall">
              <GavelIcon aria-hidden fontSize={24} /> Alle hjemler
            </Tag>
          </HStack>
        ) : null}
      </VStack>
    ))}
  </>
);

const isCheckbox = (checkbox: InputParams): checkbox is CheckboxParams => checkbox.type === TypeEnum.CHECKBOX;
