import { getAnimals, getSpecies } from "@/services/animals";
import { HomePage } from "./components/HomePage";
import { SidebarProvider } from "@/context/SidebarProvider";
import { getUsers } from "@/services/users";
import { getAnnotations } from "@/services/annotations";

export default async function Home() {
  const animals = await getAnimals();
  const species = await getSpecies();
  const users = await getUsers();
  const annotations = await getAnnotations();


  return (
    <SidebarProvider>
      <HomePage animals={animals} species={species} users={users} annotations={annotations} />
    </SidebarProvider>
  );
}
