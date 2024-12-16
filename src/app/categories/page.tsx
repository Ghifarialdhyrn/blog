"use client";

import ArticlesCategories from "@/components/Categories/article.categories.component";
import { CardCategories } from "@/components/Categories/card.categories.component";
import HeroSearchCategories from "@/components/Categories/hero.search.component";
import { Footer } from "@/components/footer.component";
import { useState } from "react";

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      <section>
        <HeroSearchCategories setSearchQuery={setSearchQuery} />
      </section>

      <section>
        <CardCategories onSelectCategory={setSelectedCategory} />
      </section>

      <section>
        <ArticlesCategories
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
        />
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}
