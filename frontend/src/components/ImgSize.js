import { useState, useEffect } from "react";

export default (url) => {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    if (!url) return;
    const img = document.createElement("img");
    img.addEventListener("load", (e) => {
      const { naturalHeight, naturalWidth } = e.target;
      setSize([naturalWidth, naturalHeight]);
    });
    img.src = url;
  }, [url]);

  return size;
};
