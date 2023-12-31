import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { api } from "~/utils/api";

interface SaveButtonProps {
  language: string;
  editorContent: string;
  problemId: number;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  editorContent,
  language,
  problemId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();

  const handleSaveMutation = api.saveStates.saveProblemCode.useMutation();

  const cleanEditorText = JSON.stringify(editorContent);

  const codeText = cleanEditorText.substring(1, cleanEditorText.length - 1);

  // if mutate() is not a Promise, you don't need to use await.
  const saveEditor = (): void => {
    handleSaveMutation.mutate({
      language: language,
      problemId: problemId,
      codeText: codeText,
      clerkId: user?.id || "",
    });
  };

  const handleClick = () => {
    setIsLoading(true);
    try {
      saveEditor();
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`hover rounded border border-neutral-500 bg-neutral-800 px-2 py-1 text-xs text-neutral-300 transition-colors hover:border-easy hover:text-easy ${
        isLoading ? "blinkBorder" : ""
      }`}
    >
      {isLoading ? "Saving" : "Save"}
    </button>
  );
};

export default SaveButton;
