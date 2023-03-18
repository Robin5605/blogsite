import fs from "fs/promises";
import matter from "gray-matter";
import { BlogPost } from "../models/blog";

async function getPost(filename: string): Promise<BlogPost> {
    const contents = await fs.readFile(`./articles/${filename}`);

    const fm = matter(contents);
    const { title, description, tags } = fm.data;
    const content = fm.content;
    return { title, description, content, filename, tags: tags.split(", ") };

}

async function getAllPosts(): Promise<BlogPost[]> {
    const files = await fs.readdir("./articles");
    const blogPosts: BlogPost[] = [];
    for (const file of files) {
        const blog = await getPost(file); 
        blogPosts.push(blog);
    }

    return blogPosts;
}

export { getPost, getAllPosts };
