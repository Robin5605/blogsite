"use client";
import { Blog } from "@/api";
import Link from "next/link";
import { useState } from "react";
import TagFilterComponent from "./TagFilterComponent";

interface TagComponentProps {
    text: string;
}

function TagComponent({ text }: TagComponentProps) {
    return (
        <div className="bg-frost-400 text-white rounded-sm px-4 py-1">
            {text}
        </div>
    );
}

interface BlogPreviewProps {
    blog: Blog;
}

function BlogPreview({ blog }: BlogPreviewProps) {
    return (
        <div className="flex flex-col hover:shadow-xl duration-100 w-full bg-nord-700 dark:bg-nord-100 dark:text-white text-black shadow-lg rounded-lg px-6 py-4">
            <div className="flex flex-col">
                <div className="text-3xl font-semibold duration-200 hover:text-blue-500 mb-2">
                    <Link href={"/blog/" + blog.slug}>{blog.title}</Link>
                </div>
                <p>{blog.description}</p>
                <div className="flex flex-wrap gap-2 mt-8">
                    {blog.tags.map((tag) => (
                        <TagComponent text={tag} key={tag} />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface AllBlogsPreviewProps {
    blogs: Blog[];
    selectedTags: string[];
}

function AllBlogsPreview({ blogs, selectedTags }: AllBlogsPreviewProps) {
    if (blogs.length === 0)
        return <p className="mx-auto text-center">No posts yet. Stay tuned!</p>;

    if (selectedTags.length === 0)
        return blogs.map((blog) => (
            <BlogPreview blog={blog} key={`BLOG-${blog.slug}`} />
        ));

    return blogs
        .filter((blog) => selectedTags.every((tag) => blog.tags.includes(tag)))
        .map((blog) => <BlogPreview blog={blog} key={`BLOG-${blog.slug}`} />);
}

interface BlogsDisplayProps {
    blogs: Blog[];
    tags: string[];
}

export function BlogsDisplay({ blogs, tags }: BlogsDisplayProps) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    return (
        <div className="w-full md:w-1/2 lg:w-5/12 mx-auto space-y-2">
            <div className="flex justify-end">
                <TagFilterComponent
                    tags={tags}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                />
            </div>
            <div className="flex flex-col space-y-8">
                <AllBlogsPreview blogs={blogs} selectedTags={selectedTags} />
            </div>
        </div>
    );
}
