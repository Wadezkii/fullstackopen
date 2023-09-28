import { isNotNumber } from "./utils";

interface ExcersiseValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (dailyHours: number[], target: number): ExcersiseValues => {
    let periodLength = dailyHours.length;
    let trainingDays = dailyHours.filter(hours => hours !== 0).length;
    const average = dailyHours.reduce((acc, curr) => acc + curr, 0) / periodLength;
    let rating = 0;
    let ratingDescription = '';
    if (average >= target) {
        rating = 3;
        ratingDescription = 'good job';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'you should try harder';
    }

    const success = average >= target;

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
}

const parseArguments = (args: string[]): [number, number[]] => {
    if (args.length < 4) throw new Error('Not enough arguments');
  
    const [, , target, ...hours] = args;
  
    if (isNotNumber(target) || hours.some(hour => isNotNumber(hour))) {
      throw new Error('Provided values were not numbers!');
    }
  
    return [Number(target), hours.map(hour => Number(hour))];
  }
  
  try {
      const [target, dailyHours] = parseArguments(process.argv);
      const result = calculateExercises(dailyHours, target);
      console.log(result);
  } catch (e) {
      console.log('Error:', e.message);
  }

export default calculateExercises;
