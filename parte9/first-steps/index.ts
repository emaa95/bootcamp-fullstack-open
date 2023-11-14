import express from 'express';
import { calculateBmi, parseBmiArguments } from './bmiCalculator';

const app = express();

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

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
      res.status(400);
      res.send({ error: e.message });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});