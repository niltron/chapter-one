import { useState } from "react";
import WordPartsList from "./WordPartsList";
import { Level } from "../types/Level";
import { useLevels } from "../queries/levels.query";

/** A component that displays a level selector, whose values are loaded from the /phonics_levels endpoint.
 * The current level default to null, and is updated when the user selects a new level.
 * That new level then triggers a fetch to the /phonics_levels/:id/word_parts endpoint, which is used to update the content of the page.
 */
export default function LevelSelector() {
  const [level, setLevel] = useState<number | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);
  const { data, isLoading, isError, error, isSuccess } = useLevels();

  if (isSuccess && data && levels.length === 0) {
    setLevels(data);
  }

  const handleLevelChange = (level: number) => {
    setLevel(level);
  }

  return (
    <div>
      <h1 className="text-2xl my-4">Phonics Level</h1>

      {isLoading && <div>Loading...</div>}

      {isError && <div>Error: {(error as Error).message}</div>}

      {!isLoading && !isError && levels.length === 0 && (
        <div>No levels found.</div>
      )}

      {levels.length > 0 && <div>
        <h2 className="text-xl mb-4">Selected Level:</h2>
        {levels.map((item) => {
          return (<button key={item.id} type="button"
            className={`mr-2 mb-2 px-2 py-1 border rounded hover:bg-gray-200 cursor-pointer ${(level != null && level >= item.id) ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => handleLevelChange(item.id)}>{item.id}</button>)
        })}
      </div>}
      <hr />
      {level && <WordPartsList levelId={level} />}
    </div>
  );
}
