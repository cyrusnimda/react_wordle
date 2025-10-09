import { useState, useEffect, use } from "react";


function WordleAttemptLine(
    { attempt, currentAttempt, expectedWord, setWinner, setCurrentAttempt, maxAttempts, setGameOver }:
        { attempt: number; currentAttempt: number; expectedWord: string; setWinner: (winner: boolean) => void; setCurrentAttempt: (attempt: number) => void; maxAttempts: number; setGameOver: (gameOver: boolean) => void }
) {
    const isCurrentAttempt = currentAttempt === attempt;
    const [currentWord, setCurrentWord] = useState("");
    const [validationWord, setValidationWord] = useState<[string, string, string, string, string]>(['W', 'W', 'W', 'W', 'W']);
    const [validated, setValidated] = useState(false);
    const [lineCompleted, setLineCompleted] = useState(false);


    // Function to validate the current word against the expected word
    useEffect(() => {
        if (lineCompleted) {
            // 'W' -> wrong letter
            // 'C' -> correct letter, wrong position
            // 'P' -> correct letter, correct position
            const newValidationWord = currentWord.split('').map((char, index) => {
                if (char.toLowerCase() === expectedWord[index].toLowerCase()) {
                    return 'P'; // correct letter, correct position
                } else if (expectedWord.toLowerCase().includes(char.toLowerCase())) {
                    return 'C'; // correct letter, wrong position
                } else {
                    return 'W'; // wrong letter
                }
            });
            setValidated(true);
            setValidationWord(newValidationWord as [string, string, string, string, string]);
        }
    }, [lineCompleted]);

    // useEffect to check for win/lose when validated changes
    useEffect(() => {
        if (validated) {
            if (currentWord.toLowerCase() === expectedWord?.toLowerCase()) {
                setWinner(true);
            } else {
                if (attempt === maxAttempts - 1) {
                    setGameOver(true);
                    return;
                }
                // There is no win or lose, just move to the next attempt
                setCurrentAttempt(currentAttempt + 1);
            }
        }
    }, [validated]);

    // useEffect para validar cuando currentWord llegue a 5 letras
    useEffect(() => {
        if (currentWord.length === 5 && isCurrentAttempt) {
            setLineCompleted(true);
        }
    }, [currentWord, isCurrentAttempt]);


    // reset state when expectedWord changes (new game)
    useEffect(() => {
        setCurrentWord("");
        setValidationWord(['W', 'W', 'W', 'W', 'W']);
        setValidated(false);
        setLineCompleted(false);
    }, [expectedWord]);


    // Handle keyup events
    useEffect(() => {
        const handleKeyup = (e: KeyboardEvent) => {
            e.preventDefault();
            if (isCurrentAttempt
                && e.key.length === 1
                && e.key.match(/[a-z]/i)
                && currentWord.length < 5) {
                const char = e.key.toUpperCase();
                const newWord = currentWord + char;
                setCurrentWord(newWord);
            } else if (isCurrentAttempt && e.key === "Backspace") {
                const newWord = currentWord.slice(0, -1);
                setCurrentWord(newWord);
            }
        };

        document.addEventListener('keyup', handleKeyup);

        return () => {
            document.removeEventListener('keyup', handleKeyup);
        };
    }, [isCurrentAttempt, currentWord]);


    return <div key={attempt} className="mb-2">
        {
            Array.from({ length: 5 }).map((_, letterIndex) => {
                let bgColor = !isCurrentAttempt ? 'bg-gray-200' : 'bg-white';
                if (validated) {
                    if (validationWord[letterIndex] === 'P') {
                        bgColor = 'bg-green-500 text-white';
                    } else if (validationWord[letterIndex] === 'C') {
                        bgColor = 'bg-yellow-500 text-white';
                    } else {
                        bgColor = 'bg-gray-500 text-white';
                    }
                }
                return (

                    <input
                        disabled
                        maxLength={1}
                        key={letterIndex}
                        readOnly
                        className={`inline-block w-12 h-12 rounded border-2 border-gray-300 mx-1 text-center leading-12 align-middle text-3xl font-bold ${bgColor}`}
                        value={currentWord[letterIndex] || ""}
                    />

                );
            })
        }
    </div>

}

export default WordleAttemptLine