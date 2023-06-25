import React from "react";
import { Editor, OnMount } from "@monaco-editor/react";

type CodeEditorProps = {
  language: string;
  code: string;
  handleEditorChange: (value: string | undefined) => void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  code,
  handleEditorChange,
}) => {
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editor.onDidChangeModelContent(() => {
      handleEditorChange(editor.getValue());
    });
  };

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
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
