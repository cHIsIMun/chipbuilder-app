# Leis de De Morgan

As **Leis de De Morgan** são as regras mais importantes para entender como portas lógicas se relacionam. Elas mostram que **AND e OR são fundamentalmente a mesma operação**, só vista de ângulos diferentes!

## Primeira Lei de De Morgan
**¬(A ∧ B) = ¬A ∨ ¬B**

### Em Português Simples:
*"Negar um AND é igual a fazer OR das negações"*

### Visualizando a Equivalência:

| A | B | A∧B | ¬(A∧B) | ¬A | ¬B | ¬A∨¬B |
|---|---|-----|--------|----|----|-------|
| 0 | 0 | 0   | **1**  | 1  | 1  | **1** |
| 0 | 1 | 0   | **1**  | 1  | 0  | **1** |
| 1 | 0 | 0   | **1**  | 0  | 1  | **1** |
| 1 | 1 | 1   | **0**  | 0  | 0  | **0** |

**Viu? As colunas ¬(A∧B) e ¬A∨¬B são idênticas!**

### Exemplo Prático:
- **NAND(A,B)** = NOT(A AND B) = (NOT A) OR (NOT B)
- Uma porta NAND é **exatamente igual** a um OR com entradas invertidas!

## Segunda Lei de De Morgan
**¬(A ∨ B) = ¬A ∧ ¬B**

### Em Português Simples:
*"Negar um OR é igual a fazer AND das negações"*

### Visualizando a Equivalência:

| A | B | A∨B | ¬(A∨B) | ¬A | ¬B | ¬A∧¬B |
|---|---|-----|--------|----|----|-------|
| 0 | 0 | 0   | **1**  | 1  | 1  | **1** |
| 0 | 1 | 1   | **0**  | 1  | 0  | **0** |
| 1 | 0 | 1   | **0**  | 0  | 1  | **0** |
| 1 | 1 | 1   | **0**  | 0  | 0  | **0** |

**Novamente, as colunas ¬(A∨B) e ¬A∧¬B são idênticas!**

## O Insight Revolucionário

### AND = OR Negado!
Para fazer um AND usando apenas OR e NOT:
1. **A ∧ B** (o que queremos)
2. = **¬(¬(A ∧ B))** (negar duas vezes não muda nada)
3. = **¬(¬A ∨ ¬B)** (aplicando De Morgan)
4. = **NOT((NOT A) OR (NOT B))**

**Conclusão**: AND(A,B) = NOT(OR(NOT(A), NOT(B)))

### OR = AND Negado!
Para fazer um OR usando apenas AND e NOT:
1. **A ∨ B** (o que queremos)
2. = **¬(¬(A ∨ B))** (negar duas vezes não muda nada)
3. = **¬(¬A ∧ ¬B)** (aplicando De Morgan)
4. = **NOT((NOT A) AND (NOT B))**

**Conclusão**: OR(A,B) = NOT(AND(NOT(A), NOT(B)))

## Experimento no ChipBuilder

### Teste 1: Construa um AND usando OR
1. Adicione duas entradas A e B
2. Adicione duas portas NOT para ¬A e ¬B
3. Conecte ¬A e ¬B a uma porta OR (se existir)
4. Adicione uma porta NOT final
5. Compare com um AND direto - são idênticos!

### Teste 2: Verifique com Tabela Verdade
1. Construa ambos os circuitos
2. Gere a tabela verdade de cada um
3. Compare as saídas - devem ser iguais!

## Por que isso é Importante?

### 1. Flexibilidade de Design
Se você só tem portas NAND disponíveis, pode fazer qualquer coisa!

### 2. Simplificação de Circuitos
Às vezes é mais eficiente usar a forma "invertida" de uma operação.

### 3. Compreensão Profunda
Entender que AND e OR são "duas faces da mesma moeda" é fundamental na lógica digital.

---

*As Leis de De Morgan mostram que a lógica digital é mais elegante e simples do que parece - tudo se conecta!*