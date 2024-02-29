"use client";
import { updateAnimal } from "@/services/animals";
import { Animal, AnimalRequest, Specie } from "@/services/types";
import { Button, FormControl, FormErrorMessage, FormLabel, Grid, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";
import { FormValues } from "./types";
import { convertDate } from "@/utils/convertDate";

type AnimalModalProps = {
    isOpen: boolean;
    onClose: () => void;
    species: Specie[];
    animal: Animal;
};

const UpdateAnimalModal: React.FC<AnimalModalProps> = ({ isOpen, onClose, species, animal }) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("@token") ?? "";
  }
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [speciesId, setSpeciesId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const initializeFormValues = () => ({
    nome: animal.name,
    idade: animal.age.toString(),
    datadechegada: animal.arrivalDate,
    dieta: animal.diet,
    peso: animal.weight.toString(),
    tamanho: animal.length.toString(),
    habitat: animal.habitat,
  });

  const [formValues, setFormValues] = useState<FormValues>(initializeFormValues());

  const formFields: { label: string, placeholder: string, type?: string }[] = [
    { label: "Nome", placeholder: "Insira o nome do animal" },
    { label: "Idade", placeholder: "2 anos" },
    { label: "Data de Chegada", placeholder: "dd/mm/yyyy", type: "date" },
    { label: "Dieta", placeholder: "Alga, ração..." },
    { label: "Peso", placeholder: "20.0" },
    { label: "Tamanho", placeholder: "20.0" },
    { label: "Habitat", placeholder: "Oceano pacífico, índico..." },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues(prevState => ({
      ...prevState,
      [name as keyof typeof prevState]: value
    }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const animalData: AnimalRequest = {
      id: animal.id,
      name: formValues.nome,
      speciesId: speciesId ?? (typeof animal.specie !== "string" && animal.specie.id),
      age: Number(formValues.idade),
      arrivalDate: convertDate(formValues.datadechegada),
      diet: formValues.dieta,
      weight: Number(formValues.peso),
      length: Number(formValues.tamanho),
      habitat: formValues.habitat,
    };

    try {
      await updateAnimal(animalData, token);
      setErrorMessage(null);
      onClose();
    } catch (error) {
      console.log(error);
      setErrorMessage("Erro ao criar animal. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xxl"
    >
      <ModalOverlay />
      <ModalContent maxW="900px">
        <form onSubmit={onSubmit}>
          <ModalHeader fontFamily="var(--font-koho)" fontWeight="bold" fontSize="4xl" color="cyan.600">Editar Animal</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              {formFields.map((field, index) => (
                <FormControl key={index} isInvalid={!!errorMessage}>
                  <FormLabel fontFamily="var(--font-koho)" color="cyan.600">{field.label}</FormLabel>
                  <Input name={field.label.toLowerCase().replace(/\s+/g, "")} value={formValues[field.label.toLowerCase()]}
                    borderWidth="1px" borderColor="cyan.300" type={field?.type ?? "text"} placeholder={field.placeholder} ref={index === 0 ? initialRef : null} fontSize="sm" fontWeight="regular"
                    onChange={handleChange} />
                
                </FormControl>
              ))}
              <FormControl isInvalid={!!errorMessage}>
                <FormLabel fontFamily="var(--font-koho)" color="cyan.600">Espécie</FormLabel>
                <Select
                  name="espécie"
                  value={speciesId}
                  onChange={event => setSpeciesId(event.target.value)}
                  borderWidth="2px"
                  borderColor="cyan.300"
                  fontSize="sm"
                  fontWeight="regular"
                >
                  {species.map(specie => (
                    <option key={specie.id} value={specie.id}>
                      {specie.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={isLoading} spinnerPlacement='start'
              type="submit" px={10} colorScheme="linkedin" loadingText="Carregando" mr={4}>Salvar</Button>
            <Button onClick={onClose} px={10}>Cancelar</Button>
            <FormControl isInvalid={!!errorMessage}>
              {errorMessage && (
                <FormErrorMessage fontWeight={"medium"} sx={{ fontSize: ".75rem" }} color={"red.400"} placeContent="center">{errorMessage}</FormErrorMessage>
              )}
            </FormControl>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default UpdateAnimalModal;