export interface PetFormInterface{
  name:string;
  species:string;
  age?:number;
  poddy_trained?:boolean;
  diet?:string[];
  image_url:string;
  likes?:string[];
  dislikes?:string[];
}