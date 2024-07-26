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
    extensions: [StarterKit, Underline],
    // content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      changeHandler(editor.getHTML());
    },
  });

  return (
    <div className="w-full px-4 border-black border-4 p-4">
      <ToolBar editor={editor} content={content} />
      <EditorContent editor={editor} style={{ whiteSpace: "pre-line" }} />
    </div>
  );
};

export default Tiptap;
