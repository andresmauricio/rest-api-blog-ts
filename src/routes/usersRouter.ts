import { Response, Request, Router } from 'express';

import Users  from '../models/Users';
class UserRoutes { 

    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

     public async getUsers( req: Request, res: Response ) {
        const users =  await Users.find();
        if ( users.length == 0 ) { 
            res.json(false);
        } else { 
            res.json( users );  
        }
    }

    public async getUser( req: Request, res: Response ) {
        const user = await Users.findOne({ username : req.params.username });
        if ( user == null ) { 
            res.status(404);
            res.json(false)
        } else { 

            res.json(user)
        }
    }

    public async createUsers(req: Request, res: Response ) { 
        const newUser = new Users(req.body);
        await newUser.save();
        res.status(201);
        res.json([{ status: "success", data: { newUser }}]);
    }

    public async  UpdateUser( req: Request, res: Response ) { 
        const userUpdate = await Users.findOneAndUpdate({ username: req.params.username }, req.body, { new: true });
        res.json( userUpdate );
    }

    public async deleteUser( req: Request, res: Response ) {
        await Users.findOneAndDelete({ username: req.params.username });
        res.json( true );
    }

    routes() { 
        this.router.get('/', this.getUsers);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUsers);
        this.router.put('/:username', this.UpdateUser);
        this.router.delete('/:username', this.deleteUser);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;