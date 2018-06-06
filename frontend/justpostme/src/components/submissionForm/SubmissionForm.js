//@flow
import React from "react";
import styled from "styled-components";

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
  currentPageLoading: boolean
};

class SubmissionForm extends React.Component<Props> {
  componentDidMount() {
    const { fetchCurrentPage, match } = this.props;
    fetchCurrentPage(match.params.id);
  }

  _renderForm() {
    const { currentPage } = this.props;
    return (
      <Form>
        <p> {`Submission form for page ${currentPage.name}`}</p>
        <p> Your submissions content </p>
        <InputField style={{ height: "130px" }} />
        <p> Who you are </p>
        <InputField style={{ height: "70px" }} />
        <button onClick={() => alert("Submitted")}>Submit me!!!!</button>
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
