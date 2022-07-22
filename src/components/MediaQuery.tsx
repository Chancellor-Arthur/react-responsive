import React, {ReactNode} from 'react';
import {useMediaQuery} from "../hook/useMediaQuery";
import {parse} from "../auxiliary/parse";

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys]

interface MediaQueryProps {
    orientation?: "portrait" | "landscape";
    minResolution?: `${number}dppx` | number;
    maxResolution?: `${number}dppx` | number;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
}

type MediaQueryComponentProps = {
    children: ReactNode | ((param: boolean) => ReactNode);
} & RequireAtLeastOne<MediaQueryProps>;

const MediaQuery =
    ({children, ...props}: MediaQueryComponentProps) => {
        const answer = useMediaQuery({query: parse(props)});
        return (
            typeof (children) === 'function'
                ? <div>{children(answer)}</div>
                : answer ? <div>{children}</div> : null
        );
    };

export default MediaQuery;