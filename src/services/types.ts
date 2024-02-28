export type User = {
  id?: string;
  login: string;
  password: string;
};

export type Specie = {
  id: string;
  name: string;
};

export type Animal = {
  id?: string;
  name: string;
  age: number;
  specie: Specie | string;
  arrivalDate: string;
  diet: string;
  weight: number;
  length: number;
  habitat: string;
  imageUrl?: string;
};

export type AnimalRequest = {
  id?: string;
  name: string;
  age: number;
  speciesId: string;
  arrivalDate: string;
  diet: string;
  weight: number;
  length: number;
  habitat: string;
  imageUrl?: string;
};