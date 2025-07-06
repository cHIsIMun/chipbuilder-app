import React from 'react';
import { Handle, Position } from 'reactflow';
import { COLORS, SHADOWS, TRANSITIONS } from '../../styles/theme';

export default function NotNode() {
  return (
    <div style={{
      width: 70, 
      height: 40, 
      background: COLORS.neutral.lightest, 
      border: `2px solid ${COLORS.neutral.dark}`, 
      borderRadius: 8, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      position: 'relative',
      boxShadow: SHADOWS.small,
      transition: TRANSITIONS.fast,
    }}>
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ 
          background: COLORS.neutral.dark, 
          width: 12, 
          height: 12, 
          borderRadius: 6, 
          border: `2px solid ${COLORS.neutral.lightest}`,
          left: -7, 
          top: '50%'
        }} 
      />
      <span style={{ 
        fontWeight: 'bold', 
        fontSize: 14,
        color: COLORS.neutral.darkest
      }}>NOT</span>
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ 
          background: COLORS.neutral.dark, 
          width: 12, 
          height: 12, 
          borderRadius: 6, 
          border: `2px solid ${COLORS.neutral.lightest}`,
          right: -7, 
          top: '50%' 
        }} 
      />
    </div>
  );
}