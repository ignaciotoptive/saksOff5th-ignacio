import nc from 'next-connect';
import db from '@/models';

const handler = nc().get(async (req, res) => {
  const users = await db.User.findAll({
    attributes: ['id', 'email', 'role'],
  });
  res.statusCode = 200;
  res.json({
    users: users,
  });
});

export default handler;
