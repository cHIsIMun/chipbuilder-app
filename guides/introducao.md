# Introdução às Portas Lógicas

As portas lógicas são os blocos fundamentais dos circuitos digitais. Elas implementam funções booleanas básicas que operam com valores binários (0 e 1, ou FALSO e VERDADEIRO).

## Portas Básicas

### NOT (Inversor)
- **Função**: Inverte o valor de entrada
- **Símbolo**: ¬A ou A'
- **Tabela Verdade**:
  | A | ¬A |
  |---|---|
  | 0 | 1 |
  | 1 | 0 |

### AND (E)
- **Função**: Saída é 1 apenas quando **todas** as entradas são 1
- **Símbolo**: A ∧ B ou A · B
- **Tabela Verdade**:
  | A | B | A∧B |
  |---|---|-----|
  | 0 | 0 | 0   |
  | 0 | 1 | 0   |
  | 1 | 0 | 0   |
  | 1 | 1 | 1   |

### OR (OU)
- **Função**: Saída é 1 quando **pelo menos uma** entrada é 1
- **Símbolo**: A ∨ B ou A + B
- **Tabela Verdade**:
  | A | B | A∨B |
  |---|---|-----|
  | 0 | 0 | 0   |
  | 0 | 1 | 1   |
  | 1 | 0 | 1   |
  | 1 | 1 | 1   |

## Conceitos Importantes

### Dualidade entre AND e OR
Observe como AND e OR são complementares:
- **AND**: Só é verdadeiro quando TUDO é verdadeiro
- **OR**: Só é falso quando TUDO é falso


### Próximos Passos
- Aprenda sobre as **Leis de De Morgan** para entender como converter entre AND e OR
- Explore as **Portas Derivadas** que combinam operações básicas
- Pratique com **Exercícios** no ChipBuilder