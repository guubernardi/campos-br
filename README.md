# campos-br

Componentes Vue 3 para formulários brasileiros — **CPF, CNPJ, CEP, telefone e moeda**. Zero dependências de runtime, totalmente tipado e tematizável por CSS.

- ✅ Componentes prontos com máscara, validação e estado de erro
- ✅ Composables para usar a lógica em qualquer input próprio
- ✅ Funções puras de validação e máscara (sem Vue)
- ✅ Busca de endereço por CEP via [ViaCEP](https://viacep.com.br) (fonte injetável)
- ✅ Estilo opcional e 100% customizável via CSS custom properties

## Instalação

```bash
npm install campos-br
```

Requer Vue `^3.3` como peer dependency.

## Uso rápido

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { CampoDocumento, CampoTelefone, CampoCep, CampoMoeda } from 'campos-br'
import 'campos-br/estilo.css' // opcional, mas recomendado

const cpf = ref('')
const telefone = ref('')
const cep = ref('')
const preco = ref(0) // em centavos
</script>

<template>
  <CampoDocumento v-model="cpf" rotulo="CPF / CNPJ" obrigatorio />
  <CampoTelefone v-model="telefone" rotulo="Telefone" />
  <CampoCep v-model="cep" rotulo="CEP" @endereco-encontrado="(e) => console.log(e)" />
  <CampoMoeda v-model="preco" rotulo="Preço" />
</template>
```

> O CSS **não** é injetado automaticamente. Importe `campos-br/estilo.css` (ou estilize as classes você mesmo).

## Componentes

Todos os componentes compartilham as props base abaixo e expõem `v-model` (valor) e `v-model:valido` (booleano de validade).

| Prop          | Tipo      | Padrão          | Descrição                                |
| ------------- | --------- | --------------- | ---------------------------------------- |
| `rotulo`      | `string`  | —               | Texto do `<label>` (omitido se ausente). |
| `id`          | `string`  | —               | `id` do input (e `for` do label).        |
| `placeholder` | `string`  | —               | Placeholder do input.                    |
| `desabilitado`| `boolean` | `false`         | Desabilita o input.                      |
| `obrigatorio` | `boolean` | `false`         | Marca como obrigatório.                  |
| `mensagemErro`| `string`  | varia por campo | Mensagem exibida quando inválido.        |

O erro só aparece após o primeiro `blur` (campo "tocado").

### `CampoDocumento`

CPF ou CNPJ — detecta o formato automaticamente pela quantidade de dígitos. Suporta CNPJ alfanumérico. O `v-model` guarda o valor limpo (só dígitos, ou alfanumérico no CNPJ).

```vue
<CampoDocumento v-model="doc" v-model:valido="docValido" rotulo="Documento" />
```

### `CampoTelefone`

Telefone fixo `(00) 0000-0000` ou celular `(00) 00000-0000`. O `v-model` guarda apenas os dígitos.

```vue
<CampoTelefone v-model="tel" rotulo="Telefone" />
```

### `CampoCep`

Máscara `00000-000`. Ao completar um CEP válido, busca o endereço automaticamente e emite `endereco-encontrado`. O `v-model` guarda apenas os dígitos.

| Extra                       | Tipo                                  | Descrição                                   |
| --------------------------- | ------------------------------------- | ------------------------------------------- |
| prop `buscarEndereco`       | `(cep: string) => Promise<Endereco>`  | Fonte de busca customizada (padrão: ViaCEP).|
| evento `endereco-encontrado`| `(endereco: Endereco) => void`        | Disparado após busca bem-sucedida.          |

```vue
<CampoCep v-model="cep" rotulo="CEP" @endereco-encontrado="preencher" />
```

### `CampoMoeda`

Valor monetário em Real (`R$ 1.234,56`), digitação estilo calculadora (os dígitos preenchem da direita para a esquerda). O `v-model` guarda o valor em **centavos inteiros** (ex.: `R$ 1.234,56` → `123456`), evitando erros de ponto flutuante. É considerado válido quando maior que zero.

```vue
<CampoMoeda v-model="precoEmCentavos" rotulo="Preço" obrigatorio />
```

## Composables

Para usar a lógica com seu próprio markup. Recebem um `Ref` e retornam o valor mascarado, a validade e o handler de input.

```ts
import { ref } from 'vue'
import { useDocumento, useTelefone, useCep, useMoeda } from 'campos-br'

const cep = ref('')
const { mascarado, valido, aoDigitar, endereco, carregando, erro, buscar } = useCep(cep)
```

- `useDocumento(modelo: Ref<string>)` → `{ mascarado, valido, aoDigitar }`
- `useTelefone(modelo: Ref<string>)` → `{ mascarado, valido, aoDigitar }`
- `useMoeda(modelo: Ref<number>)` → `{ mascarado, valido, aoDigitar }`
- `useCep(modelo: Ref<string>, opcoes?)` → `{ mascarado, valido, aoDigitar, endereco, carregando, erro, buscar }`

## Funções utilitárias

Funções puras, sem dependência do Vue:

```ts
import {
  validarCpf, validarCnpj, validarCep,
  mascararCpf, mascararCnpj, mascararCep, mascararTelefone, mascararMoeda,
  centavosDeTexto,
  apenasDigitos, apenasAlfanumerico,
  buscarCepViaCep, type Endereco,
} from 'campos-br'

validarCpf('529.982.247-25') // true
mascararMoeda(123456)        // "R$ 1.234,56"
centavosDeTexto('R$ 12,34')  // 1234
```

## Tematização

Os componentes usam classes prefixadas com `campos-br-` e variáveis CSS com valores neutros por padrão. Sobrescreva o que quiser:

```css
:root {
  --campos-br-cor-texto: #1f2933;
  --campos-br-cor-rotulo: #52606d;
  --campos-br-cor-borda: #cbd2d9;
  --campos-br-cor-foco: #3b82f6;
  --campos-br-cor-erro: #d64545;
  --campos-br-cor-fundo: #ffffff;
  --campos-br-cor-fundo-desabilitado: #f5f7fa;
  --campos-br-raio: 6px;
  --campos-br-espacamento: 0.25rem;
  --campos-br-preenchimento: 0.5rem 0.75rem;
  --campos-br-fonte: inherit;
  --campos-br-tamanho-fonte: 1rem;
}
```

## Contribuindo

Este projeto é **open source** e contribuições são muito bem-vindas! 🎉

Se você quiser melhorar a lib — corrigir um bug, adicionar um campo novo, melhorar a documentação ou os testes — é só:

1. Fazer um **fork** do repositório
2. Criar uma branch para a sua mudança (`git checkout -b minha-melhoria`)
3. Rodar os testes (`npm test`) e garantir que tudo passa
4. Abrir um **Pull Request** descrevendo o que mudou

Todo PR aceito entra na lib, e **quem contribui é adicionado aos créditos** abaixo. 💜

### Créditos

- [@guubernardi](https://github.com/guubernardi) — criador e mantenedor

## Licença

[MIT](./LICENSE)
