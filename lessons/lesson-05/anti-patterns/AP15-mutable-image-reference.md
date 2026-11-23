# AP15: Mutable image reference

**Gruppenarbeit:** zugeteilte Gruppe; praktische Arbeit als Paar/Trio · **Vorstellung:** 5 Minuten

## 1. Bedeutung und Abgrenzung

Ein veränderlicher Image-Tag wird wie ein unveränderlicher Nachweis behandelt. Der problematische Punkt ist die unklare Zuordnung zwischen geprüftem und verwendetem Inhalt, nicht die bloße Existenz von Tags.

## 2. Mögliche Situation

Das Team testet app:latest. Später zeigt derselbe Tag auf einen anderen Build. Eine Person startet den Tag und nimmt an, die zuvor geprüfte Version zu verwenden, obwohl sich der Inhalt geändert hat.

## 3. Mögliche Anzeichen

Nur ein Tag im Nachweis, fehlende Image-ID bzw. Registry-Digest, unklare Herkunft und verschiedene Inhalte unter demselben Namen. Ein lokales Image hat nicht zwingend bereits einen Registry-Digest.

## 4. Ursachen und Prüffragen

Welcher konkrete Inhalt wurde getestet? Wo ist der Quellstand zugeordnet? Wird bei einer Freigabe ein bereits identifiziertes Artefakt weitergegeben? Wie werden notwendige Aktualisierungen bewusst eingeplant?

## 5. Arbeitsauftrag und Versuch

Verwenden Sie 02/07. Notieren Sie lokale Image-ID und Tag. Ändern Sie in einer Übungskopie einen harmlosen, getesteten Inhalt und bauen Sie unter demselben eigenen Übungstag erneut. Vergleichen Sie die IDs und prüfen Sie, welche Zuordnung der Tag nun besitzt. Ändern Sie keine fremden Tags.

## 6. Gegenmaßnahmen

Dokumentieren Sie Inhalt und Herkunft. Verwenden Sie für unveränderliche Referenzen einen Registry-Digest und eine geregelte Aktualisierung. Eine feste Referenz verhindert keine veraltete Abhängigkeit; Pflege bleibt erforderlich.

## 7. Beleg und Kurzvorstellung

Zeigen Sie Tag und beide IDs, erklären Sie ihre Beziehung und formulieren Sie einen belastbaren Nachweis. Die fünfminütige Vorstellung soll erklären, weshalb ein Name allein nicht genügt.

## 8. Grenzen und Transfer

Neuer WS26-Fall; Rückbezug AP02 Works on My Machine vom 20.10. und Artefaktübergabe vom 10.11. Das lokale Experiment erklärt Veränderlichkeit, ist aber noch kein Registry-Promotion-Nachweis.

## Fachliche Quellen

- [Primärquelle 1](https://docs.docker.com/build/building/best-practices/#pin-base-image-versions)
- [Primärquelle 2](https://docs.docker.com/reference/cli/docker/image/inspect/)

Ergänzender Fall für WS26, auf die vorhandenen Übungen bezogen. Stand: 26.10.2026.
