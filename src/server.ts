import dotenv from 'dotenv';
import { ApiError } from './utils/ApiError';
import app from './app';
import { dbConnet } from './config/db';

process.on('uncaughtException', (err: ApiError) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();

dbConnet(process.env.DB_ADDRESS || '');
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Handles any unhandled promises to make them more readable and prevent the app from quitting.
process.on('unhandledRejection', (err: ApiError) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  // Close the server down first after it completes its tasks then exit the app.
  server.close(() => {
    process.exit(1); // '0' for success, '1' for fail.
  });
});

// SIGTERM is a signal sent to cause a program to stop running.
process.on('SIGTERM', () => {
  console.log('👋🏼 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('PROCESS TERMINATED 👍🏼');
  });
});
