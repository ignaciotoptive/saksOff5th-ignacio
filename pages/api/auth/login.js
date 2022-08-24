import nc from 'next-connect';
import { setCookie } from 'cookies-next';

import db from '@/models';
import middleware from '@/middleware';
import bcryptService from '@/services/bcrypt.service';
import authService from '@/services/auth.service';

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: merchandiser@webstore.com
 *         password:
 *           type: string
 *           example: password
 * tags:
 *   - name: Login
 *     description: Login Form
 */
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: Login to the application
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         schema:
 *           type: object
 */
const handler = nc({
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).send();
  },
})
  .use(middleware)
  .post(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: 'Bad Request: Email or password is wrong' });
    }
    try {
      const user = await db.User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ msg: 'Bad Request: User not found' });
      }
      const { password: userPassword } = user.toJSON();
      if (bcryptService().comparePassword(password, userPassword)) {
        const token = authService().issue({
          id: user.id,
          email: user.email,
          role: user.role,
        });
        setCookie('access_token', token, {
          req,
          res,
          httpOnly: false,
        });
        return res.send();
      }

      return res.status(401).json({ msg: 'Unauthorized' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  });

export default handler;

export const config = {
  api: {
    // Disable default bodyParser to use custom middleware
    bodyParser: false,
  },
};
