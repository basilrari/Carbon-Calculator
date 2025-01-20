import React from "react";
import Homepage from "@/pages/homepage";
import Goals from "@/pages/goals";
import Services from "@/pages/services";
import About from "@/pages/about";

const Home = () => {
  return (
    <div>
      <div id="homepage">
        <Homepage />
      </div>
      <div id="goals">
        <Goals />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="about">
        <About />
      </div>
      </div>
  );
};

export default Home;
