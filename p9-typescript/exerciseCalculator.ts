

interface result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}
const calculateExercises = (a: Array<string>, target: number): result => {
    
    const exercisesArray = a.map((e) => {
        return Number(e);
    });
    const trainingDays = exercisesArray.filter(d => d !== 0);
    const average = () => {
        let sum = 0;
        exercisesArray.forEach(n => {
            sum += n;
        });
        if (sum === 0) throw new Error('Cant\'t divide by 0!');
        return sum / a.length;
    };
    const success = () => {
        if (average() > target) {
            return true;
        }
        return false;
    };
    const rating = (): number => {
        if (average() < target / 2) {
            return 1;
        } else if (average() < target) {
            return 2;
        }
        return 3;
    };

    const ratingDescription = () => {
        if (average() < target / 2) {
            return "You can do a lot better!";
        } else if (average() < target) {
            return "Not quite there!";
        }
        return "Good, keep it up!";
    };

    return {
        periodLength: a.length,
        trainingDays: trainingDays.length,
        success: success(),
        rating: rating(),
        ratingDescription: ratingDescription(),
        target: target,
        average: average()
    };
};
export default calculateExercises;