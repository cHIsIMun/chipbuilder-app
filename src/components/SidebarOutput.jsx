import React, { useState } from 'react';
import { COLORS, SHADOWS, TRANSITIONS } from '../styles/theme';

const DraggableItem = ({ item, index, onRemove, children }) => {
  return (
    <div
      key={item.id}
      style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6, transition: 'background-color 0.2s' }}
      className="p-1 rounded-md hover:bg-gray-100 group"
    >
      {children}
      <button 
        onClick={() => onRemove(item.id)}
        className="w-4 h-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Remover"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
  );
};

const OutputItem = ({ item, onRename }) => (
  <>
    <div
      style={{
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: item.active
          ? `radial-gradient(circle at 30% 30%, ${COLORS.primary.light} 70%, ${COLORS.primary.dark} 100%)`
          : `radial-gradient(circle at 30% 30%, ${COLORS.neutral.dark} 70%, ${COLORS.neutral.darkest} 100%)`,
        border: item.active ? `2px solid ${COLORS.primary.dark}` : `2px solid ${COLORS.neutral.dark}`,
        boxShadow: item.active ? `0 0 8px 2px ${COLORS.primary.light}` : SHADOWS.small,
        transition: TRANSITIONS.fast,
      }}
      title={item.label}
    />
    <input
      type="text"
      value={item.label}
      onChange={e => onRename(item.id, e.target.value)}
      style={{
        width: 40,
        fontSize: 12,
        border: 'none',
        borderBottom: '1px solid #ccc',
        background: 'transparent',
        outline: 'none',
        textAlign: 'center',
      }}
      onClick={e => e.stopPropagation()}
    />
  </>
);

const DividerItem = () => (
  <div className="w-full flex items-center">
    <hr className="w-full border-t-2 border-gray-200 border-dashed" />
  </div>
);

export default function SidebarOutput({ outputs, onAddOutput, onRenameOutput, onReorder, onAddDivider, onRemoveItem }) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (fromIndex === index) return;

    const reorderedOutputs = [...outputs];
    const [draggedItem] = reorderedOutputs.splice(fromIndex, 1);
    reorderedOutputs.splice(index, 0, draggedItem);
    
    onReorder(reorderedOutputs);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div
      className="w-36 bg-white border-l border-gray-200 flex flex-col items-center pt-8 px-2"
      style={{ minHeight: '100vh' }}
    >
      <div className="mb-6 text-gray-700 font-semibold">Saídas</div>
      <div className="flex flex-col w-full items-center">
        {outputs.map((output, idx) => (
          <div
            key={output.id}
            draggable
            onDragStart={(e) => handleDragStart(e, idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDrop={(e) => handleDrop(e, idx)}
            onDragEnd={handleDragEnd}
            className="w-full"
            style={{ cursor: 'grab' }}
          >
            <DraggableItem item={output} index={idx} onRemove={onRemoveItem}>
              {output.type === 'divider' ? (
                <DividerItem />
              ) : (
                <OutputItem item={output} onRename={onRenameOutput} />
              )}
            </DraggableItem>
          </div>
        ))}
      </div>
      <button
        onClick={onAddOutput}
        className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 rounded-md
                   text-gray-400 hover:bg-gray-100 hover:border-gray-400 transition-colors text-sm"
      >
        + Saída
      </button>
      <button
        onClick={onAddDivider}
        className="mt-2 w-full py-1 border-2 border-dashed border-gray-300 rounded-md
                   text-gray-400 hover:bg-gray-100 hover:border-gray-400 transition-colors text-xs"
      >
        + Divisor
      </button>
    </div>
  );
}