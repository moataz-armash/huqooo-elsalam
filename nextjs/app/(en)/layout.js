import { RootHtml, rootMetadata, viewport as sharedViewport } from "../layout-shared";

// One of two root layouts. Route groups let Arabic stay at "/" and English
// live under "/en" while each renders its own <html lang> and dir.
export const metadata = rootMetadata("en");
export const viewport = sharedViewport;

export default function RootLayout({ children }) {
  return <RootHtml locale="en">{children}</RootHtml>;
}
