// Events.tsx
import { getAuth, signOut } from "firebase/auth"; // Import signOut method
import { collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { db } from "../firebase";

interface Event {
  id: string;
  date: string;
  location: string;
  photo: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]); // State for fetched events
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const navigate = useNavigate(); // Use navigate for redirection
  const auth = getAuth(); // Initialize Firebase Auth

  const handleLogout = async () => {
    try {
      await signOut(auth); // Call Firebase's signOut method
      console.log("Benutzer wurde abgemeldet");
      navigate("/"); // Redirect to home or login page after logout
    } catch (error) {
      console.error("Fehler beim Abmelden:", error);
    }
  };

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const eventSnapshot = await getDocs(eventsCollection);
        const eventsList = eventSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Event[];
        setEvents(eventsList);
        setLoading(false);
      } catch (error) {
        console.error("Fehler beim Abrufen der Events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Lade Events...</div>;
  }

  console.log(events);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl color-[#e0bc4d] font-bold">Veranstaltungen</h1>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 text-white py-2 px-4 rounded hover:scale-105 transition"
        >
          Abmelden
        </button>
      </div>
      {events.length === 0 ? (
        <div className="text-center">Keine Events verfügbar</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={event.photo}
                alt={event.location}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-white">
                  {event.location}
                </h2>
                <p className="text-white">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
