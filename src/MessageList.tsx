import React from 'react';
import {Message, IMessagesProp} from "./Messages";
import {Box, Grid} from "@material-ui/core";
import {MessageContent} from "./Message";

export interface IMessageContentProp {
    message: Message
}

export function MessageList(props: IMessagesProp) {
    return (
        <Grid container>
            <Box p={6}>
                {props.messages.map((aMessage: Message, index)=>(
                    <Box py={2} key={index}>
                        <MessageContent message={aMessage}/>
                    </Box>
                ))}
            </Box>
        </Grid>
    );
}
