import React from "react";
import renderer from "react-test-renderer";

import { GeneratedCard, AddPageCard } from "./DashboardPageCard";
import testImage from "../../media/test_image.jpg";

import "jest-styled-components";

const testProps = {
  pageName: "testPage",
  backgroundImage: "../../media/test_image.png"
};

it("generates correct card from props", () => {
  const card = renderer.create(<GeneratedCard card={testProps} />).toJSON();
  expect(card).toMatchSnapshot();
});

it("generates correct /addcard/ card", () => {
  const addCard = renderer.create(<AddPageCard />).toJSON();
  expect(addCard).toMatchSnapshot();
});
