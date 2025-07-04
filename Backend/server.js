import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connection established successfully.');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    console.error('Ensure that MONGODB_URI is correctly set in your .env file.');
  });

app.get('/', (req, res) => {
  res.send('API is up and running.');
});

app.use('/api', uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
