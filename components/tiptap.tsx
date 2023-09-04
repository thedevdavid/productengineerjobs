"use client";

import React from "react";
import CharacterCount from "@tiptap/extension-character-count";
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, NumberedListLeft } from "iconoir-react";

import { cn, debounce } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";

const request = debounce((value) => {
  alert(`request: ${value}`);
}, 1000);
const Tiptap = () => {
  const limit = 400;

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg m-5 focus:outline-none",
      },
    },
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit,
      }),
    ],
    content: `
    <h2>
      Hi there,
    </h2>
    <p>
      this is a basic <em>basic</em> example of <strong>the editor</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
  `,
  });

  if (!editor) {
    return null;
  }
  return (
    <div className="rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
      <div className="flex flex-row items-stretch justify-between">
        <div>
          <Toggle
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(editor.isActive("bold") && "bg-foreground/10")}
          >
            <Bold className="h-4" />
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(editor.isActive("italic") && "bg-foreground/10")}
          >
            <Italic className="h-4" />
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(editor.isActive("bulletList") && "bg-foreground/10")}
          >
            <List className="h-4" />
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(editor.isActive("orderedList") && "bg-foreground/10")}
          >
            <NumberedListLeft className="h-4" />
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={cn(editor.isActive("heading", { level: 1 }) && "bg-foreground/10")}
          >
            H1
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={cn(editor.isActive("heading", { level: 2 }) && "bg-foreground/10")}
          >
            H2
          </Toggle>
        </div>
        <div
          className={cn(
            "text-right text-xs text-muted-foreground transition-all duration-100",
            editor.storage.characterCount.characters() / limit >= 0.9 && "text-[#FF7900]",
            editor.storage.characterCount.characters() === limit && "animate-bounce text-destructive repeat-1"
          )}
        >
          {editor.storage.characterCount.characters()}/{limit} characters
        </div>
      </div>

      {editor && (
        <FloatingMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="shadow-shadow flex space-x-2 rounded-md border border-border bg-background px-2 py-1 shadow"
        >
          <Toggle
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={cn(editor.isActive("heading", { level: 1 }) && "bg-foreground/10")}
          >
            H1
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={cn(editor.isActive("heading", { level: 2 }) && "bg-foreground/10")}
          >
            H2
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(editor.isActive("bulletList") && "bg-foreground/10")}
          >
            <List className="h-4" />
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(editor.isActive("orderedList") && "bg-foreground/10")}
          >
            <NumberedListLeft className="h-4" />
          </Toggle>
        </FloatingMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
