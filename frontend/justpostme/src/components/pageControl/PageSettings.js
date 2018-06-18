//@flow

import React from "react";
import styled from "styled-components";

import Spinner from "../loadingSpinner/LoadingSpinner";
import { PagesDisplayWrapper } from "../dashboardPage/PagesDisplay.style";

import { Box, BoxWrapper } from "../common/Box";
import { RoundButton } from "../common/Buttons";
import { ENGINE_METHOD_DIGESTS } from "constants";

const SpinnerWrapper = PagesDisplayWrapper.extend`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  font-size: 18px;
  margin-top: -10px;
  padding-bottom: 20px;
  font-weight: 800;
  border-bottom: 2px solid lightgray;

  color: rgb(76, 175, 80);
  text-align: center;
`;

export const SubmissionsDisplayWrapper = styled.div`
  margin-top: 30px;
  width: 800px;
  max-width: 85%;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
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

const SettingsWrapper = styled.div`
  width: 350px;
  max-width: 350px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SettingName = styled.p`
  color: gray;
`;

export const Link = styled.a`
  color: green;
  text-decoration: underline;
  cursor: pointer;
`;
const SettingsBox = Box.extend`
  padding: 30px;
  display: flex;
  width: 600px;
  flex-direction: column;
  align-content: flex-start;
`;

const SettingsBoxWrapper = BoxWrapper.extend`
  position: relative;
`;
const Select = styled.select`
  width: 350px;
`;

const SmallSelect = styled.select`
  width: 100px;
`;

const SaveButton = RoundButton.extend`
  margin: 5px;
  padding: 8px;
  margin-top: 1em;
  border-radius: 6px;
  color: rgb(76, 175, 80);
  border: 1px solid rgb(76, 175, 80);
  &:hover {
    box-shadow: inset 0 0 10px whitesmoke;
    border: 0px;
    color: green;
    border: 1px solid green;
  }
`;

const generateOptions = () =>
  [...Array(49).keys()].map(num => {
    let value = "none";
    if (num !== 0) {
      let hours = Math.floor(num / 2).toString();
      if (hours.length === 1) {
        hours = "0" + hours;
      }
      let minutes = ((num % 2) * 30).toString();
      if (minutes.length === 1) {
        minutes = "0" + minutes;
      }
      value = `${hours}:${minutes}`;
    }
    return <option value={value}>{value}</option>;
  });

type Props = {
  fetchPageSettings: Function,
  postPageSettings: Function,
  pageId: string,
  saveSettings: Function,
  saveSettingsLoading: boolean,
  saveSettingsError: boolean,
  getSettings: Function,
  getSettingsLoading: boolean,
  getSettingsError: boolean,
  snackbarNotify: Function
};

type State = {
  preText: string,
  postText: string,
  countFrom: number,
  interval: number,
  dontPostFrom: string,
  dontPostTo: string
};

function openInNewTab(url) {
  var win = window.open(url, "_blank");
  win.focus();
}

class PageSettings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      preText: "",
      postText: "",
      countFrom: 0,
      interval: 10,
      dontPostFrom: "none",
      dontPostTo: "none"
    };
  }

  componentDidMount() {
    const { pageId, getSettings } = this.props;
    getSettings(pageId);
  }

  componentWillReceiveProps(nextProps: Props) {
    const {
      getSettingsLoading,
      saveSettingsLoading,
      snackbarNotify
    } = this.props;
    if (
      getSettingsLoading &&
      !nextProps.getSettingsLoading &&
      !nextProps.getSettingsError
    ) {
      this.setState({
        preText: nextProps.preText,
        postText: nextProps.postText,
        countFrom: nextProps.countFrom,
        interval: nextProps.timeInterval
      });
    }

    if (
      saveSettingsLoading &&
      !nextProps.saveSettingsLoading &&
      !nextProps.saveSettingsError
    ) {
      snackbarNotify("Settings saved");
    }
  }

  componentDidUpdate() {}

  _settingsDisplay = () => {
    const { pageId, saveSettings } = this.props;
    return (
      <SubmissionsDisplayWrapper>
        <SubmissionsWrapper>
          <SettingsBoxWrapper>
            <SettingsBox>
              <Title>Settings</Title>
              <SettingsRow>
                <SettingName>Your annonymous submission link: </SettingName>
                <Link
                  onClick={() => {
                    openInNewTab(`https://justpostme.tech/form/${pageId}`);
                  }}
                >
                  {`https://justpostme.tech/form/${pageId}`}
                </Link>
              </SettingsRow>
              <SettingsRow>
                <SettingName>Pre-submission text: </SettingName>
                <InputBox
                  type="text"
                  name="name"
                  value={this.state.preText}
                  onChange={event =>
                    this.setState({ preText: event.target.value })
                  }
                />
              </SettingsRow>
              <SettingsRow>
                <SettingName>Post-submission text: </SettingName>
                <InputBox
                  type="text"
                  name="name"
                  value={this.state.postText}
                  onChange={event =>
                    this.setState({ postText: event.target.value })
                  }
                />
              </SettingsRow>
              <SettingsRow>
                <SettingName>Count from: </SettingName>
                <InputBox
                  type="text"
                  name="name"
                  value={this.state.countFrom}
                  onChange={event =>
                    this.setState({ countFrom: event.target.value })
                  }
                />
              </SettingsRow>
              <SettingsRow>
                <SettingName>Post every: </SettingName>
                <Select
                  value={this.state.interval}
                  onChange={event => {
                    this.setState({ interval: event.target.value });
                  }}
                >
                  {["10", "15", "20", "30", "45", "60", "90", "120"].map(
                    num => <option value={num}>{num} minutes</option>
                  )}
                </Select>
              </SettingsRow>
              <SettingsRow>
                <SettingName>Don't post between: </SettingName>
                <SettingsWrapper>
                  <SmallSelect
                    value={this.state.dontPostFrom}
                    onChange={event => {
                      this.setState({ dontPostFrom: event.target.value });
                    }}
                  >
                    {generateOptions()}
                  </SmallSelect>
                  <SettingName>and</SettingName>
                  <SmallSelect
                    value={this.state.dontPostTo}
                    onChange={event => {
                      this.setState({ dontPostTo: event.target.value });
                    }}
                  >
                    {generateOptions()}
                  </SmallSelect>
                </SettingsWrapper>
              </SettingsRow>
              <SettingsRow>
                <SaveButton
                  onClick={() => {
                    saveSettings(
                      pageId,
                      this.state.preText,
                      this.state.postText,
                      this.state.countFrom,
                      this.state.interval,
                      this.state.dontPostFrom,
                      this.state.dontPostTo
                    );
                  }}
                >
                  Save settings
                </SaveButton>
              </SettingsRow>
            </SettingsBox>
          </SettingsBoxWrapper>
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
