import React from "react";
import "./styles.css";

export function Thumbnail({ description, shape, size = "md", source }) {
  const styles = {};
  if (shape === "round") {
    styles.borderRadius = "100%";
  } else if (shape === "squircle") {
    styles.borderRadius = "33%";
  }
  return (
    <img
      src={source}
      alt={description}
      className={`Avatar--${size}`}
      style={styles}
    />
  );
}

export function Avatar({ children, icon, size = "md", source }) {
  return (
    <div className={`Avatar Avatar--${size}`}>
      {source ? <img src={source} className="Avatar__image" /> : children}
      {icon && <span className="Avatar__icon">{icon}</span>}
    </div>
  );
}

// function App() {
//   return (
//     <div style={{ display: "flex" }}>
//       <Thumbnail
//         size="sm"
//         source="https://upload.wikimedia.org/wikipedia/commons/0/0b/Cat_poster_1.jpg"
//         description="Users face"
//         shape="round"
//       />
//       <Thumbnail
//         size="sm"
//         source="https://upload.wikimedia.org/wikipedia/commons/0/0b/Cat_poster_1.jpg"
//         shape="squircle"
//       />
//       <Thumbnail
//         size="sm"
//         source="https://upload.wikimedia.org/wikipedia/commons/0/0b/Cat_poster_1.jpg"
//         shape="square"
//       />
//       <Avatar
//         source="https://upload.wikimedia.org/wikipedia/commons/0/0b/Cat_poster_1.jpg"
//         icon={"✏️"}
//       />
//       <Avatar>A</Avatar>
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
