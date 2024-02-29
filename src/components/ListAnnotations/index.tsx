import { formatDateHours } from "@/utils/convertDate";
import { List, ListItem, Stack, Text, useDisclosure } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import AnnotationViewModal from "../AnnotationViewModal";
import { Annotation } from "@/services/types";

type AnnotationComponentProps = {
    annotations: Annotation[];
};


const ListAnnotations: FC<AnnotationComponentProps> = ({ annotations }) => {
  const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null);

  const { isOpen: isViewModalOpen, onOpen: onOpenViewModal, onClose: onCloseViewModal } = useDisclosure();

  const handleListItemClick = (annotation: Annotation) => {
    setSelectedAnnotation(annotation);
    onOpenViewModal();
  };
  return (
    <>
      <List mt={5}>
        {annotations.map((annotation) => (
          <ListItem key={annotation.id} bg="cyan.50" padding={2} borderRadius={10} color="cyan.700" fontWeight="medium" border="solid" borderColor="cyan.500" borderWidth="1px" mb={1.5} onClick={() => handleListItemClick(annotation)}>
            <Stack direction="row" justifyContent="space-between" px={4}>
              <Text>{annotation.title}</Text>
              <Text>{annotation.author?.login ?? ""}</Text>
              <Text bg="cyan.100" px={1.5} borderRadius={50}>{formatDateHours(annotation.createdAt)}</Text>
            </Stack>
          </ListItem>
        ))}
      </List>
      <AnnotationViewModal isOpen={isViewModalOpen} onClose={() => { onCloseViewModal(); setSelectedAnnotation(null); }} annotation={selectedAnnotation} />
    </>
  );
};

export default ListAnnotations;