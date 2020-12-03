import { Button, Container, Divider, Heading, Text } from "@chakra-ui/core";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import humanizeDate from "../utils/humanizeDate";
import MarkdownRuntime from "../components/MarkdownRuntime";

class ArticlePage extends Component {
    state = {
        article: {
            titre: undefined,
            contenu: undefined,
            createdAt: undefined,
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
            <Container maxW={["100%", "95%"]} pt={5}>
                <Button onClick={this.props.history.goBack} variant="outline">
                    Retour
                </Button>
                <Heading as="h1" size="2xl">
                    {this.state.article.titre}
                </Heading>
                <Text>{this.state.article.createdAt}</Text>
                <Heading as="h3" size="md">
                    {this.state.article.description}
                </Heading>
                <Divider my={5} />
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
