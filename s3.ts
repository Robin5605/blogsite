import { GetObjectCommand, ListObjectsCommand, S3Client } from "@aws-sdk/client-s3";
import matter from "gray-matter";
import { BlogPost } from "./models/blog";

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const REGION = "us-east-1";
const BUCKET = "robinj-blog-articles";

if (!(AWS_SECRET_ACCESS_KEY && AWS_ACCESS_KEY_ID)) {
    throw new Error("AWS Credentials not found.");
}

const s3Client = new S3Client({ 
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID, 
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    }, 
    region: REGION 
});

async function getPost(link: string): Promise<BlogPost | null> {
    const data = await s3Client.send(new GetObjectCommand({
        Key: link + ".md",
        Bucket: BUCKET,
    }));

    const stringData = await data.Body?.transformToString();
    if(stringData == undefined) return null;

    const fm = matter(stringData);
    const { title, description, tags } = fm.data;
    const content = fm.content;
    return { title, description, content, link, tags: tags.split(", ") };

}

async function getAllPosts(): Promise<BlogPost[]> {
    const objectResponse = await s3Client.send(new ListObjectsCommand({
        Bucket: BUCKET,
    }));

    if(objectResponse.Contents == undefined) return [];
    
    const posts: BlogPost[] = [];
    for await (const obj of objectResponse.Contents) {
        if(obj.Key == undefined ) continue;
        const post = await getPost(obj.Key.substring(0, obj.Key.length - 3));
        if(post == undefined) continue;
        posts.push(post);
    }

    return posts;
}

export { getPost, getAllPosts };
