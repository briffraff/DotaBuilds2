export interface Build {
    id: string;
    creatorId: string;
    heroName: string;
    heroImageUrl: string;
    items: Item[]; 
}

export interface Item {
    itemName: string;
    itemImage: string;
}
