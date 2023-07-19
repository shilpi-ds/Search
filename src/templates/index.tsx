// src/templates/search.tsx

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
  StandardCard,
  SpellCheck,
  ResultsCount,
  Pagination,
  UniversalResults,
  StandardSection,
} from "@yext/search-ui-react";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import { searchConfig } from "../config/searchConfig";
import PageLayout from "../components/common/PageLayout";
import FaqCard from "../components/cards/FaqCard";

export const getPath: GetPath<TemplateProps> = () => {
  return "index.html";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: `Turtlehead Tacos Search`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const searcher = provideHeadless(searchConfig);

const Universal: Template<TemplateRenderProps> = () => {
  return (
    <SearchHeadlessProvider searcher={searcher}>
      <PageLayout  verticalKey="null" limit={0}>
        <div className="px-4 py-8">
          <div className="mx-auto flex max-w-5xl flex-col">
            <SearchBar />
            <SpellCheck />
            <ResultsCount />
            <UniversalResults
              verticalConfigMap={{
                locations: {
                  CardComponent: StandardCard,
                  SectionComponent: StandardSection,
                  viewAllButton:true,
                },
                faqs: {
                  CardComponent: FaqCard,
                  viewAllButton:true,
                },
               
              }}
            />
          </div>
          <Pagination />
        </div>
      </PageLayout>
    </SearchHeadlessProvider>
  );
};

export default Universal;