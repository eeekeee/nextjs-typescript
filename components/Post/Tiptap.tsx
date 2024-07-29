"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "@/components/Post/ToolBar";
import Underline from "@tiptap/extension-underline";

const Tiptap = ({
  onChange,
  content,
}: {
  onChange: (newContent: string) => void;
  content: string;
}) => {
  const changeHandler = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
    ],
    editorProps: {
      attributes: {
        // class:
        //   "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-black items-start w-full gap-3 font-medium text-[20px] pt-4 rounded-bl-md rounded-br-md outline-none",
        class:
          "prose  max-w-full min-h-[300px] text-left px-4 mt-4 border border-gray-border rounded-lg",
      },
    },
    onUpdate: ({ editor }) => {
      changeHandler(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="w-full px-4 border-black border-4 p-4">
      <ToolBar editor={editor} content={content} />
      <EditorContent editor={editor} style={{ whiteSpace: "pre-line" }} />
    </div>
  );
};

export default Tiptap;
