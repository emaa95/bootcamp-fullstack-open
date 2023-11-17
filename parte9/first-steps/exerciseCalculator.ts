interface ExerciseValues {
    target: number;
    exerciseHours: Array<number>;    
}


export const parseExerciseArguments = (
    target: number,
    dailyExercises: Array<number>
  ): ExerciseValues => {
    if (!isNaN(target) && !dailyExercises.some(isNaN)) {
      return {
        target: target,
        exerciseHours: dailyExercises
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };
  
interface AverageValues {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}  


export const calculateExercises = (target: number, exerciseHours: Array<number>): AverageValues => {
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter((day) => day > 0).length;
    const average = exerciseHours.reduce((a,b) => a + b, 0 ) / periodLength;
    const success = average >= target ? true : false;

    let rating;
    let ratingDescription;

    if (average < target ) {
        rating = 1;
        ratingDescription = 'not too bad but could be better';
    } else if (average === target) {
        rating = 2; 
        ratingDescription = 'good, but could be better';
    }
    else {
        rating = 3; 
        ratingDescription = 'very good, congratulations';
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};

