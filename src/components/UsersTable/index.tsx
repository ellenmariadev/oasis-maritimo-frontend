"use client";
import { User } from "@/services/types";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Stack,
  Button,
  useDisclosure,
  PopoverTrigger,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverFooter,
  Container,
  ButtonGroup
} from "@chakra-ui/react";
import { FC } from "react";
import { MdAdd } from "react-icons/md";
import CreateUserModal from "../CreateUser";
import { BiTrash } from "react-icons/bi";
import { deleteUser } from "@/services/users";
import Header from "../Header";

const UsersTable: FC<{ users: User[] }> = ({ users }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("@token") ?? "";
  }

  const handleDeleteClick = async (id: string) => {
    try {
      await deleteUser(id, token);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container maxW="90%">
        <Header />
      </ Container>
      <Stack direction="row" placeItems="center" spacing={4} placeContent="center">
        <Heading as={"h1"} size={"2xl"} textAlign="center" pt={5} mb={10} fontFamily="var(--font-koho)" color="cyan.500">Funcionários</Heading>
        <Button rightIcon={<MdAdd size={20} />} colorScheme='cyan' variant='outline' width="fit-content" onClick={onOpen}>
          Cadastrar
        </Button>
      </Stack>
      <TableContainer maxW={"96%"} marginBlock={0} marginInline="auto" border="1px" borderColor="cyan.100" bg="cyan.50" borderRadius={20}>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Login</Th>
              <Th>Role</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user: User) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.login}</Td>
                <Td>{user.role}</Td>
                <Td><Popover><PopoverTrigger><Button leftIcon={<BiTrash />} colorScheme='red' variant='solid' size={"xs"}>
                  Excluir
                </Button></PopoverTrigger><PopoverContent>
                  <PopoverHeader fontWeight='semibold'>Confirmação</PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                      Tem certeza que deseja excluir?
                  </PopoverBody>
                  <PopoverFooter display='flex' justifyContent='flex-end'>
                    <ButtonGroup size='sm'>
                      <Button variant='outline'>Cancelar</Button>
                      <Button colorScheme='red' onClick={() => handleDeleteClick(user.id ?? "")}>Deletar</Button>
                    </ButtonGroup>
                  </PopoverFooter>
                </PopoverContent></Popover></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <CreateUserModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default UsersTable;