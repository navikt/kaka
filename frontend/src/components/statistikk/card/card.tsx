import { useMemo } from 'react';
import { CardExtraSmall, CardLarge, CardMedium, CardSmall } from '@app/styled-components/cards';

export enum CardSize {
  EXTRA_SMALL,
  SMALL,
  MEDIUM,
  LARGE,
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
