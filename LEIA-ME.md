# Um Pelo Outro Fazendo o Bem — guia do site e dos conceitos aplicados

## Estrutura de arquivos

```
site2/
├── index.html      → Início (funciona como hub/mapa de nós)
├── acoes.html        → Ações (registro de atividades)
├── doacoes.html        → Doações (PIX + cartão)
├── contato.html          → Contato (WhatsApp, e-mail, Instagram)
└── assets/
    ├── css/style.css    → Todo o visual (cores, tipografia, componentes)
    ├── js/main.js         → Loader, PIX, acessibilidade, validação
    └── img/logo.png         → Sua logo oficial
```

Mesma lógica de sempre: abrir os `.html` no navegador pra ver, editar no VSCode. Nada de instalação.

---

## Onde cada conceito das aulas foi aplicado

### 1. Hipertexto e construção não linear
A página **Início** foi construída literalmente como o material descreve: **nós** (blocos de conteúdo) conectados por **links**, sem uma ordem obrigatória de leitura. A seção "Para onde você quer ir?" apresenta 4 cards — cada um é um nó que leva a uma página específica (Ações, Doações, Contato) ou a uma âncora na própria página (Quem somos). O texto da própria seção já avisa: "não existe ordem certa" — reforçando a não linearidade como princípio de navegação, não só como recurso técnico.

### 2. As 10 heurísticas de usabilidade (Nielsen)
- **Visibilidade do status do sistema**: mensagens de sucesso nos formulários, botão de PIX que muda para "Copiado ✓", tela de carregamento.
- **Controle e liberdade do usuário**: menu sempre visível, breadcrumb visual pelo link ativo no menu, sem "becos sem saída".
- **Consistência e padrões**: mesmo cabeçalho, rodapé, cores e componentes em todas as páginas.
- **Prevenção de erros**: formulários validam campo a campo antes de enviar, com mensagem clara do que falta.
- **Reconhecimento em vez de memorização**: ícones + texto em todos os botões e cards (nunca só ícone).
- **Estética minimalista**: paleta reduzida a 4 cores, bastante espaço em branco, sem elementos decorativos supérfluos.
- **Diagnóstico e correção de erros**: campo com erro fica com borda vermelha e uma frase explicando o que corrigir, não só um "X".

### 3. Princípios de usabilidade
- **Clareza na arquitetura da informação**: hierarquia visual clara (eyebrow → título → texto), cores usadas como "legenda" (dourado só em detalhe/destaque pequeno).
- **Regra dos 3 cliques**: qualquer página está a no máximo 1 clique do menu principal.
- **Simplicidade**: nenhuma página tem mais do que o necessário — sem carrosséis, pop-ups ou excesso visual.
- **Tempo de carregamento**: a tela de carregamento personalizada foi propositalmente feita **rápida** (menos de 1 segundo) — ela existe para dar identidade visual, não para atrasar o usuário, respeitando a recomendação de 5-7 segundos como limite máximo.

### 4. Interatividade (do clique à coautoria)
O site evita ser só "decorativo": tem elementos que respondem à ação do usuário — abas de pagamento que trocam de conteúdo, botão de copiar PIX com feedback visual, valores de doação clicáveis que atualizam um resumo em tempo real, barra de acessibilidade funcional. São formas simples de interação mútua, não apenas cliques que só "transportam" a pessoa de um lugar a outro.

### 5. Hibridismo / integração de mídias
O site não tenta ser a única porta de entrada: ele se conecta ativamente ao **Instagram** (link no menu, rodapé e página de contato), ao **WhatsApp** (botão flutuante fixo em todas as páginas — o "acesso físico-digital rápido" mencionado no material como característica do phygital) e ao e-mail. A ideia é que o site seja o hub que costura os canais já usados pela Associação, e não um substituto isolado deles.

### 6. Acessibilidade (WCAG)
- **Perceptível**: `alt` em todas as imagens, contraste de cor testado entre texto e fundo, ícones sempre acompanhados de texto.
- **Operável**: link de "pular para o conteúdo" (skip link) no topo de cada página, foco de teclado visível (contorno dourado), toda a navegação funciona sem mouse.
- **Compreensível**: linguagem simples e direta, mensagens de erro específicas, formulários com rótulos claros.
- **Robusto**: HTML semântico (`<header>`, `<nav>`, `<main>`, `<footer>`), atributos ARIA nos elementos interativos.
- Incluí também uma **barra de acessibilidade** funcional no topo (aumentar/diminuir fonte, alternar alto contraste) — um passo além do mínimo técnico, na linha do que o material chama de "não é checklist, é parte do design desde o início".

---

## O que ainda precisa ser preenchido com conteúdo real

Marquei claramente no próprio site (selo amarelo "⚠ modelo") tudo que está com espaço reservado:

- **Fotos reais** dos projetos (Cozinha Solidária, Projeto Ginástica, reforço escolar, farmácia solidária, campanhas) — hoje estão com emoji + aviso de placeholder.
- **Número real de WhatsApp** — hoje está `5511999999999`, que é fictício. Procure `wa.me/5511999999999` no VSCode (Ctrl+Shift+H) e troque em todos os arquivos pelo número real, no formato `55` + DDD + número, sem espaços ou símbolos.
- **Chave PIX real** — está em `doacoes.html`, na `div id="pix-key"`.
- **E-mail real** — hoje é `contato@umpelooutro.org.br` (fictício), aparece em `contato.html`.
- **Relatos de participantes** (como os mencionados no briefing sobre o Projeto Ginástica) — o material fala que podem ser usados mediante autorização; sugiro adicionar depois de confirmado com a Associação, respeitando a privacidade pedida no briefing.

---

## Sobre o pagamento por cartão

Assim como no site anterior, a aba de cartão na página de Doações é **só visual** — não processa cobrança real. Quando quiserem deixar funcional de verdade, o caminho mais direto é integrar com o **Mercado Pago** (bastante usado no Brasil e com boa documentação em português) ou o **PagSeguro**. Me chama quando chegar essa etapa.
