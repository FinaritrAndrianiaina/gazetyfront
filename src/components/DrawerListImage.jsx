import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay, Image,
    List,
    ListItem, useClipboard,
    useDisclosure
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import axiosInstance from "../axiosInstance";
import {Portal} from "@chakra-ui/portal";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import {Text} from "@chakra-ui/layout";
import {Input} from "@chakra-ui/input";


const ItemClipboard = ({path, setCopied, ...props}) => {
    const value = `https://localhost:5001/${path}`;
    const {onCopy, hasCopied} = useClipboard(value);
    useEffect(() => {
        if (hasCopied) {
            setCopied(path);
        }
    }, [hasCopied])
    return <Image src={value} onClick={onCopy}/>;
}


function UploadPhoto(props) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return <>
        <Button onClick={onOpen} variant={"solid"} colorScheme={"green"}>
            Upload new
        </Button>
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay>
                <ModalContent>
                    <ModalHeader>Uploader une nouvelle image</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Input type={"file"}/>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="green" mr={3}>
                            Send
                        </Button>
                        <Button variant="ghost" coloSheme={"red"} onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    </>
}

export const DrawerListImage = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const btnRef = React.useRef();
    const [list, setList] = useState({image: []});
    const [copied, setCopied] = useState(null);
    useEffect(() => {
        axiosInstance
            .get("file")
            .then((response) => setList({image: response.data}))
            .catch((error) => console.error(error));
    }, []);
    return (
        <>
            <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
                Liste des Images
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay zIndex={2}>
                    <DrawerContent>
                        <DrawerCloseButton/>
                        <DrawerHeader>{Boolean(copied) ? `Vous avez copié ${copied}` : "Selectionner une image!!"}</DrawerHeader>

                        <DrawerBody>
                            <List spacing={2}>
                                {list.image.map((value, index) => (
                                    <ListItem key={index}>
                                        <ItemClipboard setCopied={setCopied} path={value.path}/>
                                    </ListItem>
                                ))}
                            </List>
                        </DrawerBody>

                        <DrawerFooter>
                            <UploadPhoto />
                            <Button variant="outline" mx={3} onClick={onClose}>
                                Close
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
};