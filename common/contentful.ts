import { createClient, Entry, EntryFields } from "contentful";

type BlogPostFields = {
    title: EntryFields.Text,
    description: EntryFields.Text,
    tags: EntryFields.Array<EntryFields.Text>,
    content: EntryFields.Text,
}

export interface BlogPost {
    id: string,
    title: string,
    description: string,
    tags: string[],
    createdAt: `${number}-${number}-${number}T${number}:${number}:${number}Z`
    content: string,
}

export interface BlogPostPreview {
    id: string,
    title: string,
    description: string,
    tags: string[],
}

const space = process.env.SPACE;
if(!space) throw new Error("Failed loading Contentful space ID from environment variables");

const accessToken = process.env.ACCESS_TOKEN;
if(!accessToken) throw new Error("Failed loading Contentful access token from environment variables");

const client = createClient({ space, accessToken });

function convertEntryToModel(entry: Entry<BlogPostFields, undefined, string>): BlogPost {
    const { title, description, tags, content } = entry.fields;
    const { id, createdAt } = entry.sys;
    return {
        id,
        title,
        description,
        tags,
        createdAt,
        content,
    }
}

export async function getAllPosts(): Promise<BlogPost[]> {
    const entries = await client.getEntries<BlogPost>();
    return entries.items.map(convertEntryToModel);
}

export async function getPost(id: string): Promise<BlogPost | null> {
    const entry = await client.getEntry<BlogPost>(id);
    return convertEntryToModel(entry);
}
