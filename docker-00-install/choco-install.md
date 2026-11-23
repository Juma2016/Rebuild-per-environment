# Optional: Docker Desktop mit vorhandenem Chocolatey installieren

Die [Installation über den offiziellen Installer](README.md#2-windows-docker-desktop-mit-wsl-2) ist der normale Kursweg. Wenn Chocolatey auf Ihrem Rechner bereits eingerichtet und für Softwareinstallationen vorgesehen ist, können Sie alternativ in einer dafür berechtigten PowerShell verwenden:

```powershell
choco install docker-desktop
```

Prüfen Sie zuvor WSL 2 und die Systemvoraussetzungen aus 00. Starten Sie nach der Installation Docker Desktop, wählen Sie Linux-Container und öffnen Sie ein neues Terminal. Prüfen Sie `docker version`, `docker compose version` und `docker run --rm hello-world`. Der Server muss erreichbar sein.

Eine bestehende Docker-Installation wird für diese Alternative nicht ersetzt. Die Einrichtung von Chocolatey selbst gehört nicht zur Übung. [Chocolatey-Paket](https://community.chocolatey.org/packages/docker-desktop) · [Docker-Installation](https://docs.docker.com/desktop/setup/install/windows-install/).
