# How to Add Projects - Quick Guide

## Adding a New Project

To add a new project, simply edit `projects-data.js` and add a new object to the `projectsData` array.

### Project Structure

```javascript
{
    id: 9,  // Unique ID (increment from last project)
    titleEn: "Project Title in English",
    titleRu: "Название проекта на русском",
    descEn: "Project description in English...",
    descRu: "Описание проекта на русском...",
    media: [
        // Media items - can be images, videos, or YouTube links
        {
            type: "image",
            src: "media/your-image.png",
            altEn: "Image description",
            altRu: "Описание изображения"
        },
        {
            type: "youtube",
            url: "https://youtu.be/VIDEO_ID",
            titleEn: "Video Title",
            titleRu: "Название видео"
        },
        {
            type: "video",
            src: "media/your-video.mp4",
            altEn: "Video description",
            altRu: "Описание видео"
        }
    ],
    tech: ["Technology 1", "Technology 2", "Technology 3"],
    links: [
        {
            type: "github",
            url: "https://github.com/username/repo",
            textEn: "GitHub",
            textRu: "GitHub"
        },
        {
            type: "demo",
            url: "https://your-demo-url.com",
            textEn: "Live Demo",
            textRu: "Демо"
        },
        {
            type: "presentation",
            url: "https://canva.com/...",
            textEn: "Presentation",
            textRu: "Презентация"
        }
    ]
}
```

## Media Types

### 1. Image
```javascript
{
    type: "image",
    src: "media/filename.png",  // Path to image file
    altEn: "Description",
    altRu: "Описание"
}
```

### 2. YouTube Video
```javascript
{
    type: "youtube",
    url: "https://youtu.be/VIDEO_ID",  // Any YouTube URL format works (including Shorts)
    titleEn: "Video Title",
    titleRu: "Название видео"
}
```

### 3. Local Video
```javascript
{
    type: "video",
    src: "media/video.mp4",
    altEn: "Video description",
    altRu: "Описание видео"
}
```

## Link Types

Supported link types with automatic icons:
- `github` - GitHub icon
- `youtube` - YouTube icon
- `instagram` - Instagram icon
- `demo` - External link icon
- `presentation` - Lightbulb icon
- `documentation` - Book icon

## Carousel Behavior

- **No media**: Project card shows only text content (no carousel)
- **Single media item**: Shows the item without carousel controls
- **Multiple media items**: Creates a carousel with:
  - Previous/Next buttons
  - Dot indicators
  - Keyboard navigation (Arrow keys)
  - Touch/swipe support on mobile

## Examples

### Project with Single Image
```javascript
{
    id: 10,
    titleEn: "My Project",
    titleRu: "Мой Проект",
    descEn: "Description...",
    descRu: "Описание...",
    media: [
        {
            type: "image",
            src: "media/project.png",
            altEn: "Project screenshot",
            altRu: "Скриншот проекта"
        }
    ],
    tech: ["React", "Node.js"],
    links: [
        {
            type: "github",
            url: "https://github.com/user/repo",
            textEn: "GitHub",
            textRu: "GitHub"
        }
    ]
}
```

### Project with Multiple Media (Carousel)
```javascript
{
    id: 11,
    titleEn: "Video Project",
    titleRu: "Видео Проект",
    descEn: "Description...",
    descRu: "Описание...",
    media: [
        {
            type: "image",
            src: "media/screenshot1.png",
            altEn: "Screenshot 1",
            altRu: "Скриншот 1"
        },
        {
            type: "image",
            src: "media/screenshot2.png",
            altEn: "Screenshot 2",
            altRu: "Скриншот 2"
        },
        {
            type: "youtube",
            url: "https://youtu.be/abc123",
            titleEn: "Demo Video",
            titleRu: "Демо Видео"
        }
    ],
    tech: ["Vue.js", "Firebase"],
    links: [
        {
            type: "demo",
            url: "https://demo.com",
            textEn: "Live Demo",
            textRu: "Демо"
        }
    ]
}
```

### Project with No Media (Text Only)
```javascript
{
    id: 12,
    titleEn: "Text Project",
    titleRu: "Текстовый Проект",
    descEn: "Description...",
    descRu: "Описание...",
    media: [],  // Empty array = no carousel, just text
    tech: ["Python", "Django"],
    links: [
        {
            type: "github",
            url: "https://github.com/user/repo",
            textEn: "GitHub",
            textRu: "GitHub"
        }
    ]
}
```

## Tips

1. **Image Optimization**: Compress images before adding them to the `media/` folder
2. **YouTube URLs**: Any YouTube URL format works (youtu.be, youtube.com, etc.)
3. **Order Matters**: Media items appear in the order you list them
4. **Bilingual**: Always provide both English and Russian translations
5. **Tech Stack**: List technologies used in the project
6. **Links**: Add relevant links (GitHub, demo, presentation, etc.)

## File Structure

```
portfolio/
├── projects-data.js      ← Edit this file to add projects
├── project-generator.js  ← Handles carousel and rendering
├── main.js               ← Main functionality
├── index.html            ← HTML structure
├── styles.css            ← Styling
└── media/                ← Put images/videos here
    ├── project1.png
    ├── project2.jpg
    └── video.mp4
```

That's it! Just add your project data and it will automatically appear on your portfolio with a carousel if you have multiple media items.

