"use client";

import { Card, Image, Box, CardBody, Heading, Text } from "@chakra-ui/react";
import { Animal } from "@/services/types";
import styles from "./styles.module.scss";

type AnimalCardProps = {
    animal: Animal;
};

const AnimalCard: React.FC<AnimalCardProps> = ({ animal }) => {
  return (
    <Card as={"button"} key={animal.id} direction={{ base: "column", sm: "row" }} placeItems="center" height="8rem" width="100%" border='1px' borderColor='cyan.100' className={styles.animalCard}>
      <Box pl={4} placeContent="center">
        <Image maxH={"6rem"} src={animal.imageUrl} alt={animal.name} borderRadius='lg' />
      </Box>
      <CardBody textAlign="start">
        <Heading as="h2" fontFamily="var(--font-koho)" fontSize={"md"} color="cyan.500">{animal.name}</Heading>
        <Text color="gray.400" fontSize={"medium"} fontStyle={"italic"}>{typeof animal.specie !== "string" && animal.specie.name}</Text>
      </CardBody>
    </Card>
  );
};

export default AnimalCard;