import {
  useDefaultQueryAapen,
  useDefaultQueryComparison,
  useDefaultQueryLeder,
  useDefaultQueryMin,
  useDefaultQueryTilbakemeldinger,
  useDefaultQueryTotal,
} from '@app/hooks/use-default-query-params';
import { useUserAccess } from '@app/hooks/use-user-access';
import {
  BarChartFillIcon,
  BarChartIcon,
  BulletListIcon,
  LineGraphStackedIcon,
  PieChartFillIcon,
  PieChartIcon,
  TasklistIcon,
} from '@navikt/aksel-icons';
import { HStack } from '@navikt/ds-react';
import { NavLink, type NavLinkProps } from 'react-router';

export const Nav = () => {
  const defaultQueryAapen = useDefaultQueryAapen();
  const defaultQueryLeder = useDefaultQueryLeder();
  const defaultQueryTotal = useDefaultQueryTotal();
  const defaultQueryMin = useDefaultQueryMin();
  const defaultQueryTilbakemeldinger = useDefaultQueryTilbakemeldinger();
  const defauleQueryComparison = useDefaultQueryComparison();

  const access = useUserAccess();

  return (
    <nav aria-label="Meny" data-testid="kaka-nav" className="sticky top-0 z-10 bg-ax-bg-default pt-4">
      <HStack
        as="ul"
        wrap={false}
        align="center"
        gap="space-16"
        marginBlock="space-0"
        marginInline="space-16"
        className="list-none border-ax-border-neutral border-b p-0"
      >
        <NavItem to={`/statistikk/aapen?${defaultQueryAapen}`} testId="statistikk-aapen-nav-link" hasAccess>
          <BarChartIcon aria-hidden /> Åpen statistikk
        </NavItem>

        <NavItem
          to={`/statistikk/total?${defaultQueryTotal}`}
          testId="statistikk-total-nav-link"
          hasAccess={access.KAKA_TOTALSTATISTIKK}
        >
          <BarChartFillIcon aria-hidden /> Totalstatistikk
        </NavItem>

        <NavItem
          to={`/statistikk/leder?${defaultQueryLeder}`}
          testId="statistikk-leder-nav-link"
          hasAccess={access.KAKA_LEDERSTATISTIKK}
        >
          <PieChartFillIcon aria-hidden /> Lederstatistikk
        </NavItem>

        <NavItem
          to={`/sammenlikning?${defauleQueryComparison}`}
          testId="sammenlikning-nav-link"
          hasAccess={access.KAKA_TOTALSTATISTIKK}
        >
          <LineGraphStackedIcon aria-hidden /> Sammenlikning
        </NavItem>

        <NavItem
          to={`/statistikk/min?${defaultQueryMin}`}
          testId="statistikk-min-nav-link"
          hasAccess={access.KAKA_KVALITETSVURDERING}
        >
          <PieChartIcon aria-hidden /> Min statistikk
        </NavItem>

        <NavItem
          to="/kvalitetsvurderinger"
          testId="kvalitetsvurdering-nav-link"
          hasAccess={access.KAKA_KVALITETSVURDERING}
        >
          <BulletListIcon aria-hidden /> Kvalitetsvurderinger
        </NavItem>

        <NavItem
          to={`/tilbakemeldinger?${defaultQueryTilbakemeldinger}`}
          testId="tilbakemeldinger-nav-link"
          hasAccess={access.KAKA_KVALITETSTILBAKEMELDINGER}
        >
          <TasklistIcon aria-hidden /> Tilbakemeldinger
        </NavItem>
      </HStack>
    </nav>
  );
};

interface NavItemProps extends NavLinkProps {
  hasAccess: boolean;
  testId?: string;
}

const NavItem = ({ hasAccess, testId, ...props }: NavItemProps) => {
  if (!hasAccess) {
    return null;
  }

  return (
    <li className="text-center">
      <NavLink
        {...props}
        data-testid={testId}
        className={({ isActive }) =>
          `m-0 flex w-full items-center justify-center gap-2 whitespace-nowrap break-keep border-b-[5px] px-4 py-1 font-bold text-[1.2em] no-underline hover:border-ax-border-accent hover:text-ax-text-accent-subtle ${
            isActive ? 'border-ax-border-accent text-ax-text-accent-subtle' : 'border-transparent text-ax-text-neutral'
          }`
        }
      />
    </li>
  );
};
