import {IMessageContentProp} from "./MessageList";
import React from "react";
import {Box} from "@material-ui/core";


export type MessageContentType = 'normal' | 'premium'

const strategies = {
    premium: PremiumMessageContent,
    normal: NormalMessageContent,
    __default__: NormalMessageContent
};


export const MessageContent = (props: IMessageContentProp) => {
    // 型チェックは実行時には働かないので、別でバリデーションしないとstrategies.__default__が呼ばれる場合がある。
    const strategy = strategies[props.message.type] ?? strategies.__default__;
    return strategy(props)
};


function PremiumMessageContent (props: IMessageContentProp) {
    return (
        <Box color={"secondary.main"}>
            {props.message.text}
        </Box>
    )
}

function NormalMessageContent (props: IMessageContentProp){
    return (
        <div>
            {props.message.text}
        </div>
    )
}
