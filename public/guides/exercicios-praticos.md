# Exercícios Práticos

## Exercício 1: Equivalência Básica
**Objetivo**: Provar que NAND = OR com entradas invertidas

### Passo a Passo:
1. **Monte o Circuito A**: Duas entradas → Porta NAND → Saída
2. **Monte o Circuito B**: Duas entradas → NOT em cada → Porta OR → Saída
3. **Teste todas as combinações**:
   - A=0, B=0
   - A=0, B=1  
   - A=1, B=0
   - A=1, B=1
4. **Compare as saídas**: Devem ser idênticas!

### Verificação no ChipBuilder:
- Use a funcionalidade "Tabela Verdade" para comparar automaticamente
- As tabelas devem ser iguais

## Exercício 2: Construindo AND com OR
**Desafio**: Fazer um AND usando apenas OR e NOT

### Solução Guiada:
1. **Lembre da fórmula**: A∧B = ¬(¬A ∨ ¬B)
2. **Monte o circuito**:
   - Entradas A, B
   - NOT para cada entrada → ¬A, ¬B
   - OR(¬A, ¬B) → resultado temporário
   - NOT final → resultado = A∧B

### Teste:
Compare com um AND direto - as saídas devem ser iguais!

## Exercício 3: Porta Universal
**Desafio Avançado**: Construir OR usando apenas NAND

### Dica:
Use a fórmula: A∨B = ¬(¬A ∧ ¬B) = NAND(¬A, ¬B)

Como fazer ¬A com NAND? NAND(A,A) = ¬A

### Circuito Completo:
1. NAND(A,A) → ¬A
2. NAND(B,B) → ¬B  
3. NAND(¬A, ¬B) → A∨B

## Exercício 4: Detector de Diferença
**Objetivo**: Criar um circuito que acende quando duas entradas são diferentes

### Análise:
- Queremos saída = 1 quando A≠B
- Isso é exatamente um XOR!

### Implementação com portas básicas:
XOR(A,B) = (A∧¬B) ∨ (¬A∧B)

## Exercício 5: Minimização de Circuito
**Cenário**: Você tem o circuito ¬(A∧B∧C)

### Aplique De Morgan:
¬(A∧B∧C) = ¬A ∨ ¬B ∨ ¬C

### Compare as implementações:
1. **Versão Original**: 3 entradas → AND de 3 → NOT
2. **Versão Simplificada**: 3 entradas → NOT cada → OR de 3

Qual usa menos portas? Qual é mais claro?

## Exercício 6: Circuito Real
**Projeto**: Sistema de alarme de carro

### Especificações:
- Alarme toca (saída = 1) quando:
  - Motor ligado E porta aberta
  - OU farol ligado E motor desligado

### Variáveis:
- M = Motor (1 = ligado)
- P = Porta (1 = aberta)  
- F = Farol (1 = ligado)

### Fórmula:
Alarme = (M∧P) ∨ (F∧¬M)

### Desafio Extra:
Simplifique usando De Morgan. Existem formas mais eficientes?

## Verificação de Respostas

Use sempre a **Tabela Verdade** do ChipBuilder para verificar se seus circuitos estão corretos. Se duas implementações diferentes produzem a mesma tabela, são equivalentes!

---

*A prática é essencial - quanto mais você experimenta, mais intuitivas se tornam as Leis de De Morgan.*