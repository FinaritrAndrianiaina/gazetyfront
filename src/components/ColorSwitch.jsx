import React from "react";
import {
    useColorMode,
    useColorModeValue,
    IconButton,
    Box,
} from "@chakra-ui/core";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorSwitch = (
    props
) => {
    const { toggleColorMode } = useColorMode();
    const text = useColorModeValue("dark", "light");
    const SwitchIcon = useColorModeValue(FaMoon, FaSun);

    return (
        <IconButton
            {...props}
            aria-label={`Switch to ${text} mode`}
            variant="outline"
            color="current"
            rounded="100%"
            position="fixed"
            width={60}
            height={60}
            bottom={50}
            right={50}
            onClick={toggleColorMode}
            icon={
                <Box fontSize={32}>
                    <SwitchIcon />
                </Box>
            }
            size="md"
            fontSize="lg"
        />
    );
};

export default ColorSwitch;