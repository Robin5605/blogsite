import { getAllBlogs, getAllTags } from "@/api";
import { BlogsDisplay } from "@/components/BlogComponents";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Robin's Blog",
    description: "My personal page where I (occasionally) write about stuff :)",
};

export default async function Home() {
    const blogs = await getAllBlogs();
    const tags = getAllTags(blogs);
    return (
        <div className="mx-auto my-16 text-black dark:text-white p-6">
            <BlogsDisplay blogs={blogs} tags={tags} />
        </div>
    );
}
