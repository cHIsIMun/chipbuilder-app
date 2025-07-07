export const GATES_DATABASE = [
    {
      name: 'Buffer',
      inputs: 1,
      outputs: 1,
      truthTable: [0, 1],
      symbol: `<svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none"><path d="M20 10 L20 30 L50 20 Z"/><line x1="0" y1="20" x2="20" y2="20"/><line x1="50" y1="20" x2="70" y2="20"/></svg>`
    },
    {
      name: 'NOT',
      inputs: 1,
      outputs: 1,
      truthTable: [1, 0],
      symbol: `<svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none"><path d="M20 10 L20 30 L50 20 Z"/><circle cx="55" cy="20" r="5"/><line x1="0" y1="20" x2="20" y2="20"/><line x1="60" y1="20" x2="80" y2="20"/></svg>`
    },
    {
      name: 'AND',
      inputs: 2,
      outputs: 1,
      truthTable: [0, 0, 0, 1],
      symbol: `<svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none"><path d="M20 10 H40 C60 10 60 30 40 30 H20 Z"/><line x1="0" y1="15" x2="20" y2="15"/><line x1="0" y1="25" x2="20" y2="25"/><line x1="60" y1="20" x2="80" y2="20"/></svg>`
    },
    {
      name: 'OR',
      inputs: 2,
      outputs: 1,
      truthTable: [0, 1, 1, 1],
      symbol: `<svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none"><path d="M10 10 Q30 20 10 30 C30 30 50 30 60 20 C50 10 30 10 10 10"/><line x1="0" y1="15" x2="15" y2="15"/><line x1="0" y1="25" x2="15" y2="25"/><line x1="60" y1="20" x2="80" y2="20"/></svg>`
    },
    {
      name: 'NAND',
      inputs: 2,
      outputs: 1,
      truthTable: [1, 1, 1, 0],
      symbol: `<svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none"><path d="M20 10 H40 C60 10 60 30 40 30 H20 Z"/><circle cx="65" cy="20" r="5"/><line x1="0" y1="15" x2="20" y2="15"/><line x1="0" y1="25" x2="20" y2="25"/><line x1="70" y1="20" x2="80" y2="20"/></svg>`
    },
    {
      name: 'NOR',
      inputs: 2,
      outputs: 1,
      truthTable: [1, 0, 0, 0],
      symbol: `<svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none"><path d="M10 10 Q30 20 10 30 C30 30 50 30 60 20 C50 10 30 10 10 10"/><circle cx="65" cy="20" r="5"/><line x1="0" y1="15" x2="15" y2="15"/><line x1="0" y1="25" x2="15" y2="25"/><line x1="70" y1="20" x2="80" y2="20"/></svg>`
    },
    {
      name: 'XOR',
      inputs: 2,
      outputs: 1,
      truthTable: [0, 1, 1, 0],
      symbol: `<svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none"><path d="M5 10 Q25 20 5 30"/><path d="M10 10 Q30 20 10 30 C30 30 50 30 60 20 C50 10 30 10 10 10"/><line x1="0" y1="15" x2="10" y2="15"/><line x1="0" y1="25" x2="10" y2="25"/><line x1="60" y1="20" x2="80" y2="20"/></svg>`
    },
    {
      name: 'XNOR',
      inputs: 2,
      outputs: 1,
      truthTable: [1, 0, 0, 1],
      symbol: `<svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none"><path d="M5 10 Q25 20 5 30"/><path d="M10 10 Q30 20 10 30 C30 30 50 30 60 20 C50 10 30 10 10 10"/><circle cx="65" cy="20" r="5"/><line x1="0" y1="15" x2="10" y2="15"/><line x1="0" y1="25" x2="10" y2="25"/><line x1="70" y1="20" x2="80" y2="20"/></svg>`
    },
    // --- 3-Input Gates ---
    {
      name: 'AND (3-input)',
      inputs: 3,
      outputs: 1,
      truthTable: [0, 0, 0, 0, 0, 0, 0, 1],
      symbol: `<svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none"><path d="M20 5 H40 C60 5 60 35 40 35 H20 Z"/><line x1="0" y1="10" x2="20" y2="10"/><line x1="0" y1="20" x2="20" y2="20"/><line x1="0" y1="30" x2="20" y2="30"/><line x1="60" y1="20" x2="80" y2="20"/></svg>`
    },
    {
      name: 'OR (3-input)',
      inputs: 3,
      outputs: 1,
      truthTable: [0, 1, 1, 1, 1, 1, 1, 1],
      symbol: `<svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none"><path d="M10 5 Q30 20 10 35 C30 35 50 35 60 20 C50 5 30 5 10 5"/><line x1="0" y1="10" x2="15" y2="10"/><line x1="0" y1="20" x2="15" y2="20"/><line x1="0" y1="30" x2="15" y2="30"/><line x1="60" y1="20" x2="80" y2="20"/></svg>`
    },
    {
      name: 'NAND (3-input)',
      inputs: 3,
      outputs: 1,
      truthTable: [1, 1, 1, 1, 1, 1, 1, 0],
      symbol: `<svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none"><path d="M20 5 H40 C60 5 60 35 40 35 H20 Z"/><circle cx="65" cy="20" r="5"/><line x1="0" y1="10" x2="20" y2="10"/><line x1="0" y1="20" x2="20" y2="20"/><line x1="0" y1="30" x2="20" y2="30"/><line x1="70" y1="20" x2="80" y2="20"/></svg>`
    },
    {
      name: 'NOR (3-input)',
      inputs: 3,
      outputs: 1,
      truthTable: [1, 0, 0, 0, 0, 0, 0, 0],
      symbol: `<svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none"><path d="M10 5 Q30 20 10 35 C30 35 50 35 60 20 C50 5 30 5 10 5"/><circle cx="65" cy="20" r="5"/><line x1="0" y1="10" x2="15" y2="10"/><line x1="0" y1="20" x2="15" y2="20"/><line x1="0" y1="30" x2="15" y2="30"/><line x1="70" y1="20" x2="80" y2="20"/></svg>`
    },
    {
      name: 'XOR (3-input)',
      inputs: 3,
      outputs: 1,
      truthTable: [0, 1, 1, 0, 1, 0, 0, 1],
      symbol: `<svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none"><path d="M5 5 Q25 20 5 35"/><path d="M10 5 Q30 20 10 35 C30 35 50 35 60 20 C50 5 30 5 10 5"/><line x1="0" y1="10" x2="10" y2="10"/><line x1="0" y1="20" x2="10" y2="20"/><line x1="0" y1="30" x2="10" y2="30"/><line x1="60" y1="20" x2="80" y2="20"/></svg>`
    },
    // --- 4-Input Gates ---
    {
      name: 'AND (4-input)',
      inputs: 4,
      outputs: 1,
      truthTable: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      symbol: `<svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none"><path d="M20 2 H40 C60 2 60 38 40 38 H20 Z"/><line x1="0" y1="8" x2="20" y2="8"/><line x1="0" y1="15" x2="20" y2="15"/><line x1="0" y1="25" x2="20" y2="25"/><line x1="0" y1="32" x2="20" y2="32"/><line x1="60" y1="20" x2="80" y2="20"/></svg>`
    },
    {
      name: 'OR (4-input)',
      inputs: 4,
      outputs: 1,
      truthTable: [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      symbol: `<svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none"><path d="M10 2 Q30 20 10 38 C30 38 50 38 60 20 C50 2 30 2 10 2"/><line x1="0" y1="8" x2="15" y2="8"/><line x1="0" y1="15" x2="15" y2="15"/><line x1="0" y1="25" x2="15" y2="25"/><line x1="0" y1="32" x2="15" y2="32"/><line x1="60" y1="20" x2="80" y2="20"/></svg>`
    }
  ];