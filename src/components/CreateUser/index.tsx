"user client";
import { Role } from "@/services/types";
import { createUser } from "@/services/users";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select } from "@chakra-ui/react";
import { FormEvent, useRef, useState } from "react";

type UserModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateUserModal: React.FC<UserModalProps> = ({ isOpen, onClose }) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("@token") ?? "";
  }
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const userRole = (role as Role);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await createUser({ login, password, role: userRole }, token);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      size="xxl"
    >
      <ModalOverlay />
      <ModalContent maxW="900px">
        <form onSubmit={onSubmit}>
          <ModalHeader fontFamily="var(--font-koho)" fontWeight="bold" fontSize="4xl" color="cyan.600">Cadastrar Funcionário</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="login" mb={4}>
              <FormLabel>Criar Login</FormLabel>
              <Input type="text" value={login} onChange={(e) => setLogin(e.target.value)} borderWidth="1px" borderColor="cyan.300" placeholder="Nome de usuário" fontSize="sm" fontWeight="regular" />
            </FormControl>

            <FormControl id="password" mb={4}>
              <FormLabel>Criar Senha</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} borderWidth="1px" borderColor="cyan.300" placeholder="*********" fontSize="sm" fontWeight="regular" />
            </FormControl>

            <FormControl id="role">
              <FormLabel>Insira um cargo</FormLabel>
              <Select placeholder="Selecionar cargo" value={role} onChange={(e) => setRole(e.target.value)} borderWidth="1px" borderColor="cyan.300" fontSize="sm" fontWeight="regular">
                <option value="ADMIN">Administrador</option>
                <option value="CARETAKER">Cuidador</option>
                <option value="VETERINARIAN">Veterinário</option>
                <option value="BIOLOGIST">Biólogo</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button isLoading={isLoading} spinnerPlacement='start'
              type="submit" px={10} colorScheme="linkedin" loadingText="Carregando" mr={4}>Salvar</Button>
            <Button onClick={onClose} px={10}>Cancelar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateUserModal;