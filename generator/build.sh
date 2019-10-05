#!/bin/bash

docker-compose up --build

rm -rf ~/.vscode/extensions/dayle/themes/*
rm -rf ~/.atom/packages/*-rainglow-syntax
rm -rf ~/.vim/colors/*.vim
rm -rf ~/Library/Developer/Xcode/UserData/FontAndColorThemes/*
rm -rf  /Applications/Coda\ 2.app/Contents/Resources/Styles/*.sss
rm -rf ~/Library/VisualStudio/7.0/ColorThemes/*
rm -rf ~/Library/Application\ Support/MacDown/Themes/*\(rainglow\).style
rm -rf ~/Library/Application\ Support/MacDown/Styles/*\(rainglow\).css
rm -rf ~/Library/Application\ Support/Brackets/extensions/user/*

cp -R output/vscode/* ~/.vscode/extensions/dayle/themes/
cp -R output/atom/* ~/.atom/packages/
cp -R output/vim/* ~/.vim/colors/
cp -R output/xcode/* ~/Library/Developer/Xcode/UserData/FontAndColorThemes/
cp -R output/coda/* /Applications/Coda\ 2.app/Contents/Resources/Styles/
cp -R output/vs/* ~/Library/VisualStudio/7.0/ColorThemes/
cp -R output/macdown/Styles/* ~/Library/Application\ Support/MacDown/Styles/
cp -R output/macdown/Themes/* ~/Library/Application\ Support/MacDown/Themes/
cp -R output/brackets/* ~/Library/Application\ Support/Brackets/extensions/user/