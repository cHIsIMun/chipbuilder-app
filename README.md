# chipbuilder-app

🇧🇷 Português | 🇺🇸 [English](README.en.md)

> Simulador visual de circuitos lógicos digitais: construa, simule e componha chips a partir de portas básicas, com tabela-verdade automática.

## Visão geral

**ChipBuilder** é um simulador web interativo de **circuitos lógicos digitais**. Em um canvas *drag-and-drop*, você conecta entradas, saídas e portas lógicas, e o circuito é **avaliado em tempo real**. Circuitos podem ser salvos como **chips reutilizáveis** e compostos hierarquicamente em circuitos maiores — a mesma ideia de construir lógica complexa a partir de blocos simples. É uma ferramenta educacional para lógica booleana e eletrônica digital.

🔗 Publicado via GitHub Pages: https://chisimun.github.io/chipbuilder-app

## Funcionalidades

- **Editor visual de nós** (ReactFlow) com entradas (A–Z), saídas (S1, S2…) e a porta primitiva NOT.
- **Simulação em tempo real** — recalcula o circuito ao mudar entradas ou topologia; arestas mudam de cor conforme o valor lógico.
- **Detecção de ciclos** (DFS) e **ordenação topológica** (Kahn) — impede realimentação inválida.
- **Tabela-verdade automática** para até 10 entradas (2ⁿ combinações).
- **Identificação de portas** — compara a tabela-verdade do circuito com 19 portas padrão (AND, OR, NAND, NOR, XOR, XNOR e variantes de 3–4 entradas).
- **Chips customizados** — salve um circuito como chip nomeado e colorido, e reutilize-o (composição até profundidade 100).
- **Persistência** automática no `localStorage`.
- **Guia de lógica digital** embutido (markdown) e sistema de notificações.

## Stack

React 19 · ReactFlow · Tailwind CSS · lucide-react · react-markdown · Create React App.

## Como executar

```bash
npm install
npm start          # http://localhost:3000
# build + deploy GitHub Pages:
npm run build && npm run deploy
```

## Estrutura

```
src/
├── components/
│   ├── ChipBuilder.jsx     # componente raiz: simulação, estado, conexões, tabela-verdade
│   ├── SidebarInput.jsx    # entradas arrastáveis
│   ├── SidebarOutput.jsx   # saídas
│   ├── LogicGuide.jsx      # guia educacional (markdown)
│   ├── Notification.jsx    # toasts
│   ├── nodes/              # NotNode, CustomChipNode, TextNode
│   └── logic/gates.js      # 19 portas padrão (tabelas-verdade)
└── styles/theme.js
```

Funções centrais: `calculateCircuit()` (avalia a topologia), `simulateChip()` (recursiva, para chips compostos), `hasCycle()` (DFS).

## Estado do projeto

Funcional e em uso (publicado no GitHub Pages). Sem testes automatizados.

## Licença

Este projeto ainda não declara uma licença; até que uma seja adicionada, todos os direitos são reservados ao autor.
