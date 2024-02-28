"use client";

import { Avatar, Icon, Link, List, WrapItem } from "@chakra-ui/react";
import { SlLogout } from "react-icons/sl";
import styles from "./styles.module.scss";
import React from "react";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <Link href="/">Voltar</Link>
        <List>
          <WrapItem gap={2}>
            <Avatar
              size='xs'
              name='ADMIN'
            />
              administrador
          </WrapItem>
          <WrapItem gap={2} placeItems={"center"}>
            <Icon as={SlLogout} />
            <Link href="/auth/login">Sair</Link>
          </WrapItem>
        </List>
      </nav>
    </header>
  );
};

export default Header;