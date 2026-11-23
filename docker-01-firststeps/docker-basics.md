# Begriffe am ersten Beispiel

| Begriff | Im Beispiel | Nicht verwechseln mit |
|---|---|---|
| Dockerfile | Bauanleitung im Ordner `my-node-app` | dem bereits gebauten Image |
| Build-Kontext | Dateien aus dem abschließenden `.` beim Build, abzüglich `.dockerignore` | dem ganzen Rechner |
| Image | Anwendung und Laufzeit mit Startvorgaben | einem laufenden Prozess |
| Container | Eine Instanz dieses Images, laufend oder gestoppt | dem Image-Tag |
| Host-Port | `localhost:8300` im Browser | Port 3000 im Container |
| Healthcheck | Wiederholter Befehl im Container, Ergebnis als Health-Status | einem vollständigen Anwendungstest |
| Volume | In 03/04 gesondert verwaltete persistente Daten | einem automatischen Backup |

Arbeiten Sie die [Schritte aus 01](README.md) durch; dort werden die Begriffe mit echten Antworten und IDs geprüft. Die [Befehlsübersicht](docker-cheatsheet.md) ist zum Nachschlagen gedacht.

## Wann wirkt `.dockerignore`?

`docker build .` wählt zuerst den aktuellen Ordner als Build-Kontext. Die `.dockerignore` im Kontextordner filtert passende Dateien, bevor dieser Kontext an den Builder übergeben wird. Erst danach wählen `COPY` und `ADD` aus den verfügbaren Eingaben aus.

```text
Arbeitsordner -> Kontext auswählen -> .dockerignore filtern -> Builder -> COPY / ADD -> Image
```

Ein ignorierter Host-Ordner `node_modules` steht daher für `COPY . .` nicht zur Verfügung. `RUN npm ci` kann später im Image trotzdem neue Abhängigkeiten installieren. Die Regeln löschen keine lokalen Dateien, wirken nicht als `.gitignore` und entfernen nichts aus dem Basisimage. `COPY --from=...` kopiert aus einer anderen Build-Stage, nicht aus diesem lokalen Kontext.

Dockerfile und `.dockerignore` werden für den Build selbst weiterhin benötigt, auch wenn passende Regeln sie vom Kopieren ausschließen. [Build-Kontext und Ignore-Regeln](https://docs.docker.com/build/concepts/context/#dockerignore-files).
