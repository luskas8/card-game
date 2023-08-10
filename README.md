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