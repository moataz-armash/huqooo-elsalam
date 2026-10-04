import ServicePage, { serviceMetadata } from "@/components/pages/ServicePage";
import { SERVICE_SLUGS } from "@/app/services/services-data";

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return serviceMetadata("en", slug);
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ServicePage locale="en" slug={slug} />;
}
