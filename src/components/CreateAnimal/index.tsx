import { createAnimal } from "@/services/animals";
import { AnimalRequest, Specie } from "@/services/types";
import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";
import { FormValues } from "./types";
import { convertDate } from "@/utils/convertDate";

type AnimalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  species: Specie[];
};

const CreateAnimalModal: React.FC<AnimalModalProps> = ({ isOpen, onClose, species }) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const token = localStorage.getItem("@token") ?? "";
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [speciesId, setSpeciesId] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const initializeFormValues = () => ({
    nome: "",
    idade: "",
    datadechegada: "",
    dieta: "",
    peso: "",
    tamanho: "",
    habitat: "",
  });

  const [formValues, setFormValues] = useState<FormValues>(initializeFormValues());
  const [errorMessages, setErrorMessages] = useState<FormValues>(initializeFormValues());

  const formFields: { label: string, placeholder: string, type?: string }[] = [
    { label: "Nome", placeholder: "Insira o nome do animal" },
    { label: "Idade", placeholder: "2 anos" },
    { label: "Data de Chegada", placeholder: "dd/mm/yyyy", type: "date" },
    { label: "Dieta", placeholder: "Alga, ração..." },
    { label: "Peso", placeholder: "20.0" },
    { label: "Tamanho", placeholder: "20.0" },
    { label: "Habitat", placeholder: "Oceano pacífico, índico..." },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(event.target.files ? event.target.files[0] : null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues(prevState => ({
      ...prevState,
      [name as keyof typeof prevState]: value
    }));

    setErrorMessages(prevState => ({
      ...prevState,
      [name as keyof typeof prevState]: value ? "" : "Este campo é obrigatório."
    }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);


    const animalData: AnimalRequest = {
      name: formValues.nome,
      speciesId: speciesId,
      age: Number(formValues.idade),
      arrivalDate: convertDate(formValues.datadechegada),
      diet: formValues.dieta,
      weight: Number(formValues.peso),
      length: Number(formValues.tamanho),
      habitat: formValues.habitat,
    };

    console.log(animalData.arrivalDate);
    try {
      await createAnimal(imageFile, animalData, token);
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
          <ModalHeader fontFamily="var(--font-koho)" fontWeight="bold" fontSize="4xl" color="cyan.600">Cadastrar Animal</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
              {formFields.map((field, index) => (
                <FormControl key={index} isInvalid={!!errorMessage}>
                  <FormLabel fontFamily="var(--font-koho)" color="cyan.600">{field.label}</FormLabel>
                  <Input name={field.label.toLowerCase().replace(/\s+/g, "")} value={formValues[field.label.toLowerCase()]}
                    borderWidth="1px" borderColor="cyan.300" type={field?.type ?? "text"} placeholder={field.placeholder} ref={index === 0 ? initialRef : null} fontSize="sm" fontWeight="regular"
                    onChange={handleChange} />
                  {errorMessages[field.label.toLowerCase().replace(/\s+/g, "")] && (
                    <FormHelperText color="red.400">{errorMessages[field.label.toLowerCase().replace(/\s+/g, "")]}</FormHelperText>
                  )}
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
              <FormControl>
                <FormLabel fontFamily="var(--font-koho)" color="cyan.600">Adicionar Imagem</FormLabel>
                <Input
                  onChange={handleFileChange}
                  type="file"
                  borderWidth="2px"
                  borderColor="cyan.300"
                  sx={{
                    "::file-selector-button": {
                      height: 10,
                      padding: 0,
                      mr: 4,
                      background: "none",
                      border: "none",
                      fontWeight: "bold",
                      fontFamily: "var(--font-koho)",
                      color: "gray.600"
                    },
                  }}
                />
                <FormHelperText>.JPG, .SVG ou .WEBP</FormHelperText>
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

export default CreateAnimalModal;