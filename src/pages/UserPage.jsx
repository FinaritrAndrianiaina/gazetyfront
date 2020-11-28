import React, { Component, useContext } from "react";
import { UsersContext } from "../UserContext";
import humanizeDate from "../utils/humanizeDate";
import {
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Textarea,
} from "@chakra-ui/core";
import axiosInstance from "../axiosInstance";

class WhenAuthor extends Component {
    constructor(props){
        super(props);
        this.titre = React.createRef(null);
        this.contenu = React.createRef(null);
        this.description = React.createRef(null);
    }
    create(){
        const data = {
            titre: this.titre.current.value,
            contenu: this.contenu.current.value,
            description: this.description.current.value
        };
        axiosInstance.post("Article/create",data)
            .then(response=>console.log('response.data', response.data))
            .catch(error=>console.error('error', error.response.data))
    }
    render() {
        return (
            <>
                <Stack spacing={3} py={5} width={["100%", "70%"]}>
                    <FormControl id="titre">
                        <FormLabel>Titre</FormLabel>
                        <Input
                            ref={this.titre}
                            type="titre"
                            placeholder="Titre de votre article"
                            isRequired
                            name="titre"
                        />
                    </FormControl>
                    <FormControl id="description">
                        <FormLabel>Description</FormLabel>
                        <Input
                            ref={this.description}
                            type="titre"
                            placeholder="Description de votre article"
                            isRequired
                            name="description"
                        />
                    </FormControl>
                    <Textarea
                        ref={this.contenu}
                        placeholder="Contenu de votre article"
                        size="md"
                    />
                    <Button variant="solid" colorScheme="facebook" onClick={this.create.bind(this)}>
                        Créer un nouveau article article
                    </Button>
                </Stack>
            </>
        );
    }
}

const UserPage = () => {
    const { user } = useContext(UsersContext);
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
                    {user.isAdmin ? <WhenAuthor /> : null}
                </Flex>
            </Container>
        </>
    );
};

export default UserPage;
