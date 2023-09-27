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

1. Remover informação de quem é o host do jogador `hostId = socketId`
2. Cartas escolhidas estarem no turno e não no jogador `{'playerId': [<card-1>, <card-2>]}`
3. Remover "ready"
4. Escalpo ficar na Rodada (Round) (killerId = socketId)
5. Criar função getKillerIds (função do Game)
6. Remover `_playersNotWasKillerSocketID` e transformar numa função de `Game` que itera pelos players do jogo e dos killerIds da rodada
7. Transformar `GameStates` em "o jogo foi iniciado ou não?" (booleano = wasGameStarted) (ajustar função start)
8. Matar `inUse` e `playerSocketId` do `Character` e transformar em função de `Game (getAvailableCharacters)`
9. Depois disso tudo... melhorar os testes de game utilizando TODAS as funções
10. Matar funções `reset` e `findByFavoriteAction` de Character