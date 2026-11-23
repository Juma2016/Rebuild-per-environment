# 00 · Docker installieren und den Start prüfen

Für die Übungen benötigen Sie Docker Engine, Docker CLI und das Compose-Plugin (`docker compose`, mit Leerzeichen). Docker Desktop bringt diese Komponenten für Windows und macOS mit. Unter Linux können Sie die Engine direkt installieren. Ein zusätzliches lokales Node.js wird für die Container-Beispiele nicht benötigt.

## 1. Den passenden Installationsweg wählen

| System | Weg für die Übung | Vorher prüfen |
|---|---|---|
| Windows | Docker Desktop mit WSL 2, Linux-Container | Unterstützte Windows-Version, aktivierte Virtualisierung, WSL 2 |
| macOS | Docker Desktop für den eigenen Chip | Apple Silicon oder Intel, unterstützte macOS-Version |
| Linux | Docker Engine und Compose-Plugin | Eigene Distribution und Version; unten ist Ubuntu beschrieben |

Wenn bereits eine funktionierende Installation besteht, beginnen Sie bei Schritt 5. Installieren Sie nicht zusätzlich eine zweite Engine in WSL, wenn Sie Docker Desktop verwenden möchten.

## 2. Windows: Docker Desktop mit WSL 2

1. Öffnen Sie PowerShell und prüfen Sie `wsl --version` sowie `wsl --status`. Fehlt WSL, folgen Sie der [Microsoft-Installation](https://learn.microsoft.com/en-us/windows/wsl/install): `wsl --install` in einer administrativen PowerShell, anschließend den verlangten Neustart durchführen. Bei vorhandener Installation kann `wsl --update` nötig sein.
2. Laden Sie den passenden Installer von [Docker für Windows](https://docs.docker.com/desktop/setup/install/windows-install/). Prüfen Sie dort die aktuellen Voraussetzungen für Ihre Windows-Ausgabe und Architektur. Verwenden Sie den WSL-2-Weg.
3. Starten Sie Docker Desktop. Prüfen Sie unter **Settings → General** das WSL-2-Backend. Falls Sie Befehle innerhalb einer WSL-Distribution ausführen, aktivieren Sie deren Integration unter **Resources → WSL Integration**. Für die PowerShell-Übung ist eine zusätzliche Linux-Shell nicht erforderlich.
4. Warten Sie, bis die Engine läuft. Verwenden Sie **Linux-Container**. Öffnen Sie ein neues Terminal und führen Sie Schritt 5 aus. Wenn `docker` nicht gefunden wird, prüfen Sie `where.exe docker`; ein früher installierter Paketmanager kann noch auf einen alten Pfad zeigen.

[WSL-Backend im Detail](https://docs.docker.com/desktop/features/wsl/). Eine vorhandene Chocolatey-Installation ist nur ein [optionaler Installationsweg](choco-install.md).

## 3. macOS: Docker Desktop

1. Prüfen Sie unter **Über diesen Mac**, ob Ihr Gerät einen Apple-Chip oder Intel-Prozessor besitzt. Wählen Sie den entsprechenden Download auf [Docker für Mac](https://docs.docker.com/desktop/setup/install/mac-install/).
2. Öffnen Sie `Docker.dmg`, ziehen Sie Docker nach **Programme** und starten Sie `Docker.app`. Schließen Sie die Einrichtung ab und warten Sie auf die laufende Engine.
3. Öffnen Sie ein neues Terminal und führen Sie Schritt 5 aus. Ein gestartetes Desktop-Fenster allein ist noch kein Funktionsnachweis.
4. Auf Apple Silicon bevorzugen Sie Images mit `linux/arm64`-Unterstützung. Erzwingen Sie nicht vorsorglich `--platform linux/amd64`; Emulation kann Builds verlangsamen. Eine Meldung `no matching manifest` betrifft die Image-Architektur und wird gezielt untersucht.

Die unterstützten macOS-Versionen stehen auf der verlinkten Installationsseite. Der Engine-Start und die Übungen bleiben gleich, die Oberfläche kann je nach Version abweichen.

## 4. Linux: Engine und Compose

**Ubuntu:** Prüfen Sie `cat /etc/os-release`. Verwenden Sie für andere Distributionen deren eigene [offizielle Anleitung](https://docs.docker.com/engine/install/). Prüfen Sie vorab mögliche Paketkonflikte in der [Ubuntu-Anleitung](https://docs.docker.com/engine/install/ubuntu/); entfernen Sie keine bestehenden Installationen ohne zu klären, wofür diese gebraucht werden.

Für eine frische, unterstützte Ubuntu-Installation richten Sie das offizielle Paketrepository ein:

```bash
sudo apt update
sudo apt install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl start docker
sudo docker version
sudo docker compose version
sudo docker run --rm hello-world
```

Für diese Variante können Sie die späteren Docker-Befehle zunächst mit `sudo` ausführen. Soll Ihr Benutzer ohne `sudo` arbeiten, folgen Sie den [Post-Install-Schritten](https://docs.docker.com/engine/install/linux-postinstall/). Die `docker`-Gruppe gewährt weitreichende Host-Rechte. Verwenden Sie keine pauschale Freigabe des Docker-Sockets mit `chmod 666`.

## 5. Gemeinsame Funktionsprüfung

Führen Sie die Befehle einzeln aus. Bei der Linux-Variante gegebenenfalls `sudo` voranstellen.

```powershell
docker version
docker info --format '{{.OSType}}'
docker compose version
docker run --rm hello-world
```

Erwartet: `docker version` zeigt **Client und Server**, der Betriebssystemtyp ist `linux`, Compose gibt eine Version aus und `hello-world` meldet den erfolgreichen Test. Dessen Container beendet sich sofort und wird durch `--rm` entfernt. Das ist hier der normale Ablauf, kein Fehler.

`docker --version` prüft nur das CLI. Bei fehlendem Server prüfen Sie zuerst Engine-Start und `docker context ls`. Bei Downloadfehlern prüfen Sie Netzwerk/Proxy, statt das Beispiel umzubauen. Die [Startprobleme im Haupt-README](../README.md#ports-und-typische-startprobleme) helfen bei der Einordnung.

## 6. Für den Unterricht bereit

Öffnen Sie [01](../docker-01-firststeps/README.md) und bauen Sie das Image einmal vorab. Es wird auf dem eigenen Rechner zwischengespeichert; der erste Download ist damit aus der Unterrichtszeit genommen. Morgen verwenden Sie Host-Port 8300. Halten Sie die Ausgabe der Funktionsprüfung und gegebenenfalls die konkrete Fehlermeldung bereit.
