/**
 * Generates a random number between min and max (inclusive)
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns A random number in the specified range
 */
const getRandomNumber = (min: number, max: number): number => {
    return (Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random integer between min and max (inclusive)
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns A random integer in the specified range
 */
const getRandomInt = (min: number, max: number): number => {
    return Math.floor(getRandomNumber(min, max));
}

/**
 * Generates a random string of specified length
 * @param length - The length of the string to generate
 * @returns A random alphanumeric string
 */
const getRandomString = (length: number): string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Generates a random paragraph with random words
 * @returns A string containing a randomly generated paragraph
 */
const getRandomParagraph = (): string => {
    const numWords = getRandomInt(30, 70);
    let paragraph = '';
    for (let i = 0; i < numWords; i++) {
        const word = getRandomString(getRandomInt(5, 10));
        paragraph += word + ' ';
    }
    return paragraph.trim();
}

/**
 * Generates random text with specified number of paragraphs
 * @param numParagraph - The number of paragraphs to generate
 * @returns A string containing randomly generated text with paragraphs
 */
const getRandomText = (numParagraph: number): string => {
    let text = '# Random Title: ' + getRandomString(10) + '\n\n'; // Add a random title
    for (let i = 0; i < numParagraph; i++) {
        text += '## Random Heading: ' + getRandomString(10) + '\n\n'; // Add a random subtitle
        text += "Random Paragraph: " + getRandomParagraph();
        if (i < numParagraph - 1) {
            text += '\n\n'; // Add double newline between paragraphs except for the last one
        }
    }
    return text;
}

export {
    getRandomNumber,
    getRandomInt,
    getRandomString,
    getRandomParagraph,
    getRandomText
}