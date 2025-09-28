export type WordPart = {
  id: number;
  label: string;
  status?: "mastered" | "needs_work";
  phonics_level_id: number;
}
