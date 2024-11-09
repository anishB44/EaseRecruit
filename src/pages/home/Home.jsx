import React from "react";
import Banner from "./components/Banner";
import FeaturedJob from "./components/FeaturedJob";
import Category from "./components/Category";
import Testimonial from "./components/Testimonial";
import FeaturedCompany from "./components/FeaturedCompany";
import Chatbot from "../../components/chatbot/Chatbot"

const Home = () => {
  return (
    <>
      <Chatbot />
      <Banner />
      <FeaturedJob />
      <Category />
      <FeaturedCompany />
      <Testimonial />

    </>
  );
};

export default Home;
