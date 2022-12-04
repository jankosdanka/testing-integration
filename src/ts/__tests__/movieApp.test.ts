/**

* @jest-environment jsdom

*/

import * as fn from "../../ts/movieApp";
import { IMovie } from "../models/Movie";
import { getData } from "../services/movieservice";
jest.mock("../../ts/services/movieservice.ts");

test("should be able to call fn handleSubmit", () => {
  //Arrange

  let spy = jest.spyOn(fn, "handleSubmit").mockReturnValue(
    new Promise((resolve) => {
      resolve();
    })
  );

  document.body.innerHTML = `
    <form id="searchForm">
    <button type="submit" id="search">Sök</button>
    </form>
      `;

  fn.init();
  //Act
  (document.getElementById("searchForm") as HTMLFormElement)?.submit();
  //Assert
  expect(spy).toHaveBeenCalled();
  document.body.innerHTML = "";
});
//test2

describe("handleSubmit", () => {
  beforeEach(() => {
    jest.resetModules(); // clears cache for needed modules
    jest.restoreAllMocks(); // restores the resolve-promise
  });
  test("Should handle given data", async () => {
    //Arrange
    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    </form> <div id="movie-container"></div>`;

    let spy = jest.spyOn(fn, "createHtml").mockReturnValue();

    //Act
    await fn.handleSubmit();

    // let movies = await getData(searchText);
    //Assert
    expect(spy).toHaveBeenCalled();
    document.body.innerHTML = "";
  });
});

// test 3
test("should display message", async () => {
  // arrange
  let container: HTMLDivElement = document.createElement(
    "div"
  ) as HTMLDivElement;

  //act
  fn.displayNoResult(container);

  //assert
  expect(container.innerHTML).toBe("<p>Inga sökresultat att visa</p>");
  //expect(container.innerHTML).toBe(noMessage);
  document.body.innerHTML = "";
});

//test 4
describe("createHtml", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("Should create HTML ", async () => {
    //Arrange

    document.body.innerHTML = `<div id="movie-container"></div>`;
    let searchText: string = "hej";

    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;
    let movies: IMovie[] = await getData(searchText);

    //Act

    fn.createHtml(movies, container);

    //Asssert

    expect(document.querySelectorAll("div.movie")?.length).toBe(3);
    expect(document.querySelectorAll("h3")?.length).toBe(3);
    expect(document.querySelectorAll("img")?.length).toBe(3);
    document.body.innerHTML = "";
  });
});
