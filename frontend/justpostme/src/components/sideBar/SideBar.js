import React from "react";

import styled from "styled-components";

type Props = {
  sections: Array<string>
};

const SidebarWrapper = styled.div`
  height: 100%;
  max-width: 300px;
  background: white;
  border-right: 1px solid red;
`;

const SidebarButton = styled.div`
  width: 100%;
  height: 80px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid red;
  &:hover {
    background: red;
  }
`;

const SidebarButtonText = styled.a`
  font-weight: 400;
  font-size: 22px;
`;

const Sidebar = props => {
  const sidebarSections = [];
  const sections = ["Pending", "Approved", "Moderation", "Analytics"];

  sections.forEach(section => {
    sidebarSections.push(
      <SidebarButton>
        <SidebarButtonText>{section}</SidebarButtonText>
      </SidebarButton>
    );
  });

  return <SidebarWrapper>{sidebarSections}</SidebarWrapper>;
};

export default Sidebar;
