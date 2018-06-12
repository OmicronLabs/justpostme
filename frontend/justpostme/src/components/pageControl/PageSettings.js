//@flow

import React from "react";
import styled from "styled-components";

import Spinner from "../loadingSpinner/LoadingSpinner";
import { PagesDisplayWrapper } from "../dashboardPage/PagesDisplay.style";

import { Box, BoxWrapper } from "../common/Box";
import { LargeThemedButton } from "../common/Buttons";

const SpinnerWrapper = PagesDisplayWrapper.extend`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubmissionsDisplayWrapper = styled.div`
  margin-top: 30px;
  width: 500px;
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 5px 0;
`;

const InputBox = styled.input`
  width: 350px;
  max-width: 350px;
  height: 20px;
`;

export const Link = styled.a`
  color: green;
  text-decoration: underline;
  cursor: pointer;
`;
const SettingsBox = Box.extend`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
`;

const SettingsBoxWrapper = BoxWrapper.extend`
  position: relative;
  padding: 20px;
`;

const SaveButton = LargeThemedButton.extend`
  border: none;
`;

type Props = {
  fetchPageSettings: Function,
  postPageSettings: Function,
  pageId: string
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
            <InputBox type="text" name="name" />
          </SettingsRow>
          <SettingsRow>
            <p>Post-submission text: </p>
            <InputBox type="text" name="name" />
          </SettingsRow>
          <SettingsRow>
            <p>Count from: </p>
            <InputBox type="text" name="name" />
          </SettingsRow>

          <SaveButton onClick={() => alert("changes saved")}>
            {" "}
            <p> Save settings </p>{" "}
          </SaveButton>
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
