# Almat Abdimalik — Portfolio

Personal portfolio focused on automation, PLC control, SCADA and industrial robotics. Built with HTML, CSS and JavaScript; no build step or package installation is required.

Live website: [almat777.github.io/portfolio/](https://almat777.github.io/portfolio/).

GitHub Pages publishes `master` from the repository root. `.nojekyll` serves the files as a static website. The profile photograph is `media/Photo.jpg`.

## Local preview

Open `index.html` in a browser, or serve this folder:

```sh
py -3 -m http.server 8000 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8000`. On macOS/Linux, use `python3` instead of `py -3`. GitHub Pages can serve the repository root directly.

## Content and interaction

- The homepage introduces Almat with a color portrait, then covers his background before showing projects. Navigation follows the same order.
- English and Russian, with the language choice saved locally.
- Project search by title, description and technology.
- Each project opens a native modal dialog with its description, technology stack, photo/video gallery and source links.
- Arrow keys change the selected media; Escape closes the image viewer or project. Closing a project unloads embedded media.
- Project links such as `#project-1` can be shared directly.
- The CV and contacts remain available. The portfolio assistant has bilingual suggested questions, source links, conversation context, cancellation and a new-conversation action.
- Without a configured owner backend, the assistant provides clearly labelled answers from portfolio materials. Generated AI replies use a separate label and a server-maintained knowledge base.

Edit project content in `projects-data.js`. Every project has a stable numeric `id`, `titleEn/Ru`, `descEn/Ru`, `categoryEn/Ru`, `subtitleEn/Ru`, `detailsEn/Ru: [{ title, text }]`, `tech`, `media` and optional `links`. Image media use `src` and `altEn/Ru`; YouTube items use `url` and `titleEn/Ru`. Optional `featured`, `cover`, `coverAltEn/Ru` and `contributionLabelEn/Ru` control a featured card. Static page copy is in paired `data-en` / `data-ru` attributes in `index.html`.

The About section uses Almat's [public LinkedIn profile](https://kz.linkedin.com/in/almat-abdimalik/en), checked on 20 October 2026: KBTU education (2022–2026), Robotics Lab participation, the Siemens seminar (12–16 January 2026), ITFest mentoring/refereeing (5–6 December 2025), tools and languages. Almat separately confirmed his current role as an Industrial Automation Specialist (специалист АСУТП) at Astana Motors Manufacturing, and his PLC/SCADA/KUKA diploma contribution. The current role appears on the first screen and first in the background timeline; its start date and duties are not inferred.

The diploma case study describes a team project and separately identifies Almat's work on PLC, SCADA and KUKA. Its gallery images in `media/diploma/` come from the [shared diploma repository](https://github.com/rassulz/multirobot_painting_control_system/tree/main/docs/images); author and source links appear in the project dialog. The diploma repository publishes its materials under the MIT license. Its source notice is preserved in `media/diploma/SOURCE-LICENSE.txt`.

Visual direction was informed by [Collins Masimba's portfolio](https://github.com/Masimba249/Masimba249.github.io): dark surfaces, a yellow accent, Inter and JetBrains Mono. The page and dialog implementation are written for this portfolio.

To activate generated AI replies, follow [the assistant setup guide](ASSISTANT_SETUP.md). Paste `apps-script/Code.gs` into a new owner-controlled Apps Script project, put `GEMINI_API_KEY` in Script Properties, and set only its `/exec` URL in `assistant-config.js`. The former endpoint has been removed. Browser keys, IP collection and automatic conversation analytics are not used.

The website and backend share `projects-data.js` and `assistant-knowledge.js`. Rebuild the single deployment file with `node scripts/build-assistant-backend.cjs` after edits. Rate controls are documented in `RATE_LIMITING_CONTROLS.md`. The legacy `analytics-script-updated.gs` is not part of the assistant deployment.

Google Fonts, Font Awesome, YouTube and generated AI replies need an internet connection. Page rendering, project descriptions, local image galleries and portfolio-guide answers work without those services. The three assistant test files under `tests/` use Node's built-in test runner and require no packages; they use mocked services and do not verify live browser CORS.
