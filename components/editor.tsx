"use client";

import React, { FC, useEffect, useState } from "react";
import { Editor as EditorClass, JSONContent } from "@tiptap/core";
import CharacterCount from "@tiptap/extension-character-count";
import { BubbleMenuProps, EditorContent, FloatingMenu, FloatingMenuProps, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, NumberedListLeft } from "iconoir-react";
import { useDebouncedCallback } from "use-debounce";

import useLocalStorage from "@/lib/hooks/use-local-storage";
import { cn, debounce } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";

export const getPrevText = (
  editor: Editor,
  {
    chars,
    offset = 0,
  }: {
    chars: number;
    offset?: number;
  }
) => {
  // for now, we're using textBetween for now until we can figure out a way to stream markdown text
  // with proper formatting: https://github.com/steven-tey/novel/discussions/7
  return editor.state.doc.textBetween(
    Math.max(0, editor.state.selection.from - chars),
    editor.state.selection.from - offset,
    "\n"
  );
  // complete(editor.storage.markdown.getMarkdown());
};

export type EditorProps = {
  defaultValue?: JSONContent | string;
  onUpdate?: (editor?: EditorClass) => void | Promise<void>;
  onDebouncedUpdate?: (editor?: EditorClass) => void | Promise<void>;
  debounceDuration?: number;
  storageKey?: string;
};

type EditorFloatingMenuProps = Omit<FloatingMenuProps, "children"> & { limit: number };

export const EditorFloatingMenu: FC<EditorFloatingMenuProps> = (props) => {
  const floatingMenuProps: EditorFloatingMenuProps = {
    ...props,
    shouldShow: ({ state, editor }) => {
      const { selection } = state;

      // don't show menu if the limit is reached
      if (props.editor?.storage.characterCount.characters() === props.limit) {
        return false;
      }
      return true;
    },
  };

  return (
    <FloatingMenu
      {...floatingMenuProps}
      tippyOptions={{ duration: 100 }}
      className="shadow-shadow flex space-x-2 rounded-md border border-border bg-background px-2 py-1 shadow"
    >
      <Toggle
        onClick={() => props.editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(props.editor?.isActive("heading", { level: 1 }) && "bg-foreground/10")}
      >
        H1
      </Toggle>
      <Toggle
        onClick={() => props.editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(props.editor?.isActive("heading", { level: 2 }) && "bg-foreground/10")}
      >
        H2
      </Toggle>
      <Toggle
        onClick={() => props.editor?.chain().focus().toggleBulletList().run()}
        className={cn(props.editor?.isActive("bulletList") && "bg-foreground/10")}
      >
        <List className="h-4" />
      </Toggle>
      <Toggle
        onClick={() => props.editor?.chain().focus().toggleOrderedList().run()}
        className={cn(props.editor?.isActive("orderedList") && "bg-foreground/10")}
      >
        <NumberedListLeft className="h-4" />
      </Toggle>
    </FloatingMenu>
  );
};

export const EditorHeader: FC<EditorFloatingMenuProps> = (props) => {
  return (
    <div className="flex flex-row items-stretch justify-between">
      <div>
        <Toggle
          onClick={() => props.editor?.chain().focus().toggleBold().run()}
          className={cn(props.editor?.isActive("bold") && "bg-foreground/10")}
        >
          <Bold className="h-4" />
        </Toggle>
        <Toggle
          onClick={() => props.editor?.chain().focus().toggleItalic().run()}
          className={cn(props.editor?.isActive("italic") && "bg-foreground/10")}
        >
          <Italic className="h-4" />
        </Toggle>
        <Toggle
          onClick={() => props.editor?.chain().focus().toggleBulletList().run()}
          className={cn(props.editor?.isActive("bulletList") && "bg-foreground/10")}
        >
          <List className="h-4" />
        </Toggle>
        <Toggle
          onClick={() => props.editor?.chain().focus().toggleOrderedList().run()}
          className={cn(props.editor?.isActive("orderedList") && "bg-foreground/10")}
        >
          <NumberedListLeft className="h-4" />
        </Toggle>
        <Toggle
          onClick={() => props.editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          className={cn(props.editor?.isActive("heading", { level: 1 }) && "bg-foreground/10")}
        >
          H1
        </Toggle>
        <Toggle
          onClick={() => props.editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(props.editor?.isActive("heading", { level: 2 }) && "bg-foreground/10")}
        >
          H2
        </Toggle>
      </div>
      <div
        className={cn(
          "text-right text-xs text-muted-foreground transition-all duration-100",
          props.editor?.storage.characterCount.characters() / props.limit >= 0.9 && "text-[#FF7900]",
          props.editor?.storage.characterCount.characters() === props.limit &&
            "animate-bounce text-destructive repeat-1"
        )}
      >
        {props.editor?.storage.characterCount.characters()}/{props.limit} characters
      </div>
    </div>
  );
};

export const Editor = ({
  defaultValue,
  onUpdate = () => {},
  onDebouncedUpdate = () => {},
  debounceDuration = 750,
  storageKey = "productengineerjobs_jobpost__content",
}: EditorProps) => {
  const limit = 400;
  const [content, setContent] = useLocalStorage(storageKey, defaultValue);

  const [hydrated, setHydrated] = useState(false);

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    setContent(json);
    onDebouncedUpdate(editor);
  }, debounceDuration);

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "prose prose-sm lg:prose-lg m-5 focus:outline-none max-w-full",
      },
    },
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit,
      }),
    ],
    onUpdate: (e) => {
      onUpdate(e.editor);
      debouncedUpdates(e);
    },
    autofocus: "end",
  });

  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content);
      setHydrated(true);
    }
  }, [editor, content, hydrated]);

  if (!editor) {
    return null;
  }
  const html = editor.getHTML();
  console.log(html);
  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className="min-h-[500px] w-full rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    >
      {editor && <EditorHeader editor={editor} limit={limit} />}
      {editor && <EditorFloatingMenu editor={editor} limit={limit} />}
      <EditorContent editor={editor} />
    </div>
  );
};
