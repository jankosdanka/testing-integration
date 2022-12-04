// import { movieSort } from "../../ts/functions";
// import { mockData } from "../../ts/services/__mocks__/movieservice";
// describe("movieSort", () => {
//   test("should sort from a-z", () => {
//     //arrange
//     //act
//     movieSort(mockData, true);
//     //assert
//     expect(mockData[1].Title).toBe("Harry Potter 2");
//     expect(mockData[2].Title).toBe("Harry Potter 3");
//   });
//   test("should sort from z-a", () => {
//     //arrange
//     //act

//     movieSort(mockData, false);
//     //assert
//     expect(mockData[0].Title).toBe("Harry Potter 3");
//   });
// });
import { IMovie } from "../models/Movie";
import * as fn from "../../ts/functions";
import { mockData } from "../../ts/services/__mocks__/movieservice";
test("should sort movies from a to z", () => {
  //Act
  fn.movieSort(mockData);

  //Assert

  expect(mockData[0].Title).toBe("Harry Potter 1");
  expect(mockData[2].Title).toBe("Harry Potter 3");
});

test("should sort movies from z to a", () => {
  //Arrange

  let desc: boolean = false;
  //Act

  fn.movieSort(mockData, desc);
  //Assert
  expect(mockData[0].imdbID).toBe("3");
  expect(mockData[2].imdbID).toBe("1");
});

test("should not sort movies from a to z", () => {
  //Arrange

  //Act

  fn.movieSort(mockData);

  //Assert
  expect(mockData[0].Year).toBe("2001");
  expect(mockData[2].Year).toBe("2003");
});

test("should not sort movies from z to a", () => {
  //Arrange

  let desc: boolean = false;
  //Act

  fn.movieSort(mockData, desc);

  //Assert
  expect(mockData[0].imdbID).toBe("1");
  expect(mockData[2].imdbID).toBe("3");
});
