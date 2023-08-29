"use client";

import React, { use } from "react";
import algoliasearch from "algoliasearch/lite";
import { renderToString } from "react-dom/server";
import {
  DynamicWidgets,
  getServerState,
  Highlight,
  Hits,
  InstantSearch,
  InstantSearchServerState,
  InstantSearchSSRProvider,
  RefinementList,
  SearchBox,
} from "react-instantsearch";

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "You forgot to set the Algolia App ID",
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY || "You forgot to set the Algolia API key"
);

export function Panel({
  children,
  header,
  footer,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="ais-Panel">
      {header && <div className="ais-Panel-header">{header}</div>}
      <div className="ais-Panel-body">{children}</div>
      {footer && <div className="ais-Panel-footer">{footer}</div>}
    </div>
  );
}

type HitProps = {
  hit: any;
};

function Hit({ hit }: HitProps) {
  return (
    <>
      <Highlight hit={hit} attribute="name" className="Hit-label" />
      <span className="Hit-price">${hit.price}</span>
    </>
  );
}

type SearchPageProps = {
  serverState?: InstantSearchServerState;
};

function Search({ serverState }: SearchPageProps) {
  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch searchClient={client} indexName={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX} insights={true}>
        <div className="Container">
          <div>
            <DynamicWidgets fallbackComponent={FallbackComponent} />
          </div>
          <div>
            <SearchBox />
            <Hits hitComponent={Hit} />
          </div>
        </div>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

function FallbackComponent({ attribute }: { attribute: string }) {
  return (
    <Panel header={attribute}>
      <RefinementList attribute={attribute} />
    </Panel>
  );
}

export default function SearchPage() {
  const serverState = use(
    getServerState(<Search />, {
      renderToString,
    })
  );

  return <Search serverState={serverState} />;
}
