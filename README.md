# Dra. Raele Alves — Landing Page

Documentação técnica da Landing Page de harmonização glútea da Dra. Raele Alves.

---

## Estrutura de Pastas

```
Dra Raele/
├── index.html       # Estrutura HTML da LP
├── styles.css       # Estilos (variáveis, layout, responsividade)
├── script.js        # Validação de formulário, máscaras, animações
├── favicon.svg      # Ícone da aba do navegador
├── README.md        # Este arquivo
└── img/
    ├── img.png      # Imagem hero — desktop
    ├── imgmb.png    # Imagem hero — mobile
    └── (outras imagens conforme necessário)
```

---

## Bibliotecas e Dependências

| Recurso | Origem | Finalidade |
|---|---|---|
| Google Fonts (Roboto + Open Sans) | CDN Google | Tipografia |
| CSS Custom Properties | Nativo | Tokens de design centralizados |
| Intersection Observer API | Nativo | Animações de entrada |
| Web Share / `wa.me` | WhatsApp | Envio de lead via mensagem |

Sem dependências de pacotes npm. Projeto 100% vanilla HTML/CSS/JS.

---

## Seções da LP

### Dobra 1 — Hero
- **Arquivos:** `index.html` (seção `.hero`), `styles.css` (bloco `DOBRA 1`)
- **Imagens:** `img/img.png` (desktop), `img/imgmb.png` (mobile — carregada via media query CSS)
- **Funcionalidade:** Apresentação principal com título, subtítulo e CTA que ancora no formulário.
- **Notas:** O overlay gradiente é aplicado via `.hero__overlay` para garantir legibilidade do texto sobre qualquer imagem.

### Dobra 2 — Procedimentos (Bento Grid)
- **Arquivos:** `index.html` (seção `.procedimentos`), `styles.css` (bloco `DOBRA 2`)
- **Funcionalidade:** Exibe os 3 tratamentos em layout Bento Grid (12 colunas). Card destacado ocupa 7 colunas; os demais se adaptam. Em mobile colapsa para coluna única.
- **Notas:** Os placeholders de cor serão substituídos por fotos antes/depois reais na pasta `img/`.

### Dobra 3 — Formulário
- **Arquivos:** `index.html` (seção `.formulario`), `styles.css` (bloco `DOBRA 3`), `script.js` (validação + envio)
- **Funcionalidade:** Coleta nome, WhatsApp, procedimento de interesse e histórico estético. Ao enviar, abre conversa no WhatsApp com os dados pré-preenchidos.
- **Segurança:** Inputs sanitizados via `sanitizeText()` (remoção de `< > " '`). Validação no front-end para nome (mín. 3 chars) e telefone (10–11 dígitos). Máscara automática no campo WhatsApp.
- **Notas:** Substituir `NUMERO_CLINICA` em `script.js` pelo número real da clínica (formato: `5511999999999`).

### Dobra 4 — Sobre a Dra. Raele
- **Arquivos:** `index.html` (seção `.sobre`), `styles.css` (bloco `DOBRA 4`)
- **Funcionalidade:** Bio da médica com estatísticas em badge flutuante e CTA secundário.
- **Notas:** O placeholder `.sobre__foto` deve ser substituído por `<img src="img/dra-raele.jpg" alt="Dra. Raele Alves">`.

---

## Integrações

### Meta Pixel (Etapa 5 — pendente)
Blocos comentados aguardando as credenciais:
- `index.html` — snippet de inicialização do Pixel + evento `PageView`
- `script.js` — evento `Lead` disparado no submit do formulário

Para ativar: descomente os blocos marcados com `ETAPA 5` e substitua `SEU_PIXEL_ID_AQUI` pelo ID real.

### WhatsApp (ativo)
O formulário redireciona para `https://wa.me/NUMERO?text=mensagem` com os dados do lead pré-formatados. Número configurado na variável `NUMERO_CLINICA` em `script.js`.

---

## Responsividade

| Breakpoint | Comportamento |
|---|---|
| Mobile `< 768px` | Hero troca para `imgmb.png`; Bento Grid colapsa para 1 coluna; stats do "Sobre" passam para inline |
| Tablet `768px–1023px` | Bento Grid passa para coluna única; formulário e "Sobre" empilham verticalmente |
| Desktop `≥ 1024px` | Layout completo com Bento Grid de 12 colunas e two-column side-by-side |

Testado com Chrome DevTools nos viewports: 320px, 375px, 768px, 1024px, 1440px.

---

## Segurança

- **XSS:** `sanitizeText()` remove `< > " '` antes de usar qualquer valor de input em strings.
- **Links externos:** Todos com `rel="noopener noreferrer"`.
- **Dados sensíveis:** Nenhuma credencial no repositório; IDs do Pixel são inseridos apenas em produção.
- **CSRF:** Não aplicável (sem backend próprio — envio via WhatsApp).
- **HTTPS:** Todos os CDNs e links externos já usam HTTPS.

---

## Como Adicionar uma Nova Seção

1. Adicione o bloco `<section>` em `index.html` na ordem desejada, com `id` e `aria-label` descritivos.
2. Crie o bloco de estilos correspondente em `styles.css` com comentário `/* DOBRA N — NOME */`.
3. Se necessário, adicione o seletor ao array `animEls` em `script.js` para a animação de entrada.
4. Documente aqui no README.

---

## Checklist de Entrega

- [ ] Imagens reais inseridas na pasta `img/` e referenciadas no HTML/CSS
- [ ] `NUMERO_CLINICA` em `script.js` atualizado
- [ ] Etapa 5 (Meta Pixel) configurada e testada com Meta Pixel Helper
- [ ] Código validado — HTML: W3C Validator | CSS: CSS Validator
- [ ] Testado em Chrome, Firefox, Safari (mobile e desktop)
- [ ] Imagens otimizadas (WebP recomendado, compressão sem perda)
- [ ] ZIP gerado: `DraRaele_LP_YYYY-MM-DD.zip`
