import { Tag } from "../shared/tag.model";


export class Product {
    public id: number;
    public name: string;
    public description: string;
    public imagePath: string;
    public price: number;
    public tags: Tag[];

    constructor(id: number, name: string, description: string, imagePath: string, price: number, tags: Tag[]){
        this.id = id;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.price = price;
        this.tags = tags;
    }
}