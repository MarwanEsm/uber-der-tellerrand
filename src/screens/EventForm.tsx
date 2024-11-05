import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const EventForm = () => {
  const [responses, setResponses] = useState({
    consent: false,
    name: "",
    email: "",
    allergy: "",
    instrument: "",
    leadRecipe: "",
    discoveryMethod: ""
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setResponses((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  return (
    <div className="max-w-lg w-full mx-auto p-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 rounded-lg shadow-lg text-white">
      <h2 className="text-center text-2xl mb-6">
        IT IS SOMMER TIME!!! 08.06.2024 um 16 Uhr
      </h2>
      <Carousel showThumbs={false} showStatus={false}>
        {/* Introduction Slide */}
        <div className="p-4 text-center">
          <p>Liebe*r Teilnehmende,</p>
          <p>
            wie schön, dass du mit DABEI SEIN möchtest! Um Dir einen Platz zu
            sichern, füll bitte dieses Formular aus. Daraufhin wirst Du von uns
            eine Nachricht mit allen weiteren Infos bekommen.
          </p>
          <p>Wir freuen uns auf Dich!</p>
          <p>Dein Über den Tellerrand-Team Osnabrück</p>
        </div>

        {/* Consent Slide */}
        <div className="p-4 text-center">
          <p>
            Um den Kontakt zu erleichtern und unsere Aktivitäten besser zu
            organisieren, benötigen wir deine persönlichen Informationen sowie
            deine E-Mail-Adresse.
          </p>
          <label className="flex items-center justify-center space-x-2 mt-4">
            <input
              type="checkbox"
              name="consent"
              checked={responses.consent}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Ja, ich erlaube die Nutzung meiner Daten</span>
          </label>
        </div>

        {/* Name & Email Slide */}
        <div className="p-4">
          <label className="block mb-2">Name *</label>
          <input
            type="text"
            name="name"
            value={responses.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white placeholder-white"
            placeholder="Dein Name"
          />

          <label className="block mt-4 mb-2">E-Mail *</label>
          <input
            type="email"
            name="email"
            value={responses.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white placeholder-white"
            placeholder="Deine E-Mail-Adresse"
          />
        </div>

        {/* Allergy Question Slide */}
        <div className="p-4">
          <p>Hast Du eine Allergie gegen Lebensmittel? *</p>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="radio"
              name="allergy"
              value="Nein"
              onChange={handleChange}
              checked={responses.allergy === "Nein"}
            />
            <span>Nein</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="radio"
              name="allergy"
              value="Ja"
              onChange={handleChange}
              checked={responses.allergy === "Ja"}
            />
            <span>Ja, ich werde die Allergie im Kommentar nennen</span>
          </label>
        </div>

        {/* Instrument Question Slide */}
        <div className="p-4">
          <p>
            Wenn Du ein Instrument spielst und Lust hast, deine Musik mit uns zu
            teilen, bring bitte dein Instrument mit.
          </p>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="radio"
              name="instrument"
              value="Nein"
              onChange={handleChange}
              checked={responses.instrument === "Nein"}
            />
            <span>Nein</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="radio"
              name="instrument"
              value="Ja"
              onChange={handleChange}
              checked={responses.instrument === "Ja"}
            />
            <span>Ja, ich bringe mein Instrument mit</span>
          </label>
        </div>

        {/* Recipe Lead Question Slide */}
        <div className="p-4">
          <p>
            Hast du Lust, bei der nächsten Kochveranstaltung ein Rezept
            einzubringen und eine eigene Kochstation zu leiten?
          </p>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="radio"
              name="leadRecipe"
              value="Nein"
              onChange={handleChange}
              checked={responses.leadRecipe === "Nein"}
            />
            <span>Nein</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input
              type="radio"
              name="leadRecipe"
              value="Ja"
              onChange={handleChange}
              checked={responses.leadRecipe === "Ja"}
            />
            <span>Ja, gerne</span>
          </label>
        </div>

        {/* Discovery Method Slide */}
        <div className="p-4">
          <p>Wie hast Du von Über den Tellerrand Osnabrück erfahren?</p>
          <select
            name="discoveryMethod"
            value={responses.discoveryMethod}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white placeholder-white"
          >
            <option value="">Bitte auswählen</option>
            <option value="Flyer">Über einen Flyer</option>
            <option value="Besucher">Ich war schon mal dabei :)</option>
            <option value="SocialMedia">Über Social Media</option>
            <option value="Freund">Über einen Freund</option>
            <option value="Other">Sonstiges</option>
          </select>
        </div>
      </Carousel>
      <button
        type="button"
        className="block w-full bg-orange-500 text-white py-2 px-4 mt-6 rounded-full hover:bg-orange-600 transition shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
      >
        Formular absenden
      </button>
    </div>
  );
};

export default EventForm;
