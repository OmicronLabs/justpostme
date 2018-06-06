//@flow
import React from "react";
import styled from "styled-components";
import { submitForm } from "../../actions/submitForm";

const FormWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const InputField = styled.input`
  width: 800px;
`;

type Props = {
  currentPage: any,
  currentPageLoading: boolean,
  submitForm: Function,
  fetchCurrentPage: Function
};

class SubmissionForm extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = { submissionText: "" };
  }

  componentDidMount() {
    const { fetchCurrentPage, match } = this.props;
    fetchCurrentPage(match.params.id);
  }

  _renderForm() {
    const { currentPage, match, submitForm } = this.props;
    return (
      <Form>
        <p> {`Submission form for page ${currentPage.name}`}</p>
        <p> Your submissions content </p>
        <InputField
          style={{ height: "130px" }}
          value={this.state.submissionText}
          onChange={event =>
            this.setState({ submissionText: event.target.value })
          }
        />
        <p> Who you are </p>
        <InputField style={{ height: "70px" }} />
        <button
          onClick={() => submitForm(match.params.id, this.state.submissionText)}
        >
          Submit me!!!!
        </button>
      </Form>
    );
  }

  _renderLoading() {
    return <p>Loading</p>;
  }

  _renderError() {
    return <p>Error, link is broken :( </p>;
  }

  render() {
    const { currentPage, currentPageError, currentPageLoading } = this.props;

    return (
      <FormWrapper>
        {currentPageLoading
          ? this._renderLoading()
          : currentPage
            ? this._renderForm()
            : this._renderError()}
      </FormWrapper>
    );
  }
}

export default SubmissionForm;
