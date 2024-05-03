# EDHstats

Website and API for analyzing EDH decks

## Main features

### Commander's detailed stats

Get commander's winrate, drawrate price and other stats based on the tournament filters of your choice.

### Unique cards and autoincludes

The system analyses the number of unique cards and autoincludes each commander has, so that you can know what other people are playing.

### Individual card analysis

Analyse how individual cards impact the performance of your commander

### All commanders in one place

Scroll through our database and filter the commanders to find the one you want to build

## Website

The website is accessible at [edhstats.onrender.com](https://edhstats.onrender.com/). It wraps many of the unique platform features into a stylish interface.

## API

If you want to get full access to the database and do stuff that the website is not capable of, you can use the api at [edhstats.onrender.com/api](https://edhstats.onrender.com/). The documentation is available on the same route.

---

## Информация для курса "Веб-программирование"

**Автор**: Михаил Гуревич, M33001

**Введение в доменную область**: Magic: The Gathering — настольная коллекционно-карточкая игра. Игра имеет множество форматов, но мы будем рассматривать только EDH (Elder Dragon Highlander), или, как его ещё называют, Commander.

Колода в этом формате состоит из 100 карт, одна или две из которых являются **Коммандерами**. Карты имеют определённую **мана-стоимость** и **цвета**. Колоды играются в игре Free-for-all на 4 человек.

Чтобы подробнее узнать про предметную область, можно ознакомиться с [Wiki по **Magic: The Gathering** (EDH)](https://mtg-archive.fandom.com/wiki/EDH).

### Entity Relation Diagram

![ERD](https://github.com/is-web-y25/EDHstats/blob/main/ERD.png)

- **Card** — карта в колоде. Имеет мана-стоимость и уникальное название.

- **Tournament** — турнир. Имеет уникальный строковый идентификатор (`TID` взятый из api турнирной системы) и количество участников.

- **Deck** — конкретная колода с турнира. Хранит id турнира, на котором ей играли, и количество побед, поражений и ничьих на этом турние. Также привязана к коммандеру. Содержит вспомогательные поля `winrate` и `drawrate` для ускорения обработки статистики.

- **Commander** — коммандер. Связан со всеми колодами, которые его используют, а также содержит свою цветовую принадлежность (`identity`). Также связан с пользователями, которые выбрали этого коммандера как избранного.

- **User** — пользователь сайта. Содержит уникальное имя на сайте и хэш пароля. Привязан к коммандерам, которых пометил как избранных.
