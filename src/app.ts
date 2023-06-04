import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import httpStatus from 'http-status';

import { ApiError } from './utils/ApiError';
import { globalErrorHandler } from './utils/errorHandler';
import listingRoutes from './routes/listing';
import agentRoutes from './routes/agent';
import organisationRoutes from './routes/organisation';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// routes
app.use('/api/listings', listingRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/organisations', organisationRoutes);

app.all('*', (req, res, next) => {
  next(
    new ApiError(
      httpStatus.NOT_FOUND,
      `Cannot find ${req.originalUrl} on this server!`
    )
  );
});

app.use(globalErrorHandler);

export default app;
