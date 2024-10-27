import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Community from "../assets/Community.png";
import Together from "../assets/Together.png";
import Women from "../assets/Women.png";
import AuthContainer from "../components/overlay/authContainer/AuthContainer";

const Home = () => {
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <div className="flex-grow">
        <Carousel
          autoPlay
          infiniteLoop
          interval={2000}
          showThumbs={false}
          showStatus={false}
          className="w-full h-[100px]"
        >
          <div className="w-full h-[50vh]">
            <img
              src={Women}
              alt="Leckere Gerichte"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full h-[50vh]">
            <img
              src={Community}
              alt="Gemeinschaftstreffen"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-[50vh]">
            <img
              src={Together}
              alt="Gemeinschaftstreffen"
              className="w-full h-full object-cover"
            />
          </div>
        </Carousel>
      </div>

      <div className="flex-grow flex justify-center items-center mt-[20px]">
        <AuthContainer />
      </div>
    </div>
  );
};

export default Home;
