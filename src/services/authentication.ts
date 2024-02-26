import { User } from "./types";

export async function login(data: User) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Falha ao realizar login");
  }

  const responseData = await response.json();

  localStorage.setItem("@token", responseData.token);
  localStorage.setItem("@login", responseData.username);
  localStorage.setItem("@role", responseData.role);

  return responseData;
}