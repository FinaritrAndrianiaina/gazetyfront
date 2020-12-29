import {extendTheme} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

export default extendTheme({
    styles: {
        global: (props) => ({
            body: {
                color: mode("gray.700", "whiteAlpha.900")(props),
                bg: mode("white", "gray.700")(props),
            },
            "nav.navbar": {
                bg: mode("white", "gray.700")(props),
            },
        }),
    },
});