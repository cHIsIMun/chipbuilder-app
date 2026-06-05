# chipbuilder-app

🇺🇸 English | 🇧🇷 [Português](README.md)

> A visual digital logic circuit simulator: build, simulate, and compose chips from basic gates, with an automatic truth table.

## Overview

**ChipBuilder** is an interactive web simulator for **digital logic circuits**. On a drag-and-drop canvas, you wire inputs, outputs, and logic gates, and the circuit is **evaluated in real time**. Circuits can be saved as **reusable chips** and composed hierarchically into larger circuits — the same idea of building complex logic from simple blocks. It's an educational tool for boolean logic and digital electronics.

🔗 Published via GitHub Pages: https://chisimun.github.io/chipbuilder-app

## Features

- **Visual node editor** (ReactFlow) with inputs (A–Z), outputs (S1, S2…), and the primitive NOT gate.
- **Real-time simulation** — recomputes the circuit on input or topology changes; edge color reflects logic value.
- **Cycle detection** (DFS) and **topological sort** (Kahn) — prevents invalid feedback loops.
- **Automatic truth table** for up to 10 inputs (2ⁿ combinations).
- **Gate identification** — compares the circuit's truth table against 19 standard gates (AND, OR, NAND, NOR, XOR, XNOR, and 3–4-input variants).
- **Custom chips** — save a circuit as a named, colored chip and reuse it (composition up to depth 100).
- **Automatic persistence** via `localStorage`.
- **Embedded digital-logic guide** (markdown) and a notification system.

## Stack

React 19 · ReactFlow · Tailwind CSS · lucide-react · react-markdown · Create React App.

## Running

```bash
npm install
npm start          # http://localhost:3000
# build + deploy to GitHub Pages:
npm run build && npm run deploy
```

## Structure

```
src/
├── components/
│   ├── ChipBuilder.jsx     # root component: simulation, state, connections, truth table
│   ├── SidebarInput.jsx    # draggable inputs
│   ├── SidebarOutput.jsx   # outputs
│   ├── LogicGuide.jsx      # educational guide (markdown)
│   ├── Notification.jsx    # toasts
│   ├── nodes/              # NotNode, CustomChipNode, TextNode
│   └── logic/gates.js      # 19 standard gates (truth tables)
└── styles/theme.js
```

Core functions: `calculateCircuit()` (evaluates topology), `simulateChip()` (recursive, for composed chips), `hasCycle()` (DFS).

## Project status

Functional and in use (deployed to GitHub Pages). No automated tests.

## License

This project does not yet declare a license. Until one is added, all rights are reserved by the author.
