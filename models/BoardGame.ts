export class BoardGame{
    private id: number;              
    private name: string;            
    private rating: number;         
    private category: number[];
    constructor(
        id: number,
        name: string,
        category: number[],
        rating: number
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.rating = rating;
    }
    public get_id(): number {
        return this.id;
    }
    public get_name(): string {
        return this.name;
    }
    public get_rating(): number {
        return this.rating;
    }
    public get_category(): number[] {
        return this.category;
    }
}