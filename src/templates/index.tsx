import * as React from "react";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
} from "@yext/pages";
import "../index.css";
import {
  SearchBar,
  SpellCheck,
  ResultsCount,
  Pagination,
  DirectAnswer,
  AppliedFilters,
  LocationBias,
} from "@yext/search-ui-react";

import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import "../index.css";

import UniversalResults from "../components/UniversalResults";
import { universalResultsConfig } from "../config/universalResultsConfig";
import { answersHeadlessConfig } from "../config/answersHeadlessConfig";
import Navigation from "../components/Navigation";

const universalResultsFilterConfig = {
  show: true,
};
export const getPath: GetPath<TemplateProps> = () => {
  return "index.html";
};
export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: `Search Demo`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const searcher = provideHeadless(answersHeadlessConfig);

const IndexPage: Template<TemplateRenderProps> = (document) => {
  return (
    <>
      {/* <Header props={document.document._site} /> */}
      <SearchHeadlessProvider searcher={searcher}>
        <div className="px-4 py-8">
          <div className="mx-auto flex max-w-5xl flex-col">
            <SearchBar placeholder="SEARCH YOUR QUERY HERE" />
            <Navigation />
            <DirectAnswer />
            <SpellCheck />
            <ResultsCount />
            <AppliedFilters hiddenFields={["builtin.entityType"]} />
            <div className="flex flex-wrap">
              <UniversalResults
                appliedFiltersConfig={universalResultsFilterConfig}
                verticalConfigs={universalResultsConfig}
              />
            </div>
            <LocationBias />
          </div>
          <Pagination />
        </div>
      </SearchHeadlessProvider>
      {/* <Footer props={document.document._site} /> */}
    </>
  );
};

export default IndexPage;
