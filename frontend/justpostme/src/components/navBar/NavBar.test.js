import React from "react";
import renderer from "react-test-renderer";
import NavBar from "./NavBar";

it("renders navbar", () => {
  const navbar = renderer.create(<NavBar />).toJSON();
  expect(navbar).toMatchSnapshot();
});
