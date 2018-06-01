import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { GeneratedCard, AddPageCard } from "./DashboardPageCard";
import testImage from "../../media/test_image.jpg";

const testProps = {
  pageName: "testPage",
  backgroundImage: "../../media/test_image.png"
};

// it("generates correct card from props", () => {
//   const card = renderer.create(<GeneratedCard card={testProps} />).toJSON();
//   expect(card).toMatchSnapshot();
// });

// it("adds correct name and picture from props", () => {
//   const card = shallow(<GeneratedCard card={testProps} />);
//   expect(card.find(".image").prop("src")).toEqual(testProps.backgroundImage);
//   expect(
//     card
//       .find(".name")
//       .render()
//       .text()
//   ).toEqual(testProps.pageName);
// });

it("generates correct /addcard/ card", () => {
  const addCard = renderer.create(<AddPageCard />).toJSON();
  expect(addCard).toMatchSnapshot();
});
