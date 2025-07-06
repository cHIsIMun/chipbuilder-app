import React from 'react';

export default function SidebarInput({ inputs, onAddInput, onToggleInput, onRenameInput }) {
  return (
    <div
      className="w-32 bg-white border-r border-gray-200 flex flex-col items-center pt-8"
      style={{ cursor: 'pointer', minHeight: '100vh' }}
      onClick={e => {
        if (e.target === e.currentTarget) onAddInput();
      }}
    >
      <div className="mb-6 text-gray-700 font-semibold">Entradas</div>
      {inputs.map((input, idx) => (
        <div
          key={input.id}
          style={{ marginBottom: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
          onClick={e => {
            e.stopPropagation();
            onToggleInput(input.id);
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: input.active
                ? 'radial-gradient(circle at 30% 30%, #4fc3f7 70%, #1976d2 100%)'
                : 'radial-gradient(circle at 30% 30%, #bdbdbd 70%, #616161 100%)',
              border: input.active ? '2px solid #1976d2' : '2px solid #bdbdbd',
              boxShadow: input.active
                ? '0 0 8px 2px #4fc3f7'
                : '0 1px 2px #888',
              transition: 'background 0.2s, box-shadow 0.2s, border 0.2s',
            }}
            title={input.label}
          />
          <input
            type="text"
            value={input.label}
            onChange={e => onRenameInput(input.id, e.target.value)}
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