import { BASE_URL } from "./api";
import { Annotation, AnnotationRequest } from "./types";

const URL = BASE_URL + "/annotations";

export async function getAnnotations() {
  const result = await fetch(URL, {cache: "no-store"});
  const data = (await result.json()) as Annotation[];
  return data;
}

export async function getAnnotation(id: string) {
  const response = await fetch(URL + `/${id}`);
  
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  
  const data = (await response.json()) as Annotation;
  return data;
}

export async function createAnnotation(annotation: AnnotationRequest, token: string) {
  const result = await fetch(URL, {
    method: "POST",
    body: JSON.stringify(annotation),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!result.ok) {
    throw new Error(`HTTP error! status: ${result.status}`);
  }

  return await result.json();
}

export async function updateAnnotation(annotation: AnnotationRequest, token: string) {
  const result = await fetch(URL + `/${annotation.id}`, {
    method: "PUT",
    body: JSON.stringify(annotation),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!result.ok) {
    throw new Error(`HTTP error! status: ${result.status}`);
  }

  return await result.json();
}

export async function deleteAnnotation(id: string, token: string) {
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