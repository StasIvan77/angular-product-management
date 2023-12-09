import { Tag } from "../shared/tag.model";


export class Product {
    public name: string;
    public description: string;
    public imagePath: string;
    public price: number;
    public tags: Tag[];

    constructor(name: string, description: string, imagePath: string, price: number, tags: Tag[]){
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.price = price;
        this.tags = tags;
    }
}