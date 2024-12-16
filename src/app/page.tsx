import { Footer } from "@/components/footer.component";
import { BigPost } from "@/components/Home/bigpost.component";
import { CategoriesHome } from "@/components/Home/categories.home.component";
import Hero from "@/components/Home/hero.component";
import PostsHome from "@/components/Home/posts.home.component";
import { Navbar } from "@/components/navbar.component";

export default function Home() {
  return (
    <div className="max-w-[2048px] w-full h-screen">
      <section>
        <Navbar />
      </section>

      <section>
        <Hero />
      </section>

      <section>
        <PostsHome />
      </section>

      <section>
        <BigPost />
      </section>

      <section>
        <CategoriesHome />
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}
