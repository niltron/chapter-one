import {FC, useEffect, useState} from "react";
import {WordPart} from "../types/WordPart.ts";

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

  return (
    <div>
      <h2>Word Parts</h2>
      {wordParts.map((wordPart) => (
        <button key={wordPart.id} type="button"
                onClick={() => handleWordPartClick(wordPart.id)}>{wordPart.label}</button>
      ))}
      <hr />
      {selectedWordPart && <p>{selectedWordPart.label}</p>}
    </div>
  );
};

export default WordPartsView;
