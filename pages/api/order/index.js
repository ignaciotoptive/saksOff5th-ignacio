import nc from 'next-connect';
import sumBy from 'lodash/sumBy';

import db from '@/models';
import middleware from '@/middleware';

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Order:
 *        type: object
 *        required:
 *          - products
 *          - userId
 *        properties:
 *          id:
 *            type: integer
 *          products:
 *            type: array
 *            items:
 *              type: integer
 *          userId:
 *            type: integer
 *            example: 1
 *          paymentCardId:
 *            type: integer
 *          shippingAddressId:
 *            type: integer
 *      ArrayOfOrder:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/Order'
 * tags:
 *   - name: Orders
 *     description: Orders Form
 */

/**
 * @swagger
 * /api/order:
 *  get:
 *    description: Fetch a list of Orders
 *    tags: [Orders]
 *    responses:
 *     200:
 *       description: Orders list array
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfOrder'
 *  post:
 *    description: Create new Order
 *    tags: [Orders]
 *    requestBody:
 *      required: true
 *      content:
 *       multipart/form-data:
 *         schema:
 *           $ref: '#/components/schemas/Order'
 *    responses:
 *      200:
 *        schema:
 *          type: object
 *      401:
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
    const orders = await db.Order.findAll();
    res.status(200).json({
      orders,
    });
  })
  .post(async (req, res) => {
    const {
      products,
      userId,
      paymentCardId = null,
      shippingAddressId = null,
    } = req.body;

    // Determine paymentCard from request params or
    // check if user has at least one associated
    const paymentCard = paymentCardId
      ? await db.Card.findByPk(paymentCardId)
      : await db.Card.findOne({ where: { userId } });
    if (!paymentCard || paymentCard.userId != userId) {
      return res
        .status(401)
        .send(
          paymentCardId
            ? 'Invalid Payment Card Id'
            : 'User has no Payment Card associated'
        );
    }

    // Determine shippingAddress from request params or
    // check if user has at least one associated
    const shippingAddress = shippingAddressId
      ? await db.Address.findByPk(shippingAddressId)
      : await db.Address.findOne({ where: { userId } });
    if (!shippingAddress || shippingAddress.userId != userId) {
      return res
        .status(401)
        .send(
          shippingAddressId
            ? 'Invalid Shipping Address Id'
            : 'User has no Address associated'
        );
    }

    const productsData = await Promise.all(
      products.map((id) => db.Product.findByPk(id))
    );

    // Create new order and decrement product inventory in a single transaction
    await db.sequelize.transaction(async (t) => {
      const order = await db.Order.create(
        {
          price: sumBy(productsData, 'price'),
          userId,
          paymentCardId: paymentCard.id,
          shippingAddressId: shippingAddress.id,
        },
        { transaction: t }
      );
      await Promise.all(
        products.map(async (productId) => {
          await db.OrderProduct.create(
            {
              orderId: order.id,
              productId,
            },
            { transaction: t }
          );
          return db.Product.decrement('inventory', {
            where: { id: productId },
            transaction: t,
          });
        })
      );
    });

    return res.status(200).send();
  });

export default handler;
