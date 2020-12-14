import {Box, Flex} from "@chakra-ui/core";
import React, {Component, useState} from "react";
import axiosInstance from "../axiosInstance";
import ArticleCard from "../components/ArticleCard";
import Slider from "react-slick";
import * as PropTypes from "prop-types";
import {useBreakpointValue} from "@chakra-ui/media-query";

function SliderResponsive(props) {
    const display = useBreakpointValue({base:"none",md: "block", sm: "none"});
    return (
        <Box display={display} >
            <Slider
                infinite={false}
                dots={true}
                arrows={false}
                speed={500}
                slidesToShow={4}
                slidesToScroll={4}
            >
                {props.article.map(props.callbackfn)}
            </Slider>
        </Box>
    )
}

SliderResponsive.propTypes = {
    settings: PropTypes.shape({
        dots: PropTypes.bool,
        infinite: PropTypes.bool,
        slidesToScroll: PropTypes.number,
        slidesToShow: PropTypes.number,
        speed: PropTypes.number
    }),
    article: PropTypes.any,
    callbackfn: PropTypes.func
}

class Home extends Component {
    state = {article: []};

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        axiosInstance
            .get("Article")
            .then((response) => {
                console.log("response.data", response.data);
                this.setState({article: response.data});
            })
            .catch((error) => console.error(error));
    }

    render() {
        return (
            <>
                {/*<Flex flexWrap={"wrap"} direction="row" p={5} justifyContent="center">
</Flex>*/}
                <SliderResponsive article={this.state.article} callbackfn={(v, index) => (
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
                )}/>

            </>
        );
    }
}

export default Home;
