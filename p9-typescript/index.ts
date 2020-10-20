import express from 'express'
import calculateBmi from './bmi'
const app = express()

app.get('/hello', (_req, res) => {
    res.send('Hello FullStack')
})
app.get('/bmi', (req, res) => {

    const object = (a: number, b: number) => {
        return {
            weight: Number(b),
            height: Number(a),
            bmi: calculateBmi(a, b)
        }
    }
    if (!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))) {
        res.json(object(Number(req.query.height), Number(req.query.weight)))
    } else {
        res.status(400).json({ error: "malformatted parameters" })
    }
})

const PORT = 3002

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})