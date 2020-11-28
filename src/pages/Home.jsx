import { Flex } from "@chakra-ui/core";
import React, { Component } from "react";
import axiosInstance from "../axiosInstance";
import ArticleCard from "../components/ArticleCard";

class Home extends Component {
    state = { article: [] };

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        axiosInstance
            .get("Article")
            .then((response) => {
                console.log('response.data', response.data);
                 this.setState({ article: response.data })
            })
            .catch((error) => console.error(error));
    }
    render() {
        return (
            <>
                <Flex flexWrap={"wrap"} direction="row" p={5} justifyContent="center">
                    {this.state.article.map((v, index) => (
                        <React.Fragment key={"article-card-" + index}>
                            <ArticleCard id={v.id} title={v.titre}   createdAt={v.createdAt}>
                                {v.description}
                            </ArticleCard>
                        </React.Fragment>
                    ))}
                </Flex>
            </>
        );
    }
}

export default Home;
