import {Link} from "react-router-dom";
import {Button} from "@chakra-ui/react";
import React from "react";

export const LinkBtn = ({children, to, ...rest}) => {
    return (
        <Link to={to}>
            <Button variant="ghost" {...rest}>
                {children}
            </Button>
        </Link>
    );
};