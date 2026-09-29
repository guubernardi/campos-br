# Changelog

## 0.2.0

### Novidades
- Nova entrada `campos-br/validadores`: validadores, máscaras e busca de CEP **sem depender do Vue**. Funciona em React, Angular, Svelte, Node ou JavaScript puro.
- A entrada principal (`campos-br`) continua exportando tudo, como antes.

### Correções
- **CNPJ alfanumérico agora pode ser digitado.** Antes, as letras só entravam se o CNPJ fosse colado inteiro: ao digitar caractere a caractere, o campo tratava o valor como CPF (até 11 caracteres) e descartava as letras. Agora qualquer letra indica CNPJ.
- Letras nas posições dos dígitos verificadores e caracteres além do limite são descartados também no valor do `v-model`, não só na tela.
- `versao()` agora retorna a versão real do pacote (antes retornava `0.0.1` fixo).

## 0.1.0

- Primeiro release: `CampoDocumento` (CPF e CNPJ, inclusive alfanumérico), `CampoTelefone`, `CampoCep` com busca no ViaCEP e `CampoMoeda`, além de composables e funções puras.
