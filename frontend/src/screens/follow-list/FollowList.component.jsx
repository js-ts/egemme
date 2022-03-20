import React from "react";

import "./FollowList.styles.css";
function URL(u){
  return "/u/"+u
}
const FollowList = ({ list, which }) => {
  return (
    <>
      {list.length === 0 ? (
        <h1 className="title full-screen-follow">No {`${which}`}</h1>
      ) : (
        <div className="follow-list columns is-multiline">
          {list.map((follow) => (
            <div
              key={follow["username"]}
              className="follow-list-item column is-2 is-4-mobile"
            >
              {/* <img src={follow.user.avatar} alt="Follow avatar" /> */}
              <a href={URL(follow["username"])}>
              <h1 className="has-text-weight-bold">{follow["username"]}</h1>
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FollowList;
