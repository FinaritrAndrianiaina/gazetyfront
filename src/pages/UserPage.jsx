import React, {Component, useContext, useEffect, useState} from "react";
import {UsersContext} from "../UserContext";
import {BiEdit} from "react-icons/bi"
import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    chakra,
    IconButton,
    Heading,
    Input,
    Stack,
    Textarea,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    List,
    ListItem,
    Image,
    useClipboard,
} from "@chakra-ui/core";
import axiosInstance from "../axiosInstance";
import MarkdownRuntime from "../components/MarkdownRuntime";
import * as PropTypes from "prop-types";

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

const DrawerListImage = (props) => {
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
                <DrawerOverlay>
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
                            <Button variant="outline" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    );
};

class WhenAuthor extends Component {
    state = {
        preview: "",
    };

    constructor(props) {
        super(props);
        this.disclosure = this.props.disclosure;
        this.titre = React.createRef(null);
        this.contenu = React.createRef(null);
        this.cover = React.createRef(null);
        this.description = React.createRef(null);
    }

    create() {
        const data = {
            titre: this.titre.current.value,
            contenu: this.contenu.current.value,
            cover: this.cover.current.value,
            description: this.description.current.value,
        };
        axiosInstance
            .post("Article/create", data)
            .then((response) => {
                console.log("response.data", response.data);
                this.disclosure.onClose();
            })
            .catch((error) => console.error("error", error.response.data));
    }

    preview() {
        this.setState({
            ...this.state,
            preview: this.contenu.current.value,
        });
    }

    render() {
        return (
            <>
                <Stack as="form" spacing={3} width={"100%"}>
                    <FormControl id="titre">
                        <FormLabel>Titre</FormLabel>
                        <Input
                            ref={this.titre}
                            type="text"
                            placeholder="Titre de votre article"
                            isRequired
                            name="titre"
                        />
                    </FormControl>
                    <FormControl id="description">
                        <FormLabel>Description</FormLabel>
                        <Input
                            ref={this.description}
                            type="text"
                            placeholder="Description de votre article"
                            isRequired
                            name="description"
                        />
                    </FormControl>
                    <FormControl id="cover">
                        <FormLabel>Photo de couverture</FormLabel>
                        <Input
                            ref={this.cover}
                            type="text"
                            placeholder="Photo de couverture de votre article"
                            isRequired
                            name="description"
                        />
                    </FormControl>
                    <DrawerListImage/>
                    <Textarea
                        ref={this.contenu}
                        placeholder="Contenu de votre article"
                        size="md"
                        h={500}
                    />
                    <Button
                        variant="solid"
                        colorScheme="green"
                        onClick={this.preview.bind(this)}
                    >
                        Preview
                    </Button>
                    <Box border="1px solid" p={5} borderRadius={13}>
                        <MarkdownRuntime>{this.state.preview}</MarkdownRuntime>
                    </Box>
                    <Button
                        variant="solid"
                        colorScheme="facebook"
                        onClick={this.create.bind(this)}
                    >
                        Créer un nouveau article article
                    </Button>
                </Stack>
            </>
        );
    }
}

class ModalAuthor extends Component {
    static propTypes = {
        onClick: PropTypes.func,
        finalFocusRef: PropTypes.any,
        open: PropTypes.bool,
        onClose: PropTypes.func
    }

    render() {
        return <React.Fragment>
            <Modal
                finalFocusRef={this.props.finalFocusRef}
                isOpen={this.props.open}
                onClose={this.props.onClose}
            >
                <ModalOverlay>
                    <ModalContent maxWidth={["100%", "70%"]}>
                        <ModalHeader>
                            Créer un article
                        </ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <WhenAuthor
                                disclosure={{
                                    isOpen: this.props.open,
                                    onOpen: this.props.onClick,
                                    onClose: this.props.onClose,
                                }}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={this.props.onClose}
                            >
                                Fermer
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </React.Fragment>
    }
}

const UserPage = (props) => {
    const {user, isAuth} = useContext(UsersContext);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const finalRef = React.useRef();
    useEffect(() => {
        if (!isAuth) {
            props.history.push("/");
        }
    }, [isAuth])
    return (
        <>
            <Container maxW={["100%", "60%"]}>
                <Flex
                    direction="column"
                    borderWidth={1}
                    rounded={5}
                    shadow="md"
                    pt={5}
                    px={5}
                    mt={5}
                    pb={3}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Heading
                        as="h1"
                        size="xl"
                        textTransform="uppercase"
                        textAlign="left"
                        width={["100%", "70%"]}
                    >
                        Votre compte
                    </Heading>
                    <Stack spacing={3} py={5} width={["100%", "70%"]}>
                        <FormControl id="username">
                            <FormLabel>Nom d'utilisateur</FormLabel>
                            <Input
                                defaultValue={user.username}
                                type="name"
                                placeholder="Votre nom d'utilisateur est requis"
                                isRequired
                                name="username"
                            />
                        </FormControl>
                        <Button variant="solid" colorScheme="facebook">
                            Enregistrer
                        </Button>
                    </Stack>

                    {user.isAuthor ? <>
                            <Button onClick={onOpen} width="70%">
                                Créer un article
                            </Button>
                            <chakra.table width="70%" m={5}>
                                <chakra.thead bg={"blue.500"} p={5} color={"white"} colorScheme={"blue"}>
                                    <tr>
                                        <td>Id</td>
                                        <td>Titre</td>
                                        <td>Action</td>
                                    </tr>
                                </chakra.thead>
                                <tbody>
                                {user.articles.map((v, index) => <chakra.tr key={"row-" + index.toString()} py={1}>
                                    <td>
                                        {v.id}
                                    </td>
                                    <td>
                                        {v.title}
                                    </td>
                                    <td>
                                        <IconButton colorScheme={"green"} icon={<BiEdit/>}/>
                                    </td>
                                </chakra.tr>)}
                                </tbody>

                            </chakra.table>
                            <ModalAuthor finalFocusRef={finalRef} open={isOpen} onClose={onClose}/>
                        </> : null}

                </Flex>
            </Container>
        </>
    );
};

export default UserPage;
