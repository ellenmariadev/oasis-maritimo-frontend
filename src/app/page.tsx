import { getCheckConnection } from "@/services/api";

export default async function Home() {
  const checkConnection = await getCheckConnection();

  return (
    <main>
      {checkConnection.message}
    </main>
  );
}
