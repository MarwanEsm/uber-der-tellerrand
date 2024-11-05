import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { FormEvent, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

const EventForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    allergyInfo: "Not",
    allergyDetails: "",
    instrument: "Not",
    instrumentDetails: "",
    leadRecipe: "Not",
    discoveryMethod: "",
    discoveryDetails: "",
    consent: false
  });

  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleChange = ({ target: { name, value, type, checked } }: any) => {
    setFormData((prevData) => {
      if (name === "allergyInfo" && value === "Nein") {
        return { ...prevData, [name]: value, allergyDetails: "" };
      }
      if (name === "instrument" && value === "Nein") {
        return { ...prevData, [name]: value, instrumentDetails: "" };
      }
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      try {
        await updateDoc(userDocRef, {
          firstLogin: false,
          ...formData
        });
        setSubmitMessage("Anmeldeformular erfolgreich abgeschickt!");
        setTimeout(() => navigate("/events"), 3000);
      } catch (error) {
        console.error("Error updating document:", error);
        setSubmitMessage(
          "Fehler beim Absenden des Formulars. Bitte versuchen Sie es erneut."
        );
      }
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, 5));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  const isNextDisabled = () => {
    if (currentSlide === 1) {
      return !formData.consent;
    }
    if (currentSlide === 2) {
      return !formData.name.trim() || !formData.email.trim();
    }
    if (currentSlide === 3) {
      return (
        formData.allergyInfo === "Other" &&
        formData.allergyDetails.trim() === ""
      );
    }
    if (currentSlide === 4) {
      return (
        formData.instrument === "Other" &&
        formData.instrumentDetails.trim() === ""
      );
    }
    if (currentSlide === 5) {
      return formData.leadRecipe === "Not";
    }
    return false;
  };

  return (
    <div className="max-w-lg mt-[70px] mx-[10px] p-8 bg-gradient-to-r bg-[#6F2CAB] rounded-lg shadow-2xl text-white">
      <Carousel
        selectedItem={currentSlide}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        swipeable={false}
        emulateTouch={false}
        showIndicators={false} // Remove navigation dots
      >
        <div className="py-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-orange-300">
            Anmeldeformular
          </h3>
          <p className="leading-relaxed mb-4 text-lg">
            <b>Liebe*r Teilnehmende,</b>
          </p>
          <div className="text-lg">
            wie schön, dass du mit{" "}
            <strong className="text-[#f39325]">DABEI SEIN</strong> möchtest! Um
            Dir einen Platz zu sichern, füll bitte dieses Formular aus.
            Daraufhin wirst Du von uns eine Nachricht mit allen weiteren Infos
            bekommen.
            <br />
            <strong className="text-[#f39325]">Wir freuen uns auf Dich!</strong>
            <br />
            Dein Über den Tellerrand-Team Osnabrück
          </div>
        </div>

        <div className="py-8">
          <label className="block mb-4 text-white">
            <span className="text-red-500 mr-2">*</span>Hast Du eine Allergie
            gegen Lebensmittel?
          </label>
          <p className="text-white mb-4">
            wenn Ja, schreib uns bitte unter Sonstiges, welche Allergie du hast
          </p>
          <div>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="allergyInfo"
                value="Nein"
                checked={formData.allergyInfo === "Nein"}
                onChange={handleChange}
                className="mr-2"
              />
              Nein
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="allergyInfo"
                value="Other"
                checked={formData.allergyInfo === "Other"}
                onChange={handleChange}
                className="mr-2"
              />
              Sonstiges:
            </label>
            <input
              type="text"
              disabled={formData.allergyInfo !== "Other"}
              name="allergyDetails"
              value={formData.allergyDetails}
              onChange={handleChange}
              placeholder="Bitte geben Sie Ihre Allergie ein"
              className="px-3 py-2 w-full mt-2 border border-white rounded bg-transparent text-white placeholder-white focus:outline-none"
            />
          </div>
        </div>

        <div className="py-8">
          <label className="block mb-4 text-white">
            <span className="text-red-500 mr-2">*</span>Welches Instrument
            bringst Du mit?
          </label>
          <p className="text-white mb-4">
            Wenn du ein Instrument mitbringen möchtest, schreib bitte unter
            Sonstiges, welches Musikinstrument du mitbringst.
          </p>
          <div>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="instrument"
                value="Nein"
                checked={formData.instrument === "Nein"}
                onChange={handleChange}
                className="mr-2"
              />
              Nein
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="instrument"
                value="Other"
                checked={formData.instrument === "Other"}
                onChange={handleChange}
                className="mr-2"
              />
              Sonstiges:
            </label>
            <input
              type="text"
              disabled={formData.instrument !== "Other"}
              name="instrumentDetails"
              value={formData.instrumentDetails}
              onChange={handleChange}
              placeholder="Bitte geben Sie Ihr Instrument ein"
              className="px-3 py-2 w-full mt-2 border border-white rounded bg-transparent text-white placeholder-white focus:outline-none"
            />
          </div>
        </div>

        {/* Additional slides go here */}

        <div className="p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Bestätigen Sie Ihre Anmeldung
          </h3>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-full font-bold hover:bg-orange-600 transition focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            Formular absenden
          </button>
          {submitMessage && (
            <div className="mt-4 text-center text-sm p-2 bg-green-500 rounded">
              {submitMessage}
            </div>
          )}
        </div>
      </Carousel>

      <div className="flex justify-between mt-8">
        {currentSlide > 0 && (
          <button
            onClick={prevSlide}
            className="px-5 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition focus:outline-none"
          >
            Zurück
          </button>
        )}
        {currentSlide < 5 && (
          <button
            onClick={nextSlide}
            disabled={isNextDisabled()}
            className={`px-5 py-3 rounded-full font-semibold ml-auto ${
              isNextDisabled()
                ? "bg-gray-400 text-white"
                : "bg-orange-500 text-white hover:bg-orange-600 transition focus:outline-none"
            }`}
          >
            Weiter
          </button>
        )}
      </div>
    </div>
  );
};

export default EventForm;
