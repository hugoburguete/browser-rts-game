import { Request, Response } from 'express';
import { MongoClient } from "mongodb";
import { User } from '../entities/user.entity';

const users: User[] = [
  {
    id: 123,
    username: "",
    email: "hello",
    password: ""
  }
];

export const get = (req: Request, res: Response) => {
  const uri: string = process.env.MONGODB_CONNECTION_STRING || '';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(async (err) => {
    const collection = client.db("users").collection("user");
    await collection.find({}).toArray((err, docs) => {
      console.log(docs);
    })

    // perform actions on the collection object
    client.close();
  });
  res.send('done');
  // res.send(users[0]);
}

export const post = (req: Request, res: Response) => {
  const uri = "";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });
  res.send('done');
}