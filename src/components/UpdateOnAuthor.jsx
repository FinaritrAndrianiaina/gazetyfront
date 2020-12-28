import React, {Component} from "react";
import {UsersContext} from "../UserContext";
import axiosInstance from "../axiosInstance";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    Stack,
    Textarea,
    Text
} from "@chakra-ui/react";
import {DrawerListImage} from "./DrawerListImage";
import MarkdownRuntime from "./MarkdownRuntime";
import {useDisclosure} from "@chakra-ui/hooks";
import {Heading} from "@chakra-ui/layout";
import {IconButton} from "@chakra-ui/button";
import {BiEdit} from "react-icons/bi";
import humanizeDate from "../utils/humanizeDate";

class UpdateOnAuthor extends Component {
    state = {
        preview: "",
        titre: undefined,
        contenu: undefined,
        createdAt: undefined,
        cover: undefined,
        description: undefined,
        msg: ""
    };
    static contextType = UsersContext;

    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.titre = React.createRef(null);
        this.contenu = React.createRef(null);
        this.cover = React.createRef(null);
        this.description = React.createRef(null);
    }

    componentDidMount() {
        axiosInstance
            .get("article/" + this.id)
            .then((response) =>
                this.setState({
                    ...response.data,
                    createdAt: humanizeDate(response.data.createdAt),
                })
            )
            .catch((error) => console.error(error));
    }

    update() {
        const data = {
            titre: this.titre.current.value,
            contenu: this.contenu.current.value,
            cover: this.cover.current.value,
            description: this.description.current.value,
        };
        axiosInstance
            .put("Article/update/" + this.id.toString(), data)
            .then((response) => {
                console.log("response.data", response.data);
                this.setState({...this.state, msg: "Update successfully"})
            })
            .catch((error) => {
                console.error(error);
                this.setState({...this.state, msg: "Unable to update it..."})
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
                            defaultValue={this.state.titre}
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
                            defaultValue={this.state.description}
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
                            defaultValue={this.state.cover}
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
                        defaultValue={this.state.contenu}
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
                    <Box>
                        <Text>{this.state.msg}</Text>
                        <Button
                            variant="solid"
                            colorScheme="facebook"
                            onClick={this.update.bind(this)}
                        >
                            Mettre à jour
                        </Button>
                    </Box>
                </Stack>
            </>
        );
    }
}

const UpdateModal = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <React.Fragment>
            <IconButton mx={2} icon={<BiEdit/>} colorScheme={"green"} onClick={onOpen}/>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay zIndex={1}>
                    <ModalContent maxWidth={["100%", "70%"]}>
                        <ModalHeader>
                            <Heading size={"xl"}>
                                Mettre à jour un article
                            </Heading>
                        </ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <UpdateOnAuthor title={props.title} id={props.id}/>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                mr={3}
                                onClick={onClose}
                            >
                                Fermer
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </React.Fragment>);
}

export default UpdateModal;