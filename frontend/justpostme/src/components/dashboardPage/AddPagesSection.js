//@flow

import React from "react";
import { PagesDisplay } from "./PagesDisplay";
import type { CardProps } from "./DashboardPageCard";
import { fetchUnmanagedPages } from "../../actions/unmanagedPages";

type Props = {
  pages: Array<CardProps>,
  loading: boolean,
  error: string
};

const addPagesEmptyHead = "No unmanaged pages";
const addPagesEmptyText =
  "Looks like you are not an administrator of any pages. To start create a Facebook page.";

class AddPagesSection extends React.Component<Props> {
  componentWillMount() {
    fetchUnmanagedPages();
  }

  render() {
    return (
      <PagesDisplay
        pages={this.props.pages}
        emptyHead={addPagesEmptyHead}
        emptyText={addPagesEmptyText}
        createCard={true}
      />
    );
  }
}

export default AddPagesSection;
