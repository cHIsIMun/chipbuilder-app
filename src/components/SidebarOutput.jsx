import React from 'react';
import { COLORS, SHADOWS, TRANSITIONS } from '../styles/theme';

export default function SidebarOutput({ outputs, onAddOutput, onRenameOutput }) {
  return (
    <div
      className="w-48 bg-white border-l border-gray-200 flex flex-col items-center pt-8"
      style={{ cursor: 'pointer', minHeight: '100vh' }}
      onClick={e => {
        if (e.target === e.currentTarget) onAddOutput();
      }}
    >
      <div className="mb-6 text-gray-700 font-semibold">Saídas</div>
      {outputs.map((output) => (
        <div
          key={output.id}
          style={{ 
            marginBottom: 12, 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 6 
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: output.active
                ? `radial-gradient(circle at 30% 30%, ${COLORS.primary.light} 70%, ${COLORS.primary.dark} 100%)`
                : `radial-gradient(circle at 30% 30%, ${COLORS.neutral.dark} 70%, ${COLORS.neutral.darkest} 100%)`,
              border: output.active 
                ? `2px solid ${COLORS.primary.dark}` 
                : `2px solid ${COLORS.neutral.dark}`,
              boxShadow: output.active
                ? `0 0 8px 2px ${COLORS.primary.light}`
                : SHADOWS.small,
              transition: TRANSITIONS.fast,
            }}
            title={output.label}
          />
          <input
            type="text"
            value={output.label}
            onChange={e => onRenameOutput(output.id, e.target.value)}
            style={{
              width: 60,
              fontSize: 12,
              border: 'none',
              borderBottom: '1px solid #ccc',
              background: 'transparent',
              outline: 'none',
              marginLeft: 4,
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      ))}
      <div className="mt-4 text-xs text-gray-400">(Clique na borda para adicionar)</div>
    </div>
  );
}