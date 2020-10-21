import express from 'express';
import calculateBmi from './bmi';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello FullStack');
});
app.get('/bmi', (req, res) => {

    const object = (a: number, b: number) => {
        return {
            weight: Number(b),
            height: Number(a),
            bmi: calculateBmi(a, b)
        };
    };
    if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
        res.json(object(Number(req.query.height), Number(req.query.weight)));
    } else {
        res.status(400).json({ error: "malformatted parameters" });
    }
});
app.post('/exercises', (req, res) => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = req.body;
    let hours: Array<string> = [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    hours = body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = Number(body.target);
    if (hours === undefined || target === undefined) {
        res.status(400).json({ error: "parameters missing" });
    }
    if (Array.isArray(hours) && !isNaN(target)) {
        res.send(calculateExercises(hours, target));
    } else {
        res.status(400).json({ error: "malformatted parameters" });
    }
});
const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});