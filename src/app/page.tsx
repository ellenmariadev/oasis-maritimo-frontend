import { getAnimals, getSpecies } from "@/services/animals";
import { HomePage } from "./components/HomePage";

export default async function Home() {
  const animals = await getAnimals();
  const species = await getSpecies();

  return (
    <HomePage animals={animals} species={species} />
  );
}
