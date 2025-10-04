import Wordle from './components/Wordle'

function App() {
    
  return (
    
    <>
      <header className="text-center my-8 max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          Wordle in React.js <span role="img" aria-label="party">🎉</span>
        </h1>
        <p className="text-lg text-gray-700 my-8">
          Guess the 5-letter word. Each guess must be a valid word. After each guess, the color of the tiles will change to show which letters are in the word and in the correct position.
        </p>
      </header>
      <main className="flex flex-col items-center justify-center">
        <Wordle attempts={6} />
      </main>
    </>
  )
}

export default App
