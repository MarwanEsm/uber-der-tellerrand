// eslint-disable-next-line import/no-extraneous-dependencies
import { FaFacebookF, FaInstagram, FaRss } from "react-icons/fa";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#8241B4] text-white py-4 px-6 flex justify-between items-center w-full">
            <div className="text-sm">
                © Über den Tellerrand {new Date().getFullYear()}
            </div>
            <div className="flex space-x-4">
                <Link to="#" aria-label="Facebook">
                    <FaFacebookF className="w-5 h-5" />
                </Link>
                <Link to="#" aria-label="Instagram">
                    <FaInstagram className="w-5 h-5" />
                </Link>
                <Link to="#" aria-label="RSS Feed">
                    <FaRss className="w-5 h-5" />
                </Link>
            </div>
        </footer>
    );
}

export default Footer;
