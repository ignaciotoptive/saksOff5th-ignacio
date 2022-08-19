import nc from 'next-connect';
import csv from 'csv-parser';
import fs from 'fs';

import middleware from '@/middleware';
import db from '@/models';

/**
 * @swagger
 * /api/product/import:
 *   post:
 *     description: Import Products from CSV file
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              file:
 *                type: string
 *                format: binary
 *     responses:
 *       200:
 *         schema:
 *           type: object
 */
const handler = nc()
  .use(middleware)
  .post(async (req, res) => {
    if (!req.files || !req.files.file) {
      return res.status(400).send('No files were uploaded.');
    }
    try {
      const { file } = req.files;
      const products = await new Promise((resolve) => {
        const rows = [];
        fs.createReadStream(file.filepath)
          .pipe(csv())
          .on('data', (data) => rows.push(data))
          .on('end', () => resolve(rows));
      });
      await Promise.all(products.map((product) => db.Product.create(product)));
      return res.status(200).send();
    } catch (error) {
      console.error(error);
      return res.status(500).send();
    }
  });

export default handler;

export const config = {
  api: {
    // Disable default bodyParser to use custom middleware
    bodyParser: false,
  },
};
