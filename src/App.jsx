import React from "react";
import MyReact from "./MyReact";

const Board = ({ posts, tag }) => {
  console.log("Board rendered");
  MyReact.resetCursor();

  const [darkTheme, setDarkTheme] = React.useState(false);

  const handleClick = MyReact.useCallback((postId) => {
    console.log("handleClick", postId);
  }, []);

  const filterPosts = () => {
    console.log("filterPosts");
    return posts.filter((post) => (tag ? post.tag === tag : true));
  };

  const filteredPosts = MyReact.useMemo(filterPosts, [posts, tag]);

  return (
    <>
      <div>
        <button onClick={() => setDarkTheme(!darkTheme)}>테마변경</button>
        <span>{darkTheme ? "어두운 테마" : "밝은 테마"}</span>
      </div>
      <hr />
      <FilteredPosts value={filteredPosts} onClick={handleClick} />
    </>
  );
};

const FilteredPosts = MyReact.memo(({ value, onClick }) => {
  console.log("FilteredPosts");
  return (
    <ul>
      {(value || []).map(({ id, content, tag }) => (
        <li key={id} onClick={onClick(id)}>
          {content} <span>#{tag}</span>
        </li>
      ))}
    </ul>
  );
});

export default () => {
  const [tag, setTag] = React.useState("");
  return (
    <>
      <button onClick={() => setTag("")}>All</button>
      <button onClick={() => setTag("tag1")}>Tag1</button>
      <button onClick={() => setTag("tag2")}>Tag2</button>
      <Board
        posts={[
          { id: "id1", content: "content1", tag: "tag1" },
          { id: "id2", content: "content2", tag: "tag1" },
          { id: "id3", content: "content3", tag: "tag2" },
        ]}
        tag={tag}
      />
    </>
  );
};
