# Dicas Específicas para o ChipBuilder

## Experimentando as Leis de De Morgan

### 1. Comparação Visual de Circuitos
**Técnica**: Construa dois circuitos equivalentes lado a lado

**Exemplo Prático**:
- **Circuito A**: A → NAND ← B → Saída
- **Circuito B**: A → NOT → OR ← NOT ← B → Saída

**Observação**: As conexões ficam azuis quando ativas - veja como os padrões são idênticos!

### 2. Usando a Tabela Verdade como Prova
**Procedimento**:
1. Construa o primeiro circuito
2. Gere a tabela verdade
3. Limpe o canvas
4. Construa o circuito equivalente
5. Gere a nova tabela
6. Compare - devem ser idênticas!

### 3. Salvando Padrões Úteis
**Dica**: Salve implementações comuns como chips personalizados

**Chips Recomendados**:
- **NAND-OR**: OR implementado com NAND
- **NOR-AND**: AND implementado com NOR
- **XOR-Básico**: XOR feito com AND/OR/NOT

## Organizando Experimentos

### Estrutura de Teste Sugerida:
1. **Entradas**: Use rótulos claros (A, B, C...)
2. **Saídas**: Nomeie com função (NAND_AB, OR_AB...)
3. **Divisores**: Separe seções diferentes do circuito

### Nomenclatura Eficiente:
- **Entradas**: A, B, C, D (para testes básicos)
- **Saídas**: S1, S2, S3 (para múltiplas saídas)
- **Grupos**: Use divisores para separar circuitos de teste

## Exercícios Guiados no ChipBuilder

### Exercício 1: Primeira Lei de De Morgan
**Setup**:
```
Entradas: A, B
Saída S1: NAND(A,B) [se tiver NAND disponível]
Saída S2: OR(NOT(A), NOT(B))
```

**Verificação**: S1 e S2 devem ter valores idênticos sempre!

### Exercício 2: Construindo AND com OR
**Setup**:
```
Entradas: A, B
NOT_A ← A
NOT_B ← B
OR_temp ← OR(NOT_A, NOT_B)
S1 ← NOT(OR_temp)
S2 ← AND(A, B) [para comparação]
```

### Exercício 3: Detector de Igualdade
**Objetivo**: Acender LED quando A=B

**Implementação**:
```
Entradas: A, B
XNOR_manual: AND(OR(NOT_A, B), OR(A, NOT_B))
Saída: S_igual
```

**Teste**: Deve ser 1 apenas quando A=B

## Técnicas de Debugging

### 1. Conexões com Problema
**Sintoma**: Edge não fica azul quando deveria
**Causa**: Lógica incorreta ou conexão perdida
**Solução**: Trace o caminho desde a entrada

### 2. Tabela Verdade Inesperada
**Sintoma**: Resultados não batem com expectativa
**Solução**: 
- Verifique conexões uma por uma
- Teste subcircuitos isoladamente
- Compare com implementação simples conhecida

### 3. Circuitos Complexos
**Estratégia**: Divida em blocos menores
1. Teste cada bloco separadamente
2. Salve blocos funcionais como chips
3. Monte o circuito final com chips salvos

## Padrões de Teste Recomendados

### Para 2 Entradas:
```
A=0, B=0
A=0, B=1
A=1, B=0  
A=1, B=1
```

### Para 3 Entradas:
```
A=0, B=0, C=0
A=0, B=0, C=1
A=0, B=1, C=0
A=0, B=1, C=1
A=1, B=0, C=0
A=1, B=0, C=1
A=1, B=1, C=0
A=1, B=1, C=1
``````

### Teste Sistemático:
Use a tabela verdade automática para evitar erros manuais!

## Projetos Sugeridos

### Projeto 1: Biblioteca de Portas
**Objetivo**: Criar todos os tipos de porta usando apenas NAND

**Chips para Salvar**:
- NOT_NAND
- AND_NAND  
- OR_NAND
- XOR_NAND

### Projeto 2: Comparador 2-bit
**Especificação**: Duas entradas de 2 bits, saídas A>B, A=B, A<B

### Projeto 3: Codificador de Prioridade
**Especificação**: 4 entradas, saída binária da entrada mais alta ativa

## Dicas de Performance

### 1. Minimize Conexões Longas
- Posicione portas relacionadas próximas
- Use chips salvos para reduzir complexidade visual

### 2. Aproveite Simetrias
- De Morgan mostra que muitos circuitos têm formas duais
- Se um layout é confuso, tente a forma De Morgan

### 3. Documentação
- Use rótulos descritivos nas entradas/saídas
- Salve circuitos de exemplo para referência futura

---

*O ChipBuilder é sua bancada de experimentos - use-o para tornar tangíveis os conceitos abstratos da lógica digital!*
