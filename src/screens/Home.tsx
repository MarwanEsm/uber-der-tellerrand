import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // If using carousel
import Cooking from "../assets/Cooking.png";
import Together from "../assets/Together.png";
import Women from "../assets/Women.png";
import LoginForm from "../components/overlay/login/Login";

const Home = () => {
    return (
        <div className="flex flex-col w-full h-screen">

            <div className="flex-grow h-1/2">
                <Carousel
                    autoPlay
                    infiniteLoop
                    interval={2000}
                    showThumbs={false}
                    showStatus={false}
                    className="w-full h-full"
                >
                    <div className="w-full h-full">
                        <img
                            src={Cooking}
                            alt="Community cooking event"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full h-full">
                        <img
                            src={Women}
                            alt="Delicious food event"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full h-full">
                        <img
                            src={Together}
                            alt="Community meetup"
                            className="w-full h-full object-cover"
                        />
                    </div>

                </Carousel>
            </div>


            <div className="flex-grow h-1/2 flex justify-center items-center bg-gray-100">
                <LoginForm />
            </div>
        </div>
    );
};

export default Home;
