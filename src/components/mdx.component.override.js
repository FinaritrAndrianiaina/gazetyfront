import {  Heading, Text } from "@chakra-ui/core";

export default {
	p:{
		component:Text
	},
    h1: {
        component: Heading,
        props: {
            size: "2xl",
            my: 2,
            as: "h1",
        },
    },
    h2: {
        component: Heading,
        props: {
            as: "h2",
            size: "xl",
            my: 2,
        },
    },
    h3: {
        component: Heading,
        props: {
            as: "h3",
            size: "lg",
            my: 2,
        },
    },
    h4: {
        component: Heading,
        props: {
            as: "h4",
            size: "md",
            my: 2,
        },
    },
    h5: {
        component: Heading,
        props: {
            as: "h5",
            size: "sm",
            my: 2,
        },
    },
    h6: {
        component: Heading,
        props: {
            as: "h6",
            size: "xs",
            my: 2
        },
    }
};
