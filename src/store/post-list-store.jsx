import {
  createContext,
  useCallback,
  useReducer,
  useState,
  useEffect,
} from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  fetching: false,
  deletePost: () => {},
});
const PostListReducer = (currPostList, action) => {
  switch (action.type) {
    case "ADD_INITIAL_POSTS":
      return [...currPostList, ...action.payload.posts];

    case "ADD_POST":
      return [action.payload.post, ...currPostList];

    case "DELETE_POST":
      return currPostList.filter((post) => post.id !== action.payload.postId);

    default:
      return currPostList;
  }
};
function PostListContextProvider({ children }) {
  const [postList, dispatchPostList] = useReducer(PostListReducer, []);
  const [fetching, setFetching] = useState(false);
  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: {
        post: post,
      },
    });
  };
  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POSTS",
      payload: {
        posts: posts,
      },
    });
  };
  const deletePost = useCallback(
    (postId) => {
      dispatchPostList({
        type: "DELETE_POST",
        payload: {
          postId: postId,
        },
      });
    },
    [dispatchPostList]
  );

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <PostListContext.Provider
      value={{
        postList: postList,
        addPost: addPost,
        fetching: fetching,
        deletePost: deletePost,
      }}
    >
      {children}
    </PostListContext.Provider>
  );
}

export default PostListContextProvider;
