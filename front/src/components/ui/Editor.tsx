import { useEffect } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import CharacterCount from "@tiptap/extension-character-count";

import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  charLimit?: number;
}

export const RichTextEditor = ({
  value,
  onChange,
  charLimit = 500,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        listItem: false,
        code: false,
      }),
      BulletList,
      ListItem,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CharacterCount.configure({ limit: charLimit }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "ProseMirror min-h-32 p-4 outline-none prose prose-sm max-w-none focus:outline-none list-disc pl-6 space-y-2",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div>
      {/* Toolbar */}
      <div className="border border-gray-300 rounded-t-md bg-gray-50 p-2 flex flex-wrap gap-1">
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 ${
            editor.isActive("bold") ? "bg-gray-200" : ""
          }`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={14} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 ${
            editor.isActive("italic") ? "bg-gray-200" : ""
          }`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={14} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 ${
            editor.isActive("bulletList") ? "bg-gray-200" : ""
          }`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={14} />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 ${
            editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""
          }`}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft size={14} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 ${
            editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""
          }`}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter size={14} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 ${
            editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""
          }`}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight size={14} />
        </Button>
      </div>

      <div className="border border-gray-300 border-t-0 rounded-b-md">
        <EditorContent editor={editor} />
      </div>

      <div className="text-right text-xs text-gray-500 mt-1">
        {editor.storage.characterCount.characters()}/{charLimit} characters •{" "}
        {editor.storage.characterCount.words()} words
      </div>
    </div>
  );
};
