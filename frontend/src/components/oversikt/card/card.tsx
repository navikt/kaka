import React, { useMemo } from 'react';
import { CardLarge, CardMedium, CardSmall } from '../styled-components';

export enum CardSize {
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
