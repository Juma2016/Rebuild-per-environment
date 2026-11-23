# AP17: Untested runtime image

**Gruppenarbeit:** zugeteilte Gruppe; praktische Arbeit als Paar/Trio · **Vorstellung:** 5 Minuten

## 1. Bedeutung und Abgrenzung

Das verwendete Runtime-Image ist nicht nachvollziehbar an die erforderliche Prüfung gebunden. Eine vorhandene Test-Stage oder ein grüner Healthcheck reicht als Beleg nicht aus.

## 2. Mögliche Situation

Ein Dockerfile enthält eine Stage mit Tests. Die Runtime-Stage beginnt jedoch unabhängig neu und kopiert ungeprüfte Dateien aus dem Kontext. BuildKit kann die unbenötigte Test-Stage überspringen; dennoch sieht das Dockerfile auf den ersten Blick getestet aus.

## 3. Mögliche Anzeichen

Keine Abhängigkeit der Runtime von der Test-Stage, fehlende Testausgabe im Build-Log oder ein erfolgreiches Runtime-Ziel trotz absichtlich falscher Assertion. Ein früheres Image kann nach einem fehlgeschlagenen Build weiterhin lokal vorhanden sein.

## 4. Ursachen und Prüffragen

Welche Stage wird tatsächlich gebaut? Woher kommen die Runtime-Dateien? Welche Prüfung blockiert die Erzeugung? Wurde nur die Prozessgesundheit oder auch die fachliche Antwort kontrolliert?

## 5. Arbeitsauftrag und Versuch

Verwenden Sie 07. Lesen Sie COPY --from=verify. Verändern Sie in einer Übungskopie eine Testerwartung und bauen Sie ausdrücklich das Ziel runtime. Der Build muss scheitern. Reparieren Sie den Test und vergleichen Sie danach /health mit dem fachlichen Greeting-Nachweis.

## 6. Gegenmaßnahmen

Machen Sie die geprüften Dateien zur Abhängigkeit des Runtime-Ziels. Erhalten Sie den Fehlerstatus. Ergänzen Sie nach dem Start einen fachlichen Smoke-Test, dessen Erwartung zum Artefakt und zur Konfiguration passt.

## 7. Beleg und Kurzvorstellung

Zeigen Sie die Stage-Abhängigkeit, den roten Build und den reparierten Lauf. Erklären Sie in fünf Minuten, weshalb ein noch vorhandenes altes Image oder ein grüner Healthcheck keinen neuen erfolgreichen Build beweist.

## 8. Grenzen und Transfer

Neuer WS26-Fall. Wiederaufnahme AP07 Continuous Ignorance vom 10.11.; AP03 Polluted Environment vom 20.10. hilft beim Verwechseln alter und neuer Ergebnisse. Die lokale Prüfung ersetzt keinen Test jeder Zielarchitektur.

## Fachliche Quellen

- [Primärquelle 1](https://docs.docker.com/build/building/multi-stage/#differences-between-legacy-builder-and-buildkit)
- [Primärquelle 2](https://docs.docker.com/reference/dockerfile/#healthcheck)

Ergänzender Fall für WS26, auf die vorhandenen Übungen bezogen. Stand: 26.10.2026.
