# Ergebnis · Containerization, Lesson 05

Name / Gruppe:Mario Shenouda
Quellstand / eigener Commit:ZIP-Arbeitskopie von containerization-main; kein Git-Commit vorhanden.
Eigene Ausführung oder beobachtete Referenz:Alle folgenden Schritte selbst auf meinem Mac ausgeführt.

## Übung A · Image und Instanz

| Nachweis | Eigene Beobachtung |
|---|---|
| Docker Client und Server verfügbar | Docker Client und Engine: 28.5.1. Docker Compose: v2.40.2-desktop.1. Betriebssystem der Engine: linux. Der Test mit hello-world war erfolgreich. |
| Image `.Id` | sha256:2fba0d6f2601985ed8d30b1831beaff76d06064dea4d4d15374a8fe9df0f791f |
| Container `.Image` und eigene `.Id` | Container .Image entspricht der oben genannten Image-ID. Container .Id: ac4b149734b4c9cdcbec9a9e38b20de7ac86441d7de0d427214ee7ab01f46a9e |
| Host-Port → Container-Port → Prozess | Browser → 127.0.0.1:8300 auf dem Host → Port 3000 im Container → Node.js-Prozess. EXPOSE allein veröffentlicht keinen Host-Port. |
| Antwort von `/` und `/health` | /: Hello World. /health: {"status":"ok"}. Containerstatus: running / healthy. Die Logs zeigten GET-Anfragen auf beide Pfade. |
| Was bleibt nach stop / remove? | Nach stop blieb der Container mit derselben ID im Zustand Exited (0) bestehen. Nach start antwortete er wieder mit Hello World. Nach rm war der Container entfernt; das Image blieb mit derselben ID vorhanden. |

Build-Nachweis: Das Image contdel-first wurde erfolgreich gebaut. Der Schritt RUN npm test wurde erfolgreich ausgeführt und war in diesem Build nicht als CACHED markiert.

## Übung B · Build-Eingaben und Cache

| Schritt | Vorhersage | Tatsächliches Log / Ergebnis |
|---|---|---|
| Unverändert erneut bauen | Vorhersage: Bei unveränderten Eingaben können die Build-Schritte aus dem Cache wiederverwendet werden. | Tatsächliches Log / Ergebnis: Beide Builds waren erfolgreich. WORKDIR, COPY der Paketdateien, npm ci, COPY der Anwendung und Tests sowie RUN npm test waren CACHED. Die Tests wurden dabei nicht erneut ausgeführt. |
| Nur Greeting-Fallback in app.js ändern | | |
| Neues Image starten und Antwort prüfen | | |
| Health gegenüber erwarteter Fachantwort | | |
| Kontrolliert falsche Test-Erwartung, falls ausgeführt | | |
| Reparierter Abschlussstand | | |

Welcher Schritt war aus dem Cache, welcher wurde tatsächlich ausgeführt?

## Gruppenfall

Anti-Pattern:
Situation und beobachtetes Signal:
Konkreter Beleg, Verbesserung und Grenze:
Rückbezug auf ein früheres Anti-Pattern:

## Nächster Schritt

Noch offener Mindestnachweis und konkrete nächste Handlung:
Vorbereitung für 24.11.:
