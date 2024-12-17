import { createClient } from "contentful";

if (!process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) {
  throw new Error(
    "Missing Contentful access token. Ensure NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN is set in environment variables."
  );
}

const contentfulClient = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

export default contentfulClient;
