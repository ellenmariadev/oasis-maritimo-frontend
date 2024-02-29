import { BASE_URL } from "./api";
import { Animal, AnimalRequest, Specie } from "./types";

const URL = BASE_URL + "/animals";

export async function getAnimals() {
  const result = await fetch(URL, {
    next: { revalidate: 3600 },
  });
  const data = (await result.json()) as Animal[];
  return data;
}

export async function createAnimal(
  image: File | null,
  data: AnimalRequest,
  token?: string
) {
  const formData = new FormData();

  if (image) {
    formData.append("image", image, image.name);
  }
  
  formData.append("animal", new Blob([JSON.stringify(data)], {
    type: "application/json"
  }));

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function getSpecies() {
  const response = await fetch(BASE_URL + "/species", {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as Specie[];
  return data;
}


export async function getAnimal(id: string) {
  const response = await fetch(URL + `/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as Animal;
  return data;
}

export async function updateAnimal(
  data: AnimalRequest,
  token?: string
) {
  const response = await fetch(URL + `/${data.id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });

  console.log(response);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function deleteAnimal(id: string, token: string) {
  const result = await fetch(URL + `/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!result.ok) {
    throw new Error(`HTTP error! status: ${result.status}`);
  }

  return null;
}