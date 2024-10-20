import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // If using carousel
import Halloween from "../assets/Halloween.png";
import Together from "../assets/Together.png";
import Women from "../assets/Women.jpg";
import LoginForm from "../components/overlay/login/Login";

const Home = () => {
    return (
        <div className="relative w-full h-screen flex flex-col justify-center items-center">
            {/* Image grid or carousel */}
            <div className="absolute inset-0 overflow-hidden">
                <Carousel
                    autoPlay
                    infiniteLoop
                    interval={4000}
                    showThumbs={false}
                    showStatus={false}
                    className="w-full h-full"
                >
                    {/* Replace with actual image URLs */}
                    <div>
                        <img src={Halloween} alt="Community cooking event" />
                    </div>
                    <div>
                        <img src={Women} alt="Delicious food event" />
                    </div>
                    <div>
                        <img src={Together} alt="Community meetup" />
                    </div>
                </Carousel>
            </div>

            {/* Overlay with login form */}
            <div className="relative z-10 bg-white/75 p-8 rounded-xl shadow-lg backdrop-blur-md max-w-lg mx-auto">
                <h1 className="text-center text-3xl font-bold mb-4 text-purple-600">Welcome Back!</h1>
                <LoginForm />
            </div>
        </div>
    );
};

export default Home;
