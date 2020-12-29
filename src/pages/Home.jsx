import {Box} from "@chakra-ui/react";
import React, {Component} from "react";
import axiosInstance from "../axiosInstance";
import ArticleCard from "../components/ArticleCard";
import Slider from "react-slick";
import * as PropTypes from "prop-types";
import {useBreakpointValue} from "@chakra-ui/media-query";
import {Container, VStack} from "@chakra-ui/layout";

function SliderResponsive(props) {
    const display = useBreakpointValue({base: "none", md: "block", sm: "none"});
    return (
        <Box display={display}>
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
                <Container maxW={["80%", "60%"]}>
                    <VStack spacing={5} m={5}>
                        {this.state.article.map(((value, index) => (
                            <ArticleCard
                                key={index}
                                id={value.id}
                                title={value.titre}
                                cover={value.cover}
                                createdAt={value.createdAt}
                            >
                                {value.description}
                            </ArticleCard>
                        )))}
                    </VStack>
                </Container>

            </>
        );
    }
}

export default Home;
