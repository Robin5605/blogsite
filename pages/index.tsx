import { Fragment, useState } from "react";
import { BlogPreview } from "../components/blog";
import Navbar from "../components/navbar";
import { Listbox, Transition } from "@headlessui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import { BlogPost, BlogPostPreview, getAllPosts } from "../common/contentful";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps: GetServerSideProps<{posts: BlogPostPreview[], tags: string[]}> = async () => {
  const posts = await getAllPosts();
  const tags = new Set(
    posts
        .map(post => post.tags)
        .reduce((prev, curr) => prev.concat(curr), [])
  );

  return {
    props: {
      posts,
      tags: Array.from(tags),
    }
  };
}

interface TagFilterComponentProps {
  tags: string[],
  selectedTags: string[],
  setSelectedTags: (tags: string[]) => void,
}
function TagFilterComponent({ tags, selectedTags, setSelectedTags }: TagFilterComponentProps) {
  return (
    <div className="relative">
      <Listbox 
        value={selectedTags}
        onChange={setSelectedTags}
        as="div"
        multiple
      >
        <Listbox.Button className="flex items-center space-x-2 cursor-pointer bg-nord-700 dark:bg-nord-100 dark:text-white p-2 rounded-md shadow-sm" as="div">
          <span>Filter Tags</span>
          <span><BsFilter /></span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options as="div" className="flex flex-col fixed mt-1 bg-nord-700 dark:bg-nord-100 shadow-md rounded-md overflow-hidden outline-none">
            {tags.map((tag, index) => (
              <Listbox.Option
                key={index}
                value={tag}
                disabled={false}
                as={Fragment}
                >
                  {({ active, selected }) => (
                    <div 
                      className={`p-3 flex justify-between items-center space-x-4 cursor-pointer ${active ? "bg-frost-400 text-white" : ""}`}>
                      <span>
                        {tag}
                      </span>

                      <span className={`text-lg ${selected ? 'visible' : 'invisible'}`}>
                        <AiOutlineCheck />
                      </span>
                    </div>
                  )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}

export default function Home({ posts, tags }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  return (
    <div className="flex flex-col min-h-screen w-screen bg-nord-500 dark:bg-nord-200">
        <Head>
          <title>Home</title>
        </Head>
        <Navbar selected="home"/>
        <div className="container mx-auto my-16 text-black dark:text-white ">
          <div className="w-full md:w-1/2 mx-auto space-y-2 p-6">
            <div className="flex justify-end">
              {
                tags.length === 0
                ? null
                : <TagFilterComponent 
                    tags={tags} 
                    selectedTags={selectedTags} 
                    setSelectedTags={(tags) => setSelectedTags(tags)}
                  />
              }
            </div>
            <div className="flex flex-col space-y-8">
              { posts.length == 0
                ? <p className="mx-auto text-center">No posts yet. Stay tuned!</p>
                : selectedTags.length === 0
                  ? posts.map(post => <BlogPreview post={post} key={post.id}/>)
                  : posts
                    .filter(post => post.tags.some(tag => selectedTags.includes(tag)))
                    .map(post => <BlogPreview post={post} key={post.id}/>) }
            </div>
          </div>
        </div>
    </div>
  );
}
