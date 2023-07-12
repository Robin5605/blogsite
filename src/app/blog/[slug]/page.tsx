import { getAllBlogs, getBlogBySlug } from "@/api";
import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { mangle } from "marked-mangle";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const blogs = await getAllBlogs();

    return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata(
    { params }: Props,
    _parent: ResolvingMetadata,
): Promise<Metadata> {
    const { slug } = params;
    const { title, description } = await getBlogBySlug(slug);

    return { title, description };
}

export default async function Page({ params }: Props) {
    const { slug } = params;
    const blog = await getBlogBySlug(slug);

    marked.use(mangle());
    marked.use(gfmHeadingId({ prefix: "my-prefix-" }));

    return (
        <div className="mx-auto py-16 px-8 w-fit">
            <div className="text-4xl font-bold dark:text-nord-700">
                {blog.title}
            </div>
            <div className="text-xl font-medium italic text-gray-500 dark:text-nord-500">
                {blog.description}
            </div>
            <div
                className="mt-4 prose lg:prose-xl dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: marked.parse(blog.content) }}
            ></div>
        </div>
    );
}
