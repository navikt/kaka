import {
  CheckmarkCircleIcon,
  ExclamationmarkTriangleIcon,
  InformationSquareIcon,
  XMarkOctagonIcon,
} from '@navikt/aksel-icons';
import type { InfoCardProps } from '@navikt/ds-react';
import { InfoCard } from '@navikt/ds-react';

type Variant = Extract<NonNullable<InfoCardProps['data-color']>, 'info' | 'success' | 'warning' | 'danger'>;

interface Props extends Pick<InfoCardProps, 'children' | 'className' | 'contentEditable'> {
  variant: Variant;
}

const ICON_MAP: Record<Variant, React.ReactNode> = {
  info: <InformationSquareIcon aria-hidden />,
  success: <CheckmarkCircleIcon aria-hidden />,
  warning: <ExclamationmarkTriangleIcon aria-hidden />,
  danger: <XMarkOctagonIcon aria-hidden />,
};

export const InfoBox = ({ variant: status, children, ...props }: Props) => (
  <InfoCard data-color={status} {...props}>
    <InfoCard.Message icon={ICON_MAP[status]}>{children}</InfoCard.Message>
  </InfoCard>
);
