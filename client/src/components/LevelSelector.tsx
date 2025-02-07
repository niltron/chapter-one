import {useEffect, useState} from "react";
import WordPartsList from "./WordPartsList.tsx";
import {Level} from "../types/Level.ts";

/** A component that displays a level selector, whose values are loaded from the /phonics_levels endpoint.
 * The current level default to null, and is updated when the user selects a new level.
 * That new level then triggers a fetch to the /phonics_levels/:id/word_parts endpoint, which is used to update the content of the page.
 */
const LevelSelector = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [level, setLevel] = useState<string>("");

  useEffect(() => {
    // load levels from http://localhost:3000/phonics_levels
    fetch("/phonics_levels")
      .then((response) => response.json())
      .then((data) => {
        setLevels(data as Level[]);
      })
      .catch((error) => { console.error("Error fetching levels", error); });
  }, []);

  return (
    <div>
      <h1 className="text-2xl my-4">Phonics Level</h1>
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
      </select>
      <hr />
      {level && <WordPartsList levelId={level} />}
    </div>
  );
}

export default LevelSelector;
