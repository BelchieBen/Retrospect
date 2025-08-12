"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { TemplateCard } from "~/components/template-card";
import { templates } from "~/constants/board-templates";
import { ISearch, IFilter } from "~/icons";
import HelixPalette from "~/styles/palette";
import { Search } from "lucide-react";

interface TemplatesGridProps {
  showSearch?: boolean;
  showFilters?: boolean;
  selectedCategory?: string | null;
}

export function TemplatesGrid({
  showSearch = true,
  showFilters = true,
  selectedCategory: externalSelectedCategory = null,
}: TemplatesGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Use external category if provided, otherwise use internal state
  const activeCategory = externalSelectedCategory ?? selectedCategory;

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(templates.map((t) => t.category)));
    return cats.sort();
  }, []);

  // Filter templates based on search and category
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        searchTerm === "" ||
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        activeCategory === null || template.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      {(showSearch || showFilters) && (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {showSearch && (
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral60 dark:text-neutral40" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {showFilters && (
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="text-xs"
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral60 dark:text-neutral40">
          {filteredTemplates.length} template
          {filteredTemplates.length !== 1 ? "s" : ""} found
          {activeCategory && ` in ${activeCategory}`}
        </p>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      ) : (
        <Card className="border-2 border-dashed border-neutral30 bg-neutral05 dark:border-neutral60 dark:bg-neutral20">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <IFilter color={HelixPalette.neutral60} size={48} />
            <h3 className="mt-4 font-medium text-black dark:text-white">
              No templates found
            </h3>
            <p className="mt-1 text-sm text-neutral60 dark:text-neutral40">
              Try adjusting your search or filter criteria
            </p>
            <div className="mt-4 flex gap-2">
              {searchTerm && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                >
                  Clear search
                </Button>
              )}
              {activeCategory && !externalSelectedCategory && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Clear filter
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
