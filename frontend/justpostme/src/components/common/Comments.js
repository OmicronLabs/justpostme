//@flow

import React from "react";
import styled from "styled-components";

import Spinner from "../loadingSpinner/LoadingSpinner";

const SpinnerWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const CommentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  min-height: 44px;
  margin: 1px 0;
`;

const TheirCommentWrapper = CommentWrapper.extend`
  justify-content: flex-start;
`;

const MyCommentWrapper = CommentWrapper.extend`
  justify-content: flex-end;
`;

const CommentAuthor = styled.p`
  color: lightgray;
  margin: 0px;
  font-size: 16px;
`;

const CommentBody = styled.p`
  margin: 0px;
  display: flex;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 5px;
`;

const TheirCommentBody = CommentBody.extend`
  background: lightgray;
`;

const MyCommentBody = CommentBody.extend`
  color: white;
  background: lightgreen;
`;

const CommentsWrapper = styled.div`
  display: flex;
  padding: 8px 8px;

  height: 130px;
  overflow: scroll;
  flex-direction: column;
  align-items: flex-start;
`;

type CommentComponentProps = {
  comment: CommentProps,
  admin: boolean
};

const MyComment = (props: { comment: CommentProps, author: string }) => {
  return (
    <MyCommentWrapper>
      <MyCommentBody> {props.comment.text} </MyCommentBody>
    </MyCommentWrapper>
  );
};

const TheirComment = (props: { comment: CommentProps, author: string }) => {
  return (
    <TheirCommentWrapper>
      <TheirCommentBody> {props.comment.text} </TheirCommentBody>
    </TheirCommentWrapper>
  );
};

const Comment = (props: CommentComponentProps) => {
  const { comment, admin } = props;

  if (admin) {
    if (comment.byAdmin) {
      return <MyComment comment={comment} author={"You"} />;
    } else {
      return <TheirComment comment={comment} author={"Submitter"} />;
    }
  } else {
    if (comment.byAdmin) {
      return <TheirComment comment={comment} author={"Admin"} />;
    } else {
      return <MyComment comment={comment} author={"You"} />;
    }
  }
};

type CommentProps = {
  byAdmin: boolean,
  text: string,
  timeCommented: string
};

type Props = {
  comments: Array<CommentProps>,
  loading: boolean,
  admin: boolean
};

class CommentsSection extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.commentsEnd && this.commentsEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const { loading, comments, admin } = this.props;
    return loading ? (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    ) : (
      <CommentsWrapper>
        {comments.map(comment => {
          return <Comment comment={comment} admin={admin} />;
        })}
        <div
          ref={el => {
            this.commentsEnd = el;
          }}
        />
      </CommentsWrapper>
    );
  }
}

export default CommentsSection;
