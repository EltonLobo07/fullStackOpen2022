interface result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface input {
    trainingHrs: number,
    exerciseRecord: Array<string>
}

export function parseArgsCalculateExercises(arr : Array<string>) : input {
    if (arr.length < 4)
        throw new Error("Not enough args");

    return {trainingHrs: +arr[2], exerciseRecord: [...arr.slice(3)]};
}

export function calculateExercises(exerciseRecord : Array<string | number>, targetExerciseHrs : number) : result {
    if (!Array.isArray(exerciseRecord) || typeof targetExerciseHrs !== "number")
        throw new Error("Malformatted args");
    
    for (let i = 0; i < exerciseRecord.length; i++)
        if (isNaN(Number(exerciseRecord[i])))
            throw new Error("Malformatted args");

    let average = 0;

    for (let i = 0; i < exerciseRecord.length; i++)
        average += Number(exerciseRecord[i]);

    average /= exerciseRecord.length;
    
    const success = targetExerciseHrs <= average; 

    return ({
        periodLength: exerciseRecord.length,
        trainingDays: exerciseRecord.filter(exerciseHrs => Number(exerciseHrs) !== 0).length,
        success,
        rating: success ? 5 : 2, 
        ratingDescription: success ? "Good work" : "Not too bad but could be better",
        target: targetExerciseHrs,
        average
    });
}

/*
try {
    const { trainingHrs : targetHrs, exerciseRecord } = parseArgsCalculateExercises(process.argv);
    console.log(calculateExercises(exerciseRecord, targetHrs));
}
catch(error : unknown) {
    let errorMessage = "Something went wrong.";

    if (error instanceof Error)
        errorMessage += " Error - " + error.message;

    console.log(errorMessage);
} 
*/