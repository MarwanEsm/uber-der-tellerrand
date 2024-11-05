// src/components/EventForm.tsx

import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore"; // Firestore functions
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

const EventForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    allergyInfo: "",
    instrument: "",
    leadRecipe: "",
    discoveryMethod: ""
  });
  const [submitMessage, setSubmitMessage] = useState<string | null>(null); // Message for submission status
  const navigate = useNavigate();

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
        // Update firstLogin flag to false in Firestore
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, { firstLogin: false });

        // Optional: Store additional form data (e.g., name, allergyInfo)
        await updateDoc(userDocRef, {
          name: formData.name,
          email: formData.email,
          allergyInfo: formData.allergyInfo,
          instrument: formData.instrument,
          leadRecipe: formData.leadRecipe,
          discoveryMethod: formData.discoveryMethod
        });

        setSubmitMessage("Anmeldeformular erfolgreich abgeschickt!"); // Show success message
        setTimeout(() => navigate("/events"), 3000); // Redirect to /events after 3 seconds
      }
    } catch (error) {
      console.error("Error updating document:", error);
      setSubmitMessage(
        "Fehler beim Absenden des Formulars. Bitte versuchen Sie es erneut."
      );
    }
  };

  return (
    <div className="ml-[10px] mr-[10px] max-w-lg p-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 rounded-lg shadow-lg text-white">
      <h2 className="text-center text-2xl mb-6">Anmeldeformular</h2>
      {submitMessage && (
        <div className="mb-4 text-center text-sm p-2 bg-green-500 rounded">
          {submitMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white focus:outline-none placeholder-white"
            placeholder="Dein Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">E-Mail *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white focus:outline-none placeholder-white"
            placeholder="Deine E-Mail-Adresse"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Hast Du eine Allergie gegen Lebensmittel?
          </label>
          <input
            type="text"
            name="allergyInfo"
            value={formData.allergyInfo}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white focus:outline-none placeholder-white"
            placeholder="Schreibe hier deine Allergie"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Welches Instrument bringst Du mit?
          </label>
          <input
            type="text"
            name="instrument"
            value={formData.instrument}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white focus:outline-none placeholder-white"
            placeholder="Instrument"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Möchtest Du ein Rezept einbringen und eine Kochstation leiten?
          </label>
          <input
            type="text"
            name="leadRecipe"
            value={formData.leadRecipe}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white focus:outline-none placeholder-white"
            placeholder="Ja oder Nein"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Wie hast Du von uns erfahren?</label>
          <select
            name="discoveryMethod"
            value={formData.discoveryMethod}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-transparent border-b border-gray-300 text-white focus:outline-none placeholder-white"
          >
            <option value="">Bitte auswählen</option>
            <option value="Flyer">Über einen Flyer</option>
            <option value="Besucher">Ich war schon mal dabei :)</option>
            <option value="SocialMedia">Über Social Media</option>
            <option value="Freund">Über einen Freund</option>
            <option value="Other">Sonstiges</option>
          </select>
        </div>
        <button
          type="submit"
          className="block w-full bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-orange-600 transition shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          Formular absenden
        </button>
      </form>
    </div>
  );
};

export default EventForm;
