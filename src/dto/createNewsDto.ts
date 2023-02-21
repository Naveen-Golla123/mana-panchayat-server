export class CreateNewsDto {
    public id:number;
    public title: string;
    public news: string;
    public imgUrl: string;
    public location: string;
    public metaDescription: string;
    public categoryId: number;
    public labels: number[];
} 