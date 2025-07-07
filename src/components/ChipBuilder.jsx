import React, { useCallback, useState, useEffect, useRef } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Position,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NotNode from './nodes/NotNode';
import CustomChipNode from './nodes/CustomChipNode';
import TextNode from './nodes/TextNode';
import SidebarInput from './SidebarInput';
import SidebarOutput from './SidebarOutput';
import Notification from './Notification';
import LogicGuide from './LogicGuide';
import { GATES_DATABASE } from './logic/gates';

const nodeTypes = {
  not: NotNode,
  customChip: CustomChipNode,
  text: TextNode,
};

const initialNodes = [];
const initialEdges = [];
const CANVAS_WIDTH = 900;

const CHIP_COLORS = [
  { name: 'Verde', color: '#4CAF50' },
  { name: 'Azul', color: '#2196F3' },
  { name: 'Vermelho', color: '#F44336' },
  { name: 'Amarelo', color: '#FFEB3B' },
];

// Função corrigida para simular um chip
function simulateChip(chip, inputValues, savedChips, depth = 0) {
  if (!chip || !chip.nodes || chip.nodes.length === 0) {
    return [];
  }

  // Prevenção de recursão infinita
  if (depth > 100) {
    console.warn('Maximum recursion depth reached in chip simulation');
    return chip.nodes.filter(n => n.type === 'output').map(() => false);
  }
  
  const nodeValues = new Map();
  
  // Inicializa entradas com valores fornecidos
  const inputNodes = chip.nodes.filter(n => n.type === 'input');
  inputNodes.forEach((node, index) => {
    nodeValues.set(node.id, inputValues[index] || false);
  });

  // Função recursiva para calcular valor de um nó
  function evalNode(nodeId, sourceHandle = null) {
    const node = chip.nodes.find(n => n.id === nodeId);
    if (!node) return false;

    // Para custom chips, precisamos buscar pelo valor da saída específica
    if (sourceHandle && node.type === 'customChip') {
      const outputIndex = parseInt(sourceHandle.replace('out-', ''));
      const chipOutputs = nodeValues.get(nodeId);
      if (Array.isArray(chipOutputs)) {
        return chipOutputs[outputIndex] || false;
      }
      return false;
    }

    // Se já foi calculado, retorna o valor
    if (nodeValues.has(nodeId)) {
      return nodeValues.get(nodeId);
    }

    // Busca edges de entrada para este nó
    const inEdges = chip.edges.filter(edge => edge.target === nodeId);
    
    let value;
    
    if (node.type === 'input') {
      // Inputs já foram inicializados
      value = nodeValues.get(nodeId) || false;
    } else if (node.type === 'not') {
      // Porta NOT: inverte a primeira entrada
      if (inEdges.length > 0) {
        const inputValue = evalNode(inEdges[0].source, inEdges[0].sourceHandle);
        value = !inputValue;
      } else {
        value = true; // NOT sem entrada = NOT(false) = true
      }
    } else if (node.type === 'customChip') {
      // Chip customizado: simula recursivamente
      const chipDef = savedChips.find(c => c.name === node.data.name);
      if (chipDef) {
        const chipInputs = [];
        // Coleta entradas na ordem correta
        for (let i = 0; i < chipDef.inputs; i++) {
          const edge = inEdges.find(e => e.targetHandle === `in-${i}`);
          chipInputs[i] = edge ? evalNode(edge.source, edge.sourceHandle) : false;
        }
        value = simulateChip(chipDef, chipInputs, savedChips, depth + 1);
      } else {
        value = [];
      }
    } else {
      // Outros tipos (incluindo output): faz um OR lógico de todas as entradas
      if (inEdges.length > 0) {
        value = inEdges.some(edge => evalNode(edge.source, edge.sourceHandle));
      } else {
        value = false;
      }
    }
    
    nodeValues.set(nodeId, value);
    return value;
  }

  // Calcula todos os nós na ordem topológica
  const sortedNodes = topologicalSort(chip.nodes, chip.edges);
  sortedNodes.forEach(node => {
    if (!nodeValues.has(node.id)) {
      evalNode(node.id);
    }
  });

  // Retorna valores das saídas na ordem correta
  return chip.nodes
    .filter(n => n.type === 'output')
    .map(outNode => nodeValues.get(outNode.id) || false);
}

// Detecta ciclo usando DFS com melhor implementação
function hasCycle(nodes, edges) {
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const nodeColors = new Map();
  
  // Inicializa todos os nós como brancos
  nodes.forEach(node => nodeColors.set(node.id, WHITE));

  function dfs(nodeId) {
    if (nodeColors.get(nodeId) === GRAY) {
      return true; // Ciclo encontrado
    }
    
    if (nodeColors.get(nodeId) === BLACK) {
      return false; // Já processado
    }
    
    nodeColors.set(nodeId, GRAY);
    
    const outEdges = edges.filter(edge => edge.source === nodeId);
    for (const edge of outEdges) {
      if (dfs(edge.target)) {
        return true;
      }
    }
    
    nodeColors.set(nodeId, BLACK);
    return false;
  }

  for (const node of nodes) {
    if (nodeColors.get(node.id) === WHITE) {
      if (dfs(node.id)) {
        return true;
      }
    }
  }
  
  return false;
}

// Função para ordenação topológica (algoritmo de Kahn)
function topologicalSort(nodes, edges) {
  const inDegree = new Map(nodes.map(node => [node.id, 0]));
  const adj = new Map(nodes.map(node => [node.id, []]));

  for (const edge of edges) {
    adj.get(edge.source)?.push(edge.target);
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
  }

  const queue = nodes.filter(node => inDegree.get(node.id) === 0).map(node => node.id);
  const sorted = [];

  while (queue.length > 0) {
    const u = queue.shift();
    sorted.push(u);

    for (const v of (adj.get(u) || [])) {
      inDegree.set(v, inDegree.get(v) - 1);
      if (inDegree.get(v) === 0) {
        queue.push(v);
      }
    }
  }

  // Se sorted.length !== nodes.length, existe um ciclo.
  // A detecção de ciclo principal já lida com isso, mas é uma boa verificação.
  return sorted.map(id => nodes.find(n => n.id === id));
}

function ChipBuilderComponent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowInstance = useReactFlow();

  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);

  const [savedChips, setSavedChips] = useState(() => {
    const saved = localStorage.getItem('chipbuilder_savedChips');
    return saved ? JSON.parse(saved) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [chipName, setChipName] = useState('');
  const [chipColor, setChipColor] = useState(CHIP_COLORS[0].color);

  const [nodeValues, setNodeValues] = useState({});
  const [hasCycleWarning, setHasCycleWarning] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showTruthTable, setShowTruthTable] = useState(false);
  const [truthTableData, setTruthTableData] = useState({ headers: [], rows: [] });
  const [identifiedGate, setIdentifiedGate] = useState(null);
  const [showGuide, setShowGuide] = useState(false);

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
  }, []);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // Função corrigida para obter cor da edge
  const getEdgeColor = useCallback((edge) => {
    const sourceNode = nodes.find(n => n.id === edge.source);
    if (!sourceNode) return '#BDBDBD';

    // Constrói a chave correta para buscar o valor
    let valueKey = edge.source;
    if (edge.sourceHandle && sourceNode.type === 'customChip') {
      valueKey = `${edge.source}-${edge.sourceHandle}`;
    }

    const value = nodeValues[valueKey];
    if (value !== undefined) {
      return value ? '#2196F3' : '#BDBDBD';
    }

    return '#BDBDBD';
  }, [nodeValues, nodes]);

  // Função principal corrigida para calcular o circuito
  const calculateCircuit = useCallback(() => {
    if (hasCycle(nodes, edges)) {
      if (!hasCycleWarning) {
        setHasCycleWarning(true);
        showNotification('Circuito possui ciclo/feedback! Não é possível simular.', 'error');
      }
      
      // Limpa todos os valores
      setNodeValues({});
      setOutputs(prev => prev.map(output => ({ ...output, active: false })));
      setNodes(nds => nds.map(n => ({ ...n, data: { ...n.data, active: false } })));
      return;
    }
    
    if (hasCycleWarning) {
      setHasCycleWarning(false);
    }

    const newNodeValues = {};

    // Função para avaliar um nó
    function evaluateNode(nodeId, sourceHandle = null) {
      const node = nodes.find(n => n.id === nodeId);
      if (!node) return false;

      // Para custom chips, trata saídas específicas
      if (sourceHandle && node.type === 'customChip') {
        const outputIndex = parseInt(sourceHandle.replace('out-', ''));
        const chipOutputs = newNodeValues[nodeId];
        if (Array.isArray(chipOutputs)) {
          const value = chipOutputs[outputIndex] || false;
          newNodeValues[`${nodeId}-${sourceHandle}`] = value;
          return value;
        }
        return false;
      }

      let value;
      
      if (node.type === 'input') {
        const input = inputs.find(i => i.id === nodeId);
        value = input ? input.active : false;
      } else {
        const inEdges = edges.filter(edge => edge.target === nodeId);
        
        if (node.type === 'not') {
          // Porta NOT: inverte a primeira entrada
          if (inEdges.length > 0) {
            const inputValue = evaluateNode(inEdges[0].source, inEdges[0].sourceHandle);
            value = !inputValue;
          } else {
            value = true; // NOT sem entrada
          }
        } else if (node.type === 'customChip') {
          // Chip customizado
          const chipDef = savedChips.find(c => c.name === node.data.name);
          if (chipDef) {
            const chipInputs = [];
            for (let i = 0; i < chipDef.inputs; i++) {
              const edge = inEdges.find(e => e.targetHandle === `in-${i}`);
              chipInputs[i] = edge ? evaluateNode(edge.source, edge.sourceHandle) : false;
            }
            value = simulateChip(chipDef, chipInputs, savedChips, 1);
          } else {
            value = [];
          }
        } else {
          // Outros tipos (incluindo output): faz um OR lógico de todas as entradas
          if (inEdges.length > 0) {
            value = inEdges.some(edge => evaluateNode(edge.source, edge.sourceHandle));
          } else {
            value = false;
          }
        }
      }
      
      newNodeValues[nodeId] = value;
      
      // Para custom chips, também cria entradas individuais para cada saída
      if (node.type === 'customChip' && Array.isArray(value)) {
        value.forEach((outputValue, index) => {
          newNodeValues[`${nodeId}-out-${index}`] = outputValue;
        });
      }
      
      return value;
    }

    // Avalia todos os nós na ordem topológica
    const sortedNodes = topologicalSort(nodes, edges);
    sortedNodes.forEach(node => {
      evaluateNode(node.id);
    });

    setNodeValues(newNodeValues);

    // Atualiza estado visual dos nós
    setNodes(nds => nds.map(n => {
      const nodeValue = newNodeValues[n.id];
      // Para custom chips, considera ativo se alguma saída for true
      const isActive = Array.isArray(nodeValue) ? nodeValue.some(v => v) : (nodeValue || false);
      
      return {
        ...n,
        data: {
          ...n.data,
          active: isActive,
        }
      };
    }));

    // Atualiza saídas
    setOutputs(prev => prev.map(output => ({
      ...output,
      active: newNodeValues[output.id] || false,
    })));

  }, [nodes, edges, inputs, savedChips, hasCycleWarning, showNotification]);

  // Carrega o circuito salvo
  useEffect(() => {
    const circuit = localStorage.getItem('chipbuilder_circuit');
    if (circuit) {
      try {
        const { nodes, edges, inputs, outputs } = JSON.parse(circuit);
        setNodes(nodes || []);
        setEdges(edges || []);
        setInputs(inputs || []);
        setOutputs(outputs || []);
      } catch (error) {
        console.error('Error loading saved circuit:', error);
      }
    }
  }, [setNodes, setEdges, setInputs, setOutputs]);

  // Salva chips no localStorage
  useEffect(() => {
    localStorage.setItem('chipbuilder_savedChips', JSON.stringify(savedChips));
  }, [savedChips]);

  // Salva o circuito atual
  useEffect(() => {
    const state = { nodes, edges, inputs, outputs };
    localStorage.setItem('chipbuilder_circuit', JSON.stringify(state));
  }, [nodes, edges, inputs, outputs]);

  // Recalcula o circuito quando necessário
  useEffect(() => {
    if (nodes.length === 0) return;
    
    const timeoutId = setTimeout(() => {
      calculateCircuit();
    }, 50);
    
    return () => clearTimeout(timeoutId);
  }, [nodes, edges, inputs, outputs, calculateCircuit]);

  // Adiciona entrada
  const addInput = () => {
    const existingLabels = new Set(inputs.map(i => i.label));
    let newLabel = '';
    // Encontra a primeira letra do alfabeto (A-Z) que não está em uso
    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(65 + i);
      if (!existingLabels.has(char)) {
        newLabel = char;
        break;
      }
    }
    // Fallback caso todas as letras já estejam em uso
    if (!newLabel) {
      newLabel = `In-${inputs.length + 1}`;
    }

    const id = `input-${Date.now()}`;
    const newY = inputs.length > 0 ? Math.max(...nodes.filter(n => n.type === 'input').map(n => n.position.y)) + 60 : 80;

    setInputs((prev) => [
      ...prev,
      { id, label: newLabel, active: false },
    ]);
    setNodes((nds) => [
      ...nds,
      {
        id,
        type: 'input',
        position: { x: 10, y: newY },
        data: { label: newLabel, active: false },
        sourcePosition: Position.Right,
        style: {
          width: 38,
          height: 38,
          background: '#fff',
          border: '3px solid #2196F3',
          borderRadius: '50%',
          boxShadow: '0 2px 8px #2196F344',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: 13,
        },
      },
    ]);
  };

  // Alterna estado da entrada
  const toggleInput = (id) => {
    setInputs((prev) =>
      prev.map((input) =>
        input.id === id ? { ...input, active: !input.active } : input
      )
    );
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id
          ? { ...n, data: { ...n.data, active: !n.data.active } }
          : n
      )
    );
  };

  const onRenameInput = (id, newLabel) => {
    setInputs(inputs => inputs.map(input =>
      input.id === id ? { ...input, label: newLabel } : input
    ));
    setNodes(nds => nds.map(n =>
      n.id === id ? { ...n, data: { ...n.data, label: newLabel } } : n
    ));
  };

  const onRenameOutput = (id, newLabel) => {
    setOutputs(outputs => outputs.map(output =>
      output.id === id ? { ...output, label: newLabel } : output
    ));
    setNodes(nds => nds.map(n =>
      n.id === id ? { ...n, data: { ...n.data, label: newLabel } } : n
    ));
  };

  const addInputDivider = () => {
    setInputs(prev => [...prev, { id: `divider-${Date.now()}`, type: 'divider' }]);
  };

  const addOutputDivider = () => {
    setOutputs(prev => [...prev, { id: `divider-${Date.now()}`, type: 'divider' }]);
  };

  const removeSidebarItem = (id, type) => {
    if (type === 'input') {
      setInputs(prev => prev.filter(item => item.id !== id));
    } else if (type === 'output') {
      setOutputs(prev => prev.filter(item => item.id !== id));
    }
  };

  // Adiciona saída
  const addOutput = () => {
    const existingSNumbers = outputs
      .map(o => o.label)
      .filter(label => typeof label === 'string' && label.startsWith('S'))
      .map(label => parseInt(label.substring(1), 10))
      .filter(n => !isNaN(n));

    const newLabelNumber = existingSNumbers.length > 0 ? Math.max(...existingSNumbers) + 1 : 1;
    const newLabel = `S${newLabelNumber}`;

    const id = `output-${Date.now()}`;
    const newY = outputs.length > 0 ? Math.max(...nodes.filter(n => n.type === 'output').map(n => n.position.y)) + 60 : 80;

    setOutputs((prev) => [
      ...prev,
      { id, label: newLabel, active: false },
    ]);
    setNodes((nds) => [
      ...nds,
      {
        id,
        type: 'output',
        position: { x: CANVAS_WIDTH - 60, y: newY },
        data: { label: newLabel, active: false },
        targetPosition: Position.Left,
        style: {
          width: 38,
          height: 38,
          background: '#fff',
          border: '3px solid #2196F3',
          borderRadius: '50%',
          boxShadow: '0 2px 8px #2196F344',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: 13,
        },
      },
    ]);
  };

  // Adiciona porta NOT
  const addNot = () => {
    const id = `not-${Date.now()}`;
    setNodes((nds) => [
      ...nds,
      {
        id,
        type: 'not',
        position: { x: 300, y: 200 },
        data: {},
      },
    ]);
  };

  const addTextNode = useCallback((position) => {
    const id = `text-${Date.now()}`;
    const newNode = {
      id,
      type: 'text',
      position,
      data: {
        text: 'Seu texto',
        fontSize: 14,
        color: '#1f2937',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  // Salva chip customizado
  const openSaveChipModal = () => {
    setChipName('');
    setChipColor(CHIP_COLORS[0].color);
    setShowModal(true);
  };

  const saveChip = () => {
    if (!chipName.trim()) return;
    if (savedChips.some(c => c.name === chipName.trim())) {
      showNotification('Já existe um chip com esse nome!', 'error');
      return;
    }
    
    if (hasCycle(nodes, edges)) {
      showNotification('Não é permitido salvar chips com ciclos/feedback!', 'error');
      return;
    }
    
    const logicalInputs = inputs.filter(i => i.type !== 'divider');
    const logicalOutputs = outputs.filter(o => o.type !== 'divider');
    const inputCount = logicalInputs.length;
    const outputCount = logicalOutputs.length;

    const newChips = [
      ...savedChips,
      {
        name: chipName.trim(),
        color: chipColor,
        inputs: inputCount,
        outputs: outputCount,
        nodes: JSON.parse(JSON.stringify(nodes)),
        edges: JSON.parse(JSON.stringify(edges)),
      },
    ];
    setSavedChips(newChips);
    setShowModal(false);

    setNodes([]);
    setEdges([]);
    setInputs([]);
    setOutputs([]);

    showNotification(`Chip "${chipName}" salvo com sucesso!`, 'success');
  };

  // Adiciona chip salvo ao canvas
  const addSavedChipToCanvas = (chip) => {
    const id = `customChip-${Date.now()}`;
    setNodes((nds) => [
      ...nds,
      {
        id,
        type: 'customChip',
        position: { x: 400, y: 200 },
        data: {
          inputs: chip.inputs,
          outputs: chip.outputs,
          name: chip.name,
          color: chip.color,
          active: false
        },
      },
    ]);
  };

  // Conexão entre terminais
  const onConnect = useCallback(
    (params) => {
      const testEdges = [...edges, { ...params, id: Math.random().toString() }];
      if (hasCycle(nodes, testEdges)) {
        showNotification('Não é permitido criar ciclos/feedback no circuito!', 'error');
        return;
      }
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: '#374151' } }, eds)
      );
    },
    [setEdges, edges, nodes, showNotification]
  );

  const onNodesChangeWithSidebarSync = useCallback((changes) => {
    changes.forEach(change => {
      if (change.type === 'remove') {
        if (change.id.startsWith('input-')) {
          setInputs(inputs => inputs.filter(i => i.id !== change.id));
        }
        if (change.id.startsWith('output-')) {
          setOutputs(outputs => outputs.filter(o => o.id !== change.id));
        }
      }
    });
    
    onNodesChange(changes);
  }, [onNodesChange]);

  useEffect(() => {
    // Referência para o handler do evento
    const handleDoubleClick = (event) => {
      // Verificar se o clique foi no painel (não em um nó)
      if (event.target.classList.contains('react-flow__pane')) {
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        
        console.log('Duplo clique detectado, criando nó de texto...', position);
        addTextNode(position);
      }
    };

    // Obter o contêiner do ReactFlow após a montagem
    const container = document.querySelector('.react-flow');
    if (container) {
      container.addEventListener('dblclick', handleDoubleClick);
      
      // Limpar o event listener quando o componente for desmontado
      return () => {
        container.removeEventListener('dblclick', handleDoubleClick);
      };
    }
  }, [reactFlowInstance, addTextNode]);

  const identifyGate = (inputs, outputs, rows) => {
    // Só tenta identificar portas com 1 saída
    if (outputs.length !== 1) {
      return null;
    }

    const outputColumn = rows.map(row => row[inputs.length]);

    const foundGate = GATES_DATABASE.find(gate => {
      if (gate.inputs !== inputs.length) {
        return false;
      }
      // Compara a coluna de saída da tabela gerada com a da base de dados
      return JSON.stringify(gate.truthTable) === JSON.stringify(outputColumn);
    });

    return foundGate || null;
  };

  const generateTruthTable = () => {
    const logicalInputs = inputs.filter(i => i.type !== 'divider');
    const logicalOutputs = outputs.filter(o => o.type !== 'divider');

    if (logicalInputs.length === 0) {
      showNotification('Adicione pelo menos uma entrada para gerar a tabela verdade.', 'warning');
      return;
    }
    if (logicalInputs.length > 10) {
      showNotification('A tabela verdade é limitada a 10 entradas para evitar lentidão excessiva.', 'warning');
      return;
    }
    if (hasCycle(nodes, edges)) {
      showNotification('Não é possível gerar a tabela para um circuito com ciclo!', 'error');
      return;
    }

    const headers = [
      ...logicalInputs.map(i => i.label),
      ...logicalOutputs.map(o => o.label)
    ];
    const rows = [];
    const numCombinations = 1 << logicalInputs.length;

    const currentChip = {
      nodes: JSON.parse(JSON.stringify(nodes)),
      edges: JSON.parse(JSON.stringify(edges)),
      inputs: logicalInputs.length,
      outputs: logicalOutputs.length,
    };

    for (let i = 0; i < numCombinations; i++) {
      const inputValues = [];
      for (let j = 0; j < logicalInputs.length; j++) {
        inputValues[j] = (i >> (logicalInputs.length - 1 - j)) & 1;
      }
      const outputValues = simulateChip(currentChip, inputValues.map(Boolean), savedChips);
      rows.push([...inputValues, ...outputValues.map(v => v ? 1 : 0)]);
    }

    setTruthTableData({ headers, rows, inputCount: logicalInputs.length });
    setIdentifiedGate(identifyGate(logicalInputs, logicalOutputs, rows));
    setShowTruthTable(true);
  };

  const clearCanvas = () => {
    if (nodes.length > 0 || edges.length > 0) {
      if (window.confirm('Tem certeza que deseja limpar o canvas?')) {
        setNodes([]);
        setEdges([]);
        setInputs([]);
        setOutputs([]);
        setNodeValues({});
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Barra superior fixa com chips salvos */}
      <div className="w-full bg-white shadow-md px-4 py-3 z-20 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold text-gray-800">ChipBuilder</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowGuide(true)}
              className="px-3 py-1.5 bg-purple-500 hover:bg-purple-600 text-white rounded-md 
                        transition-colors flex items-center gap-1 text-sm font-medium"
              title="Guia de Lógica Digital"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              Guia
            </button>
            <button
              onClick={generateTruthTable}
              className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md 
                        transition-colors flex items-center gap-1 text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"/><path d="M21 9H3"/><path d="M21 15H3"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>
              Tabela Verdade
            </button>
            <button 
              onClick={openSaveChipModal} 
              className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-md 
                        transition-colors flex items-center gap-1 text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1-2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Salvar Chip
            </button>
            <button 
              onClick={clearCanvas} 
              className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md 
                        transition-colors flex items-center gap-1 text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
              Limpar
            </button>
          </div>
        </div>
        
        <div className="flex gap-6">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 mb-1">Componentes</span>
            <div className="flex gap-3">
              <button
                className="flex flex-col items-center group"
                onClick={addNot}
                title="Adicionar Porta NOT"
              >
                <div className="w-10 h-10 rounded flex items-center justify-center
                              bg-white border-2 border-gray-300 group-hover:border-gray-500
                              transition-colors shadow-sm group-hover:shadow">
                  <span className="font-bold text-xs">NOT</span>
                </div>
                <span className="text-xs mt-1 text-gray-600 group-hover:text-gray-900">NOT</span>
              </button>
            </div>
          </div>
          
          {savedChips.length > 0 && (
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-500 mb-1">Chips Salvos</span>
              <div className="flex gap-3 flex-wrap">
                {savedChips.map((chip) => (
                  <button
                    key={chip.name}
                    className="flex flex-col items-center group"
                    onClick={() => addSavedChipToCanvas(chip)}
                  >
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center text-white font-medium text-xs
                                border-2 border-gray-300 group-hover:border-gray-500 shadow-sm group-hover:shadow
                                transition-all"
                      style={{ background: chip.color }}
                    >
                      {chip.name.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-xs mt-1 text-gray-600 group-hover:text-gray-900 max-w-[48px] truncate" title={chip.name}>
                      {chip.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Painel lateral esquerdo */}
        <SidebarInput
          inputs={inputs}
          onAddInput={addInput}
          onToggleInput={toggleInput}
          onRenameInput={onRenameInput}
          onReorder={setInputs}
          onAddDivider={addInputDivider}
          onRemoveItem={(id) => removeSidebarItem(id, 'input')}
        />

        {/* Modal Tabela Verdade */}
        {showTruthTable && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-[90vw] max-h-[90vh] flex flex-col transform transition-all">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Tabela Verdade</h2>
                <button onClick={() => setShowTruthTable(false)} className="text-gray-500 hover:text-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              <div className="flex gap-6">
                <div className="overflow-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        {truthTableData.headers.map((header, index) => (
                          <th
                            key={index}
                            scope="col"
                            className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                                        ${index === truthTableData.inputCount - 1 ? 'border-r-2 border-gray-400' : ''}`}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {truthTableData.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className={`px-4 py-2 whitespace-nowrap text-sm text-center font-mono
                                          ${cellIndex === truthTableData.inputCount - 1 ? 'border-r-2 border-gray-400' : ''}
                                          ${cell === 1 ? 'text-blue-600 font-bold' : 'text-gray-500'}`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg w-64">
                  {identifiedGate ? (
                    <>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Porta Lógica Identificada</h3>
                      <div className="w-48 h-24 text-gray-800" dangerouslySetInnerHTML={{ __html: identifiedGate.symbol }} />
                      <p className="mt-2 text-2xl font-bold text-gray-900">{identifiedGate.name}</p>
                    </>
                  ) : (
                    <div className="text-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      <h3 className="text-md font-semibold">Porta não identificada</h3>
                      <p className="text-xs mt-1">O circuito atual não corresponde a uma porta lógica básica conhecida.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal para salvar chip */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-[90vw] transform transition-all">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Salvar novo chip</h2>
              
              <div className="mb-4">
                <label htmlFor="chipName" className="block text-sm font-medium text-gray-700 mb-1">Nome do chip</label>
                <input
                  id="chipName"
                  className="border border-gray-300 px-3 py-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Ex: AND Gate"
                  value={chipName}
                  onChange={event => setChipName(event.target.value)}
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Cor do chip</label>
                <div className="flex gap-3 flex-wrap">
                  {CHIP_COLORS.map(colorOption => (
                    <button
                      key={colorOption.name}
                      onClick={() => setChipColor(colorOption.color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        chipColor === colorOption.color ? 'border-gray-800 scale-110' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: colorOption.color }}
                      title={colorOption.name}
                    />
                  ))}
                  <input
                    type="color"
                    value={chipColor}
                    onChange={(event) => setChipColor(event.target.value)}
                    className="w-8 h-8 cursor-pointer rounded-full overflow-hidden"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button 
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                  onClick={saveChip}
                  disabled={!chipName.trim()}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Canvas central */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges.map(edge => {
              const color = getEdgeColor(edge);
              
              return {
                ...edge,
                style: { 
                  stroke: color, 
                  strokeWidth: 3 
                },
                animated: color === '#2196F3',
              };
            })}
            onNodesChange={onNodesChangeWithSidebarSync}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            panOnDrag={1}
            zoomOnScroll
            zoomOnDoubleClick={false}
            selectionOnDrag={false}
            className="nodrag"
          >
            <Background gap={20} size={1} color="#e5e7eb" />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>

        {/* Painel lateral direito */}
        <SidebarOutput 
          outputs={outputs} 
          onAddOutput={addOutput} 
          onRenameOutput={onRenameOutput} 
          onReorder={setOutputs}
          onAddDivider={addOutputDivider}
          onRemoveItem={(id) => removeSidebarItem(id, 'output')}
        />
      </div>

      {/* Modal do Guia de Lógica */}
      <LogicGuide 
        isOpen={showGuide} 
        onClose={() => setShowGuide(false)} 
      />

      {/* Componente de notificação */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
      )}
    </div>
  );
}

export default function ChipBuilder() {
  return (
    <ReactFlowProvider>
      <ChipBuilderComponent />
    </ReactFlowProvider>
  );
}
