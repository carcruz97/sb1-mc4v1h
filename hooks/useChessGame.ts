import { useState, useCallback } from 'react'
import { ChessBoard, ChessPiece } from '../types/chess'

const INITIAL_BOARD: ChessBoard = [
  [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' },
  ],
  Array(8).fill({ type: 'pawn', color: 'black' }),
  ...Array(4).fill(Array(8).fill(null)),
  Array(8).fill({ type: 'pawn', color: 'white' }),
  [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' },
  ],
]

export const useChessGame = () => {
  const [board, setBoard] = useState<ChessBoard>(INITIAL_BOARD)
  const [selectedPiece, setSelectedPiece] = useState<[number, number] | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<ChessPiece['color']>('white')
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const [currentMove, setCurrentMove] = useState(0)
  const [scores, setScores] = useState({ white: 0, black: 0 })

  const selectPiece = useCallback((row: number, col: number) => {
    const piece = board[row][col]
    if (piece && piece.color === currentPlayer) {
      setSelectedPiece([row, col])
    } else if (selectedPiece) {
      movePiece(selectedPiece, [row, col])
    }
  }, [board, currentPlayer, selectedPiece])

  const movePiece= useCallback((from: [number, number], to: [number, number]) => {
    const [fromRow, fromCol] = from
    const [toRow, toCol] = to
    const piece = board[fromRow][fromCol]
    const targetPiece = board[toRow][toCol]

    if (piece && isValidMove(from, to)) {
      const newBoard = board.map(row => [...row])
      newBoard[toRow][toCol] = piece
      newBoard[fromRow][fromCol] = null

      setBoard(newBoard)
      setSelectedPiece(null)
      setCurrentPlayer(prev => prev === 'white' ? 'black' : 'white')

      const move = `${String.fromCharCode(97 + fromCol)}${8 - fromRow} to ${String.fromCharCode(97 + toCol)}${8 - toRow}`
      setMoveHistory(prev => [...prev.slice(0, currentMove), move])
      setCurrentMove(prev => prev + 1)

      // Update scores if a piece was captured
      if (targetPiece) {
        setScores(prev => ({
          ...prev,
          [piece.color]: prev[piece.color] + getPieceValue(targetPiece.type)
        }))
      }
    }
  }, [board, currentMove])

  const isValidMove = useCallback((from: [number, number], to: [number, number]): boolean => {
    const [fromRow, fromCol] = from
    const [toRow, toCol] = to
    const piece = board[fromRow][fromCol]

    if (!piece || board[toRow][toCol]?.color === piece.color) return false

    const rowDiff = Math.abs(fromRow - toRow)
    const colDiff = Math.abs(fromCol - toCol)

    switch (piece.type) {
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1
        const startRow = piece.color === 'white' ? 6 : 1

        // Normal move
        if (fromCol === toCol && !board[toRow][toCol]) {
          if (toRow === fromRow + direction) return true
          if (fromRow === startRow && toRow === fromRow + 2 * direction && !board[fromRow + direction][fromCol]) return true
        }

        // Capture move (diagonal)
        if (colDiff === 1 && toRow === fromRow + direction && board[toRow][toCol]) return true

        return false
      case 'rook':
        return fromRow === toRow || fromCol === toCol
      case 'knight':
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)
      case 'bishop':
        return rowDiff === colDiff
      case 'queen':
        return fromRow === toRow || fromCol === toCol || rowDiff === colDiff
      case 'king':
        return rowDiff <= 1 && colDiff <= 1
      default:
        return false
    }
  }, [board])

  const getPieceValue = (pieceType: ChessPiece['type']): number => {
    const values: Record<ChessPiece['type'], number> = {
      pawn: 1,
      knight: 3,
      bishop: 3,
      rook: 5,
      queen: 9,
      king: 0
    }
    return values[pieceType]
  }

  const goToMove = useCallback((moveIndex: number) => {
    if (moveIndex >= 0 && moveIndex <= moveHistory.length) {
      setCurrentMove(moveIndex)
      const newBoard = JSON.parse(JSON.stringify(INITIAL_BOARD))
      const newScores = { white: 0, black: 0 }
      for (let i = 0; i < moveIndex; i++) {
        const [from, to] = moveHistory[i].split(' to ')
        const [fromCol, fromRow] = from.split('')
        const [toCol, toRow] = to.split('')
        const piece = newBoard[8 - parseInt(fromRow)][fromCol.charCodeAt(0) - 97]
        const targetPiece = newBoard[8 - parseInt(toRow)][toCol.charCodeAt(0) - 97]
        if (targetPiece) {
          newScores[piece.color] += getPieceValue(targetPiece.type)
        }
        newBoard[8 - parseInt(toRow)][toCol.charCodeAt(0) - 97] = piece
        newBoard[8 - parseInt(fromRow)][fromCol.charCodeAt(0) - 97] = null
      }
      setBoard(newBoard)
      setScores(newScores)
      setCurrentPlayer(moveIndex % 2 === 0 ? 'white' : 'black')
    }
  }, [moveHistory])

  const resetGame = useCallback(() => {
    setBoard(INITIAL_BOARD)
    setSelectedPiece(null)
    setCurrentPlayer('white')
    setMoveHistory([])
    setCurrentMove(0)
    setScores({ white: 0, black: 0 })
  }, [])

  return {
    board,
    selectedPiece,
    currentPlayer,
    moveHistory,
    currentMove,
    scores,
    selectPiece,
    goToMove,
    resetGame
  }
}