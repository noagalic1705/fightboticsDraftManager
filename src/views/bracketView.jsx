import React from "react";
import { Bracket } from "react-brackets";

const DoubleEliminationBracket = () => {
    const winnersBracketRounds = [
        [
            {
                id: "1",
                teams: [{ name: "Team 1" }, { name: "Team 12" }],
            },
            {
                id: "2",
                teams: [{ name: "Team 8" }, { name: "Team 9" }],
            },
            {
                id: "3",
                teams: [{ name: "Team 5" }, { name: "Team 4" }],
            },
            {
                id: "4",
                teams: [{ name: "Team 6" }, { name: "Team 3" }],
            },
        ],
        [
            {
                id: "5",
                teams: [{ name: "Team 1" }, { name: "Team 12" }],
            },
            {
                id: "6",
                teams: [{ name: "Team 8" }, { name: "Team 9" }],
            },
            {
                id: "7",
                teams: [{ name: "Team 5" }, { name: "Team 4" }],
            },
            {
                id: "8",
                teams: [{ name: "Team 6" }, { name: "Team 3" }],
            },
        ],
        [
            {
                id: "9",
                teams: [null, null],
            },
            {
                id: "10",
                teams: [null, null],
            },
        ],
        [
            {
                id: "11",
                teams: [null, null],
            },
        ],
        [
            {
                id: "12",
                teams: [null, null],
            },
        ],
    ];

    const losersBracketRounds = [
        [
            {
                id: "13",
                teams: [null, null],
            },
            {
                id: "14",
                teams: [null, null],
            },
        ],
        [
            {
                id: "15",
                teams: [null, null],
            },
            {
                id: "16",
                teams: [null, null],
            },
        ],
        [
            {
                id: "17",
                teams: [null, null],
            },
        ],
        [
            {
                id: "18",
                teams: [null, null],
            },
        ],
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
            <div>
                <h2 className="text-center text-xl font-bold mb-4">Winner's Bracket</h2>
                <Bracket
                    rounds={winnersBracketRounds.map((round, roundIndex) => ({
                        title: `Round ${roundIndex + 1}`,
                        seeds: round,
                    }))}
                />
            </div>

            <div>
                <h2 className="text-center text-xl font-bold mb-4">Loser's Bracket</h2>
                <Bracket
                    rounds={losersBracketRounds.map((round, roundIndex) => ({
                        title: `Loser's Round ${roundIndex + 1}`,
                        seeds: round,
                    }))}
                />
            </div>
        </div>
    );
};

export default DoubleEliminationBracket;
