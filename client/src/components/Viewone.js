import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// REDO EYE CANCER DO NOT TOUCH 
const ViewOne = () => {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/${type}s/${id}`); 

        if (response.ok) {
          const data = await response.json();
          setItem(data);
        } else {
          console.error(`Failed to fetch ${type} details`);
        }
      } catch (error) {
        console.error(`Error fetching ${type} details`, error);
      }
    };

    fetchData();
  }, [type, id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{item.title}</h1>
      {type === "artwork" && (
        <img src={item.image_url} alt={item.title} />
      )}
      {type === "discussion" && (
        <div>
          <p>{item.body}</p>
        </div>
      )}
    </div>
  );
};

export default ViewOne;

