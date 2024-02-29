"use client";
import { Annotation, AnnotationRequest } from "@/services/types";

import React, { useEffect, useState } from "react";
import { BiCheck, BiEdit, BiTrash } from "react-icons/bi";

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Editable, EditableInput, EditablePreview, ButtonGroup, IconButton, Flex, Input, useEditableControls, Textarea, EditableTextarea, Text, Tag, Divider, ModalFooter, Button, Heading } from "@chakra-ui/react";
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

  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("@userId") ?? "";
  }
  
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("@token") ?? "";
  }
  
  const showEditable = annotation?.author?.id === userId;

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
          {showEditable && (
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
          )}
          {!showEditable && (
            <Heading fontSize='4xl' fontFamily="var(--font-koho)" color="cyan.600" mt={1}
            >{annotationData.title}</Heading>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody maxW="1000px">
          {showEditable && (
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
          )}
          {!showEditable && (
            <Text fontSize='md'>{annotationData.description}</Text>
          )}
        </ModalBody>
        <ModalFooter>
          {showEditable && (
            <Button leftIcon={<BiTrash />} colorScheme="red" px={10} onClick={handleDelete}>Excluir</Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>

  );
};

export default AnnotationViewModal;