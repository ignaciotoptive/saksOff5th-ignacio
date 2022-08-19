import nc from 'next-connect';
import db from '@/models';

const handler = nc().get(async (req, res) => {
  const { id } = req.query;
  const user = await db.User.findByPk(id, {
    attributes: ['id', 'email', 'role'],
  });
  res.statusCode = 200;
  res.json({
    user: user,
  });
});

export default handler;
