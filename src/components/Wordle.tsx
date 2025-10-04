import { useEffect, useRef, useState } from 'react'
import WordleAttemptLine from './WordleAttemptLine';
import { Fireworks } from '@fireworks-js/react';


function Wordle({ attempts }: { attempts: number }) {
    const [expectedWord, setExpectedWord] = useState<string>();
    const [currentAttempt, setCurrentAttempt] = useState(0);
    const fireworksRef = useRef(null);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const arrayOfWords = ['apple', 'grape', 'mango', 'peach', 'berry', 'lemon', 'melon', 'cherry', 'plum', 'guava'];
        const chooseRandomWord = () => {
            // Randomly select a word from the array and set it as the expected word
            setExpectedWord(arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)]);
        };

        chooseRandomWord();
    }, []);


    const winner = () => {
        if (fireworksRef.current) {
            console.log('Starting fireworks');
            fireworksRef.current.start();
        }
    }



    return (
        <div className="text-center text-2xl font-bold">
            <Fireworks className='absolute top-0 left-0 z-[-1] w-full h-full' ref={fireworksRef} autostart={false} />
            <div className="mb-4">Wordle Game</div>
            {Array.from({ length: attempts }).map((_, index) => (
                <WordleAttemptLine 
                key={index} 
                attempt={index} 
                currentAttempt={currentAttempt} 
                winner={winner} 
                expectedWord={expectedWord || ''}
                setCurrentAttempt={setCurrentAttempt}
                maxAttempts={attempts}
                setGameOver={setGameOver}
                />
            ))}
            <div className={`${gameOver ? '' : 'hidden'} mt-6`}>
                <p>You lost! The correct word was: {expectedWord}</p>
                <button className={`rounded-xl border-2 border-gray-300 m-4 p-2 text-center align-middle bg-black text-white`} onClick={() => {window.location.reload()}}>Try again</button>
            </div>

        </div>
    )
}

export default Wordle