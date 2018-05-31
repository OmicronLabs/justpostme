//@flow
import React from "react";
import styled from "styled-components";
import DashboardPage from "./DashboardPage";
import { Redirect, Switch, Route, NavLink } from "react-router-dom";
import { RouteTabsWrapper, TabButton, Wrapper } from "./ManagePages.style";
import AddPagesSectionContainer from "../../containers/dashboardPage/AddPagesSectionContainer";
import MyPagesSectionContainer from "../../containers/dashboardPage/MyPagesSectionContainer";
import { GeneratedCard } from "./DashboardPageCard";

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

const testProps = {
  pageName: "testPage",
  backgroundImage:
    "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-0.3.5&q=99&fm=jpg&crop=entropy&cs=tinysrgb&w=2048&fit=max&s=0cc301e5bd9cd8e82fc3aa1cf8d6033d",
  pending: false
};

const tabBarNavRoutes = [
  { to: "/pages/managed", name: "Managed Pages" },
  { to: "/pages/add", name: "Add Pages" }
];

class ManagePages extends React.Component<Props> {
  render() {
    return (
      <DashboardPage>
        <Wrapper>
          <RouteTabs routes={tabBarNavRoutes} />
          <Switch>
            <Route
              path={"/pages/managed"}
              render={() => <MyPagesSectionContainer />}
            />
            <Route
              path={"/pages/add"}
              render={() => <AddPagesSectionContainer />}
            />
            <Redirect to={"/pages/managed"} />
            )} />
          </Switch>
        </Wrapper>
      </DashboardPage>
    );
  }
}

export default ManagePages;
