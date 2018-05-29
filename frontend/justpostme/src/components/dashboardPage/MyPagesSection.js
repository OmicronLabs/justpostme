//@flow
import React from "react";
import type { CardProps } from "../../components/dashboardPage/DashboardPageCard.js";
import { EmptyPagesDisplay, PagesDisplay } from "./PagesDisplay";
type Props = {
  cards: Array<CardProps>
};

const emptyProps = { pages: [] };

const MyPagesSection = (props: Props) => {
  return PagesDisplay(emptyProps);
};

export default MyPagesSection;
