import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfiguration";
import matches from "./matches";

const populateBrackets = async () => {
  try {
    const bracketsRef = collection(db, "brackets");

    for (const match of matches) {
      const docRef = doc(bracketsRef, match.id);

      await setDoc(docRef, {
        id: match.id,
        team1: "",
        team2: "",
        winner: null,
        next_match_id: match.next_match_id,
        loser_bracket_id: match.loser_bracket_id,
        round: match.round,
      });

      console.log(`Document ${match.id} successfully created`);
    }

    console.log("All match documents populated successfully!");
  } catch (error) {
    console.error("Error populating match documents:", error);
  }
};

export default populateBrackets;
