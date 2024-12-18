"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TypeBlogPostSkeleton } from "@/contentful/types/blogPost.type";
import { Asset } from "contentful";
import contentfulClient from "@/contentful/contentfulClient";

export default function ArticlesCategories({
  selectedCategory = "All",
  searchQuery,
}: any) {
  const articlesPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await contentfulClient.getEntries<TypeBlogPostSkeleton>({
        content_type: "blogPost",
      });

      const articles = data.items.map((item: any) => {
        const imageUrl =
          (item.fields.image &&
            (item.fields.image as Asset).fields?.file?.url) ||
          null;

        return {
          id: item.sys.id,
          title: item.fields.title,
          category: item.fields.category,
          date: item.fields.date,
          author: item.fields.author,
          image: imageUrl,
          slug: item.fields.slug,
        };
      });

      const filtered =
        selectedCategory === "All"
          ? articles
          : articles.filter(
              (article: any) => article.category === selectedCategory
            );

      if (searchQuery) {
        setFilteredArticles(
          filtered.filter((article: any) =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      } else {
        setFilteredArticles(filtered);
      }

      setCurrentPage(1); // Reset page when category or search query changes
    } catch (err) {
      console.error("Error fetching articles:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, searchQuery]);

  const startIdx = (currentPage - 1) * articlesPerPage;
  const endIdx = startIdx + articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIdx, endIdx);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const SkeletonCard = () => (
    <div className="relative bg-gray-200 max-w-[350px] min-h-[400px] w-full p-4 rounded-lg shadow-lg animate-pulse">
      <div className="w-full h-52 bg-gray-300 rounded-t-md"></div>
      <div className="w-full mt-4 space-y-2">
        <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
        <div className="w-1/2 h-5 bg-gray-300 rounded"></div>
        <div className="w-full mt-2 flex space-x-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center">
      {loading ? (
        <div className="max-w-[1450px] w-full h-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {Array.from({ length: articlesPerPage }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <>
          {filteredArticles.length === 0 ? (
            <p>No articles found for the selected category or search term.</p>
          ) : (
            <div className="max-w-[1450px] w-full h-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
              {paginatedArticles.map((article) => (
                <div
                  key={article.id}
                  className="relative bg-white max-w-[350px] min-h-[400px] w-full p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                >
                  <div className="relative">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt="Post Thumbnail"
                        width={500}
                        height={500}
                        className="w-full h-52 object-cover rounded-t-md"
                      />
                    ) : (
                      <div className="w-full h-52 bg-gray-300 flex items-center justify-center rounded-t-md">
                        <span className="text-gray-600">No Image</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-black bg-opacity-60 text-white text-sm font-semibold py-1 px-2 rounded">
                      {article.category}
                    </div>
                  </div>
                  <div className="w-full mt-4">
                    <h1 className="text-lg font-semibold mb-2 line-clamp-2">
                      {article.title}
                    </h1>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <Image
                        src="/user1.png"
                        alt="user"
                        width={25}
                        height={25}
                        className="rounded-full"
                      />
                      <span className="ml-2 font-medium">{article.author}</span>
                      <span className="mx-2">•</span>
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <Link
                    href={`/blog-page/${article.slug}`}
                    className="absolute bottom-3 left-3 text-blue-500 font-semibold hover:underline"
                  >
                    View Post
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 mb-16">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 mx-1 rounded-md font-semibold ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
