@echo off
echo Configuration des redirections de ports Podman/WSL...
netsh interface portproxy add v4tov4 listenport=8088 listenaddress=127.0.0.1 connectport=8088 connectaddress=172.25.45.33
netsh interface portproxy add v4tov4 listenport=5432 listenaddress=127.0.0.1 connectport=5432 connectaddress=172.25.45.33
netsh interface portproxy add v4tov4 listenport=6379 listenaddress=127.0.0.1 connectport=6379 connectaddress=172.25.45.33
netsh interface portproxy add v4tov4 listenport=8080 listenaddress=127.0.0.1 connectport=8080 connectaddress=172.25.45.33
netsh interface portproxy add v4tov4 listenport=4200 listenaddress=127.0.0.1 connectport=4200 connectaddress=172.25.45.33
netsh interface portproxy add v4tov4 listenport=31514 listenaddress=127.0.0.1 connectport=31514 connectaddress=192.168.49.2
netsh interface portproxy add v4tov4 listenport=32172 listenaddress=127.0.0.1 connectport=32172 connectaddress=192.168.49.2
netsh interface portproxy add v4tov4 listenport=30080 listenaddress=127.0.0.1 connectport=30080 connectaddress=192.168.49.2
netsh interface portproxy add v4tov4 listenport=30081 listenaddress=127.0.0.1 connectport=30081 connectaddress=192.168.49.2
echo Termine !
echo Check : netsh interface portproxy show all
pause