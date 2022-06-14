import { IFeature } from './IFeature'

export interface IProduct {
    "id": number,
    "name": string,
    "slogan": string,
    "description": string,
    "category": string,
    "default_price": string
    "features"?: [IFeature]
}