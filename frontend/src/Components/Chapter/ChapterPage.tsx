'use client';
import React from "react";
import { caps } from "../../app/data/caps";
import ChapterData from "./ChapterData";

type ChapterPageProps = {
  params: {
    id: string;
  };
};

const ChapterPage: React.FC<ChapterPageProps> = ({ params }) => {
  const selectedChapter = caps.find((chapter) => chapter.id === parseInt(params.id));

  if (!selectedChapter) {
    return <div>Capítulo não encontrado.</div>;
  }

  return (
    <>
      <ChapterData
        title={selectedChapter.title}
        subtitle={selectedChapter.subtitle}
        paragraphs={selectedChapter.paragraphs}
      />
    </>
  );
};

export default ChapterPage;
