const request = require('supertest');
const stripe = require('stripe');

jest.mock('stripe', () => jest.fn());

const checkoutPath = '/api/payments/create-checkout-session';
const testKey = 'sk_test_placeholder';
const clientUrl = 'http://localhost:3000';
const createSession = jest.fn();

let app;
let consoleErrorSpy;

beforeAll(() => {
  // The payment router reads these settings when the Express app is imported.
  jest.replaceProperty(process, 'env', {
    ...process.env,
    STRIPE_SECRET_KEY: testKey,
    CLIENT_URL: clientUrl,
  });
  stripe.mockReturnValue({ checkout: { sessions: { create: createSession } } });
  app = require('../app');
});

beforeEach(() => {
  createSession.mockReset();
  // Express logs the expected validation errors before sending the response.
  consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  consoleErrorSpy.mockRestore();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('POST /api/payments/create-checkout-session', () => {
  test('initialises Stripe with the configured key and creates a session using the catalogue price', async () => {
    const checkoutUrl = 'https://checkout.stripe.com/c/pay/cs_test_example';
    createSession.mockResolvedValue({ url: checkoutUrl });

    const response = await request(app)
      .post(checkoutPath)
      .send({ cart: [{ name: 'Pepperoni Pizza', quantity: 2, price: 0.01 }] });

    expect(stripe).toHaveBeenCalledWith(testKey);
    expect(createSession).toHaveBeenCalledTimes(1);
    expect(createSession).toHaveBeenCalledWith({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: { name: 'Pepperoni Pizza' },
            // The catalogue supplies £12.00 in pence for each pizza.
            unit_amount: 1200,
          },
          quantity: 2,
        },
      ],
      success_url: `${clientUrl}/checkout-success`,
      cancel_url: `${clientUrl}/cart`,
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ url: checkoutUrl });
  });

  test.each([
    ['missing', {}],
    ['empty', { cart: [] }],
    ['not an array', { cart: 'Pepperoni Pizza' }],
  ])('rejects a cart that is %s', async (_description, payload) => {
    const response = await request(app).post(checkoutPath).send(payload);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Cart must contain at least one item.' });
    expect(createSession).not.toHaveBeenCalled();
  });

  test('rejects a menu item absent from the catalogue', async () => {
    const response = await request(app)
      .post(checkoutPath)
      .send({ cart: [{ name: 'Unknown Pizza', quantity: 1 }] });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Unknown menu item: Unknown Pizza' });
    expect(createSession).not.toHaveBeenCalled();
  });

  test.each([0, -1, 1.5, '2'])('rejects an invalid quantity of %p', async (quantity) => {
    const response = await request(app)
      .post(checkoutPath)
      .send({ cart: [{ name: 'Pepperoni Pizza', quantity }] });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid quantity for Pepperoni Pizza' });
    expect(createSession).not.toHaveBeenCalled();
  });
});
