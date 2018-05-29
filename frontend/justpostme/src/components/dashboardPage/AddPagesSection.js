import React from "react";
import { PagesDisplay } from "./PagesDisplay";
type Props = {
  pages: Array<CardProps>
};

const addPagesEmptyHead = "No unmanaged pages";
const addPagesEmptyText =
  "Looks like you are not an administrator of any pages. To start create a Facebook page.";

const AddPagesSection = (props: Props) => {
  return (
    <PagesDisplay
      pages={props.pages}
      emptyHead={addPagesEmptyHead}
      emptyText={addPagesEmptyText}
      createCard={true}
    />
  );
};

export default AddPagesSection;
