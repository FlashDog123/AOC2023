import * as fs from 'fs';
import { parse } from 'path/win32';

interface Draw {
    color: "red" | "green" | "blue";
    number: number;
    isValid: boolean;
}

interface DrawSet {
    draws: Draw[];
    isValid: boolean;
}

interface Game {
    id: number;
    drawSets: DrawSet[];
    totalAmount: number;
    isValid: boolean;
}

const loadInput = (): Game[] => {
    const file = fs.readFileSync('./inputs/day2.txt', 'utf8').split('\n');

    const maxAllowedColors = {red: 12, green: 13, blue: 14};
    return file.map(line => {
        const [id, draws] = line.split(':');
        const drawSets = draws.split(';').map(drawSets => {
            const localDraws = drawSets.split(',').map(draw => {
                const [number, color] = draw.trim().split(' ');
                return {
                    color,
                    number: parseInt(number),
                    isValid: parseInt(number) <= maxAllowedColors[color as "red" | "green" | "blue"]
                } as Draw;
            })
            return {
                draws: localDraws,
                isValid: localDraws.every(x => x.isValid)
            } as DrawSet;
        });

        const distinctDraws = drawSets.reduce((acc, curr) => acc.concat(curr.draws), [] as Draw[]).reduce((acc, curr) => {
            const existingDraw = acc.find(x => x.color === curr.color);
            if (existingDraw) {
                if (existingDraw.number < curr.number) {
                    existingDraw.number = curr.number;
                }
            } else {
                acc.push(curr);
            }
            return acc;
        }, [] as Draw[]);

        return {
            id: parseInt(id.split(' ')[1]),
            drawSets: drawSets,
            totalAmount: distinctDraws[0].number * distinctDraws[1].number * distinctDraws[2].number,
            isValid: drawSets.every(x => x.isValid),
        } as Game;
    });
}

const part1 = () => {
    const games = loadInput();
    const filteredGames = games.filter(game => game.isValid);
    return filteredGames.reduce((acc, curr) => acc + curr.id, 0);
}

const part2 = () => {
    const games = loadInput();
    return games.reduce((acc, curr) => acc + curr.totalAmount, 0);
}

console.log(part1());
console.log(part2());