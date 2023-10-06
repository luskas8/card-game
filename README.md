# Initialization with Docker

## Build and run the Docker image

```bash
docker compose up
```

Your container will now be listed by Docker:

```bash
$ docker ps

CONTAINER ID   IMAGE         COMMAND                  CREATED          STATUS         PORTS                    NAMES        
0f85d7251da8   jogo-server                            20 minutes ago   Up 7 seconds   0.0.0.0:3000->3000/tcp   jogo-server-1
```

Print the output of your app:

```bash
# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Example
Running on http://localhost:3000
```

## TO-DO 📝
- [x] Remover informação de quem é o host do jogador `hostId = socketId`
- [x] Cartas escolhidas estarem no turno e não no jogador `{'playerId': [<card-1>, <card-2>]}`
- [x] Remover "ready"
- [x] Escalpo ficar na Rodada (Round) (killerId = socketId)
- [x] Criar função getKillerIds (função do Game)
- [x] Remover `_playersNotWasKillerSocketID` e transformar numa função de `Game` que itera pelos players do jogo e dos killerIds da rodada
- [x] Transformar `GameStates` em "o jogo foi iniciado ou não?" (booleano = wasGameStarted) (ajustar função start)
- [x] Matar `inUse` e `playerSocketId` do `Character` e transformar em função de `Game (getAvailableCharacters)`
- [x] Matar funções `reset` e `findByFavoriteAction` de Character
- [x] Começar o jogo retorna o `killerId` e atribuí a ação favorita para o Zeca
- [ ] Depois disso tudo... melhorar os testes de game utilizando TODAS as funções
- [x] Resetar o jogo quando já começou mas teve uma desconexão que resultou em menos jogadores que o mínimo permitido
- [ ] Desconectar pelo client side
- [x] Reconectar quando acontecer uma atualização pelo client side
