import { React, useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import axios from "axios";
import { pages, query, breakPoints } from "../constants";

const Image = () => {
  const [pageNo, setPageNo] = useState(1);
  const [currentImage, setCurrentImage] = useState({});
  const [data, setData] = useState([]);
  const [que, setQue] = useState("nature");

  useEffect(() => {
    const URL = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${que}&client_id=U2pS9emdUJKHneIjaV0wWW0xL9_U7K5gK7PPNNTGKt8`;
    axios.get(URL).then((res) => {
      setData(res.data.results);
      setCurrentImage(res.data.results[0]);
    });
  }, [que, pageNo]);

  const handleQuery = (e) => {
    setQue(e.target.value);
  };
  const handlePage = (e) => {
    setPageNo(e.target.value);
  };
  const handleClick = (image) => {
    setCurrentImage(image);
  };

  return (
    <>
      <div className="heading">IMAGE VIEWER WEB-APPLICATION</div>
      <div className="headingImage">
        <img src={currentImage?.urls?.small} alt={currentImage?.id} />
      </div>
      <div className="viewer">
        <div className="selected">
          <select onChange={handleQuery}>
            {query.map((q) => (
              <option value={q.value}>{q.label}</option>
            ))}
          </select>
          <select onChange={handlePage}>
            {pages.map((p) => (
              <option value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
        <Carousel breakPoints={breakPoints}>
          {data.map((image) => (
            <img
              src={image?.urls?.small}
              alt={image?.id}
              key={image?.id}
              onClick={() => handleClick(image)}
              className={currentImage?.id === image?.id ? "border" : ""}
            />
          ))}
        </Carousel>
      </div>
    </>
  );
};
export default Image;
