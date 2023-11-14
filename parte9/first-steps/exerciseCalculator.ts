interface ExerciseValues {
    target: number;
    exerciseHours: Array<number>;
    
}


export const parseExerciseArguments = (
  args: string[]
): ExerciseValues => {

    if (args.length < 2) throw new Error('Incorrect number of arguments')
    
    const target = Number(args[0]);
    const exerciseHours = args.slice(1).map(hour => Number(hour));

    if (!isNaN(target) && !exerciseHours.some(isNaN)) {
        return {
            target,
            exerciseHours
        };

    } else {
        throw new Error('Provided values were not numbers!');
    }
};

interface AverageValues {
    periodLength: Number,
    trainingDays: Number,
    success: Boolean,
    rating: Number,
    ratingDescription: String,
    target: Number,
    average: Number
}  


const calculateExercises = (target: number, exerciseHours: Array<number>): AverageValues => {
    const periodLength = exerciseHours.length
    const trainingDays = exerciseHours.filter((day) => day > 0).length
    const average = exerciseHours.reduce((a,b) => a + b, 0 ) / periodLength
    const success = average >= target ? true : false;

    let rating
    let ratingDescription

    if (average < target ) {
        rating = 1,
        ratingDescription = 'not too bad but could be better'
    } else if (average === target) {
        rating = 2 
        ratingDescription = 'good, but could be better'
    }
    else {
        rating = 3 
        ratingDescription = 'very good, congratulations'
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    }
}

const args = process.argv.slice(2);
try {
    const { target, exerciseHours } = parseExerciseArguments(args);
    const result = calculateExercises(target, exerciseHours);
    console.log(result);
    console.log(exerciseHours)
} catch (error) {
    console.error(error.message);
}

