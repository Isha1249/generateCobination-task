// Function to generate all possible combinations
const readline = require('readline');
function generateCombinations(obj) {
    if (typeof obj !== 'object' || obj === null) {
        console.error("Input must be a valid object.");
        return [];
    }
    const keys = Object.keys(obj);
    function combine(index, current) {
        if (index === keys.length) {
            return [current];
        }
        const key = keys[index];
        const values = obj[key];
        if (!Array.isArray(values)) {
            console.error(`The value of key "${key}" must be an array.`);
            return [];
        }
        const result = [];
        for (const value of values) {
            const newCombination = current ? current + '|' + value : value;
            result.push(...combine(index + 1, newCombination));
        }
        return result;
    }
    return combine(0, '');
}
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Input By User-
rl.question('Please enter your object in JSON format (e.g., {"color":["red","blue"],"size":["xl","xxl"]}): ', (input) => {
    try {
        const obj = JSON.parse(input);
        const result = generateCombinations(obj);
        console.log("Generated Combinations:");
        console.log(result);

    } catch (e) {
        console.error("Invalid input. Please enter a valid JSON object.");
    }
    rl.close();
});
