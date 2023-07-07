import { Result } from "@yext/search-headless-react";
import { CardConfig } from './cardComponent';
// Result[]
export interface SectionConfig {
  results: Result[],
  verticalKey: string,
  header?: JSX.Element,
  cardConfig?: CardConfig,
  viewMore?: boolean
}

/**
 * A component that can be used to render a section template for vertical results.
 */
export type SectionComponent = (props: SectionConfig) => JSX.Element | null;
