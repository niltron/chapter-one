import {WordPart} from "../types/WordPart.ts";
import {FC} from "react";

interface LargeWordPartProps {
  wordPart: WordPart;
}

const LargeWordPart: FC<LargeWordPartProps> = ({wordPart}) => {
  return (
    <div data-testid="largeWordPart">
      {wordPart.label}
    </div>
  );
};

export default LargeWordPart;
