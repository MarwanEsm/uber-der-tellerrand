import HomeLogo from "../assets/HomeLogo.png";
import LoginForm from "../components/overlay/login/Login";

const Home = () => {
    return (
        <div className="flex flex-col items-center">
            <img src={HomeLogo} alt="Logo" className="rounded-full w-40 h-40 mt-[20px]" />
            <LoginForm />
        </div>
    );
};

export default Home;
