import React, {Component, useContext, useEffect} from "react";
import {UsersContext} from "../UserContext";
import {
    Box,
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import axiosInstance from "../axiosInstance";
import MarkdownRuntime from "../components/MarkdownRuntime";
import * as PropTypes from "prop-types";
import {DrawerListImage} from "../components/DrawerListImage";
import {Table, Tbody, Td, Thead, Tr} from "@chakra-ui/table";
import {BiTrash} from "react-icons/bi";
import {IconButton} from "@chakra-ui/button";
import {useToast} from "@chakra-ui/toast";
import UpdateModal from "../components/UpdateOnAuthor";

class WhenAuthor extends Component {
    static contextType = UsersContext;
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
            })
            .catch((error) => {
                console.error(error);
            });
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
                <ModalOverlay zIndex={1}>
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
    const toast = useToast();
    const {user, isAuth} = useContext(UsersContext);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const finalRef = React.useRef();
    useEffect(() => {
        if (!isAuth) {
            props.history.push("/");
        }
    }, [isAuth])

    const deleteUser = (id) => {
        axiosInstance.delete(`Article/delete/${id}`).then(response => {
            console.log(response)
            toast({
                title: "Edit table",
                description: response.data.message,
                status: "success",
                duration: 2000,
                isClosable: true,
            });
        }).catch(error => {
            console.error(error);
        });
    }

    function editUser(id) {

    }

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
                        <Table>
                            <Thead>
                                <Tr>
                                    <Td>Id</Td>
                                    <Td>Titre</Td>
                                    <Td>Action</Td>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {user.articles.map((value, index) => (
                                    <Tr key={"tr-" + index}>
                                        <td>
                                            {value.id}
                                        </td>
                                        <td>
                                            {value.title}
                                        </td>
                                        <td>
                                            <UpdateModal title={value.title} id={value.id}/>
                                            <IconButton onClick={() => deleteUser(value.id)} colorScheme={"red"}
                                                        icon={<BiTrash/>}/>
                                        </td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                        <ModalAuthor finalFocusRef={finalRef} open={isOpen} onClose={onClose}/>
                    </> : null}
                </Flex>
            </Container>
        </>
    );
};

export default UserPage;
