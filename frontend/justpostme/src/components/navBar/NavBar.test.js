import React from "react";
import renderer from "react-test-renderer";
import NavBar from "./NavBar";
import "jest-enzyme";
import "jest-styled-components";

it("renders navbar", () => {
  const navbar = renderer.create(<NavBar />).toJSON();
  expect(navbar).toMatchSnapshot();
});
