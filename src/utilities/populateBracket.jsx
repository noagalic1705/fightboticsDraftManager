import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfiguration"; 

const populateBrackets = async () => {

  const matches = [
    { id: "L1", next_match_id: "L5", loser_bracket_id: "DQ", round: 1 },
    { id: "L2", next_match_id: "L5", loser_bracket_id: "DQ", round: 1 },
    { id: "L3", next_match_id: "L6", loser_bracket_id: "DQ", round: 1 },
    { id: "L4", next_match_id: "L6", loser_bracket_id: "DQ", round: 1 },
    { id: "L5", next_match_id: "L7", loser_bracket_id: "DQ", round: 2 },
    { id: "L6", next_match_id: "L8", loser_bracket_id: "DQ", round: 2 },
    { id: "L7", next_match_id: "L9", loser_bracket_id: "DQ", round: 3 },
    { id: "L8", next_match_id: "L9", loser_bracket_id: "DQ", round: 3 },
    { id: "L9", next_match_id: "L10", loser_bracket_id: "DQ", round: 4 },
    { id: "L10", next_match_id: "G12", loser_bracket_id: "DQ", round: 5 },
  ];

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