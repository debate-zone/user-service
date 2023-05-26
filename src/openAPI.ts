import { OpenAPI } from 'express-zod-api';
import { routing } from './route';
import { config } from './config';
import manifest from '../package.json';
import 'dotenv/config';

const specAsYaml = new OpenAPI({
    routing,
    config,
    version: manifest.version,
    title: 'User API',
    serverUrl: process.env.SERVER_URL!,
    composition: 'components',
}).getSpecAsYaml();
