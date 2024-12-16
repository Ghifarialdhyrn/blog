"use client";

import Image from "next/image";
import Link from "next/link";
import RichText from "../global/RichText";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import contentfulClient from "@/contentful/contentfulClient";
import { TypeBlogPostSkeleton } from "@/contentful/types/blogPost.type";

export function Body() {
  const params = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>();

  const fetchArticle = async () => {
    try {
      const data = await contentfulClient.getEntries<TypeBlogPostSkeleton>({
        content_type: "blogPost",
        limit: 1,
        "fields.slug": params.slug,
      });

      setArticle(data.items[0].fields);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row py-10 px-4 lg:px-0 gap-6">
        {/* Main Article */}
        <div className="w-full lg:w-[75%] bg-white p-6 lg:p-8 shadow-lg rounded-lg">
          {article && (
            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-800">
              <RichText document={article.body} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[25%] bg-white shadow-lg rounded-lg p-6 text-center h-full">
          <h3 className="font-semibold text-lg sm:text-xl mb-4 text-gray-700">
            Follow Me
          </h3>
          <div className="grid grid-cols-4 lg:grid-cols-2 gap-4">
            {[
              { src: "/instagram.png", alt: "Instagram", followers: "500" },
              { src: "/twitter.png", alt: "Twitter", followers: "500" },
              { src: "/facebook.png", alt: "Facebook", followers: "500" },
              { src: "/youtube.png", alt: "YouTube", followers: "500" },
            ].map((icon, idx) => (
              <Link href="#" key={idx} className="text-center">
                <Image src={icon.src} alt={icon.alt} width={32} height={32} />
                <p className="text-xs sm:text-sm text-gray-600">
                  {icon.followers}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
