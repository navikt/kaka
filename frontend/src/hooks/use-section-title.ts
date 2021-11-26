const SECTION_TITLES = {
  saksdata: 'Saksdata',
  kvalitetsvurdering: 'Kvalitetsvurdering',
};

export const useSectionTitle = (section: keyof typeof SECTION_TITLES): string => SECTION_TITLES[section] ?? section;
