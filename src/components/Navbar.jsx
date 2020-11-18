import { Flex, chakra, Button } from "@chakra-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const LinkBtn = ({ children, to, ...rest }) => {
    return (
        <Link to={to}>
            <Button {...rest}>{children}</Button>
        </Link>
    );
};

const Navbar = () => {
    return (
        <>
            <Flex
                shadow="sm"
                zIndex={1}
                as="nav"
                width="full"
                position="fixed"
                paddingY="3"
                paddingX="10"
                flexDirection="row"
                justifyContent="space-between"
            >
                <Flex>
                    <chakra.h1
                        fontSize="30px"
                        fontWeight="900"
                        fontFamily="'Courrier New'"
                    >
                        My Blog
                    </chakra.h1>
                </Flex>
                <Flex
                    minWidth="400px"
                    flexDirection="row"
                    justifyContent="space-around"
                    display={["none", "flex"]}
                >
                    <LinkBtn to="/" variant="ghost">
                        Acceuil
                    </LinkBtn>
                    <LinkBtn to="/article" variant="ghost">
                        Articles
                    </LinkBtn>
                    <LinkBtn
                        to="/login"
                        variant="ghost"
                        color="white"
                        bg="teal.500"
                        _hover={{ bg: "gray.500" }}
                    >
                        Se connecter
                    </LinkBtn>
                </Flex>
            </Flex>
            <chakra.div height={70} />
        </>
    );
};

export default Navbar;
