"use client";

import { Avatar, Icon, Link, List, WrapItem } from "@chakra-ui/react";
import { SlLogout } from "react-icons/sl";
import styles from "./styles.module.scss";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {

  const [login, setLogin] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setLogin(localStorage.getItem("@login") ?? "");
    setRole(localStorage.getItem("@role") ?? "");
  }, []);

  const pathname = usePathname();

  const logout = () => {
    localStorage.removeItem("@login");
    localStorage.removeItem("@token");
    localStorage.removeItem("@role");
    setLogin("");
    setRole("");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const router = useRouter();

  const goBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <header className={styles.header}>
      <nav style={{ placeContent: pathname === "/" ? "end" : "none" }}>
        {pathname !== "/" && <Link href="#" onClick={goBack}>Voltar</Link>}
        <List>
          <WrapItem gap={2}>
            <Avatar
              size='xs'
              name={role}
            />
            {login}
          </WrapItem>
          <WrapItem gap={2} placeItems={"center"}>
            <Icon as={SlLogout} />
            <Link href="/auth/login" onClick={logout}>Sair</Link>
          </WrapItem>
        </List>
      </nav>
    </header>
  );
};

export default Header;