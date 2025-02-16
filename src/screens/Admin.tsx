// AdminEventsPage.tsx
import React from "react"
import { getAuth, signOut } from "firebase/auth";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";

interface IEvent {
  date: string;
  location: string;
  photo: string | File;
}

const AdminEventsPage: React.FC = () => {
  const [event, setEvent] = useState<IEvent>({
    date: "",
    location: "",
    photo: ""
  });

  const [message, setMessage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();
  const storage = getStorage();
  const db = getFirestore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Store the file in state without uploading yet
    setEvent((prev) => ({ ...prev, photo: file }));
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Fehler beim Abmelden:", error);
      setMessage("Fehler beim Abmelden.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      let photoURL = "";

      if (event.photo && event.photo instanceof File) {
        const storageRef = ref(storage, `events/${event.photo.name}`);
        const uploadTask = uploadBytesResumable(storageRef, event.photo);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(progress);
            },
            (error) => {
              console.error("Error uploading file:", error);
              setMessage("Fehler beim Hochladen des Fotos.");
              reject(error);
            },
            async () => {
              photoURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      // Add the event to Firestore
      const eventsRef = collection(db, "events");
      await addDoc(eventsRef, {
        date: event.date,
        location: event.location,
        photo: photoURL
      });

      setMessage("Event erfolgreich hinzugefügt!");
      setEvent({ date: "", location: "", photo: "" });
      setUploadProgress(null);
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Events:", error);
      setMessage("Fehler beim Hinzufügen des Events. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <div className="max-w-2xl mx-2 mt-12 p-6 bg-gradient-to-r from-purple-300 via-purple-400 to-purple-600 rounded-lg shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Event hinzufügen</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring"
        >
          Abmelden
        </button>
      </div>

      {message && (
        <div
          className="p-4 mb-4 text-white rounded"
          style={{
            backgroundColor: message.includes("Fehler") ? "#ff4d4f" : "#52c41a"
          }}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white font-bold mb-2">Datum:</label>
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white font-bold mb-2">Ort:</label>
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
            placeholder="Ort eingeben"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white font-bold mb-2">Foto:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring"
          />
          {uploadProgress !== null && (
            <p className="text-sm text-white mt-2">
              Hochladen: {uploadProgress.toFixed(0)}%
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring"
        >
          Event hinzufügen
        </button>
      </form>
    </div>
  );
};

export default AdminEventsPage;
