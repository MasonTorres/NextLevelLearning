"use client";
import NextLevelLearning from "@/app/components/NextLevelLearning";
import nllDataFiles from "../content/nllDataFiles.json";

export default function Page({ params }: { params: { path0: string } }) {
  const contentPath = `${params.path0}`;
  const content = nllDataFiles.filter((file) => file.data.path === contentPath);
  return (
    <div>
      {content.length === 0 ? (
        <div>404</div>
      ) : (
        <NextLevelLearning
          content={content[0].data.data}
          description={content[0].data.description}
        />
      )}
    </div>
  );
}
