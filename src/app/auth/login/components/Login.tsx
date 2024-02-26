"use client";

import { login as loginUser } from "@/services/authentication";
import { User } from "@/services/types";
import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";

const Login = () => {

  const [user, setUser] = useState<User>({ login: "", password: "" });

  const { push } = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(user);
      setErrorMessage(null);
      push("/");
    } catch (error) {
      console.error(error);
      setErrorMessage("Erro ao fazer login. Por favor, tente novamente.");
    }
  };


  return (
    <main className={styles.main}>
      <Heading as='h1' size='2xl' mb={4} color={"teal"}>Faça seu login</Heading>
      <div className={styles.formWrapper}>
        <FormControl isInvalid={!!errorMessage}>
          <FormLabel color={"gray"} mb={2} fontSize=".875rem">Usuário</FormLabel>
          <Input mb={5} py={6} type='text' name='login' value={user.login} onChange={handleChange} color="gray.500" fontSize={14} fontWeight="medium" />
          <FormLabel color={"gray"} mb={2} fontSize=".875rem">Senha</FormLabel>
          <Input mb={5} py={6} type='password' name='password' value={user.password} onChange={handleChange} color="gray.500" fontSize={14} fontWeight="medium" />
          <Button colorScheme='teal' onClick={handleSubmit} sx={{ width: "100%" }}>Entrar</Button>
          {errorMessage && (
            <FormErrorMessage fontWeight={"medium"} sx={{ fontSize: ".75rem" }} color={"red.400"} placeContent="center">{errorMessage}</FormErrorMessage>
          )}
        </FormControl>
      </div>
    </main>
  );
};

export default Login;