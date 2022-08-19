import nc from 'next-connect';
import { deleteCookie } from 'cookies-next';

import middleware from '@/middleware';

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     description: Logout from the application
 *     tags: [Login]
 *     responses:
 *       200:
 *         description: OK
 */
const handler = nc()
  .use(middleware)
  .get(async (req, res) => {
    deleteCookie('access_token', { req, res });
    return res.send();
  });

export default handler;

export const config = {
  api: {
    // Disable default bodyParser to use custom middleware
    bodyParser: false,
  },
};
