import { CardExtraSmall, CardLarge, CardMedium, CardSmall } from '@app/styled-components/cards';
import { useMemo } from 'react';

export enum CardSize {
  EXTRA_SMALL = 0,
  SMALL = 1,
  MEDIUM = 2,
  LARGE = 3,
}

interface Props {
  size?: CardSize;
  children: React.ReactNode;
}

export const DynamicCard = ({ size, children }: Props) => {
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
