import nc from 'next-connect';
import db from '@/models';
import middleware from '@/middleware';
import { CATEGORY } from '@/utils/types';
import { storeImage } from '@/utils/image';
/**
 *  @swagger
 *  components:
 *    schemas:
 *      Product:
 *        type: object
 *        required:
 *          - SKU
 *          - price
 *        properties:
 *          id:
 *            type: integer
 *          SKU:
 *            type: string
 *            example: UIA7824289912
 *          price:
 *            type: number
 *            format: float
 *            example: 220.12
 *          inventory:
 *            type: integer
 *            example: 50
 *          shipmentDaysMin:
 *            type: integer
 *            example: 3
 *          shipmentDaysMax:
 *            type: integer
 *            example: 5
 *          isActive:
 *            type: boolean
 *            example: true
 *          category:
 *            type: string
 *            example: OTHER
 *          image:
 *            type: string
 *            format: binary
 *      ArrayOfProduct:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/Product'
 * tags:
 *   - name: Products
 *     description: Products Form
 */

/**
 * @swagger
 * /api/product:
 *  get:
 *    description: Fetch a list of Products
 *    tags: [Products]
 *    parameters:
 *     - in: query
 *       name: page
 *       schema:
 *        type: integer
 *        default: 0
 *     - in: query
 *       name: category
 *       schema:
 *        type: string
 *        enum:
 *          - OTHER
 *          - SHOES
 *          - FURNITURE
 *          - HANDBAGS
 *    responses:
 *     200:
 *       description: Products list array
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfProduct'
 *  post:
 *    description: Create new Product
 *    tags: [Products]
 *    requestBody:
 *      required: true
 *      content:
 *       multipart/form-data:
 *         schema:
 *           $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        schema:
 *          type: object
 */
const handler = nc({
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).send();
  },
})
  .use(middleware)
  .get(async (req, res) => {
    const { pageSize = 20, page = 0, category = '' } = req.query;
    const whereClauses = { isActive: true };
    if (category) {
      whereClauses.category = category;
    }
    const products = await db.Product.findAll({
      where: whereClauses,
      include: db.Image,
      limit: pageSize,
      offset: page * pageSize,
      order: [['id', 'DESC']],
    });
    res.status(200).json({
      products,
    });
  })
  .post(async (req, res) => {
    const {
      SKU,
      price,
      inventory = 0,
      shipmentDaysMin = 0,
      shipmentDaysMax = 0,
      isActive: isActive_ = false,
      category = CATEGORY.OTHER,
    } = req.body;
    if (!SKU || !price) {
      return res.status(400).send('Invalid SKU or price');
    }
    const isActive = isActive_ == 'on' || isActive_;
    try {
      const product = await db.Product.create({
        SKU,
        price,
        inventory,
        shipmentDaysMin,
        shipmentDaysMax,
        isActive,
        category,
      });
      if (req.files && req.files.image) {
        const { url, width, height } = await storeImage({
          imageFile: req.files.image,
        });
        const productId = product.id;
        await db.Image.create({
          url,
          width,
          height,
          productId,
        });
      }
      return res.status(200).json({ product });
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Invalid Product params', errors: error.errors });
    }
  });

export default handler;

export const config = {
  api: {
    // Disable default bodyParser to use custom middleware
    bodyParser: false,
  },
};
