import { AiFillDelete } from "react-icons/ai";
import { useContext } from "react";
import { PostListContext } from "../store/post-list-store";
const Post = ({ post }) => {
  const { deletePost } = useContext(PostListContext);

  return (
    <div className="card post-card" style={{ width: "26rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            onClick={() => deletePost(post.id)}
          >
            <AiFillDelete />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span className="badge text-bg-primary tag" key={tag}>
            #{tag}
          </span>
        ))}
        <div className="alert alert-success reactions" role="alert">
          This Post has been liked by {post.reactions.likes} people and disliked
          by {post.reactions.dislikes} people.
        </div>
      </div>
    </div>
  );
};
export default Post;
