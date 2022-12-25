import Link from "next/link";
import { BlogPost } from "../models/blog";

interface TagComponentProps {
    text: string,
}

function TagComponent({ text }: TagComponentProps) {
    return <div className="bg-frost-400 text-white rounded-sm px-4 py-1">{ text }</div>;
}

interface BlogPreviewProps {
    post: BlogPost
}

export function BlogPreview({ post }: BlogPreviewProps) {
    return (
        <div className="flex flex-col hover:shadow-xl duration-100 w-full bg-nord-700 dark:bg-nord-100 dark:text-white text-black shadow-lg rounded-lg px-6 py-4">
            <div className="flex flex-col">
                <div className="text-3xl font-semibold duration-200 hover:text-blue-500 mb-2">
                    <Link href={"/" + post.link}>
                        { post.title }
                    </Link>
                </div>
                <p>{ post.description }</p>
                <div className="flex flex-wrap gap-2 mt-8">
                    { post.tags.map(tag => <TagComponent text={tag} key={tag}/>) }
                </div>
            </div>
        </div>
    );
}
