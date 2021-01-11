# Webshop

Repozitár obsahuje zdrojový kód jednoduchého webshop systému spustiteľného cez Docker.

**Server** Node.js  
**Client** React  
**Database** MySQL

![alt text](https://github.com/polakova/JS_webshop/blob/main/doc/mainpage.png)

*Obrázok úvodnej obrazovky webshopu.*

Projekt je implementovaný na základe architektúry client-server a SPA (Single Page Application). Server je implementovaný pomocou *Node.js*, konkrétne *express*. Klient je implementovaný v *React* a základný vizuál stránky je implementovaný za pomoci *Bootstrap*. Pripojená databáza je *MySQL*.

Databáza a produkty (prehliadače) sú vytvorené pri spustení servera. Implementované je aj "admin" rozhranie, prístup k nemu je po spustení projektu http://localhost:8080/#/admin.

## Spustenie riešenia

Jednoduché spustenie je ideálne vykonať za pomoci Docker (v prípade absencie Docker odporúčam inštalovať tu: https://docs.docker.com/docker-for-windows/install/).

Postupnosť krokov k spusteniu:
1. stiahnutie projektu lokálne do PC,
2. spustenie Docker,
3. otvorenie terminálu v priečinku projektu,
4. napísanie príkazu `docker-compose build`,
5. po dokončení vykonávania predchádzajúceho príkazu napísanie príkazu `docker-compose up`,
6. otvorenie nového terminálu v priečinku projektu,
7. napísanie príkazu `docker-compose up myservice`,
8. otvorenie http://localhost:8080/ v ľubovoľnom prehliadači.
