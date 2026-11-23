# Arbeitsauftrag Containerization · 16.11.2026

**14:15-16:30 · Präsenz · WS46b.02.200.** Gemeinsame Checkpoints: **15:15 und 15:55**. Gruppenbeiträge ab **16:00**, je fünf Minuten; anschließend fünf Minuten gemeinsamer Puffer.

KAIT-Intro: **14:15 bis 14:30**. Containerization beginnt um **14:30**. Gemeinsame Checkpoints bleiben im selben Unterrichtsraum.

## Ziel und Vorbereitung

Sie erklären zwei Grenzen: **Image gegenüber laufendem Container** und **Build-Eingaben gegenüber Cache-Ergebnissen**. Build, Tests und Workflow kennen Sie bereits. Heute geht es darum, was ein anderer Rechner zum Ausführen Ihres geprüften Ergebnisses benötigt.

Arbeiten Sie in einer eigenen Arbeitskopie. Prüfen Sie `git status`, bewahren Sie vorhandene Änderungen und starten Sie Docker Desktop beziehungsweise die vorgesehene Docker Engine. `docker version` muss einen Client **und einen Server** zeigen. Linux-Container verwenden. Nach fünf Minuten Setup-Blockade holen Sie Hilfe oder arbeiten auf einem vorbereiteten Partnerrechner; kennzeichnen Sie fremde Referenzläufe als solche.

Die folgenden Beispiele verwenden Host-Port **8300** (Ausgangsstand), **8301** (Vergleichsstand) und Container-Port **3000**. Das vermeidet eine Kollision mit den bisherigen Java-/Node-Demos und dem Guide auf Port 3080. Stoppen Sie keine fremden Anwendungen. Die Befehle einzeln ausführen; `curl.exe` gilt für PowerShell, Linux/macOS verwendet `curl`.

## Übung A: Ein Image bauen, einen Prozess starten · 14:55-15:15

### A1 · Vorhersage und Build

Öffnen Sie [01](../../docker-01-firststeps/README.md). Welche Dateien würden Sie an eine zweite Person weitergeben, damit dieselbe Anwendung in derselben Laufzeit startet? Halten Sie Ihre Vorhersage fest.

Vom Repository-Hauptordner:

```powershell
cd docker-01-firststeps/my-node-app
docker version
docker build -t contdel-first:lesson05 .
docker image inspect contdel-first:lesson05 --format '{{.Id}}'
```

Lesen Sie die tatsächlichen Build-Schritte. Die Anwendung benötigt keine externen npm-Laufzeitpakete; `npm ci` demonstriert die deklarierte Paket-/Lockdatei-Grenze. Ein Eintrag `CACHED` bei `RUN npm test` bedeutet Wiederverwendung eines früheren Ergebnisses, keine erneute Testausführung.

### A2 · Start, Ports und Rückmeldung

Verwenden Sie die Namen nur für Ihre eigenen Versuche. Falls bereits ein eigener Container dieses Namens existiert, prüfen Sie ihn zunächst und wählen Sie bei Bedarf einen neuen Namen.

```powershell
docker run -d --name contdel-l05-a -p 127.0.0.1:8300:3000 contdel-first:lesson05
docker ps
curl.exe -fsS http://localhost:8300/
curl.exe -fsS http://localhost:8300/health
docker logs --tail 10 contdel-l05-a
docker inspect contdel-l05-a --format '{{.Image}}'
docker inspect contdel-l05-a --format '{{.Id}}'
```

Erwartet: Begrüßung `Hello World`, Health-Antwort `{"status":"ok"}` und Logeinträge für die Requests. Vergleichen Sie **Image `.Id`** mit **Container `.Image`**: Sie beziehen sich auf den verwendeten Image-Inhalt. **Container `.Id`** bezeichnet dagegen die Instanz. Zeichnen Sie Browser → Host `127.0.0.1:8300` → Container `3000` → Prozess. `EXPOSE` alleine veröffentlicht keinen Host-Port.

### A3 · Lebenszyklus prüfen

Sagen Sie zunächst voraus, was nach jedem Schritt noch existiert:

```powershell
docker stop contdel-l05-a
docker ps -a --filter name=contdel-l05-a
docker start contdel-l05-a
curl.exe -fsS http://localhost:8300/
docker stop contdel-l05-a
docker rm contdel-l05-a
docker image inspect contdel-first:lesson05 --format '{{.Id}}'
```

**Mindestnachweis A:** funktionierende Antwort, zwei unterschiedliche Identitäten, richtige Portskizze und Erklärung von Stoppen gegenüber Entfernen. Um 15:15 kommen Sie auch mit einem offenen Schritt zurück. Checkpoint bis 15:20, danach Pause bis 15:25.

## Übung B: Dockerfile lesen und Cache-Grenzen erkennen · 15:35-15:55

Sie bleiben in derselben Anwendung. [02](../../docker-02-images/README.md) erläutert deren Image-Build; es ist keine zweite Anwendung zu installieren.

### B1 · Unverändert wiederholen

Lesen Sie die Reihenfolge `FROM`, `WORKDIR`, Paketdateien, Installation, Anwendung, Tests, `RUN npm test`, `USER`, `CMD` und `HEALTHCHECK`. Unterscheiden Sie Build-Befehle und Laufzeitvorgaben.

```powershell
docker build --progress=plain -t contdel-first:lesson05 .
docker build --progress=plain -t contdel-first:lesson05 .
```

Notieren Sie, welche Schritte tatsächlich `CACHED` melden. Cache-Verfügbarkeit hängt vom lokalen Ausgangsstand ab. Behaupten Sie keine feste Beschleunigung oder erneute Testausführung, wenn das Log sie nicht zeigt.

### B2 · Eine Eingabe ändern und beide Stände vergleichen

Falls Sie den Ausgangscontainer in A3 entfernt haben, erstellen Sie ihn vor der Änderung erneut. Wenn Ihr eigener Container noch vorhanden ist, prüfen Sie ihn und starten Sie ihn gegebenenfalls, statt einen Namenskonflikt zu erzeugen.

```powershell
docker run -d --name contdel-l05-a -p 127.0.0.1:8300:3000 contdel-first:lesson05
```

Sichern Sie den ursprünglichen Greeting-Text aus `app.js` in Ihren Notizen. Ändern Sie **nur** den Fallback `Hello World` in `Hello Container`. Lassen Sie die mit Testdaten parametrisierte Serverfunktion, Tests und Paketdateien unverändert. Sagen Sie **vor** dem Build voraus, welche Installationsarbeit wiederverwendet werden kann und wo die neue Auswertung beginnt.

```powershell
docker build --progress=plain -t contdel-first:changed .
docker run -d --name contdel-l05-b -p 127.0.0.1:8301:3000 contdel-first:changed
curl.exe -fsS http://localhost:8300/
curl.exe -fsS http://localhost:8301/
curl.exe -fsS http://localhost:8301/health
docker image inspect contdel-first:changed --format '{{.Id}}'
docker inspect contdel-l05-b --format '{{.Image}}'
docker history contdel-first:changed
```

Erwartet: Die alte Instanz auf 8300 liefert weiterhin `Hello World`, die neue auf 8301 `Hello Container`. Der Neubuild ersetzt die alte Instanz nicht. Die Paketinstallation kann bei unveränderten Eingaben aus dem Cache kommen; ab der geänderten Anwendung wird der nachfolgende Pfad neu ausgewertet. Die fachliche Antwort lautet `Hello Container`; der Healthcheck bleibt davon unabhängig. Setzen Sie für diesen Versuch **keine** Umgebungsvariable `MESSAGE`, da sie den geänderten Fallback sonst überlagert.

### B3 · Kurzer Rot/Grün-Nachweis

Wenn die Mindestnachweise bereits vorliegen: Sichern Sie die originale Testzeile in `test/app.test.js`. Ändern Sie **nur** den erwarteten Status für `/missing` von 404 auf 418. Der fachlich richtige Status bleibt 404. Führen Sie aus:

```powershell
docker build --progress=plain -t contdel-first:changed .
$LASTEXITCODE
```

Linux/macOS liest den Exitcode sofort mit `echo $?`. Der erforderliche Test muss den Build stoppen. Ein bestehendes Image mit demselben Tag oder ein noch laufender alter Container ist **kein** erfolgreicher neuer Build. Stellen Sie 404 und Ihren ursprünglichen Greeting-Text wieder her, bauen Sie erneut und starten Sie den reparierten Stand. Verwenden Sie dafür einen neuen eigenen Containernamen oder entfernen Sie zunächst gezielt Ihren gestoppten Container.

Bei knapper Zeit zeigt die Lehrperson diesen Nachweis. Kennzeichnen Sie dann die Demonstration als beobachtet; die eigene Ausführung bleibt als nächster Schritt offen.

### B4 · Abschluss und Aufräumen

```powershell
docker stop contdel-l05-b
docker rm contdel-l05-b
docker stop contdel-l05-a
docker rm contdel-l05-a
```

Entfernen Sie gegebenenfalls weitere **eigene benannte** Übungscontainer. Keine globalen Prune-/Löschbefehle verwenden. **Mindestnachweis B:** Vorhersage, tatsächliche Cache-Grenze, Antwort des neu gestarteten Images sowie getrennte Aussagen von Health und Fachprüfung. Zum Checkpoint um 15:55 bringen Sie diese vier Punkte mit.

## Anti-Patterns und Gruppenbeiträge

Nach Zuteilung bearbeiten Sie [AP15, AP16 oder AP17](anti-patterns/README.md). Verknüpfen Sie den Fall mit einem eigenen Beleg oder einem ausdrücklich als Szenario gekennzeichneten Ablauf. Drei Gruppen präsentieren von 16:00 bis 16:15 **je fünf Minuten**: Situation, Beleg, Verbesserung und deren Grenze. Danach fünf Minuten Puffer. Rückbezug: AP02/AP03/AP04 vom 20.10. und AP07/AP08 vom 10.11.

Füllen Sie [ERGEBNIS.md](ERGEBNIS.md) aus. Jede Person muss Image, Instanz, Port und Cache-Beobachtung erklären können, auch bei praktischer Arbeit als Paar/Trio.

## Ausbau am nächsten Termin

[07: geprüftes Runtime-Image](../../docker-07-tested-image/README.md) zeigt die nächste Grenze: `COPY --from=verify` macht die Runtime von erfolgreichen Tests abhängig und lässt Testquellen im ersten Stage. Heute ist das eine kurze gemeinsame Demonstration oder Vertiefung, keine dritte Pflichtinstallation.

Am **24.11., 13:15-15:30 online** vertiefen Sie mit derselben Grundlage Laufzeitkonfiguration, Compose-Netzwerke, benannte Volumes und Registry-Weitergabe. Lesen Sie vorab [Lesson 06](../lesson-06/ARBEITSAUFTRAG.md). Übertragen Sie den Grundgedanken bis 23.11. auf das Release Board; noch kein eigener Registry-Push als Voraussetzung für diesen Einstieg.
