import { BASE_URL } from "./api";
import { User } from "./types";

export async function getUsers() {
  const result = await fetch(BASE_URL + "/users", { cache: "no-store" });
  const response = await result.json();
  return response;
}

export async function createUser(user: User, token: string) {
  const result = await fetch(BASE_URL + "/auth/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  });

  if (!result.ok) {
    throw new Error(`HTTP error! status: ${result.status}`);
  }

  return await result.json();

}
export async function deleteUser(id: string, token: string) {
  const result = await fetch(BASE_URL + "/users/" + id, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!result.ok) {
    throw new Error(result.statusText);
  }

  if (result.status !== 204) {
    const response = await result.json();
    return response;
  }

  return null;
}