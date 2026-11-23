# 09 · Logging: überschaubarer Einstieg und optionaler Collector

## Ausgangspunkt

Der Einstieg verfolgt eine kleine ausführbare Kette: Anwendung → stdout/stderr → Docker-Logs. Anschließend können Sie einen einzelnen Eintrag an Fluentd senden und dessen Ausgabe sowie Datenablage untersuchen. Ein vollständiger Suchstack mit Elasticsearch und Kibana ist eine eigene Vertiefung; dafür sind zusammenpassende Versionen, Zugriffsschutz und eine konfigurierte Transportstrecke nötig.

## Grundübung

```powershell
docker compose up --build -d --wait
curl.exe http://localhost:3001/
curl.exe http://localhost:3001/missing
docker compose logs --tail 30 app
```

Jede Anfrage erzeugt einen JSON-Eintrag mit Methode und Pfad. Prüfen Sie, ob ein einzelner Eintrag die gewünschte Fehlersuche unterstützt. Die lokale Logging-Konfiguration begrenzt Dateigröße und Anzahl. Ein Log ist weder eine Metrik noch automatisch ein Alarm. Protokollieren Sie keine geheimen Werte.

## Optional: Fluentd verstehen

Starten Sie den Collector mit `docker compose --profile collector up -d --build`. Er besitzt **keinen veröffentlichten Port**. Senden Sie einen erfundenen Eintrag aus seinem Container:

```powershell
'{"message":"classroom event"}' | docker compose exec -T collector fluent-cat classroom.demo
docker compose logs --tail 20 collector
```

Der Eintrag wird auf stdout und in das eigene `collector-data`-Volume geschrieben. Das ist ein bewusster manueller Transportversuch, keine bereits automatisch angebundene App-Log-Pipeline. Verfolgen Sie den Eintrag anhand seines Texts und untersuchen Sie `/fluentd/log` im Collector.

## Stop und Daten

`docker compose --profile collector down` entfernt die Container. Das Volume behält Collector-Dateien; `down --volumes` wäre der bewusste Reset dieser Übungsdaten. Es gibt keine Datenbankmigration. Eine produktive Logging-Strecke benötigt zusätzlich Zugriffsschutz, Aufbewahrungsregeln, Transportabsicherung und eine konkrete Auswertungs-/Alarmstrategie.

[Docker logging](https://docs.docker.com/engine/logging/configure/) · [Fluentd forward input](https://docs.fluentd.org/input/forward) · [Fluentd file output](https://docs.fluentd.org/output/file)
