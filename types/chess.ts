export type ChessPieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king'
export type ChessPieceColor = 'white' | 'black'

export interface ChessPiece {
  type: ChessPieceType
  color: ChessPieceColor
}

export type ChessBoard = (ChessPiece | null)[][]