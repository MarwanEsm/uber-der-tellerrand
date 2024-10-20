import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
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
                            alt="Gemeinsames Kochen"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full h-full">
                        <img
                            src={Women}
                            alt="Leckere Gerichte"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="w-full h-full">
                        <img
                            src={Together}
                            alt="Gemeinschaftstreffen"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </Carousel>
            </div>

            <div className="flex-grow h-1/2 flex justify-center items-center">
                <div>
                    <h1 className="text-center text-3xl font-bold mb-4 text-purple-600">Willkommen zurück!</h1>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default Home;
