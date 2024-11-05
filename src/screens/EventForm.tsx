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
    allergyInfo: "Nein",
    allergyDetails: "",
    instrument: "Nein",
    instrumentDetails: "",
    leadRecipe: "Nein",
    discoveryMethod: "",
    discoveryDetails: "",
    consent: false
  });
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleChange = ({ target: { name, value, type, checked } }: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
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
    if (currentSlide === 1) return !formData.consent;
    if (currentSlide === 2) return !formData.name || !formData.email;
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
        onChange={setCurrentSlide}
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
          <p className="leading-relaxed mb-4 text-lg">
            Um den Kontakt zu erleichtern und unsere Aktivitäten besser zu
            organisieren, benötigen wir deine persönlichen Informationen sowie
            deine E-Mail-Adresse.
            <br />
          </p>
          <div className="leading-relaxed mb-4 text-lg">
            Bitte markiere das Kästchen unten, um uns die Erlaubnis zur Nutzung
            deiner Daten zu erteilen.
          </div>
          <div className="flex text-lg">
            <input
              type="checkbox"
              name="consent"
              onChange={handleChange}
              checked={formData.consent}
              className="form-checkbox mt-[5px] h-4 w-4 text-orange-500 border-white"
              required
            />
            <label
              className={`${formData.consent ? "text-orange-500" : "text-white"}`}
            >
              Ja, ich erlaube die Nutzung meiner Daten
            </label>
          </div>
        </div>

        <div className="p-8">
          <p className="mb-6 leading-relaxed">
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
            className="w-full px-4 py-2 mb-4 border border-orange-300 rounded bg-transparent text-white placeholder-white focus:outline-none"
            placeholder="Dein Name"
            required
          />
          <label className="block mb-2 text-white">E-Mail *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-orange-300 rounded bg-transparent text-white placeholder-white focus:outline-none"
            placeholder="Deine E-Mail-Adresse"
            required
          />
        </div>

        <div className="p-8">
          <label className="block mb-4 text-white">
            Hast Du eine Allergie gegen Lebensmittel?
          </label>
          <div className="flex items-center space-x-4">
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
                onChange={handleChange}
                placeholder="Bitte geben Sie Ihre Allergie ein"
                className="w-full px-3 py-2 mt-2 border border-white rounded bg-transparent text-white placeholder-white focus:outline-none"
              />
            )}
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
