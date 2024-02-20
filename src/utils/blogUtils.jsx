const textToBlogModel = (text) => {
    const lines = text.trim().split('\n');
    const blogModel = lines.map(line => {
        const seperatePos = line.indexOf(':');
        const type = seperatePos == -1 ? 'p' : line.substring(0, seperatePos);
        const value = line.substring(seperatePos + 1);

        switch (type) {
            case 'pret':
                return {value: value, type: 'preTitle'}
            case 't':
                return {value: value, type: 'title'};
            case 'st':
                return {value: value, type: 'subtitle'};
            case 'h':
                return {value: value, type: 'heading'};
            case 'sh':
                return {value: value, type: 'subheading'};
            case 'img':
                return {value: value, type: 'image'};
            case 'dimg':
                return {value: value, type: 'imageDescription'};
            case 'p':
                return {value: value, type: 'paragraph'};
            case 'link':
                return {value: value, type: 'link'};
            default:
                return {value: value, type: 'unknown'};
        }
    });

    return blogModel;
}

const blogModelToText = (blogModel) => {
    const lines = blogModel.map(item => {
        switch (item.type) {
            case 'preTitle':
                return `pret:${item.value}`;
            case 'title':
                return `t:${item.value}`;
            case 'subtitle':
                return `st:${item.value}`;
            case 'heading':
                return `h:${item.value}`;
            case 'subheading':
                return `sh:${item.value}`;
            case 'image':
                return `img:${item.value}`;
            case 'imageDescription':
                return `dimg:${item.value}`;
            case 'paragraph':
                return `${item.value}`;
            case 'link':
                return `link:${item.value}`;
            default:
                return `??:${item.value}`;
        }
    });

    return lines.join('\n');
}

    
export { textToBlogModel, blogModelToText };
