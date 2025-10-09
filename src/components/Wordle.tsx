import { useEffect, useRef, useState } from 'react'
import WordleAttemptLine from './WordleAttemptLine';
import { Fireworks } from '@fireworks-js/react';


function Wordle({ attempts }: { attempts: number }) {
    const fireworksRef = useRef<any>(null);
    const [expectedWord, setExpectedWord] = useState<string>();
    const [currentAttempt, setCurrentAttempt] = useState<number>(0);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(false);

    const getRandomWord = () => {
        const arrayOfWords = ['apple', 'grape', 'mango', 'peach', 'berry', 'lemon', 'melon', 'guava'];
        return arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];
    }
    
    const resetGame = () => {
        setGameOver(false);
        setWinner(false);
        setExpectedWord(getRandomWord());
        setCurrentAttempt(0);
    }

    useEffect(() => {
        //TODO: fetch a random word from an API or a larger list
        setExpectedWord(getRandomWord());
    }, []);

    

    return (
        <div className="text-center text-2xl font-bold">
            <div className="mb-4">Wordle Game</div>
            {Array.from({ length: attempts }).map((_, index) => (
                <WordleAttemptLine
                    key={index}
                    expectedWord={expectedWord || ''}
                    maxAttempts={attempts}
                    attempt={index}
                    currentAttempt={currentAttempt}
                    setCurrentAttempt={setCurrentAttempt}
                    setWinner={setWinner}
                    setGameOver={setGameOver}
                />
            ))}

            {winner &&
                <>
                    <Fireworks className='absolute top-0 left-0 z-[-1] w-full h-full' ref={fireworksRef} />
                    <div> We have a winner !!!</div>
                </>
            }

            {gameOver &&
                <div className="mt-6">
                    <p>You lost! The correct word was: {expectedWord}</p>
                </div>
            }

            {(gameOver || winner) &&
                <div className="mt-1">
                    <button className={`rounded-xl border-2 border-gray-300 m-4 p-2 text-center align-middle bg-black text-white cursor-pointer`} onClick={() => resetGame()}>Try again</button>
                </div>
            }

        </div>
    )
}

export default Wordle