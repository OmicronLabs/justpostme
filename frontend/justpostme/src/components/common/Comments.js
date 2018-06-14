//@flow

import React from "react";
import styled from "styled-components";

import Spinner from "../loadingSpinner/LoadingSpinner";

const SpinnerWrapper = styled.div`
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const AdminComment = styled.div`
  flex-direction: row;
  display: flex;
`;

const UserComment = styled.div``;

type CommentComponentProps = {
  comment: CommentProps,
  admin: boolean
};

const MyComment = (props: { comment: CommentProps, author: string }) => {
  return (
    <div>
      <p> {props.author} </p>
      <p> {props.comment.text} </p>
    </div>
  );
};

const TheirComment = (props: { comment: CommentProps, author: string }) => {
  return (
    <div>
      <p> {props.author}</p>
      <p> {props.comment.text} </p>
    </div>
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

const CommentsSection = (props: Props) => {
  return props.loading ? (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  ) : (
    <CommentsWrapper>
      {props.comments.map(comment => {
        return <Comment comment={comment} admin={props.admin} />;
      })}
    </CommentsWrapper>
  );
};

export default CommentsSection;
