# AP18 - Volume mistaken for backup

Zusätzlicher Lehrfall WS26 · 24.11.2026 · fünf Minuten Gruppenbeitrag.

## 1. Begriff

Ein Team hält persistente Daten für ausreichend gesichert, weil sie eine Container-Neuerstellung überleben. Persistenz und Wiederherstellbarkeit sind jedoch unterschiedliche Eigenschaften. Dies ist ein zusätzlicher Lehrfall für WS26, keine Behauptung einer normierten Fallbezeichnung.

## 2. Mögliche Situation

Im WordPress-Labor bleiben Beitrag und Upload nach down/up erhalten. Daraus wird abgeleitet, dass auch versehentliches Löschen, eine beschädigte Datenbank oder der Verlust des Hosts beherrscht wären. Es existiert keine getrennte, geprüfte Sicherung.

## 3. Mögliche Anzeichen

Es gibt benannte Volumes, aber keinen benannten Sicherungsstand. Niemand hat einen Restore in einem zweiten Projekt durchgeführt. Die Datenbank wird kopiert, die Upload-Dateien werden vergessen. Als normale Aufräumroutine wird down --volumes vorgeschlagen.

## 4. Ursache

Die Gruppe verwechselt die Lebensdauer eines Volumes mit einem Wiederherstellungsverfahren. Ein Volume kann dieselben Fehler und dieselbe Ausfallgrenze wie das laufende System haben. Ein konsistenter Anwendungsstand braucht hier Datenbankinhalt und Dateien.

## 5. Untersuchung im Labor

Zeigen Sie den tatsächlich ausgeführten Persistenztest mit einem erfundenen Beitrag und einem Upload. Ordnen Sie beide Inhalte den Volumes zu. Zeichnen Sie anschließend einen getrennten Sicherungs- und Restore-Pfad. Benennen Sie Quelle, Sicherungszeitpunkt, Zielprojekt und fachliche Prüfkriterien. Führen Sie keine unaufgeforderte Löschung aus.

## 6. Gegenmaßnahmen

Trennen Sie reguläres Stoppen von Daten-Reset. Planen Sie eine passende Datenbank-Sicherung und die zugehörigen Dateien, lagern Sie die Sicherung getrennt und testen Sie die Rücksicherung mit eigenem Projektnamen. Bei fehlender Zeit bleibt der Restore als geplanter, noch nicht ausgeführter Nachweis gekennzeichnet.

## 7. Ergebnis und Vorstellung

Zeigen Sie Projektnamen, Volume-Zuordnung und erhaltene Inhalte. Ein echter Restore-Beleg enthält zusätzlich Sicherungsstand, neues Ziel und dieselben geprüften Inhalte. Präsentieren Sie in fünf Minuten: Situation, Beleg, Verbesserung und Grenze.

## 8. Grenze und Revisiting

Der Pflicht-Persistenztest ist noch kein Backup-/Restore-Test. Ein technischer Start ohne Inhaltsprüfung reicht ebenfalls nicht. Revisit AP07 Continuous Ignorance vom 10.11.: Ein positives Signal beantwortet nur die tatsächlich geprüfte Frage.

## Quellen

- [Docker volumes and backup/restore](https://docs.docker.com/engine/storage/volumes/)
- [Compose down](https://docs.docker.com/reference/cli/docker/compose/down/)
