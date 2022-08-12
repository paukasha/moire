#!/usr/bin/env sh


#переход в каталог сборки
cd dist

#инициализация репо и загрузка кода в github
git init
git add -A
git commit -m "deploy"

git push -f git@github.com:paukasha/moire-app.git master:gh-pages
