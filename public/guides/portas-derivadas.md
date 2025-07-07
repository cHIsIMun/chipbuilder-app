# Portas Derivadas

As portas derivadas combinam operações básicas em uma única porta, tornando os circuitos mais eficientes e elegantes.

## NAND (NOT-AND)
- **Função**: Negação de AND
- **Símbolo**: ¬(A ∧ B)
- **Propriedade especial**: É uma **porta universal** (pode implementar qualquer função lógica)

### Tabela Verdade:
| A | B | AND | NAND |
|---|---|-----|------|
| 0 | 0 | 0   | **1** |
| 0 | 1 | 0   | **1** |
| 1 | 0 | 0   | **1** |
| 1 | 1 | 1   | **0** |

**Note**: NAND é exatamente o oposto de AND!

### Por que NAND é Universal?
Usando apenas portas NAND, você pode criar:
- **NOT**: NAND(A,A) = ¬A
- **AND**: NOT(NAND(A,B)) = A∧B
- **OR**: NAND(NOT(A), NOT(B)) = A∨B

## NOR (NOT-OR)
- **Função**: Negação de OR
- **Símbolo**: ¬(A ∨ B)
- **Propriedade especial**: Também é uma **porta universal**

### Tabela Verdade:
| A | B | OR | NOR |
|---|----|----|-----|
| 0 | 0 | 0  | **1** |
| 0 | 1 | 1  | **0** |
| 1 | 0 | 1  | **0** |
| 1 | 1 | 1  | **0** |

**Note**: NOR é exatamente o oposto de OR!

## XOR (OU Exclusivo)
- **Função**: Saída é 1 quando as entradas são **diferentes**
- **Símbolo**: A ⊕ B
- **Uso comum**: Detectar diferenças, circuitos de paridade

### Tabela Verdade:
| A | B | XOR |
|---|---|-----|
| 0 | 0 | 0   |
| 0 | 1 | **1** |
| 1 | 0 | **1** |
| 1 | 1 | 0   |

### XOR vs OR:
- **OR**: "A ou B (ou ambos)"
- **XOR**: "A ou B (mas não ambos)"

## XNOR (NOR Exclusivo)
- **Função**: Negação de XOR - saída é 1 quando as entradas são **iguais**
- **Símbolo**: ¬(A ⊕ B)
- **Uso comum**: Comparadores, detectores de igualdade

### Tabela Verdade:
| A | B | XNOR |
|---|---|------|
| 0 | 0 | **1** |
| 0 | 1 | 0    |
| 1 | 0 | 0    |
| 1 | 1 | **1** |

## Implementando Portas Derivadas

### Como fazer XOR com portas básicas:
XOR(A,B) = (A∧¬B) ∨ (¬A∧B)

Em palavras: "A e não-B, OU não-A e B"

### Exercício Prático:
No ChipBuilder, tente construir um XOR usando apenas AND, OR e NOT. Compare com a tabela verdade acima!

---

*As portas derivadas são atalhos inteligentes que simplificam projetos complexos.*