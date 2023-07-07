// import { Link } from "react-router-dom";
import {
  AppliedFiltersCssClasses,
  AppliedFiltersDisplay,
  AppliedFiltersProps,
} from "../components/AppliedFilters";
import { ResultsCountConfig } from "../components/ResultsCount";
import {
  useComposedCssClasses,
  CompositionMethod,
} from "../hooks/useComposedCssClasses";
import { useSearchState } from "@yext/search-headless-react";
import { DisplayableFilter } from "../models/displayableFilter";
import classNames from "classnames";
import * as React from "react";

interface SectionHeaderCssClasses extends AppliedFiltersCssClasses {
  sectionHeaderContainer?: string;
  sectionHeaderIconContainer?: string;
  sectionHeaderLabel?: string;
  viewMoreContainer?: string;
  viewMoreLink?: string;
}

const builtInCssClasses: SectionHeaderCssClasses = {
  sectionHeaderContainer: "flex items-center pl-1 mb-4",
  sectionHeaderIconContainer: "w-5 h-5",
  sectionHeaderLabel: "font-bold text-gray-800 text-base pl-3",
  viewMoreContainer:
    "flex justify-end flex-grow ml-auto font-medium text-gray-800 ",
  viewMoreLink: "text-blue-600 pr-1 pl-3",
  appliedFiltersContainer: "ml-3 flex flex-wrap",
  nlpFilter:
    "border rounded-3xl px-3 py-1.5 text-sm font-medium italic text-gray-800 mr-2",
  removableFilter:
    "flex items-center border rounded-3xl px-3 py-1.5 text-sm font-medium text-gray-900 mr-2",
  removeFilterButton: "w-2 h-2 text-gray-500 m-1.5",
};

interface SectionHeaderConfig {
  label: string;
  resultsCountConfig?: ResultsCountConfig;
  appliedFiltersConfig?: AppliedFiltersProps;
  customCssClasses?: SectionHeaderCssClasses;
  cssCompositionMethod?: CompositionMethod;
  verticalKey: string;
  viewAllButton?: boolean;
}

export default function SectionHeader(props: SectionHeaderConfig): JSX.Element {
  const {
    label,
    verticalKey,
    viewAllButton = false,
    appliedFiltersConfig,
    customCssClasses,
    cssCompositionMethod,
  } = props;
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssClasses,
    cssCompositionMethod
  );
  const latestQuery = useSearchState((state) => state.query.mostRecentSearch);
  const displayableFilters =
    appliedFiltersConfig?.appliedQueryFilters?.map(
      (appliedQueryFilter): DisplayableFilter => {
        return {
          filterType: "NLP_FILTER",
          filter: appliedQueryFilter.filter,
          groupLabel: appliedQueryFilter.displayKey,
          label: appliedQueryFilter.displayValue,
        };
      }
    ) ?? [];

  const isLoading = useSearchState((state) => state.searchStatus.isLoading);
  cssClasses.appliedFiltersContainer = classNames(
    cssClasses.appliedFiltersContainer,
    {
      [cssClasses.appliedFiltersContainer___loading ?? ""]: isLoading,
    }
  );

  return (
    <>
      <div className={cssClasses.sectionHeaderContainer}>
        <div className={cssClasses.sectionHeaderIconContainer}>
          {/* <CollectionIcon></CollectionIcon> */}
        </div>
        <h2 className={cssClasses.sectionHeaderLabel}>{label}</h2>
        {/* TODO (cea2aj): Add support for ResultsCountDisplay once we get the mocks from UX
          {resultsCountConfig &&
             <ResultsCountDisplay resultsLength={resultsCountConfig.resultsLength} resultsCount={resultsCountConfig.resultsCount} />} */}
        {appliedFiltersConfig && (
          <AppliedFiltersDisplay
            displayableFilters={displayableFilters}
            cssClasses={cssClasses}
          />
        )}
        {viewAllButton && (
          <div className={cssClasses.viewMoreContainer}>
            <a
              className={cssClasses.viewMoreLink}
              href={`/${verticalKey}?query=${latestQuery}`}
              style={{
                backgroundColor: "#A00505",
                color: "#FFFFFF",
                padding: "7px 20px 7px 20px",
                borderRadius: "5px",
              }}
            >
              See All
            </a>
          </div>
        )}
      </div>
    </>
  );
}
