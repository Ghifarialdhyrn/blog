import { Body } from "@/components/Blog Page/body.component";
import { HeroArticlePage } from "@/components/Blog Page/hero.article.component";
import { Footer } from "@/components/footer.component";

export default function ArticlePage() {
  return (
    <div>
      <section>
        <HeroArticlePage />
      </section>

      <section>
        <Body />
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}
