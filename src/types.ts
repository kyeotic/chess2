export enum PieceType {
  Empty = '',
  King = 'K',
  Queen = 'Q',
  Bishop = 'B',
  Knight = 'N',
  Rook = 'R',
  Pawn = 'P',
}

export enum Color {
  White = 'White',
  Black = 'Black',
}

export enum Army {
  Classic = 'Classic',
  Nemesis = 'Nemesis',
  Empowered = 'Empowered',
  Reaper = 'Reaper',
  TwoKings = 'Two Kings',
  Animals = 'Animals',
}

export interface Player {
  color: Color
  army: Army
}

export type Players = {
  one: Player
  two: Player
}
