import nc from 'next-connect';
import db from '@/models';
//import User from '@/models/User';

const handler = nc().get(async (req, res) => {
  // console.log('models:', models);
  const users = await db.User.findAll();
  res.statusCode = 200;
  res.json({
    users: JSON.stringify(users),
  });
});

export default handler;
