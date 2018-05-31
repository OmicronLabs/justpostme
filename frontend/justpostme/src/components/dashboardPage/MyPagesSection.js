//@flow
import React from "react";
import type { CardProps } from "../../components/dashboardPage/DashboardPageCard.js";
import { EmptyPagesDisplay, PagesDisplay } from "./PagesDisplay";
import { fetchManagedPages } from "../../actions/managedPages";

type Props = {
  pages: Array<CardProps>,
  loading: boolean,
  error: boolean,
  userID: string,
  dispatch: Function
};

const myPagesEmptyHead = "No pages to manage";
const myPagesEmptyText =
  "Looks like you have not added any managed pages yet. Add pages by clicking the button below.";

class MyPagesSection extends React.Component<Props> {
  componentDidMount() {
    this.props.dispatch(fetchManagedPages(this.props.userID));
  }

  render() {
    return (
      <PagesDisplay
        pages={this.props.pages}
        emptyHead={myPagesEmptyHead}
        emptyText={myPagesEmptyText}
        createCard={false}
      />
    );
  }
}

export default MyPagesSection;
