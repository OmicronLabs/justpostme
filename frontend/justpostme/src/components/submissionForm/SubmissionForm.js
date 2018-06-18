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
import {
  LargeThemedButton,
  TopMenuButton,
  RoundButton
} from "../common/Buttons";
import logo from "../../media/logo-white.png";
import background from "../../media/LoginBackground.svg";

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
  padding: 5px;
  outline: none;
  box-shadow: inset 0 0 10px whitesmoke;
  font-size: 16px;
  border: 1px solid lightgray;
  border-radius: 6px;
  background: whitesmoke;
  &:focus {
    background: white;
  }
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
  border-bottom: 2px solid lightgray;
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

const SubmitButton = RoundButton.extend`
  font-size: 20px;

  margin: 5px;
  padding: 8px;
  margin-top: 1em;
  border-radius: 6px;
  color: rgb(76, 175, 80);
  border: 2px solid rgb(76, 175, 80);
  &:hover {
    box-shadow: inset 0 0 10px whitesmoke;
    border: 0px;
    color: green;
    border: 2px solid green;
  }
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

const EmailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const EmailInput = styled.input`
  width: 150px;
  height: 30px;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  background: whitesmoke;
  &:focus {
    outline: none;
    background: white;
  }
`;

const SentButton = styled.div`
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(76, 175, 80);
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
  cursor: pointer;
  &:hover {
    background: darkgreen;
  }
`;

const SentButtonText = styled.div`
  color: white;
  font-size: 14px;
  font-weight: 800;
  margin: 3px 7px;
`;

type Props = {
  currentPage: any,
  currentPageLoading: boolean,
  submitForm: Function,
  fetchCurrentPage: Function,
  snackbarNotify: Function,
  postEmail: Function,
  submitFormLoading: boolean,
  submitFormError: boolean,
  postEmailLoading: boolean,
  postEmailError: boolean
};

class SubmissionForm extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { submissionText: "", email: "" };
  }

  componentDidMount() {
    const { fetchCurrentPage, match } = this.props;
    fetchCurrentPage(match.params.id);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { snackbarNotify, submitFormLoading, postEmailLoading } = this.props;

    //form submitted
    if (
      submitFormLoading &&
      !nextProps.submitFormLoading &&
      !nextProps.submitFormError
    ) {
      snackbarNotify("Successfully submitted");
    }

    //email submitted

    if (
      postEmailLoading &&
      !nextProps.postEmailLoading &&
      !nextProps.postEmailError
    ) {
      snackbarNotify("Successfully subscribed to the changes");
    }
  }

  _renderForm() {
    const { currentPage, match, submitForm } = this.props;
    return (
      <Form>
        <PageInfoWrapper>
          <Title>Submission</Title>
          <PageInfoFirstRow>
            <PageImage src={currentPage.backgroundImgURL} />
            <PageName>{currentPage.name}</PageName>
          </PageInfoFirstRow>
          <PageInfoFirstRow>
            <p>{currentPage.preText ? currentPage.preText : ""}</p>
          </PageInfoFirstRow>
        </PageInfoWrapper>
        <SubTitle> Your submissions content </SubTitle>
        <InputField
          rows="8"
          placeholder="Type your submission here..."
          value={this.state.submissionText}
          onChange={event =>
            this.setState({ submissionText: event.target.value })
          }
        />
        <SubTitle>What year are you and what do you study</SubTitle>
        <InputField placeholder="e.g 3rd year Computing" />
        <ButtonWrapper>
          <SubmitButton
            onClick={() =>
              submitForm(match.params.id, this.state.submissionText)
            }
          >
            Submit Form
          </SubmitButton>
        </ButtonWrapper>
      </Form>
    );
  }

  _renderLoading() {
    return <p>Loading</p>;
  }

  _renderError() {
    return <ErrorText>Error, link is broken :( </ErrorText>;
  }

  _renderSubmissionSuccess() {
    const { postHash, currentPage, postEmail } = this.props;
    const trackingLink = `https://justpostme.tech/submission/${postHash}`;
    return (
      <Form>
        <PageInfoWrapper>
          <PageInfoFirstRow>
            <PageImage src={currentPage.backgroundImgURL} />
            <PageName>{currentPage.name}</PageName>
          </PageInfoFirstRow>
          <PageInfoFirstRow>
            <p>{currentPage.postText ? currentPage.postText : ""}</p>
          </PageInfoFirstRow>
        </PageInfoWrapper>
        <SubTitle> Your form has been submitted successfully! </SubTitle>
        <p> Your unique tracking link is: </p>
        <Link
          onClick={() => {
            openInNewTab(trackingLink);
          }}
        >
          {trackingLink}
        </Link>
        <p>
          If you want to subscribe to post status (e.g when it's published)
          provide your email. Your email address will be used only by us, admin
          doesn't have access to it:
        </p>
        <EmailWrapper>
          <EmailInput
            value={this.state.email}
            onChange={event => this.setState({ email: event.target.value })}
            placeholder="Enter email here..."
          />
          <SentButton>
            <SentButtonText
              onClick={() => postEmail(postHash, this.state.email)}
            >
              Subscribe to changes
            </SentButtonText>
          </SentButton>
        </EmailWrapper>
      </Form>
    );
  }

  render() {
    const {
      currentPage,
      currentPageError,
      currentPageLoading,
      postHash
    } = this.props;

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
        <BoxWrapper
          style={{
            overflow: "scroll"
          }}
        >
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
            {currentPageLoading
              ? this._renderLoading()
              : currentPage
                ? postHash
                  ? this._renderSubmissionSuccess()
                  : this._renderForm()
                : this._renderError()}
          </WelcomePageBox>
        </BoxWrapper>
      </FrontDoorRelative>
    );
  }
}

export default SubmissionForm;
