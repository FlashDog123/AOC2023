import * as fs from 'fs';
const stringReplaceValues = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
} as { [key: string]: number };

const loadInput = (): number[] => {
    const file = fs.readFileSync('./inputs/day1.txt', 'utf8');

    // split the file by double new line characters
    const calibrations = file.split('\n');
    const numberWords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const regex = `(${numberWords.join("|")}|\\d)`;

    return calibrations.map(calibration => {
        const firstNumber = calibration.match(regex) ?? [];
        const lastNumber = calibration.match('.*' + regex) ?? [];

        console.log(firstNumber, lastNumber);
        console.log(Object.keys(stringReplaceValues));
        const firstNumberValue = stringReplaceValues[firstNumber[1] as string] ?? firstNumber[1];
        const lastNumberValue = stringReplaceValues[lastNumber[1] as string] ?? lastNumber[1];
        
        return parseInt(`${firstNumberValue}${lastNumberValue}`);
    });
}

const part1 = () => {
    console.log(loadInput());
    // return the max value from loadInput array
    return loadInput().reduce((a, b) => a + b, 0);
}

const part2 = () => {
    // console.log(loadInput());
    // return the max value from loadInput array
    return loadInput().reduce((a, b) => a + b, 0);
}

// console.log(part1());
console.log(part2());