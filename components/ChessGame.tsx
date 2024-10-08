'use client'

import React from 'react'
import { X, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import { useChessGame } from '../hooks/useChessGame'
import { ChessPiece } from '../types/chess'

const PIECE_SYMBOLS: Record<ChessPiece['type'], string> = {
  pawn: '♟',
  rook: '♜',
  knight: '♞',
  bishop: '♝',
  queen: '♛',
  king: '♚',
}

const ChessGame = ({ onClose, language }: { onClose: () => void; language: 'en' | 'es' }) => {
  const {
    board,
    selectedPiece,
    currentPlayer,
    moveHistory,
    currentMove,
    scores,
    selectPiece,
    goToMove,
    resetGame
  } = useChessGame()

  return (
    <div className="w-full max-w-4xl mx-auto bg-black bg-opacity-30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-white border-opacity-20 font-mono">
      <div className="terminal-header">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex-grow text-center">
          <span className="text-sm text-white font-medium">
            {language === 'en' ? 'Chess Game' : 'Juego de Ajedrez'}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-red-400 transition-colors"
          aria-label={language === 'en' ? "Close Chess Game" : "Cerrar Juego de Ajedrez"}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="bg-black bg-opacity-30 text-white p-4 text-sm flex">
        <div className="flex-grow mr-4">
          {/* Chess Board */}
          <div className="bg-gray-800 p-3 rounded-lg">
            <div className="w-full max-w-[500px] mx-auto aspect-square">
              <div className="chess-board">
                {board.map((row, rowIndex) =>
                  row.map((piece, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`chess-square ${(rowIndex + colIndex) % 2 === 0 ? 'chess-square-light' : 'chess-square-dark'}
                                  ${selectedPiece && selectedPiece[0] === rowIndex && selectedPiece[1] === colIndex ? 'selected-piece' : ''}`}
                      onClick={() => selectPiece(rowIndex, colIndex)}
                    >
                      {piece && (
                        <span className={`${piece.color === 'white' ? 'chess-piece-white' : 'chess-piece-black'}`}>
                          {PIECE_SYMBOLS[piece.type]}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Game Info */}
        <div className="bg-gray-800 p-3 rounded-lg w-64">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs">{language === 'en' ? 'Current player' : 'Jugador actual'}: {currentPlayer}</span>
            <button 
              onClick={resetGame} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4 inline-block mr-1" />
              {language === 'en' ? 'Reset' : 'Reiniciar'}
            </button>
          </div>
          <div className="flex justify-between items-center mb-2 text-xs">
            <span>{language === 'en' ? 'White score' : 'Puntuación blanca'}: {scores.white}</span>
            <span>{language === 'en' ? 'Black score' : 'Puntuación negra'}: {scores.black}</span>
          </div>
          <div className="mb-2">
            <h3 className="text-xs font-bold mb-1">{language === 'en' ? 'Move History' : 'Historial de Movimientos'}</h3>
            <div className="h-48 overflow-y-auto pr-2">
              <div className="space-y-1">
                {moveHistory.map((move, index) => (
                  <button
                    key={index}
                    className={`w-full text-left px-2 py-1 rounded text-xs ${index === currentMove - 1 ? 
                      'bg-blue-500' : 'bg-gray-700'}`}
                    onClick={() => goToMove(index + 1)}
                  >
                    {index % 2 === 0 ? `${Math.floor(index / 2) + 1}.` : ''} {move}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => goToMove(currentMove - 1)}
              disabled={currentMove === 0}
              className="bg-gray-700 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => goToMove(currentMove + 1)}
              disabled={currentMove === moveHistory.length}
              className="bg-gray-700 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChessGame