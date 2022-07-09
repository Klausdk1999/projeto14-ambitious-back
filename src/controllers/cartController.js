import { db, objectId } from '../dbStrategy/mongo.js';
import joi from 'joi';

//export async function getCart(req, res) {
 // const session = res.locals.session;

  // const posts = await db
  //   .collection('transactions')
  //   .find({ userId: new objectId(session.userId) })
  //   .toArray();
  // res.send(posts);
//}

export async function insertCart(req, res) {
  const id = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer ', '');

  console.log("insert cart");

  console.log(token);

  const session = await db.collection('sessoes').findOne({ token });
  console.log(session);
  if (!session) {
    return res.sendStatus(401);
  }

  try {

		const user = await db.collection("usuarios").findOne({ _id: new objectId(session._id) })
    console.log(user);
		if (!user) {
			res.sendStatus(404)
			return;
		}
    
    const carrinho=user.cart;
    console.log("cria carrinho"+carrinho);
    carrinho.push(id);
    console.log("push"+carrinho);
    console.log("id"+user.id)
		await db.collection("usuarios").updateOne({ 
			_id: user._id 
		}, { $set: { "cart": carrinho } });
				
		res.send("Inserido item no carrinho").status(200);
		
	  } catch (error) {
	  res.status(500).send(error)
	}
}

