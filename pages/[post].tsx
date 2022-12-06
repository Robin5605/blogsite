import { marked } from "marked";
import { GetStaticPropsContext } from "next";
import Navbar from "../components/navbar";
import { BlogPost } from "../models/blog";
import { getAllPosts, getPost } from "../s3";

export const getStaticPaths = async () => {

    const posts = (await getAllPosts())
        .map(post => ({params : { post: post.link }}));

    return {
        paths: posts,
        fallback: true
    };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const postLink = context.params?.post;
    if(typeof postLink !== "string") {
        return {
            notFound: true
        };
    }

    const blogPost = await getPost(postLink);
    if(blogPost == undefined) {
        return {
            notFound: true
        };
    }

    return {
        props: blogPost
    };
};

export default function PostPage({ title, description, content }: BlogPost) {
    return (
        <div className="w-screen min-h-screen bg-nord-500">
            <Navbar selected={null} />
            <div className="mx-auto py-16 px-8 w-fit">
                <div className="text-4xl font-bold">{ title }</div>
                <div className="text-xl font-medium italic text-gray-500">{ description }</div>
                <div 
                    className="mt-4 prose lg:prose-xl" 
                    dangerouslySetInnerHTML={{__html: marked.parse(content ?? "")}}
                >

                </div>
            </div>

        </div>

    );
}