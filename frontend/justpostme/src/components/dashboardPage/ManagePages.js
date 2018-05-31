//@flow
import React from "react";
import styled from "styled-components";
import DashboardPage from "./DashboardPage";
import { Redirect, Switch, Route, NavLink } from "react-router-dom";
import { RouteTabsWrapper, TabButton, Wrapper } from "./ManagePages.style";
import AddPagesSectionContainer from "../../containers/dashboardPage/AddPagesSectionContainer";
import MyPagesSectionContainer from "../../containers/dashboardPage/MyPagesSectionContainer";

type RouteType = {
  to: string,
  name: string
};

type RouteTabsProps = {
  routes: Array<RouteType>
};

const RouteTabs = (props: RouteTabsProps) => (
  <RouteTabsWrapper>
    {props.routes.map(route => (
      <TabButton key={route.to}>
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
            color: "rgb(76,175,80)",
            borderBottom: "3px solid rgb(76,175,80)",
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
  { to: "/dashboard/managed", name: "Managed Pages" },
  { to: "/dashboard/add", name: "Add Pages" }
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
              render={() => <MyPagesSectionContainer />}
            />
            <Route
              path={"/dashboard/add"}
              render={() => <AddPagesSectionContainer />}
            />
            <Redirect to={"/dashboard/managed"} />
            )} />
          </Switch>
        </Wrapper>
      </DashboardPage>
    );
  }
}

export default ManagePages;
