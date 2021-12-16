/**
 * Main Recipe interface
 */
export interface Recipe {
    image: object | null;
    imageUrl: string;
    ingredients: { value: string; }[];
    url: string;
    label: string;
    vegetarian: boolean;
    numOfPeople: string;
    id: string;
    likes: number;
    date: string;
    creatorId: string;
}