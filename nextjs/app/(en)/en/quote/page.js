import QuotePage, { quoteMetadata } from "@/components/pages/QuotePage";

export const metadata = quoteMetadata("en");

export default function Page() {
  return <QuotePage locale="en" />;
}
