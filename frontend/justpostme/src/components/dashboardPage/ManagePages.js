//@flow
import React from "react";
import styled from "styled-components";
import DashboardPage from "./DashboardPage";

type Page = {};

type Route = {
  name: string
};

type RouteTabsProps = {
  routes: Array<Route>
};

const RouteTabsWrapper = styled.div`
    max-width: 1024px;
    height: 50px;
    border-bottom: 1px solid gray;
    background white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const TabButton = styled.div`
  width: 100px;
  border-bottom: 2px solid red;
`;

const RouteTabs = (props: RouteTabsProps) => (
  <RouteTabsWrapper>
    {props.routes.map(route => <TabButton>{route.name}</TabButton>)}
  </RouteTabsWrapper>
);

type Props = {
  managedPages: Array<Page>,
  unmanagedPages: Array<Page>
};

type State = {
  managedPagesOpen: boolean
};

class ManagePages extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { managedPagesOpen: true };
  }

  render() {
    return (
      <DashboardPage>
        <RouteTabs routes={["Managed Paged", "UnmanagedPages"]} />
      </DashboardPage>
    );
  }
}
