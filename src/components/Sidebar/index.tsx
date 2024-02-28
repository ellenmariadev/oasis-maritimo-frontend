"use client";

import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import styles from "./styles.module.scss";
import React from "react";

const Sidebar = () => {
  return (
    <Box as={"section"} bg={"cyan.600"} height="100vh" minWidth="15rem" className={styles.sidebar}>
      <Heading as={"h1"} size={"2xl"} fontFamily="var(--font-koho)" textAlign="center" pt={5} mb={10}>OM</Heading>
      <Text color="white" fontSize="sm" pl={6} fontWeight={"medium"}>Menu</Text>
      <List pt={6}>
        <ListItem pl={14} py={4} bg="cyan.500">Dashboard</ListItem>
      </List>
    </Box >
  );
};

export default Sidebar;