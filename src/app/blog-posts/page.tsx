"use client";

import { Articles } from "@/components/Blog Posts/articles.component";
import { Filter } from "@/components/Blog Posts/fliter.component";
import HeroSearch from "@/components/Blog Posts/hero.search.component";
import { Footer } from "@/components/footer.component";
import { useState } from "react";

export default function BlogPosts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  return (
    <div className="max-w-[2048px] w-full h-screen">
      <section>
        <HeroSearch setSearchQuery={setSearchQuery} />
      </section>
      <section>
        <Filter setSortBy={setSortBy} />
      </section>
      <section>
        <Articles searchQuery={searchQuery} sortBy={sortBy} />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
}
