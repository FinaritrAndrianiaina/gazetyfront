import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Image,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import humanizeDate from "../utils/humanizeDate";
import sliceChar from "../utils/sliceChar";
import { BsArrowRight } from "react-icons/bs";

const ArticleCard = ({ title, children, createdAt, id, cover, ...props }) => {
    return (
        <Flex
            direction="column"
            borderWidth={1}
            rounded={5}
            shadow="md"
            justifyContent="space-between"
        >
            <Image
                borderTopLeftRadius={5}
                borderTopRightRadius={5}
                width="100%"
                height="200px"
                objectFit="cover"
                src={`${cover}`}
            />
            <Flex
                px={5}
                direction="column"
                justifyContent="space-between"
                height="100%"
            >
                <Heading size="xl">{title}</Heading>
                <Text as="span" fontSize="sm" p={1}>
                    {humanizeDate(createdAt)}
                </Text>
                <Text fontSize="md">{sliceChar(children, 100)}</Text>
            </Flex>
            <Flex px={5} pt={1} direction="column">
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
