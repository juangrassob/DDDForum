import { Layout } from "../components/layout";
import { PostsList } from "../components/postsList";

const mockPosts: Post[] = [
  {
    title: "Exploring the Beauty of Nature",
    dateCreated: "2024-03-15",
    memberPostedBy: {
      user: { id: 1, name: "John Doe", username: "NatureLover123" },
    },
    comments: [],
    votes: [
      { id: 1, postId: 1, voteType: "Upvote" },
      { id: 2, postId: 1, voteType: "Upvote" },
    ],
  },
  {
    title: "Delicious Recipes for Spring",
    dateCreated: "2024-03-16",
    memberPostedBy: {
      user: { id: 2, name: "Alice Smith", username: "ChefMaster" },
    },
    comments: [],
    votes: [{ id: 3, postId: 2, voteType: "Upvote" }],
  },
  {
    title: "Latest Technological Innovations",
    dateCreated: "2024-03-17",
    memberPostedBy: {
      user: { id: 3, name: "Bob Johnson", username: "TechGeek22" },
    },
    comments: [],
    votes: [
      { id: 4, postId: 3, voteType: "Upvote" },
      { id: 5, postId: 3, voteType: "Downvote" },
    ],
  },
  {
    title: "Travel Diaries: Adventures in Europe",
    dateCreated: "2024-03-14",
    memberPostedBy: {
      user: { id: 4, name: "Emily Brown", username: "Wanderlust" },
    },
    comments: [],
    votes: [{ id: 6, postId: 4, voteType: "Upvote" }],
  },
  {
    title: "Tips for Productivity and Time Management",
    dateCreated: "2024-03-13",
    memberPostedBy: {
      user: { id: 5, name: "David Lee", username: "EfficiencyGuru" },
    },
    comments: [],
    votes: [],
  },
];

export const MainPage = () => {
  // We'll load posts and all of that here later.
  return (
    <Layout>
      <PostsList posts={mockPosts}></PostsList>
    </Layout>
  );
};
