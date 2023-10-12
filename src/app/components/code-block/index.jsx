"use client";
import { CopyBlock, nord, hopscotch } from "react-code-blocks";

export default function BlogCodeBlock({
  code,
  language,
  showLineNumbers,
  startingLineNumber,
}) {
  return (
    <CopyBlock
      text={code}
      language={language}
      showLineNumbers={showLineNumbers}
      startingLineNumber={startingLineNumber}
      theme={nord}
      codeBlock
    />
  );
}
