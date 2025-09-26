"use client";

import { useEffect } from "react";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { Button } from "@/components/ui/button";

type Props = {
  initialHTML: string | null | undefined;
  onSave: (html: string) => Promise<void>;
  onCancel: () => void;
  isPending?: boolean;
};

export default function AboutEditor({ initialHTML, onSave, onCancel, isPending }: Props) {
  const editor = useCreateBlockNote({});

  useEffect(() => {
    if (!initialHTML) return;
    try {
      const blocks = editor.tryParseHTMLToBlocks(initialHTML);
      if (blocks) {
        editor.replaceBlocks(editor.document, blocks);
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialHTML]);

  return (
    <div className="text-left">
      <BlockNoteView
        editor={editor}
        theme="dark"
        style={{ width: 560 }}
        className="rounded-md border border-white/10"
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button
          disabled={isPending}
          onClick={async () => {
            const html = await editor.blocksToFullHTML(editor.document);
            await onSave(html);
          }}
          className="btn-gold"
        >
          Save
        </Button>
      </div>
    </div>
  );
}


