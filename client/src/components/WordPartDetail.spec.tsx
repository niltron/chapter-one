import { describe, expect, it, vi } from "vitest";
import WordPartDetail from "./WordPartDetail.tsx";
import { fireEvent, render, screen } from "@testing-library/react";
import { WordPart } from "../types/WordPart.ts";

describe("WordPartDetail", () => {
    it("calls the onNeedsWork callback when the Needs Work button is clicked", () => {
        const onNeedsWork = vi.fn();
        const onMastered = vi.fn();

        const wordPart: WordPart = { id: 1, label: "test", phonics_level_id: 1 };

        render(<WordPartDetail wordPart={wordPart} onMastered={onMastered} onNeedsWork={onNeedsWork} />);

        const needsWorkButton = screen.getAllByText("Needs work")[0];
        fireEvent.click(needsWorkButton);

        expect(onNeedsWork).toHaveBeenCalled();
    });

    it("calls the onMastered callback when the Mastered button is clicked", () => {
        const onNeedsWork = vi.fn();
        const onMastered = vi.fn();

        const wordPart: WordPart = { id: 1, label: "test", phonics_level_id: 1 };

        render(<WordPartDetail wordPart={wordPart} onMastered={onMastered} onNeedsWork={onNeedsWork} />);

        screen.getAllByRole("button").map((button) => {
            if (button.textContent === "Got it!") {
                return button.click();
            }
        });

        expect(onMastered).toHaveBeenCalled();
    });
});
