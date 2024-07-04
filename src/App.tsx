import './app.css'
import { Board } from './components/Board'
import { createSignal } from 'solid-js'
import { range, sample, random } from 'lodash-es'
import { random as fischer } from 'fischer960'
import { Army, Color, PieceType, Players } from './types'
import Button from './components/Button'

export default function App() {
  const [squares, setSquares] = createSignal<Array<[PieceType, Color]>>(
    randomizeBoard()
  )
  const [players, setPlayers] = createSignal<Players>(randomizePlayers())

  function generate() {
    setSquares(randomizeBoard())
    setPlayers(randomizePlayers())
  }

  return (
    <div class="mx-auto mt-2" style={{ height: '80vmin', width: '80vmin' }}>
      <Board squares={squares()} />

      <div>
        <p>
          Player 1: {players().one.color}: {players().one.army}
        </p>
        <p>
          Player 2: {players().two.color}: {players().two.army}
        </p>
      </div>
      <Button onclick={generate}>Generate</Button>
    </div>
  )
}

function randomizeBoard(): Array<[PieceType, Color]> {
  const position = fischer().arrangement as Array<PieceType>
  console.log('randomizing board', position.join())
  return range(0, 64).map((i) => {
    if (i < 8) return [position[i], Color.Black]
    if (i >= 8 && i < 16) return [PieceType.Pawn, Color.Black]
    if (i >= 48 && i < 56) return [PieceType.Pawn, Color.White]
    if (i >= 56) return [position[i % 8], Color.White]
    return [PieceType.Empty, Color.White]
  })
}

function randomizePlayers(): Players {
  const isOneWhite = random(0, 1) === 1
  return {
    one: {
      color: isOneWhite ? Color.White : Color.Black,
      army: randomArmy(),
    },
    two: {
      color: isOneWhite ? Color.Black : Color.White,
      army: randomArmy(),
    },
  }
}

const armies = Object.values(Army)
function randomArmy(): Army {
  return sample(armies) as Army
}
