import ServicesIndexPage, { servicesMetadata } from "@/components/pages/ServicesIndexPage";

export const metadata = servicesMetadata("en");

export default function Page() {
  return <ServicesIndexPage locale="en" />;
}
