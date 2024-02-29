"use client";
import { createAnnotation } from "@/services/annotations";
import { Animal, AnnotationRequest } from "@/services/types";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea } from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";

type UserModalProps = {
    isOpen: boolean;
    onClose: () => void;
    animals: Animal[];
};

const CreateAnnotationModal: React.FC<UserModalProps> = ({ isOpen, onClose, animals }) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  let token = "";
  let userId = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("@token") ?? "";
    userId = localStorage.getItem("@userId") ?? "";
  }
  const [annotation, setAnnotation] = useState<AnnotationRequest>({
    title: "",
    description: "",
    authorId: userId,
    animalId: "",
  });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await createAnnotation(annotation, token);
      onClose();
    } catch (error) {
      console.log(error);
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
          <ModalHeader fontFamily="var(--font-koho)" fontWeight="bold" fontSize="4xl" color="cyan.600">Criar Anotação</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="title" mb={4}>
              <FormLabel>Título</FormLabel>
              <Input type="text" borderWidth="1px" borderColor="cyan.300" placeholder="Insira o título da anotação" fontSize="sm" fontWeight="regular" value={annotation.title}
                onChange={e => setAnnotation({ ...annotation, title: e.target.value })}
              />
            </FormControl>

            <FormControl id="description" mb={4}>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                name="description"
                borderWidth="1px" borderColor="cyan.300" fontSize="sm" fontWeight="regular"
                value={annotation.description}
                onChange={e => setAnnotation({ ...annotation, description: e.target.value })}
                placeholder="Digite aqui..."
              />
            </FormControl>

            <FormControl id="animal">
              <FormLabel>Selecione um animal</FormLabel>
              <Select
                name="animal"
                value={annotation.animalId}
                onChange={selectedOption => setAnnotation({ ...annotation, animalId: selectedOption.target.value ?? "" })}
                borderWidth="1px" borderColor="cyan.300" fontSize="sm" fontWeight="regular"
              >
                {animals.map((animal, index) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.name} {index + 1}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={isLoading} spinnerPlacement='start'
              type="submit" px={10} colorScheme="linkedin" loadingText="Carregando" mr={4}>Salvar</Button>
            <Button onClick={onClose} px={10}>Cancelar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateAnnotationModal;