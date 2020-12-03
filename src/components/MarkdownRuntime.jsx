import React from 'react';
import Markdown from "markdown-to-jsx";
import overrides from "./mdx.component.override";

const MarkdownRuntime = ({children}) => {
    return (
        <Markdown options={{ overrides }}>
            {children}
        </Markdown>
    );
}

export default MarkdownRuntime
