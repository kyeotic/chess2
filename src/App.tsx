import './app.css'
import { Board } from './components/Board'
import { createSignal } from 'solid-js'
import { range, sample, random } from 'lodash-es'
import { random as fischer } from 'fischer960'
import { Army, Color, PieceType, Player, Players } from './types'
import { BASE, COLOR_BASE } from './components/Button'

export default function App() {
  const [players, setPlayers] = createSignal<Players>(randomizePlayers())
  const [squares, setSquares] = createSignal<Array<[PieceType, Color]>>(
    randomizeBoard(players())
  )

  function generate() {
    setPlayers(randomizePlayers())
    setSquares(randomizeBoard(players()))
  }

  return (
    <div class="game justify-center">
      <div style={{ transform: 'rotateX(180deg)' }}>
        <PlayerBlock player={players().one} />
      </div>
      <div class="relative">
        <Board squares={squares()} />

        <div class="absolute inset-0 grid place-content-center">
          <button
            onclick={generate}
            class={`${BASE} ${COLOR_BASE} py-2 px-6 font-bold`}
            style={{ 'font-size': '5vmin' }}
          >
            Generate
          </button>
        </div>
      </div>
      <PlayerBlock player={players().two} />
    </div>
  )
}

function PlayerBlock(props: { player: Player }) {
  const title = 'text-lg font-bold pb-2 -mt-1 block'
  return (
    <div class="grid grid-rows-2 place-content-center">
      <div style={{ transform: 'rotateX(180deg)' }}>
        <span class={title}>{props.player.army}</span>
      </div>
      <span class={title}>{props.player.army}</span>
    </div>
  )
}

function randomizeBoard(players: Players): Array<[PieceType, Color]> {
  const position = fischer().arrangement as Array<PieceType>

  const p1Color = players.one.color
  const p2Color = players.two.color

  return range(0, 64).map((i) => {
    if (i < 8) return [position[i], p1Color]
    if (i >= 8 && i < 16) return [PieceType.Pawn, p1Color]
    if (i >= 48 && i < 56) return [PieceType.Pawn, p2Color]
    if (i >= 56) return [position[i % 8], p2Color]
    return [PieceType.Empty, p2Color]
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
