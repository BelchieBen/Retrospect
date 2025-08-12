import type { Metadata } from "next";
import { TemplatesHeader } from "./_components/templates-header";
import { TemplatesPageClient } from "./_components/templates-page-client";

export const metadata: Metadata = {
  title: "Board Templates | Retospect",
  description:
    "Choose from professionally designed board templates to get started quickly. Perfect for retrospectives, kanban boards, sprint planning, and more.",
};

export default function TemplatePage() {
  return (
    <div className="flex-1 space-y-6 overflow-y-scroll p-6">
      {/* Header Section */}
      <TemplatesHeader />

      {/* Client-side interactive content */}
      <TemplatesPageClient />
    </div>
  );
}
