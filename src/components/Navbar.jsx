import { Flex, chakra, Button } from "@chakra-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import ColorSwitch from "../components/ColorSwitch";

const LinkBtn = ({ children, to, ...rest }) => {
    return (
        <Link to={to}>
            <Button variant="ghost" {...rest}>
                {children}
            </Button>
        </Link>
    );
};

const Navbar = ({ isAuth, disconnect, ...props }) => {
    return (
        <>
            <Flex
                className="navbar"
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
                <ColorSwitch />
                <Flex>
                    <chakra.h1
                        fontSize="30px"
                        fontWeight="900"
                        fontFamily="'Courrier New'"
                    >
                        Gazety
                    </chakra.h1>
                </Flex>
                <Flex
                    minWidth="400px"
                    flexDirection="row"
                    justifyContent="space-around"
                    display={["none", "flex"]}
                >
                    <LinkBtn mx={5} to="/">
                        Acceuil
                    </LinkBtn>

                    <LinkBtn mx={5} to="/article">
                        Articles
                    </LinkBtn>
                    {!isAuth ? (
                        <LinkBtn
                            to="/login"
                            variant="solid"
                            colorScheme="facebook"
                        >
                            Se connecter
                        </LinkBtn>
                    ) : (
                        <>
                            <LinkBtn
                                to="/user"
                                variant="outline"
                                colorScheme="facebook"
                                mx={5}
                            >
                                Utilisateur
                            </LinkBtn>
                            <Button variant="solid" onClick={disconnect}>
                                Deconnecter
                            </Button>
                        </>
                    )}
                </Flex>
            </Flex>
            <chakra.div height={70} />
        </>
    );
};

export default Navbar;
