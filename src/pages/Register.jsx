import {Button, Container, Flex, FormControl, FormLabel, Heading, Input, Stack, Text,} from "@chakra-ui/react";
import React from "react";
import {withRouter} from "react-router-dom";
import axiosInstance from "../axiosInstance";
import {UsersContext} from "../UserContext";
import {LinkBtn} from "../components/LinkBtn";

class Register extends React.Component {
    static contextType = UsersContext;
    state = {
        loading: false,
        message: "",
    };

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
    }

    componentDidMount() {
        const {connect, isAuth} = this.context;
        this.connect = connect;
        this.isAuth = isAuth;
        if (this.isAuth) {
            this.props.history.push("/");
        }
        console.log('this.isAuth', this.isAuth)
    }

    registerData() {
        this.setState({...this.state, loading: true})
        axiosInstance
            .post("Users/create", {
                username: this.username.current.value,
                password: this.password.current.value,
            })
            .then((response) => {
                this.props.history.push("/login");
                this.setState({...this.state, loading: false})
            })
            .catch((error) =>
                this.setState({...this.state, message: error?.response?.data.message, loading: false})
            );
    }

    render() {
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
                            Créer un compte
                        </Heading>
                        <Text> {this.state.message}</Text>
                        <Stack spacing={3} py={5} width={["100%", "70%"]}>
                            <FormControl id="username">
                                <FormLabel>Nom d'utilisateur</FormLabel>
                                <Input
                                    ref={this.username}
                                    type="name"
                                    placeholder="Votre nom d'utilisateur est requis"
                                    isRequired
                                    name="username"
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Mot de passe</FormLabel>
                                <Input
                                    ref={this.password}
                                    placeholder="Mot de passe"
                                    type="password"
                                    isRequired
                                    name="password"
                                />
                            </FormControl>
                            <Button
                                isLoading={this.state.loading}
                                onClick={this.registerData.bind(this)}
                                variant="solid"
                                colorScheme="facebook"
                            >
                                Créer
                            </Button>
                            <LinkBtn textDecoration={"underline"} to={"/login"}>J'ai déjà un compte</LinkBtn>
                        </Stack>
                    </Flex>
                </Container>
            </>
        );
    }
}


export default withRouter(Register);
