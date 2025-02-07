import {useEffect, useState} from "react";
import WordPartsView from "./WordPartsView.tsx";

/** A component that displays a level selector, whose values are loaded from the /phonics_levels endpoint.
 * The current level default to null, and is updated when the user selects a new level.
 * That new level then triggers a fetch to the /phonics_levels/:id/word_parts endpoint, which is used to update the content of the page.
 */
const LevelSelector = () => {
  const [levels, setLevels] = useState<{ id: number; name: string }[]>([]);
  const [level, setLevel] = useState<string>("");

  useEffect(() => {
    // load levels from http://localhost:3000/phonics_levels
    fetch("/phonics_levels")
      .then((response) => response.json())
      .then((data) => {
        setLevels(data.map((level: {id: number, level_number: string}) => ({ id: level.id, name: level.level_number })));
      })
      .catch((error) => { console.error("Error fetching levels", error); });
  }, []);

  return (
    <div>
      <h1>Phonics Level</h1>
      <select
        value={level}
        onChange={(e) => {
          setLevel(e.target.value);
        }}
      >
        <option value="">Select a level</option>
        {levels.map((level) => (
          <option value={level.id} key={level.id}>
            Level {level.name}
          </option>
        ))}
      </select>
      <hr />
      {level && <WordPartsView levelId={level} />}
    </div>
  );
}

export default LevelSelector;
