# Changelog

## 0.2.0

### Novidades
- Nova entrada `campos-br/validadores`: validadores, máscaras e busca de CEP **sem depender do Vue**. Funciona em React, Angular, Svelte, Node ou JavaScript puro.
- A entrada principal (`campos-br`) continua exportando tudo, como antes.

### Correções
- `versao()` agora retorna a versão real do pacote (antes retornava `0.0.1` fixo).

## 0.1.0

- Primeiro release: `CampoDocumento` (CPF e CNPJ, inclusive alfanumérico), `CampoTelefone`, `CampoCep` com busca no ViaCEP e `CampoMoeda`, além de composables e funções puras.
