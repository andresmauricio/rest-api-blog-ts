import express from 'express';
import morgan  from 'morgan';
import helmet  from 'helmet' ;
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

import indexRoutes  from './routes/indexRoutes';
import postRouter from './routes/postRouter';
import usersRoutes from './routes/usersRouter';

class Server { 
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config() {
        // connect database 
        const MONGO_URI = "mongodb://admin:andres98@ds213529.mlab.com:13529/blog-api-typescript";
        mongoose.set('useFindAndModify', true);
        mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true
        }).then( db =>  console.log('database connect success '))
        
        // settings 
        this.app.set('port', process.env.PORT || 3000);

        // middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(helmet());
    }

    private routes() {
        this.app.use(indexRoutes);
        this.app.use('/api/posts', postRouter);
        this.app.use('/api/users', usersRoutes);
    }

    public start() { 
        this.app.listen(this.app.get('port'), () => { 
            console.log('server on port ', this.app.get('port'));
            
        })
    }
}

const server = new Server();
server.start();