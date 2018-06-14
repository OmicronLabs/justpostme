//@flow
import React from "react";
import styled from "styled-components";
import DashboardPage from "../dashboardPage/DashboardPage";
import { Redirect, Switch, Route, NavLink } from "react-router-dom";
import {
  PageOverviewWrapper,
  PageOverviewImage,
  PageOverviewText,
  ClickablePageOverviewText
} from "../common/PageOverview";
import "font-awesome/css/font-awesome.min.css";

import PendingSubmissionsContainer from "../../containers/pageControl/PendingSubmissionsContainer";
import ScheduledSubmissionsContainer from "../../containers/pageControl/ScheduledSubmissionsContainer";
import PageSettings from "./PageSettings";
import SubmissionControl from "../../containers/pageControl/SubmissionControlContainer";
import { fetchCurrentPage } from "../../actions/currentPage";
import ModerationSubmissionsContainer from "../../containers/pageControl/ModerationSubmissionsContainer";

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
  overflow: hidden;
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
  user-select: none;
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
  scheduledPosts: number,
  currentPageLoading: boolean,
  currentPage: any,
  fetchCurrentPage: Function,
  match: any,
  history: any,
  pendingSubmissions: number
};

class PageControl extends React.Component<Props> {
  componentDidMount() {
    const { fetchCurrentPage, match } = this.props;
    fetchCurrentPage(match.params.id);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { match, fetchCurrentPage } = this.props;
    const newMatch = nextProps.match;
    if (match !== newMatch) {
      fetchCurrentPage(match.params.id);
    }
  }

  render() {
    const { url } = this.props.match;
    const path = url;
    const { id } = this.props.match.params;

    const displaySubmission =
      this.props.location.pathname.indexOf("submission") !== -1;

    const { managedPages, currentPage, history } = this.props;

    const tabBarNavRoutes = [
      {
        to: `${path}/pending`,
        name: `Pending (${currentPage ? currentPage.pendingPosts : 0}) `,
        number: managedPages ? managedPages : 0
      },
      {
        to: `${path}/scheduled`,
        name: `Scheduled (${currentPage ? currentPage.scheduledPosts : 0})`,
        number: managedPages ? managedPages : 0
      },
      {
        to: `${path}/moderation`,
        name: `Moderation (${currentPage ? currentPage.moderatingPosts : 0})`,
        number: 0
      },
      // { to: `${path}/insights`, name: "Insights" },
      { to: `${path}/settings`, name: "Settings" }
    ];

    return (
      <DashboardPage>
        <Wrapper>
          <PageOverviewWrapper
            style={{ minHeight: "50px", maxHeight: "50px", paddingTop: "5px" }}
          >
            <ClickablePageOverviewText
              onClick={() => {
                history.push("/pages");
              }}
            >
              <i style={{ fontSize: "27px" }} class="fa fa-home" />
            </ClickablePageOverviewText>
            <PageOverviewText style={{ margin: "0 10px", fontSize: "25px" }}>
              <i class="fa fa-caret-right" />
            </PageOverviewText>
            <ClickablePageOverviewText
              onClick={() => {
                history.push(`${path}/pending`);
              }}
            >
              {currentPage ? currentPage.name : "Page"}
            </ClickablePageOverviewText>
            {displaySubmission
              ? [
                  <PageOverviewText
                    style={{ margin: "0 10px", fontSize: "25px" }}
                  >
                    <i class="fa fa-caret-right" />
                  </PageOverviewText>,

                  <ClickablePageOverviewText onClick={() => {}}>
                    {"Submission"}
                  </ClickablePageOverviewText>
                ]
              : null}
          </PageOverviewWrapper>
          {displaySubmission ? null : <RouteTabs routes={tabBarNavRoutes} />}
          <Switch>
            <Route
              path={`${path}/pending`}
              render={() => <PendingSubmissionsContainer pageId={id} />}
            />
            <Route
              path={`${path}/submission/:submissionid`}
              render={() => <SubmissionControl />}
            />
            <Route
              path={`${path}/scheduled`}
              render={() => <ScheduledSubmissionsContainer pageId={id} />}
            />
            <Route
              path={`${path}/moderation`}
              render={() => <ModerationSubmissionsContainer pageId={id} />}
            />
            <Route
              path={`${path}/insights`}
              render={() => <p>To be implemented</p>}
            />
            <Route
              path={`${path}/settings`}
              render={() => <PageSettings pageId={id} />}
            />
            <Redirect to={`${path}/pending`} />
            )} />
          </Switch>
        </Wrapper>
      </DashboardPage>
    );
  }
}

export default PageControl;
