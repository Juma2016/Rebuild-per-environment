# Konfiguration im WordPress-Labor

In 03 war die Counter-Adresse ein sichtbarer fester Übungswert. In 04 werden lokale Zugangswerte beim Start ergänzt. `.env.example` dokumentiert dafür die **Namen**, `.env` enthält die selbst gewählten Laborwerte und bleibt außerhalb von Git.

| Stelle | Was dort geschieht |
|---|---|
| `.env` | Compose liest Werte für `${MYSQL_PASSWORD}` und `${MYSQL_ROOT_PASSWORD}` ein. Die Datei ist unverschlüsselter Text. |
| `compose.yaml` / `${…:?…}` | Ein fehlender Wert führt zu einem verständlichen Konfigurationsfehler, statt ein unsicheres Standardpasswort zu verwenden. |
| `environment` im Service | Erst hier werden die ausgewählten Werte an den Containerprozess weitergegeben. `.env` allein reicht dafür nicht. |
| MySQL-Initialisierung | Die `MYSQL_*`-Werte richten Datenbank und Konten bei einem **leeren** Datenverzeichnis ein. Ein bestehendes Volume verändert diese Ausgangslage. |
| `wordpress/uploads.ini` | Diese Datei wird ins Image kopiert. Eine Änderung braucht einen Build; sie ist keine Compose-Umgebungsvariable. |

Ein gleichnamiger Wert in der aufrufenden Shell kann den `.env`-Wert für die Interpolation überlagern. Prüfen Sie bei unerwarteten Ergebnissen daher auch die Shell. `docker compose config --quiet` validiert ohne Ausgabe der aufgelösten Geheimwerte. Eine vollständige Konfigurationsausgabe ist nur zur eigenen lokalen Fehlersuche geeignet.

Ein Container-Neustart allein übernimmt geänderte Umgebungswerte nicht. `docker compose up -d` kann betroffene Instanzen neu erstellen. Ein neues Passwort in `.env` ändert jedoch **keinen** bereits angelegten MySQL-Benutzer. Das ist eine Datenbankänderung, kein bloßer Containerwechsel.

[Compose-Interpolation](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/) · [MySQL-Initialisierung](https://hub.docker.com/_/mysql) · [Laufzeitkonfiguration in 06](../docker-06-environment-variables/README.md).
