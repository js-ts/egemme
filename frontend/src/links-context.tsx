import React,{ createContext, useState } from 'react';

const LinksContext = createContext({
  links: [],
  totalLinks: 0,
  addLink: (linkMeetup) => {},
  removeLink: (meetupId) => {},
  itemIsLink: (meetupId) => {}
});

export function LinksContextProvider(props) {

  const [userLinks, setUserLinks] = useState([]);
console.log(userLinks)
  function addLinkHandler(linkMeetup) {
    setUserLinks((prevUserLinks) => {
      return prevUserLinks.concat(linkMeetup);
    });
  }

  function removeLinkHandler(meetupId) {
    setUserLinks(prevUserLinks => {
      return prevUserLinks.filter(meetup => meetup.id !== meetupId);
    });
  }
  function itemIsLinkHandler(meetupId) {
    return userLinks.some(meetup => meetup.id === meetupId);
  }
  const context = {
    Links: userLinks,
    totalLinks: userLinks.length,
    addLink: addLinkHandler,
    removeLink: removeLinkHandler,
    itemIsLink: itemIsLinkHandler
  };

  return (
    <LinksContext.Provider value={context}>
      {props.children}
    </LinksContext.Provider>
  );
}

export default LinksContext;
