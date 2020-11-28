import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import humanizeDate from "../utils/humanizeDate";
import sliceChar from "../utils/sliceChar";
import {BsArrowRight} from "react-icons/bs"

const ArticleCard = ({ title, children, createdAt,id, ...props }) => {
    return (
        <Flex
            w={360}
            mx={5}
            direction="column"
            borderWidth={1}
            rounded={5}
            shadow="md"
            pt={5}
            px={5}
            mt={5}
            pb={3}
            justifyContent="space-between"
        >
            <Flex direction="column">
                <Heading size="xl">{title}</Heading>
                <Text as="span" fontSize="sm" p={1}>
                    {humanizeDate(createdAt)}
                </Text>
                <Text fontSize="md">{sliceChar(children, 100)}</Text>
            </Flex>
            <Flex direction="column" mt={3}>
                <Button
                    rightIcon={<Box as={BsArrowRight} size="32px" />}
                    as={Link}
                    to={"/article/" + id}
                    my={1}
                    variant="solid"
                    colorScheme="facebook"
                >
                    Voir l'article <Box size="32px" py={1} />
                </Button>
            </Flex>
        </Flex>
    );
};

export default ArticleCard;
