import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
import morgan from 'morgan';

const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
app.use(morgan((_: any, req, res) => {
  return [
    req.method,
    req.url,
    res.statusCode,
    JSON.stringify(req.body)
  ].join(' ');
}));

app.use(express.json());
const PORT = 3001;
app.use(cors());

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});