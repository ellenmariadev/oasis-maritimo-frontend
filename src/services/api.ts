export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://oasis-maritimo-afe4c920a559.herokuapp.com/api/v1";

export async function getCheckConnection() {
  const result = await fetch(BASE_URL);
  const connection = await result.json();
  console.log(connection);
  return connection;
}
