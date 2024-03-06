const getRandomNumber = (min, max) => {
    return (Math.random() * (max - min + 1)) + min;
}

const getRandomInt = (min, max) => {
    return Math.floor(getRandomNumber(min, max));
}

const getRandomString = (length) => {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const getRandomParagraph = () => {
    const numWords = getRandomInt(30, 70);
    let paragraph = '';
    for ( let i = 0; i < numWords; i++ ) {
        const word = getRandomString(getRandomInt(5, 10));
        paragraph += word + ' ';
    }
    return paragraph;
}

const getRandomText = (numParagraph) => {
    let text = '';
    for ( let i = 0; i < numParagraph; i++ ) {
        text += getRandomParagraph() + '\n';
    }
    return text;
}

export {getRandomNumber, getRandomInt, 
        getRandomString, getRandomText}