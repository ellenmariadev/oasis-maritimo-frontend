"use client";

import { Heading, Tag, TagLabel, Box, Container, Stack, Button, useDisclosure } from "@chakra-ui/react";
import Sidebar from "@/components/Sidebar/index";
import Header from "@/components/Header";
import { Animal, Specie } from "@/services/types";
import { FC } from "react";
import AnimalCard from "@/components/AnimalCard";
import styles from "./styles.module.scss";
import { MdAdd } from "react-icons/md";
import CreateAnimalModal from "@/components/CreateAnimal";

type AnimalComponentProps = {
  animals: Animal[];
  species: Specie[];
};

export const HomePage: FC<AnimalComponentProps> = ({ animals, species }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box display="flex" width="100%">
      <Sidebar />
      <Box as="main" width={"100%"}>
        <Container maxW="90%">
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
        </Container>
      </Box>
      <CreateAnimalModal isOpen={isOpen} onClose={onClose} species={species} />
    </Box>
  );
};
