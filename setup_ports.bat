@echo off
echo Configuration des redirections de ports Podman/WSL...
netsh interface portproxy add v4tov4 listenport=8088 listenaddress=127.0.0.1 connectport=8088 connectaddress=172.25.45.33
netsh interface portproxy add v4tov4 listenport=5432 listenaddress=127.0.0.1 connectport=5432 connectaddress=172.25.45.33
netsh interface portproxy add v4tov4 listenport=6379 listenaddress=127.0.0.1 connectport=6379 connectaddress=172.25.45.33
netsh interface portproxy add v4tov4 listenport=8080 listenaddress=127.0.0.1 connectport=8080 connectaddress=172.25.45.33
echo Termine !
pause