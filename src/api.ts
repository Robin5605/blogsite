import fs from "fs/promises";
import path from "path";
import fm from "front-matter";
import { Dirent } from "fs";

export interface Blog {
    title: string;
    description: string;
    tags: string[];
    content: string;
    slug: string;
}

async function blogFromEntry(entry: Dirent): Promise<Blog> {
    const entryPath = path.join(entry.path, entry.name);
    const contents = await fs.readFile(entryPath);
    const { attributes, body } = fm(contents.toString());
    const metadata = attributes as any;

    if (typeof metadata.title !== "string") {
        throw `Blog post "${entry.name}" has no "title" metadata`;
    }

    if (typeof metadata.description !== "string") {
        throw `Blog post "${entry.name}" has no "description" metadata`;
    }

    if (typeof metadata.tags !== "string") {
        throw `Blog post "${entry.name}" has no "title" metadata`;
    }

    return {
        title: metadata.title,
        description: metadata.description,
        tags: metadata.tags.split(", "),
        content: body,
        slug: encodeURI(path.parse(entry.name).name),
    };
}

export async function getAllBlogs(): Promise<Blog[]> {
    const blogEntries = await fs.readdir("./blogs/", { withFileTypes: true });
    return await Promise.all(blogEntries.map(blogFromEntry));
}

export async function getBlogBySlug(slug: string): Promise<Blog> {
    const blogEntries = await fs.readdir("./blogs/", { withFileTypes: true });
    const entry = blogEntries.find(
        (entry) => encodeURI(path.parse(entry.name).name) === slug,
    );
    if (!entry) throw `Could not find blog with slug "${slug}"`;

    return await blogFromEntry(entry);
}

export function getAllTags(blogs: Blog[]): string[] {
    const tags = new Set<string>();
    for (const blog of blogs) {
        for (const tag of blog.tags) {
            tags.add(tag);
        }
    }

    return Array.from(tags);
}
