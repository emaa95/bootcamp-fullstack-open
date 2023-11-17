import express from 'express';
import { calculateBmi, parseBmiArguments } from './bmiCalculator';
import { calculateExercises, parseExerciseArguments } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!weight || !height) {
    res.status(400);
    res.send({ error: 'malformatted parameters' });
  } else {
    try {
      const { heightInCm, weightInKg } = parseBmiArguments(
        Number(height),
        Number(weight)
      );
      const bmi = calculateBmi(heightInCm, weightInKg);
      res.send({
        weight: weightInKg,
        height: heightInCm,
        bmi: bmi
      });
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send({ error: e.message });
          } else {
            res.status(500).send({ error: 'Internal Server Error' });
          }
    }
  }
});

app.post('/exercises', (req, res) => {
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const dailyExercises = req.body.exerciseHours;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const dailyTarget = req.body.target;

  if ( !dailyTarget || !dailyExercises ) {
    return res.status(400).send({ error: "parameters missing" });
  }  else {
    try{
      const { target, exerciseHours } = parseExerciseArguments(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          dailyTarget,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          dailyExercises
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = calculateExercises(target, exerciseHours);
      return res.send({result});
    }
    catch (e) {
      if (e instanceof Error) {
          return res.status(400).send({ error: e.message });
        } else {
          return res.status(500).send({ error: 'Internal Server Error' });
        }
  }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});