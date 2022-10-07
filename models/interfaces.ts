//Interfaces for every model

import {Types} from "mongoose";


export interface PetInterface{
  _id: Types.ObjectId;
  name: string;
  owner: UserInterface;
  owner_name: string;
  species: string;
  age: number;
  poddy_trained: boolean;
  diet: string[];
  image_url: string;
  likes: string[];
  dislikes: string[];
}
  

export interface UserInterface {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  pets?: PetInterface[];
}