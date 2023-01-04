import Navbar from "../components/navbar";
import picture from "../public/picture.png";
import Image from "next/image";
import { FaDiscord, FaEnvelope, FaGithub } from "react-icons/fa";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-nord-500 dark:bg-nord-200 dark:text-white">
        <Navbar selected="about"/>
        <div className="flex flex-col mx-auto my-16">
          <div className="rounded-full overflow-hidden mx-auto w-fit shadow-md">
            <Image src={picture} alt="Profile Picture" height={128} width={128}/>
          </div>
          <div className="mx-auto">
            <h1 className="text-3xl font-bold mt-8">👋 Hi! I'm Robin</h1>
          </div>
          <div className="text-center p-4 text-nord-100 dark:text-nord-700 md:w-1/2 lg:w-1/3 mx-auto space-y-4">
            <p>
              Hello! Thanks for dropping by! I'm a high school senior who loves working with computers.
              I mainly work on software projects, in Javascript or Typescript, Python, and Rust (my personal favourite.)
              Aside from software, I enjoy computer networking as well, and because of this I hope to be a network engineer for a career.
              I spent most of my time at {' '}
                <a target={"_blank"} href={"https://www.pythondiscord.com/"} className="text-indigo-700 dark:text-indigo-400">
                  Python Discord
                </a>
              {' '}, where we help people learn to code in the {' '}
              <a target={"_blank"} href={"https://www.python.org"} className="text-indigo-700 dark:text-indigo-400">
                Python
              </a>
              {' '} programming language. Drop by and say hi!
            </p>

            <p>This site is where I'll be writing about projects I'm working on, projects I'm planning, and general ideas. 
              These are all out of scope for a GitHub README, so I figured this would be a good place to write in.
            </p>

            <p>
              My Discord tag and GitHub are below if you want to get in contact.
            </p>
          </div>
        
          <div className="flex justify-center items-center space-x-4 p-4">
            <div className="flex items-center space-x-2 font-mono">
              <FaDiscord /> 
              <p>Robin J#1984</p>
            </div>

            <div className="flex items-center space-x-2 font-mono">
              <FaGithub />
              <a target={"_blank"} href={"https://github.com/Robin5605"}>
                Robin5605
              </a>
            </div>

            <div className="flex items-center space-x-2 font-mono">
              <FaEnvelope />
              <a href={"mailto:robin@robinj.xyz"}>
                robin@robinj.xyz
              </a>
            </div>
          </div>
        </div>
    </div>
  );
}
