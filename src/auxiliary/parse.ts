export const parse = (props: object): string => {

    function styleHyphenFormat(propertyName: string) {
        function upperToHyphenLower(match: string, offset: number) {
            return (offset > 0 ? '-' : '') + match.toLowerCase();
        }
        return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
    }

    let query: string = Object.entries(props)
        .map(element =>
            `(${styleHyphenFormat(element[0])}: ${typeof (element[1]) === "number"
                ? element[1] + 'px'
                : element[1]}) and`)
        .join(' ');
    return query.slice(0, -4);
}