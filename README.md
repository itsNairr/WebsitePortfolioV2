## Hari Nair's Second Website Portfolio

Live at [harinair.ca](https://www.harinair.ca/). Built with Next.js 16, React 19, TypeScript, Tailwind CSS 4 and Redux Toolkit.

## Local Installation

First install dependencies:

```bash
npm i
#or
bun i
```

Then run the development server:

```bash
npm run dev
#or
bun run dev
```

Check changes with `npm run build` (it also type-checks).

## Updating content (for people and LLMs)

All site content lives in JSON files under `app/data/` and image files under `public/`. **To add or change experience, projects or images, edit only these files. No component code needs to change.** Every page reads the JSON at build time, so lists, counts and ordering update automatically.

| What you want to change | File to edit | Images go in |
|---|---|---|
| Work experience (Experience page timeline) | `app/data/jobs.json` | `public/logos/` |
| Projects (Projects page + project detail pages) | `app/data/projects.json` | `public/` |
| Education, skills, certification, community (About page) | `app/data/about.json` | `public/logos/` |

The home page's "N+ Projects" and "N+ Roles" cards count the entries in `projects.json` and `jobs.json`, so they update by themselves.

### `app/data/jobs.json`: experience

Shape: `{ "jobs": [ Job, ... ] }`. The Experience page shows jobs **sorted by `id`, highest first** (newest at the top), regardless of their order in the file.

```json
{
  "id": 8,
  "title": "Software Engineer Intern",
  "date": "May 2026 - Present",
  "org": "Company Name",
  "description": [
    "Built **X** that improved **Y by 40%**.",
    "Second bullet point."
  ],
  "url": "https://company.com/",
  "logo": "/logos/company.png",
  "tags": ["TypeScript", "React"]
}
```

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Unique number. Use the current highest `id` + 1 for a new (newest) job. |
| `title` | yes | Role title. |
| `date` | yes | Format `"Month YYYY - Month YYYY"` with a plain hyphen (the site displays an en dash). For a current role, end with `Present`: any job whose `date` contains `"Present"` gets the green "current" badge and pulsing dot. |
| `org` | yes | Company or organization name. |
| `description` | yes | Array of bullet strings. Wrap text in `**double asterisks**` to make it **bold**, like the resume's highlighted metrics. Only the first 3 bullets show until the visitor taps "Show more". |
| `url` | yes | Company website; the company name links to it. |
| `logo` | yes | Path **with a leading slash**, e.g. `"/logos/company.png"`. The file goes in `public/logos/`. Square PNG or SVG, about 256×256, with a transparent or white background (it sits on a white rounded tile). |
| `tags` | yes | Tech/skill chips. Only list things the bullets actually mention. |

### `app/data/projects.json`: projects

Shape: `{ "projects": [ Project, ... ] }`. Each project gets a card on `/projects` and its own page at `/projects/<id>`.

```json
{
  "id": 16,
  "title": "Project Name",
  "description": "One paragraph describing what it does, how it works and the results.",
  "tags": ["Python", "PyTorch"],
  "github": "https://github.com/itsNairr/RepoName",
  "url": "https://live-site.com/",
  "paper": "https://link-to-paper.pdf",
  "images": ["projectname-1.png", "projectname-2.png"],
  "featured": true
}
```

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Unique number; it is also the URL (`/projects/16`). Use the current highest `id` + 1 for a new project. **Never reuse or renumber ids**, because they are the project's permanent link. |
| `title` | yes | Shown on the card and as the detail page heading. |
| `description` | yes | A single string. Cards show the first 3 lines; the detail page shows all of it. |
| `tags` | yes | Tech chips. If the tags include `Arduino`, `ROS2` or `SOLIDWORKS`, the no-image placeholder shows a robot icon instead of a code icon. |
| `github` | no | Adds a GitHub button. Leave the field out (don't use `""`) if there is no public repo. |
| `url` | no | Adds a "Live site" button. |
| `paper` | no | Adds a "Research paper" button. |
| `images` | no | File names **without a leading slash**, e.g. `"projectname-1.png"`. Files go directly in `public/`. The first image is the card preview; all of them appear in the detail page gallery, in order. Screenshots around 16:9 look best. Without `images`, the project shows a colorful gradient placeholder. |
| `featured` | no | `true` on **exactly one** project makes it the large double-width card at the top of the Projects page. Remove it from the old project when featuring a new one. |

**Ordering:** the featured project first, then everything else by `id`, highest (newest) first. The detail pages' Previous/Next links follow the same order (defined once in `app/data/projects.ts`).

**Adding images to an existing project:** put the files in `public/` and add (or extend) that project's `images` array with the file names.

**Removing a project:** delete its object. Its old URL then redirects to `/projects`. Delete its image files from `public/` too if nothing else uses them.

### `app/data/about.json`: About page

```json
{
  "education": {
    "school": "Queen's University",
    "degree": "BASc in Mechatronics & Robotics Engineering",
    "date": "Expected April 2027",
    "logo": "/logos/queens.png",
    "coursework": ["Course 1", "Course 2"]
  },
  "skills": [{ "group": "Languages", "items": ["Python", "TypeScript"] }],
  "certification": "AWS Certified AI Practitioner",
  "community": { "role": "Co-founder", "org": "Organization Name" },
  "bio": "Currently not shown on the site.",
  "location": "Currently not shown on the site."
}
```

- `skills` must have **at most 5 groups**. Each group's icon and color come from a fixed list of 5 in `app/about/page.tsx` (`skillStyles`), matched by position. To add a 6th group, add a 6th entry to `skillStyles` too.
- `education.logo` uses the same leading-slash path format as job logos.

### Rules of thumb

- Keep the JSON valid: double quotes, no trailing commas.
- Image paths: **job and education logos start with `/logos/`**; **project images are bare file names** in `public/`.
- Use lowercase, hyphenated file names (`my-project-1.png`) and don't overwrite existing files unless replacing that image is the goal.
- Run `npm run build` after editing; a JSON or type error fails the build.

## Where things live

| Path | Purpose |
|---|---|
| `app/page.tsx` | Home page: greeting, floating highlight cards (the `highlights` array), section links |
| `app/experience/`, `app/projects/`, `app/about/`, `app/contact/` | Pages |
| `app/components/` | Shared UI: `NavShell.tsx` (navbar + mobile menu), `GlassCard.tsx` (card style), `GalaxyBackground.tsx`, `TimelineComponent.tsx`, `ProjectCard.tsx`, `ProjectView.tsx`, `ProjectGallery.tsx`, `Footer.tsx` |
| `app/globals.css` | Card style (`.liquid-glass`), cursor glow, scroll reveal (`.reveal`), custom cursors, background blobs |
| `public/cursors/` | Custom arrow and pointing-hand cursors |
| `next.config.js` | Image quality settings and redirects (old `/skills-projects` URLs redirect to `/projects`) |

The contact form sends email through EmailJS using `NEXT_PUBLIC_SERVICE_ID`, `NEXT_PUBLIC_TEMPLATE_ID` and `NEXT_PUBLIC_USER_ID` from `.env.local` (not committed).
