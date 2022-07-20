import {useEffect, useState} from "react";

interface Query {
    query: string;
}

const useMediaQuery = ({query}: Query): boolean => {
    const [state, setState] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const request = window.matchMedia(query);
        setState(request.matches);
        const changeState = () => setState(() => request.matches);
        request.addEventListener('change', changeState);
        return () => request.removeEventListener('change', changeState);
    }, [query]);

    return state;
}

export default useMediaQuery;