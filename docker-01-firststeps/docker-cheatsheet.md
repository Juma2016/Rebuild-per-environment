# Docker-Cheatsheet

Die Namen passen zu Beispiel 01. Befehle einzeln ausführen; `curl.exe` unter Linux/macOS durch `curl` ersetzen. Compose-Befehle gehören in den Ordner der jeweiligen `compose.yaml`.

## Engine und Image

| Befehl | Bedeutung / worauf achten? |
|---|---|
| `docker version` | Client **und Server** prüfen. Nur eine CLI-Version genügt nicht. |
| `docker context ls` | Zeigt, welche Engine angesprochen wird. |
| `docker build -t contdel-first:lesson05 .` | Image aus dem aktuellen Kontext bauen und taggen. |
| `docker build --progress=plain -t contdel-first:lesson05 .` | Lesbares Build-Log, z. B. für `CACHED` und tatsächlich ausgeführte Tests. |
| `docker image ls` | Lokale Images anzeigen; ein Tag ist ein veränderlicher Name. |
| `docker image inspect contdel-first:lesson05 --format '{{.Id}}'` | Identität des lokalen Image-Inhalts. |
| `docker history contdel-first:lesson05` | Image-Historie ansehen. Kein Beleg für Cache-Treffer des letzten Builds. |

## Container und Prüfung

```powershell
docker run -d --name contdel-l05-a -p 127.0.0.1:8300:3000 contdel-first:lesson05
```

`8300:3000` bedeutet **Host:Container**. `--name` benennt die Instanz, `-d` startet im Hintergrund. `EXPOSE` allein veröffentlicht nichts.

| Befehl | Bedeutung / worauf achten? |
|---|---|
| `docker ps` / `docker ps -a` | Laufende bzw. auch gestoppte Instanzen. |
| `docker logs --tail 20 contdel-l05-a` | stdout/stderr der Anwendung; `--follow` verfolgt neue Einträge, Strg+C beendet nur das Mitlesen. |
| `curl.exe -fsS http://localhost:8300/` | Fachliche Antwort prüfen; `/health` separat aufrufen. |
| `docker inspect contdel-l05-a --format '{{.Image}}'` | Image-ID, mit der diese Instanz erstellt wurde. |
| `docker inspect contdel-l05-a --format '{{json .State.Health}}'` | Probe, Status und letzte Health-Ergebnisse ansehen. |
| `docker exec contdel-l05-a id` | Einen zusätzlichen Befehl im laufenden Container ausführen. |
| `docker stop contdel-l05-a` / `docker start contdel-l05-a` | Vorhandene Instanz anhalten / erneut starten. |
| `docker rm contdel-l05-a` | Die vorher gestoppte eigene Instanz entfernen. Das Image bleibt. |

Ein fehlgeschlagener Build löscht ein altes Image nicht. Ein erfolgreicher Neubuild ersetzt einen laufenden Container ebenfalls nicht. Nach einem Buildfehler den Exitcode sofort lesen: PowerShell `$LASTEXITCODE`, Bash/zsh `echo $?`.

## Compose, Netzwerk und Daten

| Befehl | Bedeutung / worauf achten? |
|---|---|
| `docker compose config --quiet` | Konfiguration validieren, ohne aufgelöste Werte auszugeben. |
| `docker compose up --build -d --wait` | Bauen, erstellen und auf laufende/gesunde Services warten. Ohne Healthcheck bedeutet das nicht automatisch fachliche Bereitschaft. |
| `docker compose ps` | Services, Status und veröffentlichte Ports im Projekt. |
| `docker compose logs --tail 20 app` | Logs des genannten Service; in 04 z. B. `wordpress` oder `db`. |
| `docker compose exec app id` | Zusätzlicher Prozess im laufenden Service. |
| `docker compose up -d --no-build --force-recreate --wait` | Bei vorhandenem Image Konfiguration durch neue Instanzen übernehmen. |
| `docker compose stop` / `docker compose start` | Instanzen behalten; `start` liest geänderte Umgebungswerte nicht neu ein. |
| `docker compose down` | Projektcontainer und Netz entfernen, benannte Volumes behalten. |
| `docker volume ls` | Volumes auflisten, noch nichts löschen. |
| `docker compose config --volumes` | Die logischen Volume-Namen dieses Projekts anzeigen. |

Der Parameter `-p` wählt den Projektnamen: `docker compose -p contdel-wp-lab ps`. Verwenden Sie denselben Namen für Start, Prüfung und Stop. `down --volumes` löscht dessen Volumes und ist nur für einen ausdrücklich gewünschten Reset entbehrlicher Übungsdaten geeignet. Keine globalen Prune-Befehle für die Unterrichtsübungen verwenden.

[Docker CLI](https://docs.docker.com/reference/cli/docker/) · [Compose CLI](https://docs.docker.com/reference/cli/docker/compose/) · [Volumes](https://docs.docker.com/engine/storage/volumes/).

## Woher kommt die Health-Probe?

Ohne hinterlegte Probe erzeugt Docker keinen zusätzlichen Gesundheitsstatus. Ein Basisimage kann bereits einen Healthcheck mitbringen. Das Beispiel legt ihn im Dockerfile selbst fest; ausgeführt wird er erst im laufenden Container.

```powershell
docker image inspect contdel-first:lesson05 --format '{{json .Config.Healthcheck}}'
docker inspect contdel-l05-a --format '{{json .State.Health}}'
```

Bei einer deklarierten Probe gelten ohne eigene Optionen: Intervall 30 Sekunden, Timeout 30 Sekunden, drei aufeinanderfolgende Fehlversuche und keine Start-Kulanzzeit. Unser Beispiel setzt stattdessen 5 Sekunden Intervall, 3 Sekunden Timeout, 5 Sekunden Startzeit und fünf Fehlversuche. [Dockerfile HEALTHCHECK](https://docs.docker.com/reference/dockerfile/#healthcheck).

[Healthcheck-Labor](../docker-08-healthcheck/README.md): starting/healthy/unhealthy beobachten, Liveness und Readiness vergleichen sowie die Grenzen von Restart-Policy und Health nachweisen.
