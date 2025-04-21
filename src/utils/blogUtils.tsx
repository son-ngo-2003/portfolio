const boldTextFormat = (text: string) => {
    const words = text.split('**');
    const formattedWords = words.map((word, index) => {
        if (index % 2 == 1) {
            return <b key={index}>{word}</b>;
        }
        return word;
    });
    return formattedWords;
}

    
export { boldTextFormat };
