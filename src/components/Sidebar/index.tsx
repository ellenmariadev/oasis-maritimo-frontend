"use client";

import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import styles from "./styles.module.scss";
import React, { useContext } from "react";
import { SidebarContext } from "@/context/context";


const Sidebar = () => {
  const { setCurrentPage, currentPage } = useContext(SidebarContext);

  return (
    <Box as={"section"} bg={"cyan.600"} height="100vh" minWidth="15rem" className={styles.sidebar}>
      <Heading as={"h1"} size={"2xl"} fontFamily="var(--font-koho)" textAlign="center" pt={5} mb={10}>OM</Heading>
      <Text color="white" fontSize="sm" pl={6} fontWeight={"medium"}>Menu</Text>
      <List pt={6}>
        <ListItem onClick={() => setCurrentPage("animals")} pl={14} py={4} className={currentPage === "animals" ? styles.active : "listItem"}>Animais</ListItem>
        <ListItem onClick={() => setCurrentPage("users")} pl={14} py={4} className={currentPage === "users" ? styles.active : "listItem"}>Funcionários</ListItem>
        <ListItem onClick={() => setCurrentPage("annotations")} pl={14} py={4} className={currentPage === "annotations" ? styles.active : "listItem"}>Anotações</ListItem>
      </List>
    </Box >
  );
};

export default Sidebar;