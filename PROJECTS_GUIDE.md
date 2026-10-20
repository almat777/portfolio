# Adding a project

Edit `projects-data.js` and append an object to `projectsData`. Use a unique numeric ID; existing IDs are also used in shareable URLs such as `#project-1`.

```js
{
    id: 6,
    categoryEn: "Industrial automation",
    categoryRu: "Промышленная автоматизация",
    titleEn: "Project title",
    titleRu: "Название проекта",
    subtitleEn: "A short introduction.",
    subtitleRu: "Краткое введение.",
    descEn: "What the project does and why it matters.",
    descRu: "Что делает проект и какую задачу решает.",
    detailsEn: [
        { title: "My contribution", text: "Describe your own work." },
        { title: "How it works", text: "Explain the system and its results." }
    ],
    detailsRu: [
        { title: "Мой вклад", text: "Опишите свою работу." },
        { title: "Как это работает", text: "Объясните устройство и результаты." }
    ],
    media: [
        { type: "image", src: "media/project/photo.jpg", altEn: "Image description", altRu: "Описание изображения" },
        { type: "youtube", url: "https://youtu.be/VIDEO_ID", titleEn: "Demonstration", titleRu: "Демонстрация" }
    ],
    tech: ["Siemens S7-1500", "WinCC"],
    links: [
        { type: "github", url: "https://github.com/USERNAME/REPO", textEn: "GitHub", textRu: "GitHub" }
    ]
}
```

Put local media under `media/`. In source URLs use forward slashes and match filename case exactly, because GitHub Pages is case-sensitive. Image paths, optional card `cover` paths and local document links must begin with `media/`. External links must use HTTP or HTTPS.

The first image is the card cover by default. Optional `cover`, `coverAltEn` and `coverAltRu` select another cover. `featured: true` gives a project a full-width card; add `contributionLabelEn/Ru` for its contribution line and place the personal-contribution section first in `detailsEn/Ru`. `year` is optional.

Cards show a short description and a few technologies. Clicking a card opens the full description, all technologies, gallery and links. `links` is optional; projects without links show a contact option. `github` links are highlighted; other types (such as `document`, `presentation`, `demo`, `youtube`) use the supplied label and an external arrow.

Gallery types:

- `image`: `src`, `altEn`, `altRu`.
- `youtube`: `url`, `titleEn`, `titleRu`. Standard watch, embed, Shorts and youtu.be URLs are supported.
- `video`: local `src`, with `altEn/Ru` or `titleEn/Ru`; native video controls.
- `audio`: local `src`, with `label` and `labelRu`; native audio controls.

Photos open at full size. Gallery navigation uses thumbnails, arrow buttons and Left/Right keys. Escape closes the topmost dialog. Videos load when their slide is selected and unload when the slide or project closes.

For team projects keep the repository link, team credits and your own contribution separate. Keep notices supplied with externally sourced assets.
