import { IPhotoSet } from './IPhotoSet';

export interface IStyle {
    "style_id": number,
    "name": string,
    "original_price": string,
    "sale_price": string,
    "default?": boolean,
    "photos": [IPhotoSet],
    "skus": Map<string, { "quantity": number, "size": string }>
}