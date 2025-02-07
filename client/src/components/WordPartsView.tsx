import {FC, useEffect, useState} from "react";
import {WordPart} from "../types/WordPart.ts";
import LargeWordPart from "./LargeWordPart.tsx";

interface WordPartsViewProps {
  levelId: string;
}

const WordPartsView: FC<WordPartsViewProps> = ({levelId}) => {
  const [wordParts, setWordParts] = useState<WordPart[]>([]);
  const [selectedWordPart, setSelectedWordPart] = useState<WordPart | null>(null);

  useEffect(() => {
    // load word parts from http://localhost:3000/phonics_levels/:id/word_parts
    fetch(`/phonics_levels/${levelId}/word_parts`)
      .then((response) => response.json())
      .then((data) => {
        setWordParts(data as WordPart[]);
      })
      .catch((error) => {
        console.error("Error fetching word parts", error);
      });
  }, [levelId]);

  const handleWordPartClick = (wordPartId: number) => {
    setSelectedWordPart(wordParts.find((wordPart) => wordPart.id === wordPartId) || null);
  }

  const handleNeedsWork = () => {
    // TODO
  }

  const handleMastered = () => {
    // TODO
  }

  return (
    <div className="my-4">
      <h2 className="text-xl mb-4">Word Parts</h2>
      {wordParts.map((wordPart) => (
        <button key={wordPart.id} type="button"
                className="mr-2 mb-2 px-2 py-1 border rounded hover:bg-gray-200 cursor-pointer"
                onClick={() => handleWordPartClick(wordPart.id)}>{wordPart.label}</button>
      ))}
      <hr/>
      {selectedWordPart &&
        <LargeWordPart wordPart={selectedWordPart} onNeedsWork={handleNeedsWork} onMastered={handleMastered}/>}
    </div>
  );
};

export default WordPartsView;
