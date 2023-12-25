import React from "react";
import Notes from "./Notes";

const Home = (props) => {
  return (
    <div style={{ textAlign: "left" }}>
      <Notes showAlert= {props.showAlert}/>
    </div>
  );
};

export default Home;
