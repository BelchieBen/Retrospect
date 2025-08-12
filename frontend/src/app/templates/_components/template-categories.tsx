"use client";

import { Card, CardContent } from "~/components/ui/card";
import { templates } from "~/constants/board-templates";
import { IDashboard, IUsers, IApproved, ILightbulb, IFileText } from "~/icons";
import HelixPalette from "~/styles/palette";

const categoryIcons: Record<
  string,
  React.ComponentType<{
    color?: string;
    dataId?: string;
    size?: number;
    style?: React.CSSProperties;
  }>
> = {
  "Team Management": IUsers,
  "Project Management": IDashboard,
  Agile: IApproved,
  Creative: ILightbulb,
};

const categoryColors: Record<
  string,
  { bg: string; icon: string; text: string }
> = {
  "Team Management": {
    bg: "bg-gradient-to-br from-blue10 to-blue20 dark:from-blue20 dark:to-blue30",
    icon: HelixPalette.blue70,
    text: "text-blue70 dark:text-blue60",
  },
  "Project Management": {
    bg: "bg-gradient-to-br from-teal10 to-teal20 dark:from-teal20 dark:to-teal30",
    icon: HelixPalette.teal70,
    text: "text-teal70 dark:text-teal60",
  },
  Agile: {
    bg: "bg-gradient-to-br from-green10 to-green20 dark:from-green20 dark:to-green30",
    icon: HelixPalette.green70,
    text: "text-green70 dark:text-green60",
  },
  Creative: {
    bg: "bg-gradient-to-br from-yellow10 to-yellow20 dark:from-yellow20 dark:to-yellow30",
    icon: HelixPalette.yellow70,
    text: "text-yellow70 dark:text-yellow60",
  },
};

interface TemplateCategoriesProps {
  onCategorySelect?: (category: string | null) => void;
  selectedCategory?: string | null;
}

export function TemplateCategories({
  onCategorySelect,
  selectedCategory,
}: TemplateCategoriesProps) {
  // Get categories with counts
  const categoriesWithCounts = Object.entries(
    templates.reduce(
      (acc, template) => {
        acc[template.category] = (acc[template.category] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <IFileText color={HelixPalette.neutral90} size={20} />
        <h2 className="text-lg font-semibold text-black dark:text-white">
          Browse by Category
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categoriesWithCounts.map(([category, count]) => {
          const IconComponent = categoryIcons[category] ?? IFileText;
          const colors =
            categoryColors[category] ?? categoryColors["Project Management"];
          const isSelected = selectedCategory === category;

          return (
            <Card
              key={category}
              className={`cursor-pointer border-2 transition-all hover:shadow-md ${
                isSelected
                  ? "border-teal60 shadow-md"
                  : "border-neutral20 dark:border-neutral60"
              }`}
              onClick={() => onCategorySelect?.(isSelected ? null : category)}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`rounded-lg p-3 ${colors?.bg}`}>
                  <IconComponent color={colors?.icon} size={24} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm font-medium ${colors?.text}`}>
                    {category}
                  </h3>
                  <p className="text-xs text-neutral60 dark:text-neutral40">
                    {count} template{count !== 1 ? "s" : ""}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
