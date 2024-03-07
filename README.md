# fussball240305
__Fussball240305__ ist ein Fußball-Spiel-Framework. Es ist ein [Node.js](http://nodejs.org/)-Projekt und ist in __TypeScript__ geschrieben. 
Ziel ist es mit selbst geschriebenen __KI-Engines__ zwei Mannschaften gegen einander spielen zu lassen.
Die KI soll nicht nur die Spielstärke sondern auch den Charakter der Mannschaften widerspiegeln. Es geht also nicht darum, die stärkste aller KIs zu schreiben, die jeden Gegner in die Knie zwingt, sondern sie soll den Mannschaften einen einzigartigen Stil verpassen und die Spielfreude des menschlichen Gegners fördern.

__Fussball240305__ ist in [Node.js](http://nodejs.org/) geschrieben. Die Idee ist dieses Spiel in einem Webserver laufen zu lassen, so dass es auf jedem System läuft. Das Rendering passiert dann im Webbrowser.

## Achtung Hinweis!
_Dieses Projekt ist noch in der Entwicklung. Mannschaften gibt es noch nicht und die MinMax-Suche haut auch nur hin wenn die Spieleranzahl auf einen Spieler beschränkt ist und dieser auf das rechte Tor schießt, welches von keinem Tormann bewacht wird..._

# Build & Run

## Voraussetzugen
Dieses Projekt basiert auf [Node.js](http://nodejs.org/). Das [Node.js](http://nodejs.org/)-Framework kann auf der Projektwebseite heruntergeladen und installiert werden.

Vor dem ersten Ausführen müssen Abhängigkeiten installiert werden.
```
npm install
```

## Spielen
Das Programm starten.
```
npm start
```

Der Ordner dist/ enthält die kompilierten .js-Dateien.

Tests durchführen.
```
npm test
```

Dieses Projekt benötigt einen TypeScript-Compiler.
```
tsc fussball.ts --outDir dist && node dist/fussball.js
```