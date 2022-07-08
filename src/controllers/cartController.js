import { db, objectId } from '../dbStrategy/mongo.js';
import joi from 'joi';

export async function getCart(req, res) {
  const session = res.locals.session;

  // const posts = await db
  //   .collection('transactions')
  //   .find({ userId: new objectId(session.userId) })
  //   .toArray();
  // res.send(posts);
}

export async function insertCart(req, res) {
  const id = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  const session = await db.collection('sessoes').findOne({ token });

  if (!session) {
    return res.sendStatus(401);
  }

  try {
		const usersColection = db.collection("usuarios");
		const user = await usersColection.findOne({ _id: new ObjectId(session._id) })
		if (!user) {
			res.sendStatus(404)
			return;
		}
		await usersColection.updateOne({ 
			_id: user._id 
		}, { $push: { "cart": id } })
				
		res.send("Inserido item no carrinho").status(200)
		
	  } catch (error) {
	  res.status(500).send(error)
	}
}

