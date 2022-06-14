import { requests } from './api';
import { IProduct } from '../client/src/models/IProduct';
import { IStyle } from '../client/src/models/IStyle';

// Products API
// See: https://learn-2.galvanize.com/cohorts/2592/blocks/94/content_files/Front%20End%20Capstone/project-atelier/products.md
const endpoint = '/products';

type GetProductResponse = {
  data: IProduct;
};

type GetProductsResponse = {
  data: [IProduct];
};

type GetProductStylesResponse = {
  data: {
    "product_id": string,
    "results": [IStyle]
  }
};

type GetRelatedProductsResponse = {
  data: [number];
};

export const products = {
  /**
  * Retrieves the list of products.
  * @param page Selects the page of results to return. Default 1.
  * @param count Specifies how many results per page to return. Default 5.
  * @returns
  */
  getProducts: (page: number = 1, count: number = 5): Promise<GetProductsResponse> =>
    requests.get(`${endpoint}?page=${page}&count=${count}`),
  /**
  * Returns all product level information for a specified product id.
  * @param id ID of the Product requested.
  * @returns
  */
  getProduct: (id: number): Promise<GetProductResponse> => requests.get(`${endpoint}?product_id=${id}`),
  /**
  * Returns the all styles available for the given product.
  * @param id ID of the Product requested.
  * @returns
  */
  getProductStyles: (id: number): Promise<GetProductStylesResponse> => requests.get(`${endpoint}/${id}/styles`),
  /**
  * Returns the ID's of products related to the product specified.
  * @param id ID of the Product requested.
  * @returns
  */
  getRelatedProducts: (id: number): Promise<GetRelatedProductsResponse> => requests.get(`${endpoint}/${id}/related`)
};