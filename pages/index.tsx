import { BlogPreview } from "../components/blog";
import Navbar from "../components/navbar";
import { BlogPost } from "../models/blog";
import { getAllPosts } from "../s3";

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    }
  };
}


interface HomePageProps {
  posts: BlogPost[]
}
export default function Home({ posts }: HomePageProps) {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-nord-500">
        <Navbar selected="home"/>
        <div className="container mx-auto my-16 text-white ">
          <div className="w-10/12 md:w-1/2 mx-auto space-y-8 p-8">
            { posts.length == 0
              ? <p className="text-black mx-auto text-center">No posts yet. Stay tuned!</p>
              : posts.map(post => <BlogPreview post={post} key={post.link}/>) }
          </div>
        </div>
    </div>
  );
}
