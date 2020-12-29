import {Button, chakra, Flex} from "@chakra-ui/react";
import React from "react";
import ColorSwitch from "../components/ColorSwitch";
import {LinkBtn} from "./LinkBtn";

const Navbar = ({isAuth, disconnect, ...props}) => {
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
                <ColorSwitch/>
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
            <chakra.div height={70}/>
        </>
    );
};

export default Navbar;
