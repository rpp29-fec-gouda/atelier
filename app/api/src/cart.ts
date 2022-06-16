import { requests } from './api';
import { ICart } from '../models';

// Cart API
// Notes: https://learn-2.galvanize.com/cohorts/2592/blocks/94/content_files/Front%20End%20Capstone/project-atelier/cart.md
const endpoint = '/cart';

type GetCartResponse = {
  data: [ICart];
};

export const Cart = {
  /**
  * Retrieves list of products added to the cart by a user.
  * @returns
  */
  getCart: (): Promise<GetCartResponse> => requests.get(endpoint),
  /**
  * Adds a product to the cart.
  * @param sku ID for the product being added to the cart.
  */
  addToCart: (sku: number): Promise<void> => requests.post(endpoint, { "sku_id": sku })  // POST Status 201
};