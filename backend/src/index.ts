import express, { Express, Request, Response } from 'express';
import cors from "cors"

const app: Express = express();
const port = 3000;

app.use(cors());

interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
];

const posts: Post[] = [
  { id: 1, title: 'Post 1', content: 'Lorem ipsum...' },
  { id: 2, title: 'Post 2', content: 'Dolor sit amet...' },
];

app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

app.get('/posts', (req: Request, res: Response) => {
  res.json(posts);
});

app.get('/posts/:id', (req: Request, res: Response) => {
  const post = posts.find(post => post.id === parseInt(req.params.id));
  res.json(post || {});
});

app.post('/posts', (req: Request, res: Response) => {
  const newPost: Post = {
    id: posts.length + 1,
    ...req.body,
  };
  posts.push(newPost);
  res.json(newPost);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});