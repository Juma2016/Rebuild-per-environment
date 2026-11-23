# AP16: Rebuild per environment

**Gruppenarbeit:** zugeteilte Gruppe; praktische Arbeit als Paar/Trio · **Vorstellung:** 5 Minuten

## 1. Bedeutung und Abgrenzung

Für jede Zielumgebung wird erneut ein Artefakt gebaut, obwohl das geprüfte Artefakt weitergegeben werden könnte. Damit kann zwischen Test und Verwendung ein anderer Inhalt entstehen.

## 2. Mögliche Situation

Die Testumgebung erhält ein erfolgreich geprüftes Image. Für die nächste Umgebung startet jemand denselben Build nochmals, wobei neue Abhängigkeiten oder Build-Eingaben ein anderes Ergebnis erzeugen. Die frühere Prüfung wird trotzdem als Nachweis verwendet.

## 3. Mögliche Anzeichen

Mehrere Buildschritte für denselben Release, Konfigurationswerte im Build, fehlende Inhaltskennung zwischen Stufen und erneute Downloads bei der Freigabe. Ein absichtlich anderes Plattformartefakt ist davon zu unterscheiden.

## 4. Ursachen und Prüffragen

Welche Werte sind Laufzeitkonfiguration? Welche ändern tatsächlich das Produktartefakt? Wie wird der geprüfte Inhalt identifiziert? Kann die nächste Stufe diesen Inhalt verwenden, statt ihn neu zu erzeugen?

## 5. Arbeitsauftrag und Versuch

Verwenden Sie 06 mit dem Image aus 07. Notieren Sie die Image-ID, ändern Sie MESSAGE zur Laufzeit und erzeugen Sie den Container neu. Prüfen Sie die andere Antwort bei derselben Image-ID. Erklären Sie, welche Art von Änderung tatsächlich einen neuen Build verlangen würde.

## 6. Gegenmaßnahmen

Bauen und prüfen Sie ein identifizierbares Artefakt, geben Sie dieses weiter und führen Sie die notwendige Laufzeitkonfiguration gesondert. Verknüpfen Sie Freigabe, Tests, Inhalt und Konfiguration nachvollziehbar.

## 7. Beleg und Kurzvorstellung

Zeigen Sie gleiche Image-ID und unterschiedliche Konfiguration sowie die beiden Antworten. Erläutern Sie in fünf Minuten, welche Aussage aus dem ursprünglichen Test erhalten bleibt und welche Konfiguration erneut geprüft werden muss.

## 8. Grenzen und Transfer

Neuer WS26-Fall. Rückbezug AP04 Myopic Environment: gleiche Artefakte garantieren keine identischen Dienste, Daten oder Einstellungen. Unterschiedliche Architekturen können unterschiedliche, jeweils geprüfte Images benötigen.

## Fachliche Quellen

- [Primärquelle 1](https://dora.dev/capabilities/continuous-integration/)
- [Primärquelle 2](https://docs.docker.com/compose/how-tos/environment-variables/)

Ergänzender Fall für WS26, auf die vorhandenen Übungen bezogen. Stand: 26.10.2026.
