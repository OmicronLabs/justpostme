//@flow
import React from "react";
import styled from "styled-components";
import DashboardPage from "./DashboardPage";
import { Redirect, Switch, Route, NavLink } from "react-router-dom";

import AddPagesSection from "./AddPagesSection";
import MyPagesSection from "./MyPagesSection";

type RouteType = {
  to: string,
  name: string
};

type RouteTabsProps = {
  routes: Array<RouteType>
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RouteTabsWrapper = styled.div`
    width: 1024px;
    max-width: 85%;
    min-height: 60px;
    border-bottom: 1px solid gray;
    background white;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

const TabButton = styled.div`
  width: 150px;
  height: 60px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RouteTabs = (props: RouteTabsProps) => (
  <RouteTabsWrapper>
    {props.routes.map(route => (
      <TabButton>
        <NavLink
          to={route.to}
          style={{
            textDecoration: "none",
            color: "grey",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          activeStyle={{
            color: "rgb(249, 60, 102)",
            borderBottom: "3px solid rgb(249, 60, 102)",
            width: "150px",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold"
          }}
          replace
        >
          {route.name}
        </NavLink>
      </TabButton>
    ))}
  </RouteTabsWrapper>
);

type Props = {
  managedPages: Array<any>,
  unmanagedPages: Array<any>
};

const tabBarNavRoutes = [
  { to: "/dashboard/managed", name: "Managed Pages", key: "managed" },
  { to: "/dashboard/add", name: "Add Pages", key: "add" }
];

class ManagePages extends React.Component<Props> {
  render() {
    return (
      <DashboardPage>
        <Wrapper>
          <RouteTabs routes={tabBarNavRoutes} />
          <Switch>
            <Route
              path={"/dashboard/managed"}
              render={() => <MyPagesSection />}
            />
            <Route path={"/dashboard/add"} render={() => <AddPagesSection />} />
            <Redirect to={"/dashboard/managed"} />
            )} />
          </Switch>
        </Wrapper>
      </DashboardPage>
    );
  }
}

export default ManagePages;
