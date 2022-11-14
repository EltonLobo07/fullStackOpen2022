import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const {height, weight} = req.query;

    try {
        res.send({height, weight, bmi: calculateBmi(Number(height), Number(weight))});
    }
    catch(err : unknown) {
        res.status(400).send({error: err instanceof Error ? err.message : "Something went wrong, please try again later"});
    }
});

app.post("/exercises", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        res.send(calculateExercises(daily_exercises, Number(target)));
    }
    catch(err : unknown) {
        res.status(400).send({error: err instanceof Error ? err.message : "Something wen wrong, please try again later"});
    }
});

const PORT_NUMBER = 3000;

app.listen(PORT_NUMBER, () => console.log(`Server started at port number: ${PORT_NUMBER}`));
