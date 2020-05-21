import React, {Dispatch, SetStateAction} from 'react';
import {MessageList} from "./MessageList";
import {MessageContentType} from "./Message";

interface IMessageProps {
    text: string,
    type: MessageContentType
}

export class Message implements IMessageProps {
    // このクラスを使えば文字数はバリデートできるけど、ダックタイピングなのでこのクラスの使用を強制できるわけではない。
    // どこかにこういうValueObjectのクラスをまとめて置く場所を作る必要がある？
    private readonly props: IMessageProps;

    get text (): string {
        return this.props.text;
    }

    get type (): MessageContentType {
        return this.props.type
    }

    public static create (text: string, type: MessageContentType): Message {
        // constructor内ではconstructorを止めれないので、別メソッドでバリデーションする。
        // ↑returnは意味ないけど、エラー出せば止まるのでそれでいいかも？

        // typeの入力規則が守られてるかもチェックしたいけど、型の情報はコンパイル時に失われるので直接確認することはできない。
        // strategiesをexportして作るしかない？まあデフォルトを設定できるし無理にバリデートしなくてもいいんだけど

        // 実際の案件では今回の内容はバリデーションする必要なさそうだけど、セキュリティ的な対策とかで使うかも？
        // Reactが基本的なエスケープはやってくれるからそんなに心配いらんかもだけど
        // https://reactjs.org/docs/introducing-jsx.html#jsx-prevents-injection-attacks
        if (text === undefined || text === null || text.length === 0 || text.length > 100) {
            throw new Error("textは、1から100文字である必要があります。")
        } else {
            return new Message({text: text, type: type})
        }
    }

    private constructor (props: IMessageProps) {
        this.props = props
    }
}

export type Messages = Array<Message>

export interface IMessagesProp {
    messages: Messages
}

function Messages() {
    const [messages, setMessages]: [Messages, Dispatch<SetStateAction<Messages>>] = React.useState<Messages>([]);

    React.useEffect(() => {
        // 本来はAPIなど外部リソースからデータを取得する
        new Promise(resolve => setTimeout(() => resolve(), 1000))
            .then(() => setMessages([
                Message.create("Message 1","normal"),
                Message.create('2つめは「ぷれみあむ」なめっせーじ！', 'premium'),
                Message.create('3個目は普通。', 'normal')
            ]))
    });

    return (
        <div>
            <MessageList messages={messages}/>
        </div>
    );
}

export default Messages;
