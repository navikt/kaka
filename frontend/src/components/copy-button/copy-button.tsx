import { CopyToClipboard, type CopyToClipboardProps } from '@navikt/ds-react-internal';

interface Props {
  children: React.ReactNode;
  text: string | null;
  title?: string;
  icon?: React.ReactNode;
  popoverPlacement?: CopyToClipboardProps['popoverPlacement'];
  className?: string;
}

export const CopyButton = ({
  icon,
  children,
  text,
  popoverPlacement,
  title = 'Klikk for å kopiere',
  className,
}: Props) => {
  if (text === null || text === '') {
    return null;
  }

  return (
    <CopyToClipboard
      copyText={text}
      popoverPlacement={popoverPlacement}
      title={title}
      popoverText="Kopiert!"
      icon={icon}
      size="small"
      className={className}
    >
      {children}
    </CopyToClipboard>
  );
};
