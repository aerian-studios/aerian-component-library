export const hyphenJoin = (nonWord: string): string =>
    nonWord.replace(/\W/gi, "-");

export const capitalise = (word: string): string =>
    word[0].toUpperCase() + word.substring(1);