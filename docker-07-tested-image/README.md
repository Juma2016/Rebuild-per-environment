# 07 · Ein geprüftes Runtime-Image

Sie verwenden denselben Grußdienst wie in 01. Der neue Schwerpunkt ist das Dockerfile: Die Stage `verify` führt drei Tests aus, die Stage `runtime` übernimmt anschließend **nur** `app.js` aus diesem geprüften Stand. Die Kopierabhängigkeit ist entscheidend; eine unverbundene Test-Stage könnte BuildKit überspringen.

**Unterricht:** optionale gemeinsame Demonstration nach Lesson 05, Folie 33. Diese Vertiefung ersetzt nicht die beiden Kernübungen 01/02.

## 1. Was gegenüber 01 anders ist

| Stelle | Bedeutung |
|---|---|
| `FROM … AS verify` | Paketdateien, Anwendung und Tests werden hier verarbeitet. `RUN npm test` muss erfolgreich sein. |
| `FROM … AS runtime` | Zweiter Start aus dem Basisimage. Testquellen werden nicht automatisch übernommen. |
| `COPY --from=verify … /app/app.js` | Macht die Runtime von der geprüften Stage abhängig und kopiert nur die erforderliche Anwendung. |
| `USER node` / Healthcheck | Bleiben wie in 01; sie sind kein Ersatz für die Tests. |
| `compose.yaml` | Start auf Host-Port **8307**. Damit kollidiert diese optionale Demo nicht mit 01 auf 8300. |

## 2. Bauen, starten und Inhalt prüfen

Im Ordner `docker-07-tested-image`:

```powershell
docker compose up --build -d --wait
curl.exe -fsS http://localhost:8307/
curl.exe -fsS http://localhost:8307/health
docker compose exec app id
docker compose exec app node -e "console.log(require('node:fs').existsSync('/app/test'))"
docker image inspect contdel-tested:lesson05 --format '{{.Id}}'
```

Erwartet: Gruß und Health-JSON, Benutzer `node`, zuletzt `false` für das Testverzeichnis. Für einen sichtbar frischen Testlauf verwenden Sie vor dem Start `docker compose build --no-cache --progress plain`. Ein Cache-Treffer ist wiederverwendete Evidenz.

## 3. Rot/Grün an der richtigen Grenze

Ändern Sie **in einer separaten Übungskopie** die erwartete Statusantwort für `/missing` von 404 auf 418:

```powershell
docker build --target runtime -t contdel-test-failure .
$LASTEXITCODE
```

Bash/zsh liest sofort `echo $?`. Der Build muss scheitern. Ein altes Image oder ein laufender alter Container kann trotzdem vorhanden sein. Stellen Sie die Assertion wieder her und bauen Sie erneut. Die finale Stage muss von den bestandenen Tests abhängen, nicht nur neben ihnen im Dockerfile stehen.

## 4. Was damit noch nicht geprüft ist

Ein erfolgreicher Test in `verify` prüft die dort gestartete Anwendung. Ihre anschließenden Aufrufe prüfen zusätzlich den wirklich gestarteten Runtime-Stand und die Portzuordnung. Ein grünes `/health` belegt weiterhin keinen bestimmten Gruß. Beim Hauptordner-Schnellstart wird dieses Dockerfile ebenfalls verwendet, dort aber bewusst unter Port 3000 und einem eigenen Image-Namen.

## 5. Betrieb und Abschluss

Logs: `docker compose logs --tail 20 app`; Stop/Fortsetzen: `docker compose stop` / `start`; Instanzen entfernen: `docker compose down`. Es gibt keine persistenten Daten oder Migrationen. `read_only`, `cap_drop` und der Non-Root-Benutzer begrenzen Rechte. Der feste Patchtag dokumentiert den Basisstand; für eine unveränderliche Veröffentlichung benötigen Sie zusätzlich einen Registry-Digest.

Passende Fälle: [AP15, AP16 und AP17](../lessons/lesson-05/anti-patterns/README.md). [Multi-Stage Builds](https://docs.docker.com/build/building/multi-stage/) · [Dockerfile HEALTHCHECK](https://docs.docker.com/reference/dockerfile/#healthcheck).
