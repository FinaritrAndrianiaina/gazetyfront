import React from "react";
import {Box, IconButton, useColorMode, useColorModeValue,} from "@chakra-ui/react";
import {GiMoon, GiSun} from "react-icons/gi";

const ColorSwitch = (props) => {
    const {toggleColorMode} = useColorMode();
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
                    <SwitchIcon/>
                </Box>
            }
            size="md"
            fontSize="lg"
        />
    );
};

export default ColorSwitch;
