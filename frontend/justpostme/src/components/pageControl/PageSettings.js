//@flow

import React from "react";
import styled from "styled-components";

import Spinner from "../loadingSpinner/LoadingSpinner";
import { PagesDisplayWrapper } from "../dashboardPage/PagesDisplay.style";

const SpinnerWrapper = PagesDisplayWrapper.extend`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubmissionsDisplayWrapper = styled.div`
  margin-top: 30px;
  width: 1024px;
  max-width: 85%;
  margin-bottom: 90px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  overflow: scroll;
`;

export const SubmissionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const SettingsRow = styled.div`
    display: flex;
    flex-direction: row,
    align-items: center;
    justify-content: space-between;
    width: 800px;
    margin: 5px 0;
`;

export const Link = styled.a`
  color: green;
  text-decoration: underline;
  cursor: pointer;
`;

type Props = {
  fetchPageSettings: Function,
  postPageSettings: Function,
  pageId: stirng
};

function openInNewTab(url) {
  var win = window.open(url, "_blank");
  win.focus();
}

class PageSettings extends React.Component<Props> {
  componentDidMount() {
    // const { pageId, fetchPageSettings } = this.props;
    // fetchPageSettings(pageId);
  }

  _settingsDisplay = () => {
    const { pageId } = this.props;
    return (
      <SubmissionsDisplayWrapper>
        <SubmissionsWrapper>
          <SettingsRow>
            <p>Your annonymous submission link: </p>
            <Link
              onClick={() => {
                openInNewTab(`https://justpostme.tech/form/${pageId}`);
              }}
            >
              {`https://justpostme.tech/form/${pageId}`}
            </Link>
          </SettingsRow>
          <SettingsRow>
            <p>Pre-submission text: </p>
            <input type="text" name="name" />
          </SettingsRow>
          <SettingsRow>
            <p>Post-submission text: </p>
            <input type="text" name="name" />
          </SettingsRow>
          <SettingsRow>
            <p>Count from: </p>
            <input type="text" name="name" />
          </SettingsRow>

          <button onClick={() => alert("changes saved")}>
            {" "}
            <p> Save settings </p>{" "}
          </button>
        </SubmissionsWrapper>
      </SubmissionsDisplayWrapper>
    );
  };

  render() {
    const { loading } = this.props;
    return loading ? (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    ) : (
      this._settingsDisplay()
    );
  }
}

export default PageSettings;
