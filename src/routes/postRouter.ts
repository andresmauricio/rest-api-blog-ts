import { Response, Request, Router } from 'express';

import Post  from '../models/Post';
class PostRoutes { 

    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

     public async getPosts( req: Request, res: Response ) {
        const posts =  await Post.find();
        if ( posts.length == 0 ) { 
            res.json(false);
        } else { 
            res.json( posts );  
        }
    }

    public async getPost( req: Request, res: Response ) {
        const post = await Post.findOne({ url : req.params.url });
        if ( post == null ) { 
            res.status(404);
            res.json(false)
        } else { 

            res.json(post)
        }
    }

    public async createPost(req: Request, res: Response ) { 
        const { title, url, content, image } = req.body;
        const newPost = new Post({ title, url, content, image });
        await newPost.save();
        res.status(201);
        res.json([{ status: "success", data: { newPost }}]);
    }

    public async  updatePost( req: Request, res: Response ) { 
        const postUpdate = await Post.findOneAndUpdate({ url: req.params.url }, req.body, { new: true });
        res.json( postUpdate );
    }

    public async deletePost( req: Request, res: Response ) {
        await Post.findOneAndDelete({ url: req.params.url });
        res.json( true );
    }

    routes() { 
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
}

const postRoutes = new PostRoutes();
export default postRoutes.router;