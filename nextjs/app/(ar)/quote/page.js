import QuotePage, { quoteMetadata } from "@/components/pages/QuotePage";

export const metadata = quoteMetadata("ar");

export default function Page() {
  return <QuotePage locale="ar" />;
}
