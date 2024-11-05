import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { FormEvent, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

const EventFormCarousel: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    allergyInfo: "Nein",
    allergyDetails: "", // Added allergyDetails
    instrument: "Nein",
    instrumentDetails: "", // Added instrumentDetails
    leadRecipe: "Nein",
    discoveryMethod: "",
    discoveryDetails: "", // Added discoveryDetails
    consent: false
  });
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { firstLogin: false });

        await updateDoc(userDocRef, {
          name: formData.name,
          email: formData.email,
          allergyInfo: formData.allergyInfo,
          allergyDetails: formData.allergyDetails,
          instrument: formData.instrument,
          instrumentDetails: formData.instrumentDetails,
          leadRecipe: formData.leadRecipe,
          discoveryMethod: formData.discoveryMethod,
          discoveryDetails: formData.discoveryDetails
        });

        setSubmitMessage("Anmeldeformular erfolgreich abgeschickt!");
        setTimeout(() => navigate("/events"), 3000);
      }
    } catch (error) {
      console.error("Error updating document:", error);
      setSubmitMessage(
        "Fehler beim Absenden des Formulars. Bitte versuchen Sie es erneut."
      );
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, 5));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  const isNextDisabled = () => {
    switch (currentSlide) {
      case 2:
        return !formData.name || !formData.email;
      case 1:
        return !formData.consent;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-lg mt-[30px] mx-[10px] p-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 rounded-lg shadow-lg text-white">
      <Carousel
        selectedItem={currentSlide}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        swipeable={false}
        emulateTouch={false}
        onChange={setCurrentSlide}
      >
        {/* Slide 1 */}
        <div className="p-6 text-center">
          {/* <h2 className="text-3xl font-bold text-white mb-2">
            IT IS SOMMER TIME!!! 08.06.2024 um 16 Uhr
          </h2> */}
          <p className="text-center text-white mb-6">
            Liebe*r Teilnehmende,
            <br />
            <br />
            wie schön, dass du mit <strong>DABEI SEIN</strong> möchtest! Um Dir
            einen Platz zu sichern, füll bitte dieses Formular aus. Daraufhin
            wirst Du von uns eine Nachricht mit allen weiteren Infos bekommen.
            <br />
            <br />
            Wir <strong>freuen uns auf Dich!</strong>
            <br />
            Dein Über den Tellerrand-Team Osnabrück
          </p>
        </div>

        {/* Slide 2 - Consent */}
        <div className="p-6">
          <p className="text-white mb-4">
            Um den Kontakt zu erleichtern und unsere Aktivitäten besser zu
            organisieren, benötigen wir deine persönlichen Informationen sowie
            deine E-Mail-Adresse.
            <br />
            <br />
            Bitte markiere das Kästchen unten, um uns die Erlaubnis zur Nutzung
            deiner Daten zu erteilen.
            <br />
            <br />
            Deine Informationen werden sicher online in einem geschützten Ordner
            auf Google Drive gespeichert. Du hast jederzeit die Möglichkeit,
            deine Zustimmung zur Nutzung deiner Informationen zu widerrufen oder
            uns per E-Mail zu kontaktieren, um Änderungen oder Löschungen deiner
            Daten zu beantragen.
          </p>
          <label className="flex items-center space-x-2 mt-4 text-white">
            <input
              type="checkbox"
              name="consent"
              onChange={handleChange}
              checked={formData.consent}
              className="form-checkbox h-5 w-5 text-orange-500"
              required
            />
            <span>Ja, ich erlaube die Nutzung meiner Daten</span>
          </label>
        </div>

        {/* Slide 3 - Name and Email */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Anmeldeformular
          </h3>
          <p className="text-white mb-6">
            Die Schritte zur Registrierung:
            <br />
            1. Ausfüllen des Anmeldeformulars.
            <br />
            2. Warten auf die Bestätigungs-E-Mail (innerhalb von 7 Tagen nach
            Absendung des Formulars)
          </p>
          <label className="block mb-2 text-white">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border border-white rounded bg-transparent focus:outline-none text-white placeholder-white"
            placeholder="Dein Name"
            required
          />
          <label className="block mb-2 text-white">E-Mail *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border border-white rounded bg-transparent focus:outline-none text-white placeholder-white"
            placeholder="Deine E-Mail-Adresse"
            required
          />
        </div>

        {/* Slide 4 - Allergy & Instrument */}
        <div className="p-6">
          {/* Allergy Information */}
          <label className="block mb-2 text-white">
            Hast Du eine Allergie gegen Lebensmittel?
          </label>
          <div className="flex items-center space-x-2">
            <label className="flex items-center">
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
            <label className="flex items-center">
              <input
                type="radio"
                name="allergyInfo"
                value="Other"
                checked={formData.allergyInfo === "Other"}
                onChange={handleChange}
                className="mr-2"
              />
              Sonstiges
            </label>
            {formData.allergyInfo === "Other" && (
              <input
                type="text"
                name="allergyDetails"
                value={formData.allergyDetails}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    allergyDetails: e.target.value
                  }))
                }
                placeholder="Bitte geben Sie Ihre Allergie ein"
                className="w-full px-4 py-2 mt-2 border border-white rounded bg-transparent focus:outline-none text-white placeholder-white"
              />
            )}
          </div>

          {/* Instrument Information */}
          <label className="block mt-4 mb-2 text-white">
            Welches Instrument bringst Du mit?
          </label>
          <div className="flex items-center space-x-2">
            <label className="flex items-center">
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
            <label className="flex items-center">
              <input
                type="radio"
                name="instrument"
                value="Other"
                checked={formData.instrument === "Other"}
                onChange={handleChange}
                className="mr-2"
              />
              Sonstiges
            </label>
            {formData.instrument === "Other" && (
              <input
                type="text"
                name="instrumentDetails"
                value={formData.instrumentDetails}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    instrumentDetails: e.target.value
                  }))
                }
                placeholder="Bitte geben Sie Ihr Instrument ein"
                className="w-full px-4 py-2 mt-2 border border-white rounded bg-transparent focus:outline-none text-white placeholder-white"
              />
            )}
          </div>
        </div>

        {/* Slide 5 - Recipe & Discovery */}
        <div className="p-6">
          <label className="block mb-2 text-white">
            Möchtest Du ein Rezept einbringen und eine Kochstation leiten?
          </label>
          <div className="flex items-center space-x-2">
            <label>
              <input
                type="radio"
                name="leadRecipe"
                value="Nein"
                checked={formData.leadRecipe === "Nein"}
                onChange={handleChange}
              />
              Nein
            </label>
            <label>
              <input
                type="radio"
                name="leadRecipe"
                value="Ja, gerne"
                checked={formData.leadRecipe === "Ja, gerne"}
                onChange={handleChange}
              />
              Ja, gerne
            </label>
          </div>

          <label className="block mt-4 mb-2 text-white">
            Wie hast Du von Über den Tellerrand Osnabrück erfahren?
          </label>
          <div className="flex flex-col space-y-2">
            <label>
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
            <label>
              <input
                type="radio"
                name="discoveryMethod"
                value="Besucher"
                checked={formData.discoveryMethod === "Besucher"}
                onChange={handleChange}
                className="mr-2"
              />
              Ich war schon bei Über den Tellerrand Osnabrück :)
            </label>
            <label>
              <input
                type="radio"
                name="discoveryMethod"
                value="SocialMedia"
                checked={formData.discoveryMethod === "SocialMedia"}
                onChange={handleChange}
                className="mr-2"
              />
              Über Social Media (Facebook, Instagram, ...)
            </label>
            <label>
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
            <label className="flex items-center">
              <input
                type="radio"
                name="discoveryMethod"
                value="Other"
                checked={formData.discoveryMethod === "Other"}
                onChange={handleChange}
                className="mr-2"
              />
              Sonstiges
              {formData.discoveryMethod === "Other" && (
                <input
                  type="text"
                  name="discoveryDetails"
                  value={formData.discoveryDetails}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      discoveryDetails: e.target.value
                    }))
                  }
                  placeholder="Bitte angeben"
                  className="ml-2 px-2 py-1 border rounded bg-transparent focus:outline-none text-white placeholder-white"
                />
              )}
            </label>
          </div>
        </div>

        {/* Last Slide - Confirmation */}
        <div className="p-6 text-center">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Bestätigen Sie Ihre Anmeldung
          </h3>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition focus:outline-none focus:ring-4 focus:ring-orange-300"
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

      {/* Custom Navigation Buttons */}
      <div className="flex justify-between mt-4">
        {currentSlide > 0 && (
          <button
            onClick={prevSlide}
            className="px-4 py-2 bg-[#f39325] text-white rounded"
          >
            Back
          </button>
        )}
        {currentSlide < 5 && (
          <button
            onClick={nextSlide}
            disabled={isNextDisabled()}
            className={`px-4 py-2 rounded ml-auto ${
              isNextDisabled()
                ? "bg-gray-400 text-white"
                : "bg-[#f39325] text-white"
            }`}
          >
            Weiter
          </button>
        )}
      </div>
    </div>
  );
};

export default EventFormCarousel;
