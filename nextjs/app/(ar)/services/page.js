import ServicesIndexPage, { servicesMetadata } from "@/components/pages/ServicesIndexPage";

export const metadata = servicesMetadata("ar");

export default function Page() {
  return <ServicesIndexPage locale="ar" />;
}
