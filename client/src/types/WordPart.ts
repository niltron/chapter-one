export type WordPart = {
  id: number;
  label: string;
  status?: "mastered" | "needs_practice";
  phonics_level_id: number;
}
