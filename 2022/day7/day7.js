const fs = require("fs");

const text = fs.readFileSync("./data.txt", { encoding: "utf-8" });
const lines = text
    .replaceAll('\r\n', '\n')
    .split('\n')
    .filter((l) => l !== '$ cd /' && l !== '$ ls');

const initFileSystem = () => {
    let fileSystem = {
        parent: null,
        name: '/',
        children: []
    };

    let current = {...fileSystem};

    lines.forEach((line) => {
        if (line.substring(0, 3) === 'dir') {
            current.children.push({ parent: {...current}, name: line, children: []});
        } else if (line.substring(0, 4) === '$ cd') {
            if (line === '$ cd ..') {
                current = {...current.parent};
            } else {
                current = {...current.children.filter((c) => c.name === 'dir ' + line.slice(5))[0]};
            }
        } else {
            current.children.push({ parent: {...current}, name: line, children: null});
        }
    });

    while (current.parent !== null) {
        current = current.parent;
    }

    return current;
}

let sizes = [];

const getSumBiggestDirs = (fileSystem) => {
    let size = 0;

    fileSystem.children.forEach((object) => {
        if (object.name.substring(0, 3) === 'dir') {
            size += getSumBiggestDirs(object);
        } else {
            size += parseInt(object.name.split(' ')[0], 10);
        }
    });

    sizes.push(size);
    return size;
}

const getRootSize = (fileSystem) => {
    let size = 0;

    fileSystem.children.forEach((object) => {
        if (object.name.substring(0, 3) === 'dir') {
            size += getSumBiggestDirs(object);
        } else {
            size += parseInt(object.name.split(' ')[0], 10);
        }
    });

    return size;
}

const part1 = () => {
    getSumBiggestDirs(initFileSystem());
    
    return sizes.filter((s) => s <= 100000).reduce((sum, value) => sum + value);
}

const part2 = () => {
    const rootSize = getRootSize(initFileSystem());
    return Math.min(...sizes.filter((size) => 70000000 - rootSize + size > 30000000));
};

// Part 1
console.log('Part 1: ', part1());

// Part 2
console.log('Part 2: ', part2());