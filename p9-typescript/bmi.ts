const calculateBmi = (height: number, weight: number) => {
    height = height / 100
    const Bmi = weight / (height * height)
    if (Bmi < 15) {
        return "Very severely underweight"
    } else if (Bmi < 16) {
        return "Severely underweight"
    } else if (Bmi < 18.5) {
        return "Underweight"
    } else if (Bmi < 25) {
        return "Normal (Healthy weight)"
    } else if (Bmi < 30) {
        return "Overweight"
    } else if (Bmi > 30) {
        return "Obese"
    }
}

console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])))