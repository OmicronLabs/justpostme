import React from "react";
import renderer from "react-test-renderer";
import { PagesDisplay, EmptyPagesDisplay } from "./PagesDisplay";
import { shallow } from "enzyme";
import "jest-enzyme";
import "jest-styled-components";

const emptyHead = "Head text";
const emptyText = "Other text";

// it("renders pages display", () => {
//   const section = renderer
//     .create(<PagesDisplay pages={[]} head={emptyHead} text={emptyText} />)
//     .toJSON();
//   expect(section).toMatchSnapshot();
// });

it("renders correct text for empty display", () => {
  const empty = shallow(
    <EmptyPagesDisplay head={emptyHead} text={emptyText} createCard={false} />
  );
  expect(
    empty
      .find(".emptyHeader")
      .render()
      .text()
  ).toEqual("Head text");

  expect(
    empty
      .find(".emptyText")
      .render()
      .text()
  ).toEqual("Other text");
});
