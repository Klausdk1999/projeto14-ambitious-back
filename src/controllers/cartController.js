import { db, objectId } from '../dbStrategy/mongo.js';
import joi from 'joi';

export async function getCart(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  const session = await db.collection('sessoes').findOne({ token });
 
  if (!session) {
    return res.sendStatus(401);
  }

  const user = await db.collection("usuarios").findOne({ _id: session.userId });

  const items = user.cart;

  res.send(items).status(200);
}

export async function insertCart(req, res) {
  const item = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  const session = await db.collection('sessoes').findOne({ token });
 
  if (!session) {
    return res.sendStatus(401);
  }

  try {
		const user = await db.collection("usuarios").findOne({ _id: session.userId })
    
		if (!user) {
			res.sendStatus(404)
			return;
		}
    
    const carrinho=user.cart;
    carrinho.push(item);
    
		await db.collection("usuarios").updateOne({ 
			_id: user._id 
		}, { $set: { "cart": carrinho } });
				
		res.send("Item inserido  no carrinho").status(200);
		
	  } catch (error) {
	  res.status(500).send(error)
	}
}

