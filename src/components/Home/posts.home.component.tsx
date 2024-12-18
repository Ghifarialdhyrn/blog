"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import contentfulClient from "@/contentful/contentfulClient";
import {
  IContentfulAsset,
  TypeBlogPostSkeleton,
} from "@/contentful/types/blogPost.type";

const getBlogPostsContentful = async () => {
  try {
    // Mengambil hanya data dari Content Type 'Program'
    const data = await contentfulClient.getEntries<TypeBlogPostSkeleton>({
      content_type: "blogPost", // Ganti dengan ID Content Type yang sesuai
    });

    console.log(data.items); // Menampilkan data yang diambil
    return data.items; // Mengembalikan hanya items yang diperlukan
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default function PostsHome() {
  const [posts, setPosts] = useState<any[]>([]); // Add state for posts
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBlogPostsContentful();
      setPosts(data); // Update the state with the fetched posts
    };

    fetchData();
  }, []); // Fetch data on component mount

  const handleScroll = () => {
    const postsSection = document.querySelector(".posts-section");
    if (postsSection) {
      const position = postsSection.getBoundingClientRect().top;
      if (position < window.innerHeight * 0.8) {
        setInView(true);
      } else {
        setInView(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`posts-section max-w-[1450px] mx-auto my-10 px-6 lg:px-24 transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } transition-all`}
    >
      {/* Social Media Stats */}
      <div className="flex justify-end items-center gap-4 mb-10">
        {["facebook", "twitter", "instagram", "youtube"].map((platform) => (
          <div key={platform} className="flex items-center gap-2">
            <Image
              src={`/${platform}.png`}
              alt={platform}
              width={18}
              height={18}
            />
            <p>3.7 M</p>
          </div>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {posts.map((post, index) => (
          <div
            key={index}
            className="shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 relative bg-white"
          >
            <div className="w-full h-48 overflow-hidden">
              <Image
                src={`https://${
                  (post.fields.image as IContentfulAsset)?.fields.file.url
                }`}
                alt="Post Thumbnail"
                width={500}
                height={500}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="p-4 flex flex-col h-40 justify-between">
              <h2 className="font-bold text-lg mb-2 text-gray-800">
                {post.fields.title}
              </h2>
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Image src="/user1.png" alt="author" width={30} height={30} />
                <p className="ml-2">{post.fields.author}</p>
                <span className="mx-2">|</span>
                <p>{post.fields.date}</p>
              </div>
              <Link
                href={`/blog-page/${post.fields.slug}`}
                className="text-blue-600 font-bold hover:underline self-start"
              >
                View Post
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-10">
        <Link href="../blog-posts">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition">
            Load More
          </button>
        </Link>
      </div>
    </section>
  );
}
