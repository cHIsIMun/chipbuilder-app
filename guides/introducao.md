# Introdução às Portas Lógicas

As portas lógicas são os blocos fundamentais dos circuitos digitais. Elas implementam funções booleanas básicas que operam com valores binários (0 e 1, ou FALSO e VERDADEIRO).

## Portas Básicas

### NOT (Inversor)

- **Função**: Inverte o valor de entrada
- **Símbolo**: ¬A ou A'
- **Representação**:
  <svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none" width="80" height="40"><path d="M20 10 L20 30 L50 20 Z"/><circle cx="55" cy="20" r="5"/><line x1="0" y1="20" x2="20" y2="20"/><line x1="60" y1="20" x2="80" y2="20"/></svg>
- **Tabela Verdade**:
  | A | ¬A |
  |---|---|
  | 0 | 1 |
  | 1 | 0 |

### AND (E)

- **Função**: Saída é 1 apenas quando **todas** as entradas são 1
- **Símbolo**: A ∧ B ou A · B
- **Representação**:
  <svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none" width="80" height="40"><path d="M20 10 H40 C60 10 60 30 40 30 H20 Z"/><line x1="0" y1="15" x2="20" y2="15"/><line x1="0" y1="25" x2="20" y2="25"/><line x1="60" y1="20" x2="80" y2="20"/></svg>
- **Tabela Verdade**:
  | A | B | A∧B |
  |---|---|-----|
  | 0 | 0 | 0 |
  | 0 | 1 | 0 |
  | 1 | 0 | 0 |
  | 1 | 1 | 1 |

### OR (OU)

- **Função**: Saída é 1 quando **pelo menos uma** entrada é 1
- **Símbolo**: A ∨ B ou A + B
- **Representação**:
  <svg viewBox="0 0 80 40" stroke-width="2" stroke="currentColor" fill="none" width="80" height="40"><path d="M10 10 Q30 20 10 30 C30 30 50 30 60 20 C50 10 30 10 10 10"/><line x1="0" y1="15" x2="15" y2="15"/><line x1="0" y1="25" x2="15" y2="25"/><line x1="60" y1="20" x2="80" y2="20"/></svg>
- **Tabela Verdade**:
  | A | B | A∨B |
  |---|---|-----|
  | 0 | 0 | 0 |
  | 0 | 1 | 1 |
  | 1 | 0 | 1 |
  | 1 | 1 | 1 |

## Conceitos Importantes

### Dualidade entre AND e OR

Observe como AND e OR são complementares:

- **AND**: Só é verdadeiro quando TUDO é verdadeiro
- **OR**: Só é falso quando TUDO é falso

### Próximos Passos

- Aprenda sobre as **Leis de De Morgan** para entender como converter entre AND e OR
- Explore as **Portas Derivadas** que combinam operações básicas
- Pratique com **Exercícios** no ChipBuilder
