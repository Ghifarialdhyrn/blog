"use client";

import contentfulClient from "@/contentful/contentfulClient";
import {
  IContentfulAsset,
  TypeBlogPostSkeleton,
} from "@/contentful/types/blogPost.type";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function HeroArticlePage() {
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
    <div className="mt-10">
      {/* Back Button */}
      <div className="ml-24 mb-5">
        <Link
          href="/blog-posts"
          className="bg-black p-2 text-white rounded-md hover:bg-gray-800 transition"
        >
          Back
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative w-full max-w-[1467px] h-[500px] mx-auto text-white rounded-lg overflow-hidden">
        {article && (
          <div className="relative w-full h-full">
            {/* Background Image */}
            <img
              src={(article.image as IContentfulAsset)?.fields.file.url}
              alt="Post Thumbnail"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50" />

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col justify-between h-full p-8">
              {/* Category */}
              <div className="self-start">
                <h3 className="text-lg font-semibold uppercase bg-black bg-opacity-70 p-2 rounded-md inline-block">
                  {article.category}
                </h3>
              </div>

              {/* Title and Metadata */}
              <div className="self-start">
                <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                  {article.title}
                </h1>
                <div className="text-lg lg:text-xl flex items-center">
                  <p className="font-medium">{article.author}</p>
                  <hr className="w-10 border-1 border-white mx-4" />
                  <span className="text-sm text-gray-300">{article.date}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
