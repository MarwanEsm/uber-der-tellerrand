// eslint-disable-next-line import/no-extraneous-dependencies
import { getAuth, signOut } from "firebase/auth"; // Import signOut method
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const events = [
  {
    id: 1,
    date: "2024-11-01",
    location: "Berlin, Germany",
    photo: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    date: "2024-11-10",
    location: "Munich, Germany",
    photo: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    date: "2024-11-15",
    location: "Frankfurt, Germany",
    photo: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    date: "2024-11-20",
    location: "Hamburg, Germany",
    photo: "https://via.placeholder.com/150"
  },
  {
    id: 5,
    date: "2024-12-01",
    location: "Cologne, Germany",
    photo: "https://via.placeholder.com/150"
  }
];

const Events: React.FC = () => {
  const navigate = useNavigate(); // Use navigate for redirection
  const auth = getAuth(); // Initialize Firebase Auth

  const handleLogout = async () => {
    try {
      await signOut(auth); // Call Firebase's signOut method
      console.log("User logged out");
      navigate("/"); // Redirect to home or login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome to Events</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
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
    </div>
  );
};

export default Events;
