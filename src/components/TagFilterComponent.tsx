import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";

interface TagFilterComponentProps {
    tags: string[];
    selectedTags: string[];
    setSelectedTags: (tags: string[]) => void;
}

export default function TagFilterComponent({
    tags,
    selectedTags,
    setSelectedTags,
}: TagFilterComponentProps) {
    return (
        <div className="relative">
            <Listbox
                value={selectedTags}
                onChange={setSelectedTags}
                as="div"
                multiple
            >
                <Listbox.Button
                    className="flex items-center space-x-2 cursor-pointer bg-nord-700 dark:bg-nord-100 dark:text-white p-2 rounded-md shadow-sm"
                    as="div"
                >
                    <span>Filter Tags</span>
                    <span>
                        <BsFilter />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options
                        as="div"
                        className="flex flex-col fixed mt-1 bg-nord-700 dark:bg-nord-100 shadow-md rounded-md overflow-hidden outline-none"
                    >
                        {tags.map((tag, index) => (
                            <Listbox.Option
                                key={index}
                                value={tag}
                                disabled={false}
                                as={Fragment}
                            >
                                {({ active, selected }) => (
                                    <div
                                        className={`p-3 flex justify-between items-center space-x-4 cursor-pointer ${
                                            active
                                                ? "bg-frost-400 text-white"
                                                : ""
                                        }`}
                                    >
                                        <span>{tag}</span>

                                        <span
                                            className={`text-lg ${
                                                selected
                                                    ? "visible"
                                                    : "invisible"
                                            }`}
                                        >
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
