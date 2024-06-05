import { join } from 'path';
const loggerPath: string = join(__dirname, 'logs');
process.env.LOG_PATH = process.env.LOG_PATH || loggerPath;

import express, { Application } from 'express';
import { Loader } from './src/loader';

const app: Application = express();

const loader: Loader = new Loader(app);

loader.loadServer();
