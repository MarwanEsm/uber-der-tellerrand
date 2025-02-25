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

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, 7));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  const isSlideButtonDisabled = (slideIndex: number) => {
    if (slideIndex === 1) {
      return !formData.consent;
    }
    if (slideIndex === 2) {
      return !formData.name.trim() || !formData.email.trim();
    }
    if (slideIndex === 3) {
      return (
        formData.allergyInfo === "Not" ||
        (formData.allergyInfo === "Other" &&
          formData.allergyDetails.trim() === "")
      );
    }
    if (slideIndex === 4) {
      return (
        formData.instrument === "Not" ||
        (formData.instrument === "Other" &&
          formData.instrumentDetails.trim() === "")
      );
    }
    if (slideIndex === 5) {
      return formData.leadRecipe === "Not";
    }
    if (slideIndex === 6) {
      return (
        formData.discoveryMethod === "Other" &&
        formData.discoveryDetails.trim() === ""
      );
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
        showIndicators={false}
      >
        <div className="py-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-orange-300">
            Anmeldeformular
          </h3>
          <p className="leading-relaxed mb-4 text-lg">
            <b>Liebe*r Teilnehmende,</b>
          </p>
          <div className="text-lg">
            wie schön, dass du mit
            <strong className="text-[#f39325]"> DABEI SEIN</strong> möchtest! Um
            Dir einen Platz zu sichern, füll bitte dieses Formular aus.
            Daraufhin wirst Du von uns eine Nachricht mit allen weiteren Infos
            bekommen.
            <br />
            <strong className="text-[#f39325]">Wir freuen uns auf Dich!</strong>
            <br />
            Dein Über den Tellerrand-Team Osnabrück
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={nextSlide}
              className="px-5 py-3 rounded-full mx-auto font-semibold bg-orange-500 text-white hover:bg-orange-600 transition focus:outline-none"
            >
              Weiter
            </button>
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
          <div className="flex justify-between mt-8">
            <button
              onClick={prevSlide}
              className="px-5 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition focus:outline-none"
            >
              Zurück
            </button>
            <button
              onClick={nextSlide}
              disabled={isSlideButtonDisabled(3)}
              className={`px-5 py-3 rounded-full font-semibold ${
                isSlideButtonDisabled(3)
                  ? "bg-gray-400 text-white"
                  : "bg-orange-500 text-white hover:bg-orange-600 transition focus:outline-none"
              }`}
            >
              Weiter
            </button>
          </div>
        </div>

        <div className="py-8">
          <p className="text-white mb-4">
            Bei unserem Koch-Event möchten wir gemeinsam gutes Essen genießen,
            aber vor allem wollen wir einander kennenlernen. Wenn Du ein
            Instrument spielst und Lust hast, deine Musik mit uns zu teilen,
            bring bitte dein <strong>Musikinstrument</strong> mit, damit wir
            während des Kochevents gemeinsam Musik genießen können.
          </p>
          <p className="text-white mb-4">
            Wenn du ein Instrument mitbringen möchtest, schreib bitte unter
            Sonstiges, welches <strong>Musikinstrument</strong> Du mitbringst:
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
              Other:
            </label>
            <input
              type="text"
              disabled={formData.instrument !== "Other"}
              name="instrumentDetails"
              value={formData.instrumentDetails}
              onChange={handleChange}
              placeholder="Musikinstrument eingeben"
              className="px-3 py-2 w-full mt-2 border border-white rounded bg-transparent text-white placeholder-white focus:outline-none"
            />
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={prevSlide}
              className="px-5 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition focus:outline-none"
            >
              Zurück
            </button>
            <button
              onClick={nextSlide}
              disabled={isSlideButtonDisabled(4)}
              className={`px-5 py-3 rounded-full font-semibold ${
                isSlideButtonDisabled(4)
                  ? "bg-gray-400 text-white"
                  : "bg-orange-500 text-white hover:bg-orange-600 transition focus:outline-none"
              }`}
            >
              Weiter
            </button>
          </div>
        </div>

        <div className="py-8">
          <label className="block mb-4 text-white">
            Hast du Lust, bei der nächsten Kochveranstaltung ein Rezept
            einzubringen und eine eigene Kochstation zu leiten?
          </label>
          <div>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="leadRecipe"
                value="Nein"
                checked={formData.leadRecipe === "Nein"}
                onChange={handleChange}
                className="mr-2"
              />
              Nein
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="leadRecipe"
                value="Ja, gerne"
                checked={formData.leadRecipe === "Ja, gerne"}
                onChange={handleChange}
                className="mr-2"
              />
              Ja, gerne
            </label>
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={prevSlide}
              className="px-5 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition focus:outline-none"
            >
              Zurück
            </button>
            <button
              onClick={nextSlide}
              disabled={isSlideButtonDisabled(5)}
              className={`px-5 py-3 rounded-full font-semibold ${
                isSlideButtonDisabled(5)
                  ? "bg-gray-400 text-white"
                  : "bg-orange-500 text-white hover:bg-orange-600 transition focus:outline-none"
              }`}
            >
              Weiter
            </button>
          </div>
        </div>

        <div className="py-8">
          <label className="block mb-4 text-white">
            Wie hast Du von Über den Tellerrand Osnabrück erfahren?
          </label>
          <div>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="discoveryMethod"
                value="Flyer"
                checked={formData.discoveryMethod === "Flyer"}
                onChange={handleChange}
                className="mr-2"
              />
              Über einen Flyer
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="discoveryMethod"
                value="Freund"
                checked={formData.discoveryMethod === "Freund"}
                onChange={handleChange}
                className="mr-2"
              />
              Über einen Freund
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="discoveryMethod"
                value="Besucher"
                checked={formData.discoveryMethod === "Besucher"}
                onChange={handleChange}
                className="mr-2"
              />
              Ich war schon dabei
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="discoveryMethod"
                value="SocialMedia"
                checked={formData.discoveryMethod === "SocialMedia"}
                onChange={handleChange}
                className="mr-2"
              />
              Über Social Media
            </label>
            <label className="flex items-center mb-2">
              <input
                type="radio"
                name="discoveryMethod"
                value="Other"
                checked={formData.discoveryMethod === "Other"}
                onChange={handleChange}
                className="mr-2"
              />
              Sonstiges:
            </label>
            <input
              type="text"
              disabled={formData.discoveryMethod !== "Other"}
              name="discoveryDetails"
              value={formData.discoveryDetails}
              onChange={handleChange}
              placeholder="Bitte angeben"
              className="px-3 py-2 w-full mt-2 border border-white rounded bg-transparent text-white placeholder-white focus:outline-none"
            />
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={prevSlide}
              className="px-5 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition focus:outline-none"
            >
              Zurück
            </button>
            <button
              onClick={nextSlide}
              disabled={isSlideButtonDisabled(6)}
              className={`px-5 py-3 rounded-full font-semibold ${
                isSlideButtonDisabled(6)
                  ? "bg-gray-400 text-white"
                  : "bg-orange-500 text-white hover:bg-orange-600 transition focus:outline-none"
              }`}
            >
              Weiter
            </button>
          </div>
        </div>

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
    </div>
  );
};

export default EventForm;
