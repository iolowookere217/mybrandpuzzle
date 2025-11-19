"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SlidePuzzleProps {
  imageUrl: string;
  onSolve: () => void;
  disabled?: boolean;
}

interface Tile {
  id: number;
  currentPos: number;
}

export function SlidePuzzle({
  imageUrl,
  onSolve,
  disabled = false,
}: SlidePuzzleProps) {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [emptyPos, setEmptyPos] = useState(8);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  function getNeighbors(pos: number): number[] {
    const neighbors: number[] = [];
    const row = Math.floor(pos / 3);
    const col = pos % 3;

    if (row > 0) neighbors.push(pos - 3);
    if (row < 2) neighbors.push(pos + 3);
    if (col > 0) neighbors.push(pos - 1);
    if (col < 2) neighbors.push(pos + 1);

    return neighbors;
  }

  const shuffleTiles = useCallback(
    (tiles: Tile[]): { tiles: Tile[]; emptyPosition: number } => {
      const shuffledTiles = [...tiles];
      let emptyPosition = 8;

      const shuffleMoves = 150;
      for (let i = 0; i < shuffleMoves; i++) {
        const neighbors = getNeighbors(emptyPosition);
        const randomNeighbor =
          neighbors[Math.floor(Math.random() * neighbors.length)];

        const tileIndex = shuffledTiles.findIndex(
          (t) => t.currentPos === randomNeighbor
        );
        if (tileIndex !== -1) {
          shuffledTiles[tileIndex].currentPos = emptyPosition;
          emptyPosition = randomNeighbor;
        }
      }

      return { tiles: shuffledTiles, emptyPosition };
    },
    []
  );

  const initializePuzzle = useCallback(() => {
    const initialTiles: Tile[] = [];
    for (let i = 0; i < 8; i++) {
      initialTiles.push({ id: i, currentPos: i });
    }

    const { tiles: shuffled, emptyPosition } = shuffleTiles([...initialTiles]);
    setTiles(shuffled);
    setEmptyPos(emptyPosition);
    setMoves(0);
    setStartTime(Date.now());
    setElapsedTime(0);
    setIsSolved(false);
  }, [shuffleTiles]);

  const handleTileClick = (tileIndex: number) => {
    if (isSolved || disabled) return;

    const tile = tiles[tileIndex];
    const neighbors = getNeighbors(emptyPos);

    if (neighbors.includes(tile.currentPos)) {
      const newTiles = [...tiles];
      const oldPos = tile.currentPos;
      newTiles[tileIndex] = { ...tile, currentPos: emptyPos };

      setTiles(newTiles);
      setEmptyPos(oldPos);
      setMoves((prev) => prev + 1);

      const solved = newTiles.every((t) => t.id === t.currentPos);
      if (solved) {
        setIsSolved(true);
        onSolve();
      }
    }
  };

  useEffect(() => {
    if (!startTime || isSolved) return;

    const timer = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime, isSolved]);

  useEffect(() => {
    initializePuzzle();
  }, [initializePuzzle]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins + ":" + String(secs).padStart(2, "0");
  };

  const tileSize = 100 / 3;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-8 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-dark-400">Time:</span>
          <span className="text-primary-500 font-bold font-mono">
            {formatTime(elapsedTime)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-dark-400">Moves:</span>
          <span className="text-secondary-500 font-bold">{moves}</span>
        </div>
      </div>

      <div className="relative">
        <p className="text-xs text-dark-500 mb-2 text-center">
          Reference Image:
        </p>
        <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-primary-500/30 relative">
          <Image
            src={imageUrl}
            alt="Reference"
            className="w-full h-full object-cover"
            width={128}
            height={128}
            onLoadingComplete={() => setImageLoaded(true)}
          />
        </div>
      </div>

      <div
        className="relative bg-dark-900 rounded-xl p-1 shadow-primary-lg"
        style={{ width: "320px", height: "320px" }}>
        {imageLoaded &&
          tiles.map((tile, index) => {
            const row = Math.floor(tile.currentPos / 3);
            const col = tile.currentPos % 3;
            const originalRow = Math.floor(tile.id / 3);
            const originalCol = tile.id % 3;

            return (
              <div
                key={tile.id}
                onClick={() => handleTileClick(index)}
                className={
                  "absolute cursor-pointer transition-all duration-150 ease-out overflow-hidden " +
                  (getNeighbors(emptyPos).includes(tile.currentPos)
                    ? "hover:scale-95 hover:brightness-110"
                    : "cursor-not-allowed") +
                  (isSolved ? " ring-2 ring-success" : "")
                }
                style={{
                  width: tileSize + "%",
                  height: tileSize + "%",
                  left: col * tileSize + "%",
                  top: row * tileSize + "%",
                  backgroundImage: "url(" + imageUrl + ")",
                  backgroundSize: "300%",
                  backgroundPosition:
                    originalCol * 50 + "% " + originalRow * 50 + "%",
                  borderRadius: "4px",
                  border: "1px solid rgba(0, 240, 255, 0.2)",
                }}
              />
            );
          })}

        <div
          className="absolute bg-dark-800 rounded"
          style={{
            width: tileSize + "%",
            height: tileSize + "%",
            left: (emptyPos % 3) * tileSize + "%",
            top: Math.floor(emptyPos / 3) * tileSize + "%",
          }}
        />
      </div>

      {isSolved && (
        <div className="text-center animate-pulse-glow p-4 rounded-lg bg-success/20 border border-success">
          <p className="text-success font-bold text-lg">Puzzle Solved!</p>
          <p className="text-dark-300 text-sm">
            Completed in {formatTime(elapsedTime)} with {moves} moves
          </p>
        </div>
      )}

      <Button onClick={initializePuzzle} variant="outline" size="sm">
        Reset Puzzle
      </Button>
    </div>
  );
}
