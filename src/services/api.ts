export async function getCheckConnection() {
  const result = await fetch(`${process.env.API_URL}`);
  const connection = await result.json();
  console.log(connection);
  return connection;
}
