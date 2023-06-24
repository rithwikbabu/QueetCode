import React from "react";
import { Editor } from "@monaco-editor/react";

type CodeEditorProps = {
  language: string;
  code: string;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ language, code }) => {
  return (
    <div className="h-full w-full">
      <Editor
        theme="vs-dark"
        defaultLanguage={language}
        defaultValue={
          code ? code : "Error loading code, please refresh the page!"
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
