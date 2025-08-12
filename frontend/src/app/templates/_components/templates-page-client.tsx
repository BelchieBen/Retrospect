"use client";

import { useState } from "react";
import { TemplateCategories } from "./template-categories";
import { TemplatesGrid } from "./templates-grid";
import { Card, CardContent } from "~/components/ui/card";
import { IFileText, ILightbulb } from "~/icons";
import HelixPalette from "~/styles/palette";

export function TemplatesPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      {/* Template Categories */}
      <TemplateCategories
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      {/* Templates Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <IFileText color={HelixPalette.neutral90} size={20} />
          <h2 className="text-lg font-semibold text-black dark:text-white">
            {selectedCategory
              ? `${selectedCategory} Templates`
              : "All Templates"}
          </h2>
        </div>

        <TemplatesGrid
          showSearch={true}
          showFilters={false} // Categories are handled above
          selectedCategory={selectedCategory}
        />
      </div>

      {/* Bottom CTA */}
      <Card className="border-teal20 bg-gradient-to-r from-teal05 to-blue05 dark:border-teal60 dark:from-teal20 dark:to-blue20">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 rounded-lg p-3">
              <ILightbulb color={HelixPalette.teal70} size={32} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Need a custom template?
              </h3>
              <p className="mt-1 text-sm text-neutral60 dark:text-neutral40">
                Create your own board structure and save it as a template for
                your team
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
