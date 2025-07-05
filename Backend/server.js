import express from 'express';
import cors from 'cors';
import { accountRoutes, mediaFileRoutes, uploadRoutes } from './routes/index.js';
import connectDB from './config/database.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('API is up and running.');
});

app.use('/api/account', accountRoutes);
app.use('/api/media', mediaFileRoutes);
app.use('/api/upload', uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
