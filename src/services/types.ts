export enum Role {
  ADMIN = "ADMIN",
  CARETAKER = "CARETAKER",
  VETERINARIAN = "VETERINARIAN",
  BIOLOGIST = "BIOLOGIST"
}

export type User = {
  id?: string;
  login: string;
  password: string;
  role?: Role;
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

export type Annotation = {
  id?: string;
  title: string;
  description: string;
  author: User;
  animal: Animal;
  createdAt: string;
  tags: string[];
}

export type AnnotationRequest = {
  id?: string;
  title: string;
  description: string;
  authorId?: string;
  animalId?: string;
  tags?: string[];
};
