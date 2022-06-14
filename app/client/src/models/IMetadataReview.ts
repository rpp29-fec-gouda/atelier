import { IMetadataRecommended } from './IMetadataRecommended';
import { IMetadataRating } from './IMetadataRating';

export interface IMetadataReview {
  "product_id": number,
  "ratings": IMetadataRating
  "recommended": IMetadataRecommended,
  "characteristics": Map<string, { "id": number, "value": number }>
}