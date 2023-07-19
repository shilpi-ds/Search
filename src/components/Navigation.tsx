import classNames from "classnames";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
// import { NavLink } from 'react-router-dom';

import {
  useComposedCssClasses,
  CompositionMethod,
} from "../hooks/useComposedCssClasses";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import { universalResultsConfig } from "../config/universalResultsConfig";
// import { NodeJS } from 'node:types';
import * as React from "react";

interface NavigationCssClasses {
  nav?: string;
  linksWrapper?: string;
  menuWrapper?: string;
  navLinkContainer?: string;
  navLinkContainer___active?: string;
  navLink?: string;
  kebabIcon?: string;
  menuButton?: string;
  menuButtonContainer?: string;
  menuButton___menuOpen?: string;
  menuButton___hasActiveLink?: string;
  menuContainer?: string;
  menuNavLink?: string;
  menuNavLinkContainer?: string;
  menuNavLinkContainer___active?: string;
}

const builtInCssClasses: NavigationCssClasses = {
  nav: "border-b border-gray-200 text-gray-600 flex space-x-6 font-medium mb-6 m-auto",
  navLinkContainer:
    "whitespace-nowrap py-3 mt-1 font-medium text-md border-b-2 border-opacity-0 hover:border-gray-300",
  navLink: "py-3 px-2",
  navLinkContainer___active:
    "text-blue-600 border-blue-600 border-opacity-100 hover:border-blue-600",
  kebabIcon: "pointer-events-none",
  menuButtonContainer: "relative flex flex-grow justify-end mr-4",
  menuButton:
    "flex items-center text-gray-600 font-medium text-md h-12 mt-1 p-3 border-opacity-0 rounded-md hover:bg-gray-200",
  menuButton___menuOpen: "bg-gray-100 text-gray-800",
  menuButton___hasActiveLink: "text-blue-600",
  menuContainer:
    "absolute flex-col bg-white border top-14 py-2 rounded-lg shadow-lg",
  menuNavLink: "px-4 py-2 flex-grow",
  menuNavLinkContainer:
    "flex text-gray-600 hover:bg-gray-100 text-lg hover:text-gray-800 focus:text-gray-800",
  menuNavLinkContainer___active:
    "text-blue-600 hover:text-blue-600 focus:text-blue-600",
};

interface LinkData {
  to: string;
  label: string;
}

interface NavigationProps {
  // links: LinkData[],
  customCssClasses?: NavigationCssClasses;
  cssCompositionMethod?: CompositionMethod;
}


export default function Navigation({
  customCssClasses,
  cssCompositionMethod,
}: NavigationProps) {
  // Query - Starts
  const [navparmam, setNavParam] = useState("");
  const searchActions = useSearchActions();
useLayoutEffect(() => {
  searchActions.setVertical('products');
  searchActions.executeVerticalQuery();
});

  const SearchQuery: string | null =
    useSearchState((state) => state.query.input) ?? null;
  function getQueryParam(): string {
    const queryString: string | undefined = window.location.search;
    const urlParams: URLSearchParams = new URLSearchParams(queryString);
    const product: string | null = urlParams.get("query");

    if (product !== null) {
      return product; // Return the non-null string
    } else {
      return ""; // Return a default value or handle the null case
    }
  }

  // const product = urlParams.get('query');
  const answersActions = useSearchActions();

  useEffect(() => {
    if (getQueryParam() !== null) {
      answersActions.setQuery(getQueryParam());
    } else {
      if (SearchQuery !== "" && SearchQuery !== null) {
        updateParam(SearchQuery);
        setNavParam(SearchQuery);
      } else {
        updateParam("");
        setNavParam("");
      }
    }
  }, []);

  useEffect(() => {
    if (SearchQuery != "" && SearchQuery != null) {
      updateParam(SearchQuery);
      setNavParam(SearchQuery);
    } else {
      updateParam("");
      setNavParam("");
    }
  }, [SearchQuery]);

  function updateParam(latestUserInput: string): void {
    const paramValue = latestUserInput; // Replace with your updated value
    const searchParams: URLSearchParams = new URLSearchParams(
      window.location.search
    );
    searchParams.set("query", paramValue);
    const newUrl: string =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      searchParams.toString();
    window.history.replaceState({}, "", newUrl);
  }

  //Query - Ends

  // Default Search Code -  Starts

  // const searchAction = useSearchActions();
  // useEffect(() => {
  //   searchAction.executeVerticalQuery();
  // }, []);

  // Default Search Code - Ends

  const links = [
    {
      to: "/",
      label: "All",
      key: "all", // Assign a unique key to the "All" link
    },
    ...Object.entries(universalResultsConfig).map(
      ([verticalKey, config], index) => ({
        to: verticalKey,
        label: config.label || verticalKey,
        key: `${verticalKey}-${index}`, // Assign a unique key to each vertical link
      })
    ),
  ];

  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    customCssClasses,
    cssCompositionMethod
  );
  const currentVertical = useSearchState((state) => state.vertical.verticalKey);

  // Close the menu when clicking the document
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const handleDocumentClick = (e: MouseEvent) => {
    if (e.target !== menuRef.current) {
      setMenuOpen(false);
    }
  };
  useLayoutEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  // Responsive tabs
  const [numOverflowLinks, setNumOverflowLinks] = useState<number>(0);
  const navigationRef = useRef<HTMLDivElement>(null);
  const handleResize = useCallback(() => {
    const navEl = navigationRef.current;
    if (!navEl) {
      return;
    }
    const isOverflowing = navEl.scrollWidth > navEl.offsetWidth;
    if (isOverflowing && numOverflowLinks < links.length) {
      setNumOverflowLinks(numOverflowLinks + 1);
    }
  }, [links.length, numOverflowLinks]);
  useLayoutEffect(handleResize, [handleResize]);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    function resizeListener() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setNumOverflowLinks(0);
        handleResize();
      }, 50);
    }
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, [handleResize]);

  const visibleLinks = links.slice(0, links.length - numOverflowLinks);
  const overflowLinks = links.slice(-numOverflowLinks);
  const isActiveLink = ({ to }: LinkData) =>
    to === currentVertical || (to === "/" && currentVertical === undefined);
  const activeVisibleLinkIndex = visibleLinks.findIndex(isActiveLink);
  const activeMenuLinkIndex = overflowLinks.findIndex(isActiveLink);
  const menuContainsActiveLink = activeMenuLinkIndex >= 0;
  const menuButtonClassNames = classNames(cssClasses.menuButton, {
    [cssClasses.menuButton___menuOpen ?? ""]: menuOpen,
    [cssClasses.menuButton___hasActiveLink ?? ""]: menuContainsActiveLink,
  });

  return (
    <nav className={cssClasses.nav} ref={navigationRef}>
      {visibleLinks.map((l, index) =>
        renderLink(l, index === activeVisibleLinkIndex, cssClasses, navparmam)
      )}
      {numOverflowLinks > 0 && (
        <div className={cssClasses.menuButtonContainer}>
          <button
            className={menuButtonClassNames}
            ref={menuRef}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img className={cssClasses.kebabIcon} alt="" /> More
          </button>
          {menuOpen && (
            <div className={cssClasses.menuContainer}>
              {menuOpen &&
                overflowLinks.map((l, index) => {
                  const renderedLink = renderLink(
                    l,
                    index === activeMenuLinkIndex,
                    {
                      navLink: cssClasses.menuNavLink,
                      navLinkContainer: cssClasses.menuNavLinkContainer,
                      navLinkContainer___active:
                        cssClasses.menuNavLinkContainer___active,
                    },
                    navparmam
                  );
                  return React.cloneElement(renderedLink, { key: index });
                })}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

function renderLink(
  linkData: LinkData,
  isActiveLink: boolean,
  cssClasses: {
    navLinkContainer?: string;
    navLinkContainer___active?: string;
    navLink?: string;
  },
  navparmam: string
) {
  const { to, label } = linkData;
  const navLinkContainerClasses = classNames(cssClasses.navLinkContainer, {
    [cssClasses.navLinkContainer___active ?? ""]: isActiveLink,
  });
  return (
    <>
      <div className={navLinkContainerClasses} key={to}>
        <a className={cssClasses.navLink} href={`${to}?query=${navparmam}`}>
          {label}
        </a>
      </div>
    </>
  );
}
