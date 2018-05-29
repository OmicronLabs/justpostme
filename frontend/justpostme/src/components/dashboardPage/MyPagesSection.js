//@flow
import React from "react";
import type { CardProps } from "../../components/dashboardPage/DashboardPageCard.js";
import { EmptyPagesDisplay, PagesDisplay } from "./PagesDisplay";
type Props = {
  pages: Array<CardProps>
};

const myPagesEmptyHead = "No pages to manage";
const myPagesEmptyText =
  "Looks like you have not added any managed pages yet. Add pages by clicking the button below.";

const emptyProps = { pages: [] };

const MyPagesSection = (props: Props) => {
  return (
    <PagesDisplay
      pages={props.pages}
      emptyHead={myPagesEmptyHead}
      emptyText={myPagesEmptyText}
      createCard={false}
    />
  );
};

export default MyPagesSection;
