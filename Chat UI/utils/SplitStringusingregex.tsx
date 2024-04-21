function SplitStringusingregex(inputString: string) : string[] {
    const characters: string[] = []
    const regex = /[\s\s]/gu;

    let match;

    while((match = regex.exec(inputString))){
        characters.push(match[0]);
    }

    return characters
}

export default SplitStringusingregex;