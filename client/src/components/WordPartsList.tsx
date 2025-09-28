import { useState } from "react";
import { WordPart } from "../types/WordPart";
import WordPartDetail from "./WordPartDetail";
import { useWordPartMut, useWordParts } from "../queries/wordPart.query";

interface WordPartsViewProps {
  levelId: string;
}

export default function WordPartsList({ levelId }: WordPartsViewProps) {
  const [wordParts, setWordParts] = useState<WordPart[]>([]);
  const [selectedWordPart, setSelectedWordPart] = useState<WordPart | null>(null);
  const { data, isLoading, isError, error, isSuccess } = useWordParts(Number(levelId));
  const { mutate, isError: isErrorMutation } = useWordPartMut();

  if (isSuccess && data && wordParts.length === 0) {
    setWordParts(data);
  }

  const handleWordPartClick = (wordPartId: number) => {
    setSelectedWordPart(wordParts.find((wordPart) => wordPart.id === wordPartId) || null);
  }

  const handleActionCallback = (updatedWordPart: WordPart) => {
    setSelectedWordPart(updatedWordPart);
    setWordParts(wordParts.map((wp) => wp.id === updatedWordPart.id ? updatedWordPart : wp));
  }

  const handleNeedsWork = () => {
    mutate({
      ...selectedWordPart!,
      status: "needs_practice"
    }, {
      onSuccess: handleActionCallback,
    });
  }

  const handleMastered = () => {
    mutate({
      ...selectedWordPart!,
      status: "mastered"
    }, {
      onSuccess: handleActionCallback,
    });
  }

  return (
    <div className="my-4">
      <h2 className="text-xl mb-4">Word Parts</h2>

      {isLoading && <div className="mr-2 mb-2 px-2 py-1 border rounded hover:bg-gray-200 cursor-pointer">Loading...</div>}

      {isError && <div>Error: {(error as Error).message}</div>}



      {!isLoading && !isError && wordParts.length === 0 && (
        <div>No word parts found for this level.</div>
      )}

      {wordParts.map((wordPart) => (
        <button key={wordPart.id} type="button"
          className="mr-2 mb-2 px-2 py-1 border rounded hover:bg-gray-200 cursor-pointer"
          onClick={() => handleWordPartClick(wordPart.id)}>{wordPart.label}</button>
      ))}

      <hr />

      {selectedWordPart &&
        <WordPartDetail
          wordPart={selectedWordPart}
          onNeedsWork={handleNeedsWork}
          onMastered={handleMastered} />}

      {isErrorMutation && <div className="mr-2 mb-2 px-2 py-1 border rounded hover:bg-gray-200 text-center" > Error updating word part status</div>}
    </div>
  );
};
