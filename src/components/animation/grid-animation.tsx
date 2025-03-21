"use client"

import { useEffect, useRef } from "react"

interface GridCell {
  x: number
  y: number
  opacity: number
  targetOpacity: number
  size: number
  color: string
  delay: number
  animating: boolean
}

export function GridAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Grid configuration
    const cellSize = 20
    const gap = 2
    const totalSize = cellSize + gap

    // Calculate grid dimensions
    const columns = Math.ceil(canvas.offsetWidth / totalSize) + 1
    const rows = Math.ceil(canvas.offsetHeight / totalSize) + 1

    // Create grid cells
    const cells: GridCell[] = []

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        // Calculate initial opacity based on position
        // More cells appear on the right side
        const distanceFromRight = columns - x
        const baseOpacity = Math.max(0, 1 - distanceFromRight / (columns * 0.8))

        // Add some randomness
        const randomFactor = Math.random() * 0.3
        let initialOpacity = Math.max(0, Math.min(1, baseOpacity + randomFactor - 0.15))

        // Some cells should be completely invisible
        if (Math.random() < 0.3 && initialOpacity < 0.5) {
          initialOpacity = 0
        }

        cells.push({
          x: x * totalSize,
          y: y * totalSize,
          opacity: initialOpacity,
          targetOpacity: initialOpacity,
          size: cellSize,
          color: `rgba(72, 187, 120, ${initialOpacity})`, // Green color
          delay: Math.random() * 5000, // Random delay for animation
          animating: false,
        })
      }
    }

    // Animation loop
    let lastTime = 0
    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time

      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Update and draw cells
      cells.forEach((cell) => {
        // Start animation after delay
        if (!cell.animating && time > cell.delay) {
          cell.animating = true

          // Set new target opacity
          const currentOpacity = cell.opacity
          if (Math.random() < 0.5) {
            // Fade in
            cell.targetOpacity = Math.min(1, currentOpacity + Math.random() * 0.5)
          } else {
            // Fade out
            cell.targetOpacity = Math.max(0, currentOpacity - Math.random() * 0.5)
          }

          // Reset delay for next animation
          cell.delay = time + 1000 + Math.random() * 4000
        }

        // Animate opacity
        if (cell.animating) {
          const opacityDiff = cell.targetOpacity - cell.opacity
          if (Math.abs(opacityDiff) < 0.01) {
            cell.opacity = cell.targetOpacity
            cell.animating = false
          } else {
            cell.opacity += opacityDiff * 0.05
          }

          // Update color with new opacity
          cell.color = `rgba(72, 187, 120, ${cell.opacity})`
        }

        // Draw cell
        ctx.fillStyle = cell.color
        ctx.fillRect(cell.x, cell.y, cell.size, cell.size)
      })

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "linear-gradient(to right, #0a192f, #0f2942)" }}
    />
  )
}

