# SorrisoConecta

**Cada apoio encontra um caminho para fazer o bem.**

Protótipo acadêmico do Challenge Turma do Bem, FIAP, Sprint 2. O projeto organiza apoiadores, campanhas locais e o histórico de relacionamento. O Radar de Apoio demonstra uma prioridade explicável com interesse, compatibilidade e tempo sem contato.

## Tecnologias

HTML5, CSS3 e JavaScript próprios. Não há frameworks, fontes remotas, bibliotecas externas ou conexão com servidor. Os SVGs foram desenhados para a proposta. Fonte de sistema: Arial/sans-serif.

## Como abrir

Extraia a pasta e abra `index.html` no navegador. Os links são relativos e funcionam sem instalação. O layout se adapta a celular, tablet e desktop. O menu compacto aparece até 991px. As demais media queries ajustam grades, textos e espaçamentos.

## Páginas

- `index.html`: apresentação e caminho de apoio.
- `integrantes.html`: identificação do integrante e responsabilidades.
- `sobre.html`: problema, proposta, tecnologias e roadmap.
- `faq.html`: dúvidas frequentes, usando details/summary do HTML.
- `contato.html`: formulário demonstrativo com labels e validação própria em JavaScript.
- `campanhas.html`: três campanhas fictícias e modalidades de apoio.
- `radar.html`: classificação explicável e próxima ação da equipe.
- `css/style.css`: identidade e componentes compartilhados.
- `js/site.js`: menu responsivo, formulário, filtro de campanhas e radar interativo.
- `imagens/`: símbolo, rede de apoio e foto real do integrante.

## Autor

Henrique dos Santos Ramalho · RM 575759 · 1TDSPA · FIAP.

GitHub: https://github.com/henriqueramalho299

LinkedIn: https://www.linkedin.com/in/henrique-ramalho-aa54752b0/

Foto: `imagens/henrique.jpg`.

![Henrique dos Santos Ramalho](imagens/henrique.jpg)

## Identidade e imagens

![Símbolo do SorrisoConecta](imagens/simbolo.svg)

![Rede de apoio](imagens/rede-apoio.svg)

As imagens SVG são locais e não representam a marca oficial da Turma do Bem. Os nomes, números e campanhas da demonstração são fictícios.

## Repositório e visualização pública

Repositório GitHub: https://github.com/henriqueramalho299/sorrisoconecta

GitHub Pages: https://henriqueramalho299.github.io/sorrisoconecta/

Pitch da Sprint 1: https://youtu.be/68RVOxgvufc

Backlog e planejamento no Trello: https://trello.com/b/6kFLrs30/sorrisoconecta-backlog-e-sprints

O repositório registra a evolução do SorrisoConecta. A publicação pública pode apresentar a versão consolidada mais recente disponível na branch principal.

## Contato

Contato do autor pelo perfil GitHub informado acima. O formulário `contato.html` é uma demonstração, não uma caixa de mensagens. A validação é feita em JavaScript, sem o atributo required. O evento de envio é bloqueado e os dados não são adicionados à URL. Não há envio ou armazenamento. Use somente exemplos fictícios.

## Escopo

O site não coleta dinheiro, não seleciona beneficiários e não automatiza contato nesta sprint. Os exemplos do radar são consistentes com os dados iniciais do Python. A autorização para contato é uma regra do protótipo e não representa uma certificação de conformidade legal.


Crédito do contexto: enunciado FIAP, “1TDS Agosto - TDB - Sprint 1 e 2_v3”. Implementação e ilustrações com apoio de IA.


## Direção visual

Interface com fundo grafite, detalhes coral, tipografia ampla e painel de relacionamento com efeitos em CSS. Composição editorial de autoria do projeto, mantendo a identidade visual Dark Premium aprovada na Sprint 1; os elementos e o conteúdo são próprios do SorrisoConecta.

As transições, rolagem suave e movimentos decorativos usam apenas CSS. A preferência de movimento reduzido desativa os efeitos. O JavaScript fica em arquivo externo e não usa bibliotecas.

## Funcionalidades da Sprint 2

Menu que abre e fecha com botão e Escape; validação por campo; filtro de campanhas; preenchimento de modalidade e programa ao escolher uma campanha; radar com busca, troca de campanha, recálculo após contato e restauração dos exemplos. As alterações do radar duram até recarregar a página.
