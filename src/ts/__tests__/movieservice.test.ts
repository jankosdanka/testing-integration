/**
 * @jest-environment jsdom
 */

import { IMovie } from "../models/Movie";
import { getData } from "../services/movieservice";
import { mockData } from "../services/__mocks__/movieservice";

// jest.mock("./../../ts/services/movieservice.ts");

jest.mock("axios", () => ({
  get: async () => {
    return new Promise((resolve) => {
      resolve({
        data: {
          Search: mockData,
        },
      });
    });
  },
}));
test("should get mock data", async () => {
  //arrange
  expect.assertions(2);
  let searchText: string = "hej";
  //act
  let response: IMovie[] = await getData(searchText);
  //assert
  expect(response.length).toBe(3);
  expect(response[0].Title).toBe("Harry Potter 1");
});
