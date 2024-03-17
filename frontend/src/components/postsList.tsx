import moment from "moment";
import arrow from "../assets/arrow.svg";
import { Link } from "react-router-dom";

type Vote = { id: number; postId: number; voteType: "Upvote" | "Downvote" };

// type Comment = object;

type Post = {
  title: string;
  dateCreated: string;
  memberPostedBy: any;
  comments: Comment[];
  votes: Vote[];
};

function computeVoteCount(votes: Vote[]) {
  let count = 0;

  votes.forEach((v) => (v.voteType === "Upvote" ? count++ : count--));

  return count;
}

export const PostsList = ({ posts }: { posts: Post[] }) => (
  <div className="posts-list">
    {posts.map((post, key) => (
      <div className="post-item" key={key}>
        <div className="post-item-votes">
          <div className="post-item-upvote">
            <img src={arrow} alt="upvote arrow" />
          </div>
          <div>{computeVoteCount(post.votes)}</div>
          <div className="post-item-downvote">
            <img src={arrow} alt="downvote arrow" />
          </div>
        </div>
        <div className="post-item-content">
          <div className="post-item-title">{post.title}</div>
          <div className="post-item-details">
            <div>{moment(post.dateCreated).fromNow()}</div>
            <Link to={`/members/${post.memberPostedBy.user.username}`}>
              by {post.memberPostedBy.user.name}
            </Link>
            <div>
              {post.comments.length}{" "}
              {post.comments.length !== 1 ? `comments` : "comment"}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
