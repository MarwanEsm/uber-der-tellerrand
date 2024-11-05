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
    allergyInfo: "",
    instrument: "",
    leadRecipe: "",
    discoveryMethod: ""
  });
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
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
          instrument: formData.instrument,
          leadRecipe: formData.leadRecipe,
          discoveryMethod: formData.discoveryMethod
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

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, 4));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  return (
    <div className="max-w-lg w-full mx-auto p-6 bg-white rounded-lg shadow-lg text-gray-800">
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
          <h2 className="text-3xl font-bold text-purple-700 mb-2">
            IT IS SOMMER TIME!!! 08.06.2024 um 16 Uhr
          </h2>
          <p className="text-center text-gray-700 mb-6">
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

        {/* Slide 2 */}
        <div className="p-6">
          <p className="text-gray-700 mb-4">
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
          <label className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              name="consent"
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-orange-500"
              required
            />
            <span>Ja, ich erlaube die Nutzung meiner Daten</span>
          </label>
        </div>

        {/* Slide 3 - Name and Email */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Anmeldeformular</h3>
          <p className="text-gray-700 mb-6">
            Die Schritte zur Registrierung:
            <br />
            1. Ausfüllen des Anmeldeformulars.
            <br />
            2. Warten auf die Bestätigungs-E-Mail (innerhalb von 7 Tagen nach
            Absendung des Formulars)
          </p>
          <label className="block mb-2">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded focus:outline-none"
            placeholder="Dein Name"
            required
          />
          <label className="block mb-2">E-Mail *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded focus:outline-none"
            placeholder="Deine E-Mail-Adresse"
            required
          />
        </div>

        {/* Slide 4 - Allergy & Instrument */}
        <div className="p-6">
          <label className="block mb-2">
            Hast Du eine Allergie gegen Lebensmittel?
          </label>
          <input
            type="text"
            name="allergyInfo"
            value={formData.allergyInfo}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded focus:outline-none"
            placeholder="Schreibe hier deine Allergie"
          />
          <label className="block mb-2">
            Welches Instrument bringst Du mit?
          </label>
          <input
            type="text"
            name="instrument"
            value={formData.instrument}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none"
            placeholder="Instrument"
          />
        </div>

        {/* Slide 5 - Recipe & Discovery */}
        <div className="p-6">
          <label className="block mb-2">
            Möchtest Du ein Rezept einbringen und eine Kochstation leiten?
          </label>
          <input
            type="text"
            name="leadRecipe"
            value={formData.leadRecipe}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded focus:outline-none"
            placeholder="Ja oder Nein"
          />
          <label className="block mb-2">
            Wie hast Du von Über den Tellerrand Osnabrück erfahren?
          </label>
          <select
            name="discoveryMethod"
            value={formData.discoveryMethod}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          >
            <option value="">Bitte auswählen</option>
            <option value="Flyer">Über einen Flyer</option>
            <option value="Besucher">Ich war schon mal dabei :)</option>
            <option value="SocialMedia">Über Social Media</option>
            <option value="Freund">Über einen Freund</option>
            <option value="Other">Sonstiges</option>
          </select>
        </div>

        {/* Last Slide - Confirmation */}
        <div className="p-6 text-center">
          <h3 className="text-2xl font-semibold mb-4">
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
          <button onClick={prevSlide} className="px-4 py-2 bg-gray-300 rounded">
            Back
          </button>
        )}
        {currentSlide < 4 && (
          <button
            onClick={nextSlide}
            className="px-4 py-2 bg-gray-300 rounded ml-auto"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default EventFormCarousel;
