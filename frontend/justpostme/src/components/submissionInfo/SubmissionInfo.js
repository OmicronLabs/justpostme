//@flow
import React from "react";
import styled from "styled-components";
import { submitForm } from "../../actions/submitForm";
import {
  FrontDoorRelative,
  FrontDoorBackgroundBottom,
  FrontDoorBackgroundTop,
  HeaderLogoText,
  HeaderTopLeft,
  HeaderTopRight,
  LogoWhite,
  BackgroundShape,
  WelcomePageBox,
  About
} from "../welcomePage/WelcomePage.style";
import { Box, BoxWrapper } from "../common/Box";
import { LargeThemedButton, TopMenuButton } from "../common/Buttons";
import logo from "../../media/logo-white.png";
import background from "../../media/LoginBackground.svg";
import { fetchCurrentSubmission } from "../../actions/currentSubmission";

const FormWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  height: 100%;
  max-width: 85%;
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin: 20px 0 20px;
  padding: 0 100px;
`;

const InputField = styled.textarea`
  width: 100%;
`;

const PageImage = styled.img`
  margin: 10px;
  border-radius: 10px;
  height: 60px;
  min-width: 60px;
  width: 60px;
  object-fit: cover;
  box-shadow: 0px 0px 4px 3px rgba(126, 149, 168, 0.5);
`;

const PageInfoWrapper = styled.div`
  width: 100%;
  border-bottom: 2px solid rgb(76, 175, 80);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;

const PageName = styled.a`
  font-weight: 800;
  font-size: 26px;
  color: grey;
  margin-left: 5px;
`;

const PageInfoFirstRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 800;
  color: rgb(76, 175, 80);
`;

const SubTitle = Title.extend`
  font-size: 16px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

const ErrorText = styled.a`
  font-weight: 800;
  font-size: 26px;
  color: grey;
  margin-left: 5px;
`;

const Link = styled.a`
  color: green;
  text-decoration: underline;
  cursor: pointer;
`;

function openInNewTab(url) {
  var win = window.open(url, "_blank");
  win.focus();
}

type Props = {
  loading: boolean,
  error: boolean,
  submission: any,
  fetchCurrentSubmission: Function
};

class SubmissionForm extends React.Component<Props> {
  componentDidMount() {
    const { fetchCurrentSubmission, match } = this.props;
    fetchCurrentSubmission(match.params.id);
  }

  _renderInfo() {
    const { submission } = this.props;

    return submission.profanity !== null ? (
      <div>
        <p> Your submission: </p>
        <p> {submission.postText} </p>
        <p> Submission status: </p>
        <p> {submission.pending ? "PENDING" : "ACCEPTED"} </p>
      </div>
    ) : (
      <p> Your submission is being processed</p>
    );
  }

  _renderLoading() {
    return <p>Loading</p>;
  }

  _renderError() {
    return <ErrorText>Error, link is broken :( </ErrorText>;
  }

  render() {
    const { loading, submission } = this.props;

    return (
      <FrontDoorRelative>
        <FrontDoorBackgroundTop>
          <HeaderTopLeft>
            <LogoWhite src={logo} />

            <HeaderLogoText>justpost.me</HeaderLogoText>
          </HeaderTopLeft>
          <HeaderTopRight>
            <TopMenuButton href="#">About</TopMenuButton>
          </HeaderTopRight>
        </FrontDoorBackgroundTop>
        <BackgroundShape src={background} className="" />
        <FrontDoorBackgroundBottom />
        <BoxWrapper style={{ overflow: "scroll" }}>
          <WelcomePageBox
            style={{
              width: "940px",
              maxWidth: "75%",
              margin: "100px 0",
              padding: "0",
              display: "flex",
              height: "auto",
              minHeight: "350px"
            }}
          >
            {loading
              ? this._renderLoading()
              : submission
                ? this._renderInfo()
                : this._renderError()}
          </WelcomePageBox>
        </BoxWrapper>
      </FrontDoorRelative>
    );
  }
}

export default SubmissionForm;
