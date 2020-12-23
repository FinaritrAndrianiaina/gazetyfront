import {Button, Container, Divider, Heading, Image, Text} from "@chakra-ui/react";
import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import axiosInstance from "../axiosInstance";
import humanizeDate from "../utils/humanizeDate";
import MarkdownRuntime from "../components/MarkdownRuntime";
import {Box, VStack} from "@chakra-ui/layout";

class ArticlePage extends Component {
    state = {
        article: {
            titre: undefined,
            contenu: undefined,
            createdAt: undefined,
            cover: undefined,
            description: undefined,
        },
    };

    componentDidMount() {
        axiosInstance
            .get("article/" + this.props.match.params.id)
            .then((repsponse) =>
                this.setState({
                    article: {
                        ...repsponse.data,
                        createdAt: humanizeDate(repsponse.data.createdAt),
                    },
                })
            )
            .catch((error) => console.error(error));
    }

    render() {
        return (
            <Container as={VStack} spacing={1} align={"left"} maxW={["100%", "95%"]} pt={5}>

                <Button onClick={this.props.history.goBack} width={"80px"} variant="outline">
                    Retour
                </Button>
                <Heading as="h1" size="2xl">
                    {this.state.article.titre}
                </Heading>
                <Text>{this.state.article.createdAt}</Text>
                <Heading as="h3" size="md">
                    {this.state.article.description}
                </Heading>
                <Divider my={5}/>
                    <Image
                        borderTopLeftRadius={5}
                        borderTopRightRadius={5}
                        width={"100%"}
                        height="200px"
                        objectFit="cover"
                        align={"center"}
                        m={5}
                        src={`${this.state.article.cover}`}
                    />

                {this.state.article.contenu ? (
                    <MarkdownRuntime>
                        {this.state.article.contenu}
                    </MarkdownRuntime>
                ) : null}
            </Container>
        );
    }
}

export default withRouter(ArticlePage);
