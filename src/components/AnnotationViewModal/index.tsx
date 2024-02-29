"use client";
import { Annotation, AnnotationRequest } from "@/services/types";

import React, { useEffect, useState } from "react";
import { BiCheck, BiEdit, BiTrash } from "react-icons/bi";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Editable, EditableInput, EditablePreview, ButtonGroup, IconButton, Flex, Input, useEditableControls, Textarea, EditableTextarea, Text, Tag, Divider, ModalFooter, Button } from "@chakra-ui/react";
import { CgClose } from "react-icons/cg";
import { deleteAnnotation, updateAnnotation } from "@/services/annotations";

type AnnotationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  annotation: Annotation | null;
};

type EditableControlsProps = {
  onSubmit: (value: string) => void;
};

function EditableControls({ onSubmit }: EditableControlsProps) {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.target as HTMLButtonElement;
    onSubmit(target.value);
  };

  return isEditing ? (
    <ButtonGroup justifyContent='start' size='sm'>
      <IconButton aria-label="Confirmar" icon={<BiCheck />} {...getSubmitButtonProps()} onClick={handleSubmit} />
      <IconButton aria-label="Cancelar" icon={<CgClose />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent='start'>
      <IconButton aria-label="Edit" icon={<BiEdit />} {...getEditButtonProps()} />
    </Flex>
  );
}


const AnnotationViewModal: React.FC<AnnotationModalProps> = ({ isOpen, onClose, annotation }) => {

  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("@token") ?? "";
  }

  const [annotationData, setAnnotationData] = useState({
    title: annotation?.title ?? "",
    description: annotation?.description ?? "",
  });

  useEffect(() => {
    setAnnotationData({
      title: annotation?.title ?? "",
      description: annotation?.description ?? "",
    });
  }, [annotation]);

  const [editKey, setEditKey] = useState(0);



  const handleTitleSubmit = async (value: string) => {
    setAnnotationData((prevData) => ({ ...prevData, title: value }));
    const updatedAnnotation: AnnotationRequest = {
      ...annotation,
      title: value,
      authorId: annotation?.author?.id ?? "",
      animalId: annotation?.animal?.id ?? "",
      description: annotationData.description,
    };
    await updateAnnotation(updatedAnnotation, token);
    setEditKey(editKey + 1);
  };

  const handleDescriptionSubmit = async (value: string) => {
    setAnnotationData((prevData) => ({ ...prevData, description: value }));
    const updatedAnnotation: AnnotationRequest = {
      ...annotation,
      title: annotationData.title,
      authorId: annotation?.author?.id ?? "",
      animalId: annotation?.animal?.id ?? "",
      description: value,
    };
    await updateAnnotation(updatedAnnotation, token);
    setEditKey(editKey + 1);
  };

  const handleDelete = async () => {
    try {
      await deleteAnnotation(annotation?.id ?? "", token);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent px={10} py={10}>
        <ModalHeader maxW={"1000px"}>
          <Tag fontSize=".85rem" colorScheme="green">Função: {annotation?.author.role ?? ""}</Tag>
          <Text fontSize=".85rem" color="gray.600">Autor: {annotation?.author.login}</Text>
          <Text fontSize=".85rem" color="gray.600">Criado em: {annotation?.createdAt ?? ""}</Text>
          <Divider py={2} />
          <Editable
            key={`title-${editKey}`}
            fontFamily="var(--font-koho)"
            textAlign='start'
            defaultValue={annotationData.title}
            fontSize='4xl'
            isPreviewFocusable={false}
            color="cyan.600"
            onChange={(value) => setAnnotationData((prevData) => ({ ...prevData, title: value }))}
            onSubmit={handleTitleSubmit}
          >
            <EditablePreview />
            <Input as={EditableInput} />
            <EditableControls onSubmit={() => handleTitleSubmit(annotationData.title)} />
          </Editable>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody maxW="1000px">

          <Editable
            key={`description-${editKey}`}
            textAlign='start'
            defaultValue={annotationData.description}
            fontSize='md'
            isPreviewFocusable={false}
            onChange={(value) => setAnnotationData((prevData) => ({ ...prevData, description: value }))}
            onSubmit={handleDescriptionSubmit}
          >
            <EditablePreview whiteSpace="pre-wrap" mb={3} />
            <Textarea as={EditableTextarea} mb={3} />
            <EditableControls onSubmit={() => handleDescriptionSubmit(annotationData.description)} />
          </Editable>
        </ModalBody>
        <ModalFooter>
          <Button leftIcon={<BiTrash />} colorScheme="red" px={10} onClick={handleDelete}>Excluir</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

  );
};

export default AnnotationViewModal;