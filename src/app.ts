import 'reflect-metadata';
import * as express from 'express';
import { createConnection } from 'typeorm';
import { teamController } from './controllers/team.controller';
import { playerController } from './controllers/player.controller';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/teams', teamController);
app.use('/players', playerController);

createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber'
    }
}).then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(error => console.log(error));
