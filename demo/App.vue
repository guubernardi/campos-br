<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  CampoCep,
  CampoDocumento,
  CampoMoeda,
  CampoTelefone,
  mascararMoeda,
  type Endereco,
} from 'campos-br'

const documento = ref('')
const documentoValido = ref(false)
const telefone = ref('')
const telefoneValido = ref(false)
const cep = ref('')
const cepValido = ref(false)
const endereco = ref<Endereco | null>(null)
const preco = ref(0)
const precoValido = ref(false)

const exemplos = [
  { rotulo: 'CNPJ alfanumérico', valor: '12ABC34501DE35', novo: true },
  { rotulo: 'CNPJ numérico', valor: '11222333000181' },
  { rotulo: 'CPF', valor: '52998224725' },
  { rotulo: 'Inválido', valor: '12ABC34501DE00' },
]

function preencherDocumento(valor: string): void {
  documento.value = valor
}

const temas = {
  Neutro: {},
  Verde: {
    '--campos-br-cor-foco': '#009c3b',
    '--campos-br-cor-borda': '#b7dfc4',
    '--campos-br-raio': '12px',
  },
  Roxo: {
    '--campos-br-cor-foco': '#820ad1',
    '--campos-br-cor-borda': '#d9c2ec',
    '--campos-br-raio': '999px',
    '--campos-br-preenchimento': '0.6rem 1rem',
  },
  Escuro: {
    '--campos-br-cor-texto': '#f1f5f9',
    '--campos-br-cor-rotulo': '#94a3b8',
    '--campos-br-cor-borda': '#334155',
    '--campos-br-cor-foco': '#38bdf8',
    '--campos-br-cor-fundo': '#0f172a',
    '--campos-br-raio': '8px',
  },
} as const
type NomeTema = keyof typeof temas
const tema = ref<NomeTema>('Neutro')

const estado = computed(() => ({
  documento: { valor: documento.value, valido: documentoValido.value },
  telefone: { valor: telefone.value, valido: telefoneValido.value },
  cep: { valor: cep.value, valido: cepValido.value },
  preco: { centavos: preco.value, formatado: mascararMoeda(preco.value), valido: precoValido.value },
}))

const instalacao = 'npm install campos-br'
const copiado = ref(false)
async function copiar(): Promise<void> {
  try {
    await navigator.clipboard.writeText(instalacao)
    copiado.value = true
    setTimeout(() => (copiado.value = false), 1500)
  } catch {
    // Sem permissão de área de transferência: o texto continua selecionável.
  }
}
</script>

<template>
  <header class="topo">
    <div class="container topo__conteudo">
      <a class="marca" href="#">
        <span class="marca__icone" aria-hidden="true">✓</span>
        campos-br
      </a>
      <nav class="topo__links">
        <a href="https://github.com/guubernardi/campos-br">GitHub</a>
        <a href="https://www.npmjs.com/package/campos-br">npm</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="hero container">
      <span class="selo">🇧🇷 Pronto para o CNPJ alfanumérico</span>
      <h1>Campos de formulário brasileiros para Vue&nbsp;3</h1>
      <p class="hero__texto">
        CPF, CNPJ, CEP, telefone e moeda com máscara, validação e estado de erro prontos.
        Zero dependências, tipado e tematizável por CSS.
      </p>
      <div class="hero__acoes">
        <button class="instalar" type="button" @click="copiar">
          <code>{{ instalacao }}</code>
          <span class="instalar__dica">{{ copiado ? 'Copiado!' : 'Copiar' }}</span>
        </button>
        <a class="botao botao--secundario" href="https://github.com/guubernardi/campos-br">⭐ Dar uma estrela no GitHub</a>
      </div>
    </section>

    <section class="container playground">
      <div class="cartao" :style="temas[tema]" :class="{ 'cartao--escuro': tema === 'Escuro' }">
        <div class="cartao__cabecalho">
          <h2>Experimente</h2>
          <div class="temas" role="group" aria-label="Tema dos campos">
            <button
              v-for="(_, nome) in temas"
              :key="nome"
              type="button"
              class="tema"
              :class="{ 'tema--ativo': tema === nome }"
              @click="tema = nome"
            >
              {{ nome }}
            </button>
          </div>
        </div>

        <div class="campos">
          <div class="campo-bloco">
            <CampoDocumento
              id="documento"
              v-model="documento"
              v-model:valido="documentoValido"
              rotulo="CPF ou CNPJ"
              placeholder="Digite ou use um exemplo"
            />
            <div class="exemplos">
              <button
                v-for="exemplo in exemplos"
                :key="exemplo.rotulo"
                type="button"
                class="exemplo"
                :class="{ 'exemplo--novo': exemplo.novo }"
                @click="preencherDocumento(exemplo.valor)"
              >
                {{ exemplo.rotulo }}
              </button>
            </div>
          </div>

          <CampoTelefone id="telefone" v-model="telefone" v-model:valido="telefoneValido" rotulo="Telefone" placeholder="(00) 00000-0000" />

          <div class="campo-bloco">
            <CampoCep
              id="cep"
              v-model="cep"
              v-model:valido="cepValido"
              rotulo="CEP"
              placeholder="00000-000"
              @endereco-encontrado="(e) => (endereco = e)"
            />
            <p v-if="endereco" class="endereco">
              📍 {{ endereco.logradouro || 'CEP geral' }}, {{ endereco.bairro }} · {{ endereco.cidade }}/{{ endereco.estado }}
            </p>
          </div>

          <CampoMoeda id="preco" v-model="preco" v-model:valido="precoValido" rotulo="Valor" placeholder="R$ 0,00" />
        </div>
      </div>

      <div class="cartao cartao--codigo">
        <h2>Estado ao vivo</h2>
        <p class="legenda">O que chega no seu <code>v-model</code>: só o valor limpo, sem máscara.</p>
        <pre><code>{{ JSON.stringify(estado, null, 2) }}</code></pre>
      </div>
    </section>

    <section class="container grade">
      <article class="cartao">
        <h2>CNPJ alfanumérico</h2>
        <p>
          Desde julho de 2026 a Receita Federal emite CNPJs com letras nas 12 primeiras posições.
          Validadores antigos, que só aceitam números, recusam esses documentos.
        </p>
        <p>
          O <code>campos-br</code> já valida e mascara os dois formatos, detectando o tipo sozinho.
        </p>
        <pre><code>validarCnpj('12.ABC.345/01DE-35') // true
mascararCnpj('12abc34501de35')   // '12.ABC.345/01DE-35'</code></pre>
      </article>

      <article class="cartao">
        <h2>Sem Vue? Também serve</h2>
        <p>Validadores e máscaras são funções puras. Use em React, Angular, Svelte ou Node:</p>
        <pre><code>import {
  validarCpf,
  validarCnpj,
  mascararTelefone,
} from 'campos-br/validadores'</code></pre>
      </article>

      <article class="cartao">
        <h2>Uso no Vue</h2>
        <pre><code>&lt;script setup&gt;
import { CampoDocumento } from 'campos-br'
import 'campos-br/estilo.css'
const cpf = ref('')
&lt;/script&gt;

&lt;template&gt;
  &lt;CampoDocumento v-model="cpf" rotulo="CPF" /&gt;
&lt;/template&gt;</code></pre>
      </article>
    </section>
  </main>

  <footer class="rodape container">
    <p>
      MIT · feito por <a href="https://github.com/guubernardi">@guubernardi</a> ·
      <a href="https://github.com/guubernardi/campos-br/issues">contribua</a>
    </p>
  </footer>
</template>
