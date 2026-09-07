import type {
  IValidationErrorV1,
  IValidationErrorV2,
  IValidationErrorV3,
  IValidationSection,
} from '@app/functions/error-type-guard';
import { useFieldName } from '@app/hooks/use-field-name';
import { useSectionTitle } from '@app/hooks/use-section-title';
import { Alert, Link } from '@navikt/ds-react';

interface Props {
  sections: IValidationSection[];
}

export const ValidationSummary = ({ sections }: Props) => {
  if (sections.length === 0) {
    return null;
  }

  const errorMessages = sections.map(({ section, properties }) => (
    <Section section={section} properties={properties} key={section} />
  ));

  return (
    <Alert variant="warning">
      <h3 className="mt-0 text-base">Kan ikke fullføre vurdering. Dette mangler:</h3>
      <article className="m-0 mt-2.5 p-0">{errorMessages}</article>
    </Alert>
  );
};

const Section = ({ properties, section }: IValidationSection) => (
  <section className="mt-2.5">
    <h1 className="m-0 text-lg">{useSectionTitle(section)}</h1>
    <ul className="m-0 p-0 pl-4">
      {properties.map((p) => (
        <Field key={`${p.field}-${p.reason}`} {...p} />
      ))}
    </ul>
  </section>
);

const Field = ({ field, reason }: IValidationErrorV3 | IValidationErrorV2 | IValidationErrorV1) => (
  <li>
    <strong>{`${useFieldName(field)}: `}</strong>
    <Link href={`#${field}`} className="inline">
      {reason}
    </Link>
  </li>
);
