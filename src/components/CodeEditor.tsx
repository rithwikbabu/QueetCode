import React from "react";
import { Editor } from "@monaco-editor/react";

type CodeEditorProps = {
  code: string;
  language: string;
  onChange: (newValue: string, e: any) => void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ language }) => {
  return (
    <div className="h-full w-full">
      <Editor
        theme="vs-dark"
        defaultLanguage={language}
        defaultValue={
          "class Solution:\n\tdef maxProfit(self, k: int, prices: List[int]) -> int:"
        }
        options={{
          scrollBeyondLastLine: false,
          fontSize: 13,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
        }}
      />
    </div>
  );
};

export default CodeEditor;
