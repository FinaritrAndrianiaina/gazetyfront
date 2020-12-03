import { Box, Flex } from "@chakra-ui/core";
import React, { Component } from "react";
import axiosInstance from "../axiosInstance";
import ArticleCard from "../components/ArticleCard";
import Slider from "react-slick";

class Home extends Component {
    state = { article: [] };

    constructor(props) {
        super(props);
        this.settings = {
            infinite:false,
            dots: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
        };
    }
    componentDidMount() {
        axiosInstance
            .get("Article")
            .then((response) => {
                console.log("response.data", response.data);
                this.setState({ article: response.data });
            })
            .catch((error) => console.error(error));
    }
    render() {
        return (
            <>
                {/*<Flex flexWrap={"wrap"} direction="row" p={5} justifyContent="center">
                    </Flex>*/}
                <Slider {...this.settings}>
                    {this.state.article.map((v, index) => (
                        <React.Fragment key={"article-card-" + index}>
                            <ArticleCard
                                id={v.id}
                                title={v.titre}
                                cover={v.cover}
                                createdAt={v.createdAt}
                            >
                                {v.description}
                            </ArticleCard>
                        </React.Fragment>
                    ))}
                </Slider>
            </>
        );
    }
}

export default Home;
