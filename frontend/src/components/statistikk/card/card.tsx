import { CardExtraSmall, CardLarge, CardMedium, CardSmall } from '@app/styled-components/cards';
import { Box } from '@navikt/ds-react';
import { useMemo } from 'react';

export enum CardSize {
  EXTRA_SMALL = 0,
  SMALL = 1,
  MEDIUM = 2,
  LARGE = 3,
}

interface CardProps {
  size?: CardSize;
  children: React.ReactNode;
}

export const DynamicCard = ({ size, children }: CardProps) => {
  const Card = useMemo(() => {
    switch (size) {
      case CardSize.EXTRA_SMALL:
        return CardExtraSmall;
      case CardSize.SMALL:
        return CardSmall;
      case CardSize.MEDIUM:
        return CardMedium;
      case CardSize.LARGE:
        return CardLarge;
      default:
        return CardMedium;
    }
  }, [size]);

  return <Card>{children}</Card>;
};

interface CardProps {
  children: React.ReactNode;
  span?: number;
  colSpan?: number;
  fullWidth?: boolean;
}

export const Card = ({ children, span = 2, fullWidth = false }: CardProps) => {
  return (
    <Box
      padding="space-16"
      shadow="dialog"
      background="neutral-soft"
      borderRadius="4"
      position="relative"
      style={{
        gridRowEnd: `span ${span}`,
        ...(fullWidth ? { gridColumn: '1 / -1' } : {}),
      }}
    >
      {children}
    </Box>
  );
};
