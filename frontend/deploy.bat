REM build-Verzeichnis komplett löschen
rd /s /q "build"

REM build
call npm run build

REM komplett neues Repository in build
REM mit Branch 'pages' erstellen
cd build
git init
git checkout -B pages
git add .
git commit -m 'deploy'
REM aktuelle Version hochladen
REM alte Version wird gel¨oscht
git push --force -u https://codeberg.org/MKFeuer/t3a-kontakte pages
REM wieder zurückspringen
cd ..
