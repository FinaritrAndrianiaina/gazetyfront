import { extendTheme } from "@chakra-ui/core";
import { mode } from "@chakra-ui/theme-tools";

export default extendTheme({
    styles: {
        global: (props) => ({
            body: {
                color: mode("gray.700", "whiteAlpha.900")(props),
                bg: mode("whiteAlpha.100", "gray.700")(props),
            },
        }),
    },
});