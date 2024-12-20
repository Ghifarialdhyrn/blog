"use client";
import contentfulClient from "@/contentful/contentfulClient";
import {
  IContentfulAsset,
  TypeBlogPostSkeleton,
} from "@/contentful/types/blogPost.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export async function getStaticProps() {
  try {
    const data = await contentfulClient.getEntries<TypeBlogPostSkeleton>({
      content_type: "blogPost",
    });

    const posts = data.items.map((item) => ({
      id: item.sys.id,
      title: item.fields.title || "Untitled Post",
      slug: item.fields.slug || "",
      author: item.fields.author || "Unknown Author",
      date: item.fields.date || "Unknown Date",
      image: (item.fields.image as IContentfulAsset)?.fields?.file?.url || null,
    }));

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        posts: [],
      },
    };
  }
}

export function Articles({ searchQuery, sortBy }: any) {
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const articlesPerPage = 12;
  const totalArticles = posts.length;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  // Fetch data and apply search/filter logic
  useEffect(() => {
    const fetchData = async () => {
      const data = await getStaticProps();
      setPosts(data.props.posts);
      setFilteredPosts(data.props.posts);
    };

    fetchData();
  }, []);

  // Filter posts based on search query
  useEffect(() => {
    let filtered = posts.filter((post) =>
      (post.title || "")
        .toLowerCase()
        .includes((searchQuery || "").toLowerCase())
    );

    if (sortBy === "name") {
      filtered = filtered.sort((a, b) =>
        (a.title || "").localeCompare(b.title || "")
      );
    } else if (sortBy === "date") {
      filtered = filtered.sort(
        (a, b) =>
          new Date(b.date || "").getTime() - new Date(a.date || "").getTime()
      );
    }

    setFilteredPosts(filtered);
  }, [searchQuery, sortBy, posts]);

  return (
    <div className="posts-section max-w-[1450px] mx-auto my-10 px-6 lg:px-24 transform">
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredPosts.map((post, index) => (
          <div
            key={index}
            className="shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 relative bg-white"
          >
            <div className="w-full h-48 overflow-hidden">
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title || "No Title"}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <p>No Image Available</p>
                </div>
              )}
            </div>
            <div className="p-4 flex flex-col h-40 justify-between">
              <h2 className="font-bold text-lg mb-2 text-gray-800">
                {post.title || "Untitled Post"}
              </h2>
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Image src="/user1.png" alt="author" width={30} height={30} />
                <p className="ml-2">{post.author || "Unknown Author"}</p>
                <span className="mx-2">|</span>
                <p>{post.date || "Unknown Date"}</p>
              </div>
              <Link
                href={`/blog-page/${post.slug}`}
                className="text-blue-600 font-bold hover:underline self-start"
              >
                View Post
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 mb-16">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded-full font-semibold ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-800 hover:bg-blue-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
