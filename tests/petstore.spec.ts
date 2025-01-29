import { test, expect, APIRequestContext } from '@playwright/test';
import { PetstoreAPI } from '../api/petstore.api';

test.describe('Petstore API Tests', () => {
  let apiContext: APIRequestContext;
  let petstoreAPI: PetstoreAPI;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: 'https://petstore.swagger.io',
    });

    petstoreAPI = new PetstoreAPI(apiContext);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('Add a pet', async () => {
    const response = await petstoreAPI.addPet(12345, 'Fluffy', 'available');
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({ id: 12345, name: 'Fluffy', status: 'available' });
  });

  test('Add a pet with invalid data type', async () => {
    const response = await petstoreAPI.addPetWithInvalidData();
    expect(response.status()).toBe(500);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('message');
  });

  test('Find a pet by ID', async () => {
    const petId = 12345;
    const response = await petstoreAPI.getPetById(petId);
    
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({ id: petId, name: 'Fluffy', status: 'available' });
  });

  test('Find a pet with wrong ID', async () => {
    const petId = 90000;
    const response = await petstoreAPI.getPetById(petId);

    expect(response.status()).toBe(404);

    const responseBody = await response.json();
    expect(responseBody).toMatchObject({ code: 1, message: 'Pet not found', type: 'error' });
  });
});
