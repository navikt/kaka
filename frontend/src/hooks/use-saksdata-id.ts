import { useParams } from 'react-router-dom';

export const useSaksdataId = (): string => {
  const { saksdataId } = useParams();

  if (typeof saksdataId !== 'string' || saksdataId.length === 0) {
    throw new Error(
      `"useKvalitetsvurderingId" hook used outside of "/kvalitetsvurderinger/:id" route. Current path "${window.location.pathname}".`
    );
  }

  return saksdataId;
};
