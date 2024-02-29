import { getAnimal, getAnimals, getSpecies } from "@/services/animals";
import { getAnnotations } from "@/services/annotations";
import { AnimaDetail } from "./components/AnimalDetail";

export default async function Page({ params }: { params: { id: string } }) {
  const animal = await getAnimal(params.id);
  const annotations = await getAnnotations();
  const animalsData = await getAnimals();
  const species = await getSpecies();
  return (
    <AnimaDetail animal={animal} animalsData={animalsData} annotations={annotations} species={species} />
  );
}
