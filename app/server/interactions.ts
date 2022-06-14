import { requests } from './api';
import { IInteraction } from '../client/src/models/IInteraction';

// Interactions API
// Notes: https://learn-2.galvanize.com/cohorts/2592/blocks/94/content_files/Front%20End%20Capstone/project-atelier/interactions.md
const endpoint = '/interactions';

export const interaction = {
  postInteraction: (interaction: IInteraction): Promise<void> => requests.post(endpoint, interaction)
  // Response:
  // Success: Status: 201 CREATED
  // Invalid parameters: Status: 422 UNPROCESSABLE ENTITY
};