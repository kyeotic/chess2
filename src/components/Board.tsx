import { For, Index, onMount } from 'solid-js'
import './board.css'
import Piece from './Piece'
import { Color, PieceType } from '../types'

export function Board(props: { squares: Array<[PieceType, Color]> }) {
  return (
    <div class="board">
      <For each={props.squares}>
        {(square, i) => {
          const [piece, color] = square
          return (
            <div class="board-square">
              <Piece piece={piece} color={color} />{' '}
            </div>
          )
        }}
      </For>
    </div>
  )
}
