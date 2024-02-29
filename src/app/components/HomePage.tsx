"use client";

import { Heading, Tag, TagLabel, Box, Container, Stack, Button, useDisclosure } from "@chakra-ui/react";
import Sidebar from "@/components/Sidebar/index";
import Header from "@/components/Header";
import { Animal, Annotation, Specie, User } from "@/services/types";
import { FC, useContext } from "react";
import AnimalCard from "@/components/AnimalCard";
import styles from "./styles.module.scss";
import { MdAdd } from "react-icons/md";
import CreateAnimalModal from "@/components/CreateAnimal";
import { SidebarContext } from "@/context/context";
import UsersTable from "@/components/UsersTable";
import ListAnnotations from "@/components/ListAnnotations";

type AnimalComponentProps = {
  animals: Animal[];
  species: Specie[];
  users: User[];
  annotations: Annotation[];
};

export const HomePage: FC<AnimalComponentProps> = ({ animals, species, users, annotations }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { currentPage } = useContext(SidebarContext);


  return (
    <Box display="flex" width="100%">
      <Sidebar />
      <Box as="main" width={"100%"}>
        <Container maxW="90%">
          {currentPage === "animals" && (
            <>
              <Header />
              <Tag size="sm" variant='subtle' colorScheme='cyan'>
                <TagLabel>Catálogo</TagLabel>
              </Tag>
              <Stack direction="row" placeItems="center" spacing={4}>
                <Heading as="h1" size={"2xl"} fontFamily="var(--font-koho)" pb={4}>Animais</Heading>
                <Button rightIcon={<MdAdd size={20} />} colorScheme='cyan' variant='outline' width="fit-content" onClick={onOpen}>
                  Cadastrar
                </Button>
              </Stack>
              <section className={styles.wrapperCards}>
                {animals.map((animal) => (
                  <AnimalCard key={animal.id} animal={animal} />
                ))}
              </section>
            </>
          )}
          {currentPage === "users" && (

            <UsersTable users={users} />
          )}
          {currentPage === "annotations" && (
            <ListAnnotations annotations={annotations} />
          )}
        </Container>
      </Box>
      <CreateAnimalModal isOpen={isOpen} onClose={onClose} species={species} />
    </Box>
  );
};
