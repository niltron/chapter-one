import { useMutation, useQuery } from "@tanstack/react-query";

import { WordPart } from "../types/WordPart";

/**
 *  Fetch word parts for a given phonics level from the API
 * 
 * @param levelId - the id of the phonics level
 * @returns  the word parts for the given phonics level
 */
export const fetchWordParts = async (levelId: number): Promise<WordPart[]> => {
    const response = await fetch(`/phonics_levels/${levelId}/word_parts`);

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return await response.json();
}


/**
 *  Custom hook to fetch word parts for a given phonics level
 * 
 * @param levelId - the id of the phonics level
 * @returns the word parts for the given phonics level
 */
export const useWordParts = (levelId: number) =>
    useQuery<WordPart[]>({
        queryKey: ['WORD_PARTS', levelId],
        queryFn: () => fetchWordParts(levelId),
    });


/**
 *  Custom hook to mutate (update) a word part for a given phonics level
 * 
 * @param levelId  - the id of the phonics level
 * @returns the mutation object
 * 
 */
export const useWordPartMut = () => useMutation({

    mutationFn: async (wordPart: WordPart) => {
        const response = await fetch(`/phonics_levels/${wordPart.phonics_level_id}/word_parts/${wordPart.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(wordPart),
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        return await response.json();
    },
});
