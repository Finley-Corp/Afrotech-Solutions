import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { getServiceBySlug, resolveServiceSlug, services } from "@/app/data/services";
import ServicePageShell from "../components/ServicePageShell";
import { SITE_NAME } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: raw } = await params;
  const slug = resolveServiceSlug(raw);
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service" };
  return {
    title: `${service.title} | ${SITE_NAME}`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug: raw } = await params;
  const slug = resolveServiceSlug(raw);
  if (raw !== slug) {
    redirect(`/services/${slug}`);
  }
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  return <ServicePageShell service={service} />;
}
