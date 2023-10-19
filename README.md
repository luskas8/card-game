# Por Favor Não Corte Minha Cabeça! 👻

“Por Favor Não Corte Minha Cabeça!” é um jogo festivo carregado de sangue e risadas onde os jogadores tentam sobreviver a um acampamento de verão que está sendo aterrorizado pelo assassino Escalpo (GEEKS N’ ORCS, 2019).

Disponível para compra tanto na [Amazon](https://www.amazon.com.br/Favor-Corte-Cabe%C3%A7a-Geeks-Orcs/dp/B07WW254FF) quanto na [Steam](https://steamcommunity.com/sharedfiles/filedetails/?id=2081192874), o jogo de cartas simula um acampamento onde os jogadores disputam sua sobrevivência com o Escalpo de modo a coletar as “bolsinhas de vida” (pontos do jogo) de cada turno.

Uma vez que cada um dos jogadores foi o Escalpo do turno, vence o jogo aquele que possui mais pontos.

Neste repositório está contida uma representação deste jogo num ambiente online multijogador através de uma aplicação web utilizando sockets.

## Contribuindo para o projeto ✅

Como o projeto é feito em Javascript, é necessário possuir a versão 18.18.2 do [Node](https://nodejs.org/en).

Garanta que você possua a versão do Node especificada com o comando:

```bash
$ node -v
v18.18.2
```

Uma vez que a versão do Node esteja correta, obtém-se o código fonte da aplicação seguindo os seguintes passos:

```bash
$ git clone https://github.com/luskas8/card-game.git
$ cd card-game
$ npm run install-dev-deps
```

Certifique-se de criar um arquivo `.env` no diretório raiz da aplicação contendo as variáveis de ambiente presentes no arquivo `.env.example` ou então adicione estas variáveis direto no ambiente.

```bash
$ cp .env.example .env
```

Uma vez que o código fonte esteja na sua máquina, que as dependências do projeto estejam instaladas, e que as variáveis de ambiente estejam corretas, basta levantar aplicação com o comando:

```bash
$ npm run dev
```

## TO-DO 📝

-   [x] Remover informação de quem é o host do jogador `hostId = socketId`
-   [x] Cartas escolhidas estarem no turno e não no jogador `{'playerId': [<card-1>, <card-2>]}`
-   [x] Remover "ready"
-   [x] Escalpo ficar na Rodada (Round) (killerId = socketId)
-   [x] Criar função getKillerIds (função do Game)
-   [x] Remover `_playersNotWasKillerSocketID` e transformar numa função de `Game` que itera pelos players do jogo e dos killerIds da rodada
-   [x] Transformar `GameStates` em "o jogo foi iniciado ou não?" (booleano = wasGameStarted) (ajustar função start)
-   [x] Matar `inUse` e `playerSocketId` do `Character` e transformar em função de `Game (getAvailableCharacters)`
-   [x] Matar funções `reset` e `findByFavoriteAction` de Character
-   [x] Começar o jogo retorna o `killerId` e atribuí a ação favorita para o Zeca
-   [ ] Melhorar os testes das entidades
-   [x] Resetar o jogo quando já começou mas teve uma desconexão que resultou em menos jogadores que o mínimo permitido
-   [ ] Reconexão
