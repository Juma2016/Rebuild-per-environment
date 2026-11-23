# Arbeitsauftrag Compose und Registry: 24.11.2026

**13:15-15:30 · Online. Wiedersehen um 14:15 und 15:00 im selben Besprechungsraum.**

## Ziel und Vorbereitung

Sie unterscheiden Image-Inhalt, Laufzeitkonfiguration, Netzwerk und persistente Daten. Sie geben dasselbe getestete Image über eine Registry weiter. Bereiten Sie Docker/Compose, das grüne Release-Board-Image und die freigegebene Registry-Anmeldung vor. Laden Sie die Basisimages vorab mit `docker compose pull db` und `docker compose build --pull wordpress` im Ordner `docker-04-compose`; die lokalen Laborwerte aus `.env` müssen dafür gesetzt sein. Arbeiten Sie in eigenen Übungskopien; benutzen Sie für WordPress einen neuen Projektnamen, etwa `contdel-wp-lab`. Verwenden Sie nur erfundene Laborinhalte und lokale Testpasswörter.

## 1. Konfiguration ändern, Image erhalten · 13:30-14:15

**Repo-Wechsel: `delivery-pipeline-example`.** Notieren Sie `docker image inspect release-board:1.0.0 --format '{{.Id}}'`. Kopieren Sie `.env.example` bei einem frischen Labor zu `.env`, ohne vorhandene eigene Werte zu überschreiben. Lassen Sie `RELEASE_TAG=1.0.0` und ändern Sie ausschließlich `APP_VERSION=1.0.1`.

```powershell
docker compose config --quiet
docker compose up -d --no-build --wait
curl.exe -fsS http://localhost:3000/api/release
docker compose images
```

Erwartung: neue angezeigte Version, unverändertes Image. `APP_VERSION` ist eine Konfiguration, kein Beweis für eine andere Anwendung. Lesen Sie die aufgelöste Konfiguration lokal, zeigen Sie aber keine geheimen Werte. Eine Änderung in `.env` wird durch Neuerstellung des Containers wirksam; `restart` allein übernimmt geänderte Umgebungswerte nicht. Beenden Sie dieses Projekt mit `docker compose down`.

Für einen kleinen Vorversuch ohne Release Board können Sie [06: Laufzeitkonfiguration](../../docker-06-environment-variables/README.md) auf Port 8306 verwenden. Der gemeinsame Pflichtnachweis bleibt das Release Board.

## 2. Netzwerk und persistente Daten am vorhandenen Beispiel

Wenn Service-Namen oder Volumes noch unklar sind, zeigt [03: Web und Counter](../../docker-03-network-volume/README.md) dieselbe Grenze mit zwei kleinen Prozessen. Es ist eine gezielte Hilfsübung, kein zusätzliches Pflichtprojekt vor dem Checkpoint.

**Repo-Wechsel: `containerization/docker-04-compose`.** Legen Sie aus `.env.example` Ihre lokale `.env` mit eigenen Laborwerten an. Starten Sie mit `docker compose -p contdel-wp-lab up --build -d --wait`. Öffnen Sie `http://localhost:8000`, führen Sie nur im eigenen frischen Labor die WordPress-Einrichtung durch und erstellen Sie einen Beitrag mit einem erfundenen Text sowie eine kleine hochgeladene Datei.

Zeichnen Sie Browser → Host-Port 8000 → WordPress:80 → db:3306. Erklären Sie, weshalb `db` im gemeinsamen Netz funktioniert und `localhost` dort nicht die Datenbank bezeichnet. Die Datenbank benötigt keinen veröffentlichten Host-Port.

Notieren Sie den Projektnamen und die beiden Volumes. Führen Sie im selben Verzeichnis `docker compose -p contdel-wp-lab down` und erneut `up -d --no-build --wait` aus. Beitrag und Upload müssen erhalten bleiben. Ordnen Sie Datenbankinhalt `mysql-volume` und Dateien `wordpress-volume` zu. **Führen Sie in dieser Aufgabe kein `down --volumes` aus.** Persistenz nach einer Container-Neuerstellung beweist kein Backup. Zum Checkpoint 14:15 zeigen Sie Netzskizze und Persistenzbeleg; fehlende Installation benennen Sie als Blocker.

## 3. Identisches Image weitergeben · 14:25-15:00

**Repo-Wechsel: `delivery-pipeline-example`.** Folgen Sie [Compose und Registry](https://gitlab.itplus.fh-joanneum.at/study/msd/msd24w/courses/contdel/delivery-pipeline-example/-/blob/main/docs/06-compose-und-registry.md). Verwenden Sie ausschließlich den zugewiesenen Registry-Pfad und einen eigenen eindeutigen Tag. Passwort/Token im Login-Dialog bzw. per `--password-stdin`, nie als ausgeschriebenen Shell-Parameter.

Notieren Sie den Digest nach Push und Pull. Starten Sie den Registry-Stand **ohne Neubuild** anhand seiner Digest-Referenz und prüfen Sie `/api/release` sowie `/health`. Vergleichen Sie Inhalt und Laufzeitkonfiguration. Fehlt der Registry-Zugang, analysieren Sie zunächst einen bereitgestellten Lauf und kennzeichnen Sie diesen als Referenz; der eigene Registry-Nachweis bleibt bis 30.11. offen. Ein lokaler Build allein ersetzt ihn nicht.

## 4. Gruppenbeitrag und Abschluss

Nach Zuteilung: AP18 (Volume ist kein Backup), AP15 (Tag/Digest, Revisiting 16.11.) oder AP16 (Konfiguration ohne Neubuild, Revisiting 16.11.). Vergleichen Sie innerhalb der Gruppe die eigenen Belege. Drei Gruppen präsentieren zwischen 15:00 und 15:15 je fünf Minuten; anschließend fünf Minuten gemeinsamer Puffer.

Füllen Sie [ERGEBNIS.md](ERGEBNIS.md) aus. Kern: Konfigurationswechsel bei gleicher Image-ID, Netzwerkgrenzen, überlebender Inhalt, Registry-Digest und Start aus genau diesem Image. Backup/Restore in einem zweiten Projekt, Proxy 05 und automatisierter Registry-Build sind Vertiefungen; sie benötigen eigene Voraussetzungen. Sichern Sie nur Quellkonfiguration und Ergebnistext in Git. `.env`, Datenbankdaten und generierte Dateien bleiben lokal.
