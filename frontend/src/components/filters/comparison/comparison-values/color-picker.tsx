import { useAppTheme } from '@app/app-theme';
import { getColorFromTheme } from '@app/components/statistikk/colors/get-color';
import type { ColorToken } from '@app/components/statistikk/colors/token-name';
import { DEFAULT_COLORS } from '@app/components/statistikk/comparison/get-default-color';
import { getFontColor } from '@app/functions/get-font-color';
import { useOnClickOutside } from '@app/hooks/use-on-click-outside';
import { CheckmarkIcon } from '@navikt/aksel-icons';
import { BoxNew, Button, HStack, Heading, VStack } from '@navikt/ds-react';
import { useRef, useState } from 'react';

interface ColorPickerProps {
  color: ColorToken;
  onChange: (color: ColorToken) => void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(() => setIsOpen(false), ref);
  const theme = useAppTheme();

  return (
    <div ref={ref} className="relative flex justify-center">
      <Button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="Velg farge"
        className="!p-0 !border-2 !border-ax-bg-neutral-strong h-8 w-8"
        style={{ backgroundColor: getColorFromTheme(color, theme) }}
      />

      {isOpen ? (
        <BoxNew
          className="absolute right-0 z-10"
          background="raised"
          shadow="dialog"
          padding="3"
          borderRadius="medium"
          borderColor="neutral"
          borderWidth="1"
        >
          <HStack justify="space-between" className="mb-3">
            <Heading size="small">Velg en farge</Heading>
            <Button size="small" variant="secondary-neutral" onClick={() => setIsOpen(false)}>
              Lukk
            </Button>
          </HStack>
          <HStack gap="1" wrap={false}>
            {DEFAULT_COLORS.map((colorGroup) => (
              <VStack key={colorGroup[0]} gap="1">
                {colorGroup.map((c) => {
                  const backgroundColor = getColorFromTheme(c, theme);

                  const isSelected = c === color;

                  return (
                    <button
                      type="button"
                      key={c}
                      className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm outline-3 outline-ax-text-accent hover:outline-solid ${isSelected ? 'outline-solid' : 'outline-none'}`}
                      style={{ backgroundColor }}
                      onClick={() => {
                        onChange(c);
                        setIsOpen(false);
                      }}
                    >
                      {isSelected ? (
                        <span style={{ color: getColorFromTheme(getFontColor(backgroundColor), theme) }}>
                          <CheckmarkIcon aria-selected />
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </VStack>
            ))}
          </HStack>
        </BoxNew>
      ) : null}
    </div>
  );
};
