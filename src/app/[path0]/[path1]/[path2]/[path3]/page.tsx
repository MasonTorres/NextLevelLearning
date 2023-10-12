"use client";
import NextLevelLearning from "@/app/components/NextLevelLearning";
import nllDataFiles from "../../../../content/nllDataFiles.json";

export default function Page({
  params,
}: {
  params: { path0: string; path1: string; path2: string; path3: string };
}) {
  const contentPath = `${params.path0}/${params.path1}/${params.path2}/${params.path3}`;
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
