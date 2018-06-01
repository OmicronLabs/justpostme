//@flow
import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import DashboardPage from "../dashboardPage/DashboardPage";
import { Redirect, Switch, Route, NavLink } from "react-router-dom";
import {
  PageOverviewWrapper,
  PageOverviewImage,
  PageOverviewText
} from "../common/PageOverview";

import PendingSubmissionsContainer from "../../containers/pageControl/PendingSubmissionsContainer";

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
  unmanagedPages: Array<any>,
  pageName: string,
  pageImageURL: string,
  pendingPosts: number,
  scheduledPosts: number
};

const tabBarNavRoutes = [
  { to: "/page/pending", name: "Pending" },
  { to: "/page/approved", name: "Approved" },
  { to: "/page/moderation", name: "Moderation" },
  { to: "/page/insights", name: "Insights" }
];

class PageControl extends React.Component<Props> {
  componentDidMount() {
    const { params } = this.props.match;
  }

  render() {
    const { url } = this.props.match;
    const path = url;
    const { id } = this.props.match.params;

    const tabBarNavRoutes = [
      { to: `${path}/pending`, name: "Pending" },
      { to: `${path}/approved`, name: "Approved" },
      { to: `${path}/moderation`, name: "Moderation" },
      { to: `${path}/insights`, name: "Insights" }
    ];

    return (
      <DashboardPage>
        <Wrapper>
          {/* uncomment for page overview up top
          <PageOverviewWrapper>
            <PageOverviewImage src={this.props.pageImageURL} />
            <PageOverviewText>{this.props.pageName}</PageOverviewText>
          </PageOverviewWrapper> */}
          <RouteTabs routes={tabBarNavRoutes} />
          <Switch>
            <Route
              path={`${path}/pending`}
              render={() => <PendingSubmissionsContainer pageId={id} />}
            />
            <Route
              path={`${path}/approved`}
              render={() => <p>Borys to chuj</p>}
            />
            <Route
              path={`${path}/moderation`}
              render={() => <p>Borys to pizda</p>}
            />
            <Route
              path={`${path}/insights`}
              render={() => <p>Borys to zjeb</p>}
            />
            <Redirect to={`${path}/pending`} />
            )} />
          </Switch>
        </Wrapper>
      </DashboardPage>
    );
  }
}

export default withRouter(PageControl);
