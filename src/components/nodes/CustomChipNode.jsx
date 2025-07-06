import React from 'react';
import { Handle, Position } from 'reactflow';

export default function CustomChipNode({ data }) {
  const { inputs = 2, outputs = 1, name, color, active } = data;
  
  // Gera entradas do chip
  const inputHandles = Array.from({ length: inputs }, (_, i) => (
    <Handle
      key={`in-${i}`}
      type="target"
      position={Position.Left}
      id={`in-${i}`}
      style={{
        top: `${(i + 1) * (100 / (inputs + 1))}%`,
        background: '#888',
        width: 10,
        height: 10,
        borderRadius: 5,
      }}
    />
  ));
  
  // Gera saídas do chip
  const outputHandles = Array.from({ length: outputs }, (_, i) => (
    <Handle
      key={`out-${i}`}
      type="source"
      position={Position.Right}
      id={`out-${i}`}
      style={{
        top: `${(i + 1) * (100 / (outputs + 1))}%`,
        background: active ? '#4CAF50' : '#888',
        width: 10,
        height: 10,
        borderRadius: 5,
      }}
    />
  ));
  
  return (
    <div
      style={{
        width: 90,
        height: Math.max(60, Math.max(inputs, outputs) * 20),
        backgroundColor: color || '#4CAF50',
        color: 'white',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        position: 'relative',
        boxShadow: active ? '0 0 15px rgba(255,255,255,0.5)' : 'none',
        transition: 'box-shadow 0.3s, transform 0.2s',
        transform: active ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      {name}
      {inputHandles}
      {outputHandles}
    </div>
  );
}