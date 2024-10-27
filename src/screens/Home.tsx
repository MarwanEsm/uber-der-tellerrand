import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Community from "../assets/Community.png";
import Together from "../assets/Together.png";
import Women from "../assets/Women.png";
import AuthContainer from "../components/overlay/authContainer/AuthContainer";

const Home = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div>
        <Carousel
          autoPlay
          infiniteLoop
          interval={2000}
          showThumbs={false}
          showStatus={false}
          className="w-full"
        >
          <div className="w-full">
            <img
              src={Women}
              alt="Leckere Gerichte"
              className="w-full object-cover"
            />
          </div>

          <div className="w-full">
            <img
              src={Community}
              alt="Gemeinschaftstreffen"
              className="w-full object-cover"
            />
          </div>
          <div className="w-full">
            <img
              src={Together}
              alt="Gemeinschaftstreffen"
              className="w-ful object-cover"
            />
          </div>
        </Carousel>
      </div>

      <div className="flex justify-center items-center">
        <AuthContainer />
      </div>
    </div>
  );
};

export default Home;
