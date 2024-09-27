import React from "react";
import CustomCard from "./CustomCard";
import { useLocation } from "react-router-dom";
const Found = () => {

  const location = useLocation();
  const { title, subtitle, imageUrl } = location.state || {};
  console.log(location.state);
  return (
    <CustomCard
      imageUrl = {imageUrl}
      title= {title}
      subtitle ={subtitle}
    />
  );
};

export default Found;
