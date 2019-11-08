declare module 'react-click-n-hold'
{
    import React from "react";

    export default class ReactClickNHold extends React.Component<ReactClickNHoldProps, any> {}

    export class ReactClickNHoldProps {
        readonly time: number = 2;
        readonly onStart: (e: any) => void;
        readonly onClickNHold: (e: any) => void;
        readonly onEnd: (e: any, enough: boolean) => void;
    }
}
