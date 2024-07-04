/// <reference types="@solidjs/start/env" />

declare module 'fischer960' {
  export function random(): { id: number, arrangement: Array<'R' | 'N' | 'B' | 'Q' | 'K'> }}
}