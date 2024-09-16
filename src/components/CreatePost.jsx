import { useContext } from "react";
import { useRef } from "react";
import { PostListContext } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const { addPost } = useContext(PostListContext);
  const navigate = useNavigate();
  const userIdElement = useRef("");
  const postTitleElement = useRef("");
  const postBodyElement = useRef();
  const likesElement = useRef();
  const dislikesElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const likes = parseInt(likesElement.current.value) || 0;
    const dislikes = parseInt(dislikesElement.current.value) || 0;
    const tags = tagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    likesElement.current.value = "";
    dislikesElement.current.value = "";
    tagsElement.current.value = "";

    console.log("sending Post to server");

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        reactions: {
          likes: likes,
          dislikes: dislikes,
        },
        userId: userId,
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        addPost(post);
        navigate("/");
      });
  };

  return (
    <form className="create-post" id="form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter your user ID (between 0 to 99) here :
        </label>
        <input
          ref={userIdElement}
          type="text"
          className="form-control"
          id="userId"
          placeholder="Your user Id..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Post Title:
        </label>
        <input
          ref={postTitleElement}
          type="text"
          className="form-control"
          id="title"
          placeholder="How's your day going...."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="post-content" className="form-label">
          Post Content:
        </label>
        <textarea
          ref={postBodyElement}
          rows={4}
          type="text"
          className="form-control"
          id="post-content"
          placeholder="Tell us more about it..."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          No. of Likes:
        </label>
        <input
          ref={likesElement}
          type="number"
          className="form-control "
          id="reactions"
          placeholder=" How many people have liked this post "
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          No. of Dislikes:
        </label>
        <input
          ref={dislikesElement}
          type="number"
          className="form-control"
          id="reactions"
          placeholder=" How many people have disliked this post "
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Enter your hashtags here:
        </label>
        <input
          ref={tagsElement}
          type="text"
          className="form-control"
          id="tags"
          placeholder="Please enter tags using space "
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};
export default CreatePost;
