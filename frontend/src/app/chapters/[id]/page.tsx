import React from "react";
import { caps } from "../../data/caps"; // Ajuste o caminho conforme necessário
import ChapterData from "../../../Components/Chapter/ChapterData";


type ChapterPageProps = {
  params: {
    id: string;
  };
};

const ChapterPage: React.FC<ChapterPageProps> = ({ params }) => {
  const { id } = params; // Captura o `id` da URL

  const selectedChapter = caps.find((chapter: { id: number; }) => chapter.id === parseInt(id));

  if (!selectedChapter) {
    return <div>Capítulo não encontrado.</div>;
  }

  return (
    <ChapterData
      title={selectedChapter.title}
      subtitle={selectedChapter.subtitle}
      paragraphs={selectedChapter.paragraphs}
    />
  );
};

export default ChapterPage;
