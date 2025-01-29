import { APIRequestContext } from '@playwright/test';

export class PetstoreAPI {
  private readonly apiContext: APIRequestContext;

  constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  async addPet(id: number, name: string, status: string) {
    const response = await this.apiContext.post('/v2/pet', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: { id, name, status },
    });

    return response;
  }

  async addPetWithInvalidData() {
    const response = await this.apiContext.post('/v2/pet', {
      data: {
        id: "invalid_id", // Incorrect data type
        name: 'Spotty',
        status: 'available',
      },
    });

    return response;
  }

  async getPetById(petId: number) {
    const response = await this.apiContext.get(`/v2/pet/${petId}`, {
      headers: { Accept: 'application/json' },
    });

    return response;
  }
}
