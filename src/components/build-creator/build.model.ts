export interface Build {
    creatorId: string;
    heroName: string;
    heroImageUrl: string;
    items: Item[]; 
}

export interface Item {
    itemName: string;
    itemImage: string;
}
