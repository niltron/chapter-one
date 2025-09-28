import { useState } from "react";
import WordPartsList from "./WordPartsList";
import { Level } from "../types/Level";
import { useLevels } from "../queries/levels";

/** A component that displays a level selector, whose values are loaded from the /phonics_levels endpoint.
 * The current level default to null, and is updated when the user selects a new level.
 * That new level then triggers a fetch to the /phonics_levels/:id/word_parts endpoint, which is used to update the content of the page.
 */
const LevelSelector = () => {
  const [level, setLevel] = useState<string>("");
  const [levels, setLevels] = useState<Level[]>([]);
  const { data, isLoading, isError, error, isSuccess } = useLevels();

  if (isSuccess && data && levels.length === 0) {
    setLevels(data);
  }

  return (
    <div>
      <h1 className="text-2xl my-4">Phonics Level</h1>

      {isLoading && <div>Loading...</div>}

      {isError && <div>Error: {(error as Error).message}</div>}

      {!isLoading && !isError && levels.length === 0 && (
        <div>No levels found.</div>
      )}

      {levels.length > 0 &&
        <select
          value={level}
          onChange={(e) => {
            setLevel(e.target.value);
          }}
          className="w-full mb-4"
        >
          <option value="">Select a level</option>
          {levels.map((level) => (
            <option value={level.id} key={level.id}>
              Level {level.level_number}
            </option>
          ))}
        </select>}
      <hr />

      {level && <WordPartsList levelId={level} />}
    </div>
  );
}

export default LevelSelector;
