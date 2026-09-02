import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AudienceView from "@/components/AudienceView";
import { PRESENTATIONS, getPresentation } from "@/presentations";

interface Props {
  params: Promise<{ presentation: string }>;
}

export function generateStaticParams() {
  return PRESENTATIONS.map((p) => ({ presentation: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { presentation } = await params;
  const def = getPresentation(presentation);
  if (!def) return {};
  return { title: def.title };
}

export default async function AudiencePage({ params }: Props) {
  const { presentation } = await params;
  const def = getPresentation(presentation);
  if (!def) notFound();
  return <AudienceView presentationId={def.id} />;
}
