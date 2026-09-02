import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Deck from "@/components/Deck";
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
  return { title: def.title, description: def.description };
}

export default async function PresentationPage({ params }: Props) {
  const { presentation } = await params;
  const def = getPresentation(presentation);
  if (!def) notFound();
  return <Deck presentationId={def.id} />;
}
