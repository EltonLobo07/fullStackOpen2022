export function parseArgsCalculateBmi(arr : Array<string>) : Array<number> {
    if (arr.length < 4)
        throw new Error("Not enough args");

    return [Number(arr.at(-2)), Number(arr.at(-1))];
}

export function calculateBmi(height : number, weight : number) : string {
    if (isNaN(Number(height)) || isNaN(Number(weight)))
        throw new Error("Malformatted args");

    const bmi = +(weight / (height / 100) ** 2).toFixed(1);

    if (bmi < 16)
        return "Underweight (Severe thinness)";

    if (bmi <= 16.9)
        return "Underweight (Moderate thinness)";

    if (bmi <= 18.4)
        return "Underweight (Mild thinness)";

    if (bmi <= 24.9)
        return "Normal range";

    if (bmi <= 29.9)
        return "Overweight (Pre-obese)";

    if (bmi <= 34.9)
        return "Obese (Class 1)";

    if (bmi <= 39.9)
        return "Obese (Class 2)";

    return "Obese (Class 3)";
}

/*
try {
    const [height, weight] = parseArgsCalculateBmi(process.argv);
    console.log(calculateBmi(height, weight));
}
catch(error : unknown) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error)
        errorMessage += " Error - " + error.message;

    console.log(errorMessage);
} 
*/ 
