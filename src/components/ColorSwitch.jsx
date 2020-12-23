import React, { useEffect, useState } from "react";
import {
    useColorMode,
    useColorModeValue,
    IconButton,
    Box,
} from "@chakra-ui/react";
import { GiSun,GiMoon } from "react-icons/gi";

const ColorSwitch = (props) => {
    const { toggleColorMode } = useColorMode();
    const text = useColorModeValue("dark", "light");
    const SwitchIcon = useColorModeValue(GiSun, GiMoon);
    return (
        <IconButton
            {...props}
            aria-label={`Switch to ${text} mode`}
            variant="outline"
            rounded="100%"
            color="currentcolor"
            onClick={toggleColorMode}
            icon={
                <Box fontSize={25}>
                    <SwitchIcon />
                </Box>
            }
            size="md"
            fontSize="lg"
        />
    );
};

export default ColorSwitch;
