import React from "react";
import renderer from "react-test-renderer";
import NavBar from "./NavBar";
import { shallow } from "enzyme";
import "jest-enzyme";
import "jest-styled-components";

it("renders navbar", () => {
  const navbar = renderer.create(<NavBar />).toJSON();
  expect(navbar).toMatchSnapshot();
});

it("has a logo", () => {
  const nav = shallow(<NavBar />);
  expect(nav.find(".logo").length).toEqual(1);
});

it("contains logo text", () => {
  const nav = shallow(<NavBar />);
  expect(nav.find(".logoText").length).toEqual(1);
});

it("has menu buttons", () => {
  const nav = shallow(<NavBar />);
  expect(nav.find(".navBarMenu").length).toEqual(1);
});
