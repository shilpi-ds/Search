import { StaticFilter } from '@yext/search-headless-react';

export interface DisplayableFilter {
  filterType: 'NLP_FILTER' | 'STATIC_FILTER' | 'FACET',
  filter: StaticFilter,
  groupLabel: string,
  label: string
}
