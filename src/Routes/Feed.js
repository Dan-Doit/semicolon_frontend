import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from '../Components/Post';

const FEED_QUERY = gql`
{
  seeFeed{
    id
    location
    caption
    user{
      id
      avatar
      username
    }
    files{
      id
      url
    }
    likeCount
    isLiked
    comments{
      id
      text
      user{
        id
        avatar
        username
      }
    }
    createdAt
  }
}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 70vh;
`;



export default () => {
    const { data, loading } = useQuery(FEED_QUERY);
    return <Wrapper>{loading && <Loader />}
      {!loading && data && data.seeFeed && data.seeFeed.map(post => {
        return (
          <Post
            key={post.id}
            id={post.id}
            user={post.user}
            files={post.files}
            caption={post.caption}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.createdAt}
          />)
      })}
        </Wrapper>;
};