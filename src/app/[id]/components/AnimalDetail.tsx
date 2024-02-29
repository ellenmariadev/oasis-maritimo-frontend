"use client";
import Header from "@/components/Header";
import { formatDateHours } from "@/utils/convertDate";
import { Heading, Image, Container, Stack, Tag, Box, Text, Button, ButtonGroup, Divider, List, ListItem, IconButton, Tooltip, useDisclosure } from "@chakra-ui/react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import { convertDate } from "@/utils/convertDate";
import CreateAnnotationModal from "@/components/CreateAnnotation";
import { Animal, Annotation, Specie } from "@/services/types";
import { FC, useState } from "react";
import AnnotationViewModal from "@/components/AnnotationViewModal";
import UpdateAnimalModal from "@/components/UpdateAnimal";
import { redirect } from "next/navigation";
import { deleteAnimal } from "@/services/animals";

type AnimalComponentProps = {
  animal: Animal;
  animalsData: Animal[];
  annotations: Annotation[];
  species: Specie[];
};

export const AnimaDetail: FC<AnimalComponentProps> = ({ animal, animalsData, annotations, species }) => {

  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null);
  const { isOpen: isCreateModalOpen, onOpen: onOpenCreateModal, onClose: onCloseCreateModal } = useDisclosure();
  const { isOpen: isViewModalOpen, onOpen: onOpenViewModal, onClose: onCloseViewModal } = useDisclosure();
  const { isOpen: isUpdateModalOpen, onOpen: onOpenUpdateModal, onClose: onCloseUpdateModal } = useDisclosure();

  const handleListItemClick = (annotation: Annotation) => {
    setSelectedAnnotation(annotation);
    onOpenViewModal();
  };

  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("@token") ?? "";
  }

  const handleDelete = async () => {
    try {
      await deleteAnimal(animal?.id ?? "", token);
      redirect("/");
    } catch (error) {
      console.error(error);
    }
  };

  let role = "";
  if (typeof window !== "undefined") {
    role = localStorage.getItem("@role") ?? "";
  }

  const userRole = role === "BIOLOGIST" || role === "ADMIN";


  return (
    <Container maxW={"90%"}>
      <Header />
      <Container maxW={"86%"}>
        <Stack direction="row" spacing={4} mt={10}>
          <Image borderRadius={20} src={animal.imageUrl} alt={animal.name} width="100%" max-width="500px" borderColor={"cyan"} border={"solid"} borderWidth="2px" />
          <Box pl={10} width="100%">
            <Stack direction="row" spacing={4} placeItems="center" justifyContent="space-between">
              <Heading as={"h1"} fontFamily="var(--font-koho)" color="gray.500" size={"xl"}>{animal.name}</Heading>
              {userRole && (
                <ButtonGroup gap={4}>

                  <Button leftIcon={<BiTrash />} onClick={handleDelete}>
                    Excluir
                  </Button>
                  <Button leftIcon={<BiEdit />} colorScheme="yellow" onClick={onOpenUpdateModal}>
                    Editar
                  </Button>
                </ButtonGroup>
              )}
            </Stack>
            <Stack direction="row" mb={4} mt={5}>
              <Tag size="sm" variant='subtle' colorScheme='cyan' >
                Espécie
              </Tag>
              <Text>{typeof animal.specie !== "string" && animal.specie.name}</Text>
            </Stack>

            <Stack direction="row" mb={4}>
              <Tag size="sm" variant='subtle' colorScheme='cyan'>
                Idade
              </Tag>
              <Text>{animal.age}</Text>
            </Stack>
            <Stack direction="row" mb={4}>
              <Tag size="sm" variant='subtle' colorScheme='cyan'>
                Data de Chegada
              </Tag>
              <Text>{convertDate(animal.arrivalDate)}</Text>
            </Stack>

            <Stack direction="row" mb={4}>
              <Tag size="sm" variant='subtle' colorScheme='cyan'>
                Peso
              </Tag>
              <Text>{animal.weight}</Text>
            </Stack>

            <Stack direction="row">
              <Tag size="sm" variant='subtle' colorScheme='cyan'>
                Tamanho
              </Tag>
              <Text>{animal.length}</Text>
            </Stack>
          </Box>
        </Stack>
        <Heading as={"h2"} size={"lg"} fontFamily="var(--font-koho)" pt={10} color="gray.500">Dieta</Heading>
        <Text>{animal.diet}</Text>
        <Divider my={5} />
        <Heading as={"h2"} size={"lg"} fontFamily="var(--font-koho)" color="gray.500">Habitat</Heading>
        <Text>{animal.habitat}</Text>
        <Box as={"section"} mt={10}>
          <Stack direction="row">

            <Tag fontSize={"2rem"} variant='subtle' colorScheme='cyan' px={"2rem"} fontFamily="var(--font-koho)" fontWeight="medium">
              Anotações
            </Tag>
            {userRole && (
              <Tooltip label="Criar anotação" aria-label="Criar anotação">
                <IconButton aria-label="Criar anotação" icon={<MdAdd size={"md"} />} colorScheme="cyan" variant="outline" onClick={onOpenCreateModal} />
              </Tooltip>
            )}
          </Stack>
          <List mt={5}>
            {annotations.filter(annotation => annotation.animal?.id === animal.id).map((annotation) => (
              <ListItem key={annotation.id} bg="cyan.50" padding={2} borderRadius={10} color="cyan.700" fontWeight="medium" border="solid" borderColor="cyan.500" borderWidth="1px" mb={1.5} onClick={() => handleListItemClick(annotation)}>
                <Stack direction="row" justifyContent="space-between" px={4}>
                  <Text>{annotation.title}</Text>
                  <Text>{annotation.author?.login ?? ""}</Text>
                  <Text bg="cyan.100" px={1.5} borderRadius={50}>{formatDateHours(annotation.createdAt)}</Text>
                </Stack>
              </ListItem>
            ))}
          </List>
        </Box>
        <CreateAnnotationModal isOpen={isCreateModalOpen} onClose={onCloseCreateModal} animals={animalsData} />
        <AnnotationViewModal isOpen={isViewModalOpen} onClose={() => { onCloseViewModal(); setSelectedAnnotation(null); }} annotation={selectedAnnotation} />
        <UpdateAnimalModal isOpen={isUpdateModalOpen} onClose={onCloseUpdateModal} animal={animal} species={species} />
      </Container>
    </Container>
  );
};