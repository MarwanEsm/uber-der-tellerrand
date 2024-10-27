import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Community from "../assets/Community.png";
import Together from "../assets/Together.png";
import Women from "../assets/Women.png";
import LoginForm from "../components/overlay/login/Login";
// const imageClassName = "w-full h-[calc(50vh)]"
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
          <img
            src={Women}
            alt="Leckere Gerichte"
            className="w-full h-[50vh]object-cover"
          />

          <img
            src={Together}
            alt="Gemeinschaftstreffen"
            className="w-full h-[50vh]object-cover"
          />
          <img
            src={Community}
            alt="Gemeinschaftstreffen"
            className="w-full h-[50vh]object-cover"
          />
        </Carousel>
      </div>

      <div className="flex-grow flex justify-center items-center">
        <div>
          <h1 className="text-center text-3xl font-bold mb-4 text-purple-600">
            Willkommen zurück!
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
