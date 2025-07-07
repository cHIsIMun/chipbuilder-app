import React, { useCallback } from 'react';
import { useReactFlow } from 'reactflow';

export default function TextNode({ id, data, selected }) {
  const { setNodes } = useReactFlow();

  const updateNodeData = useCallback((newData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, ...newData } };
        }
        return node;
      })
    );
  }, [id, setNodes]);

  const onTextChange = (evt) => updateNodeData({ text: evt.currentTarget.value });
  const onFontSizeChange = (e) => updateNodeData({ fontSize: parseInt(e.target.value, 10) });
  const onColorChange = (e) => updateNodeData({ color: e.target.value });
  const toggleBold = () => updateNodeData({ fontWeight: data.fontWeight === 'bold' ? 'normal' : 'bold' });
  const toggleItalic = () => updateNodeData({ fontStyle: data.fontStyle === 'italic' ? 'normal' : 'italic' });
  const toggleUnderline = () => updateNodeData({ textDecoration: data.textDecoration === 'underline' ? 'none' : 'underline' });

  const textStyle = {
    fontSize: `${data.fontSize || 14}px`,
    color: data.color || '#1f2937',
    fontWeight: data.fontWeight || 'normal',
    fontStyle: data.fontStyle || 'normal',
    textDecoration: data.textDecoration || 'none',
  };

  return (
    <div style={{ 
      border: selected ? '2px solid #60a5fa' : '1px dashed #a0aec0', 
      borderRadius: '8px', 
      padding: '4px',
      backgroundColor: selected ? 'rgba(235, 248, 255, 0.2)' : 'rgba(249, 250, 251, 0.1)',
      transition: 'all 0.2s',
      boxShadow: selected ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
    }}>
      {selected && (
        <div className="nodrag absolute -top-10 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-md px-2 py-1 flex items-center gap-2 border border-gray-200">
          <input type="number" value={data.fontSize || 14} onChange={onFontSizeChange} className="w-12 text-center border-gray-300 rounded" title="Tamanho da Fonte" />
          <button onClick={toggleBold} className={`p-1 rounded ${data.fontWeight === 'bold' ? 'bg-blue-200' : ''}`} title="Negrito">B</button>
          <button onClick={toggleItalic} className={`p-1 rounded ${data.fontStyle === 'italic' ? 'bg-blue-200' : ''}`} title="Itálico">I</button>
          <button onClick={toggleUnderline} className={`p-1 rounded ${data.textDecoration === 'underline' ? 'bg-blue-200' : ''}`} title="Sublinhado">U</button>
          <input type="color" value={data.color || '#1f2937'} onChange={onColorChange} className="w-6 h-6 border-none cursor-pointer" title="Cor do Texto" />
        </div>
      )}
      <textarea
        value={data.text ?? ''}
        onChange={onTextChange}
        className="nodrag"
        style={{
          ...textStyle,
          width: '160px',
          minHeight: '40px',
          border: 'none',
          background: 'transparent',
          textAlign: 'center',
          resize: 'both',
          outline: 'none',
          boxShadow: 'none',
        }}
      />
    </div>
  );
}