// Everything the page says lives here, so a text change never touches a component.

export const person = {
  name: 'Matic Grobolšek',
  email: 'dev@mail.grobolsek.com',
  github: 'https://github.com/grobolsek',
  born: new Date(2004, 0, 21), // 21 January 2004: only the age is shown
}

/** Age in whole years on a given day (the birthday counts from its date). */
export function ageOn(day = new Date()) {
  const b = person.born
  const hadBirthday = day.getMonth() > b.getMonth() || (day.getMonth() === b.getMonth() && day.getDate() >= b.getDate())
  return day.getFullYear() - b.getFullYear() - (hadBirthday ? 0 : 1)
}

// ---- Photographs -------------------------------------------------------------------------------
// Each one shows as a grey box until it has a `src`. To add yours: put the file in public/img/ and set
// src: '/img/<file>'. It keeps its slot's shape (landscape), its tilt, the fade into the page and the glow of its
// own colours.
export const photos = {
  // the portrait stands in front of a circle, its head above the circle's edge. That needs a photo with the
  // background removed (a PNG with transparency): set cutout: true. A normal photo (cutout: false) is shown
  // cropped into the circle instead.
  // me.webp: images/me.png with its baked-in checkerboard background removed
  me: { src: '/img/me.webp', alt: 'Matic Grobolšek, arms crossed, in a black hoodie', cutout: true },
  university: { src: '/img/fri.webp', alt: 'The Faculty of Computer and Information Science in Ljubljana, a cherry tree in blossom in front', position: '64% 50%' },
  // position: which part of a tall photo stays in the landscape frame (x% y%)
  climbing: { src: '/img/climbing.webp', alt: 'Me on a rope on a limestone face, autumn woods and a valley below', position: '38% 64%' },
  hiking: { src: '/img/hiking.webp', alt: 'Me in winter gear, kneeling in deep snow on a mountain ridge', position: '50% 34%' },
  boardGames: { src: '/img/board-games.webp', alt: 'A game of Root on a yellow table, the Marquise de Cat board in front', position: '50% 48%' },
}

// ---- Tool logos (real marks, taste-skill icons.mjs) -------------------------------------------------
const logo = (file, alt) => ({ src: `/kit/icons/${file}.svg`, alt })
const L = {
  python: logo('python', 'Python'),
  java: logo('java', 'Java'),
  typescript: logo('typescript', 'TypeScript'),
  c: logo('c', 'C'),
  rust: logo('rust', 'Rust'),
  vue: logo('vue', 'Vue.js'),
  fastapi: logo('fastapi', 'FastAPI'),
  postgres: logo('postgres', 'PostgreSQL'),
  mysql: logo('mysql', 'MySQL'),
  docker: logo('docker', 'Docker'),
  bevy: logo('bevy', 'Bevy'),
  webgpu: logo('webgpu', 'WebGPU'),
  opencv: logo('opencv', 'OpenCV'),
  streamlit: logo('streamlit', 'Streamlit'),
  bash: logo('bash', 'Bash'),
  git: logo('git', 'Git'),
  linux: logo('linux-tux', 'Linux'),
  claude: logo('claude-code', 'Claude Code'),
  kubernetes: logo('kubernetes', 'Kubernetes'),
  csharp: logo('c-sharp', 'C#'),
  vb: logo('vb', 'Visual Basic'),
  react: logo('react', 'React'),
  mui: logo('material-ui', 'Material UI'),
}

// ---- Projects ---------------------------------------------------------------------------------------
// The pentest report: drop the PDF into src/docs/ (any name ending in .pdf) and the project links it,
// opening in a new tab. Until a file is there the row shows no report link.
const reports = import.meta.glob('./docs/*.pdf', { query: '?url', import: 'default', eager: true })
const reportUrl = Object.values(reports)[0] || null

// Under each opened project: its GitHub repository, its website when it has one, and a report when there is one.
// Each shows its address and opens in a new tab.
const bare = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')
const linksFor = ({ repo, site, report }) => [
  repo && { kind: 'github', label: bare(repo), href: repo },
  site && { kind: 'site', label: bare(site), href: site },
  report && { kind: 'pdf', label: 'Report (PDF)', href: report },
].filter(Boolean)

export const projects = [
  {
    id: 'varsis',
    name: 'Varsis',
    line: 'Self-hosted server for lossless music',
    text: [
      'Upload lossless files, edit their tags, build playlists and stream them from your own server. Each user has a storage quota and signs up by email.',
      'FastAPI and PostgreSQL behind a Vue app, run with Docker Compose and served over HTTPS by Caddy. A plugin system adds features without touching the core.',
    ],
    icons: [L.vue, L.fastapi, L.postgres, L.docker],
    links: linksFor({ repo: 'https://github.com/grobolsek/varsis-app', site: 'https://music.varsis.com' }),
    // a phone screenshot: shown in a phone, standing in the landscape slot
    image: { src: '/img/varsis.webp', alt: 'Varsis on a phone: the home screen with recently added albums and songs', frame: 'phone', ratio: '527 / 1040' },
  },
  {
    id: 'tinr',
    name: 'TINR',
    line: 'My own game engine, with a game on top',
    text: [
      'A Rust workspace of three crates: the engine, a platform layer and the game itself.',
      'Game state runs on the ECS from Bevy; Macroquad draws the frames and reads the input.',
    ],
    icons: [L.rust, L.bevy],
    links: linksFor({ repo: 'https://github.com/grobolsek/TINR' }),
    // pixel art: drawn large and sharp on its own stage
    image: { src: '/img/tinr.png', alt: 'A pixel-art character from the TINR game', frame: 'sprite' },
  },
  {
    id: 'dungeon',
    name: 'Dungeon crawler',
    line: 'A 3D dungeon crawler that runs in the browser',
    text: ['Written in TypeScript and drawn straight with WebGPU, with no game engine underneath.'],
    image: { src: '/img/dungeon-crawler.webp', alt: 'A knight in a torch-lit stone dungeon, rendered with WebGPU' },
    icons: [L.typescript, L.webgpu],
    links: linksFor({ repo: 'https://github.com/Privatech38/dungeon-crawler' }),
  },
  {
    id: 'pentest',
    name: 'Penetration test',
    line: 'Penetration test and risk assessment of a climbing web app',
    text: [
      'A joint report for the program security course: a white-box test of Trainboard, a web app where climbers post boulders and rate each other’s, following PTES and the OWASP Top 10:2025.',
      'SQL injection and XSS were not possible. The critical finding was CWE-319: logins and session tokens travel over plain HTTP, so the fix is HTTPS for all traffic.',
    ],
    icons: [],
    links: linksFor({ report: reportUrl }),
    // in place of a picture: the report's first page, its title and the start of its abstract (in Slovene, as written)
    paper: {
      href: reportUrl,
      title: 'Penetracijsko testiranje in ocena tveganja spletne aplikacije Trainboard',
      abstract: [
        'Penetracijsko testiranje je sistematičen postopek preverjanja varnosti informacijskih sistemov, pri katerem simuliramo napade z namenom odkrivanja ranljivosti, preden jih izkoristijo zlonamerni akterji. Namen takšne ocene je prepoznati šibke točke aplikacije ter na podlagi ugotovitev določiti stopnjo tveganja.',
        'Namen tega dela je izvesti penetracijsko testiranje in oceno tveganja spletne aplikacije Trainboard - aplikacija, ki teče na lokalnem omrežju, na kateri lahko prijavljeni uporabniki objavljajo svoje balvane in ocenjujejo težavnost in kvaliteto balvanov drugih uporabnikov. Testiranje smo izvedli v skladu z metodologijo PTES (Penetration Testing Execution Standard) in smernicami OWASP Top 10:2025.',
        'Testiranje je razkrilo kritično ranljivost CWE-319 (Cleartext Transmission of Sensitive Information). Aplikacija uporablja nešifriran protokol HTTP, kar napadalcu omogoča prestrezanje uporabniških poverilnic in sejnih žetonov.',
      ],
    },
  },
  {
    id: 'atlas',
    name: 'atlas-views',
    line: 'MySQL views in Atlas migrations, without Atlas Pro',
    text: ['One view per SQL file: a sync command writes them into the migration Atlas has just made, and a check runs them on a throwaway MySQL.'],
    icons: [L.python, L.mysql],
    links: linksFor({ repo: 'https://github.com/grobolsek/atlas-views' }),
    // in place of a picture: a terminal session, the README's workflow with the tool's own output lines.
    // Each line is a list of [colour, text]: p prompt, c command, n comment, o output, w warning, g green, b blue.
    terminal: {
      title: 'zsh — ~/shop-db',
      lines: [
        [['p', '❯ '], ['c', 'atlas migrate diff --env sqlalchemy add_discount']],
        [['p', '❯ '], ['c', 'atlas-views sync']],
        [['o', 'Target: 20261117142310_add_discount.sql (appending)']],
        [['w', 'warning: '], ['o', '1 view(s) depend on changed tables/views and are re-created: order_totals; run `atlas-views check` to make sure they still work']],
        [['o', '  '], ['g', '+'], ['c', ' active_users'], ['o', '  (new)']],
        [['o', '  '], ['b', '*'], ['c', ' order_totals'], ['o', '  (refresh: table `orders` altered in 20261117142310_add_discount.sql)']],
        [['o', 'Wrote migrations/20261117142310_add_discount.sql and updated atlas.sum']],
        [['o', 'Only edit migrations that have not been applied to any database yet.']],
        [['p', '❯ '], ['c', 'atlas-views check']],
        [['o', 'Starting mysql:8.0 ...']],
        [['o', 'Applied migrations up to 20261117142310. Views:']],
        [['o', '  '], ['g', 'ok'], ['o', '       active_users']],
        [['o', '  '], ['g', 'ok'], ['o', '       order_totals']],
        [['g', 'OK']],
        [['p', '❯ ']],
      ],
    },
  },
]

export const moreProjects = { label: 'See more on GitHub', href: 'https://github.com/grobolsek?tab=repositories' }

// ---- Skills -----------------------------------------------------------------------------------------
// learning: true greys the bubble out (what I am learning now). glyph: a Lucide line icon where a tool has no logo.
export const skills = [
  {
    id: 'languages',
    title: 'Languages',
    items: [
      { id: 'python', name: 'Python', logo: L.python, text: 'My main language: image-analysis tools at Knauf Insulation, the Varsis backend, data dashboards and command-line tools such as atlas-views.' },
      { id: 'java', name: 'Java', logo: L.java, text: 'A compiler for a university course, from the lexer and parser to code generation for a small virtual machine, and algorithms and data structures work.' },
      { id: 'typescript', name: 'TypeScript', logo: L.typescript, text: 'The WebGPU dungeon crawler, written in TypeScript with no game engine underneath.' },
      { id: 'c', name: 'C', logo: L.c, text: 'Breaking C programs for a program security course: stack canaries and return-oriented programming, worked out in GDB.' },
      { id: 'sql', name: 'SQL', glyph: 'database', text: 'PostgreSQL behind Varsis, MySQL views kept in migrations with atlas-views, and data migrations at Knauf Insulation.' },
      { id: 'csharp', name: 'C#', logo: L.csharp, text: 'An interactive scheduler for booking meeting rooms at Sibo, together with Visual Basic.' },
      { id: 'vb', name: 'Visual Basic', logo: L.vb, text: 'Part of the meeting-room scheduler at Sibo, alongside C#.' },
      { id: 'rust', name: 'Rust', logo: L.rust, learning: true, text: 'Learning it by writing TINR, my own game engine, on the ECS from Bevy and Macroquad.' },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    items: [
      { id: 'vue', name: 'Vue', logo: L.vue, text: 'The front ends of Varsis and of this site, with Tailwind CSS and Vite.' },
      { id: 'react', name: 'React', logo: L.react, text: 'The dataset interface at Biolab, University of Ljubljana, with Material UI.' },
      { id: 'mui', name: 'Material UI', logo: L.mui, text: 'The components of the Biolab dataset interface, in React.' },
      { id: 'orange', name: 'Orange3', glyph: 'workflow', text: 'Biolab’s own data-mining toolkit, used with Python for the dataset interface I built there.' },
      { id: 'fastapi', name: 'FastAPI', logo: L.fastapi, text: 'The Varsis API: async SQLAlchemy on PostgreSQL, token sign-in, rate limits and a plugin system.' },
      { id: 'opencv', name: 'OpenCV', logo: L.opencv, text: 'Image analysis at Knauf Insulation, together with scikit-image, in command-line and desktop tools.' },
      { id: 'streamlit', name: 'Streamlit', logo: L.streamlit, text: 'Interactive dashboards, such as a crime-data study for a data-mining course with a random-forest predictor.' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    items: [
      { id: 'linux', name: 'Linux', logo: L.linux, text: 'My everyday system, and what every project I host runs on.' },
      { id: 'bash', name: 'Bash', logo: L.bash, text: 'Scripts for builds and deploys, and my dotfiles, kept in Git with chezmoi.' },
      { id: 'git', name: 'Git', logo: L.git, text: 'Every project lives in Git, with pre-commit hooks running Ruff before each commit.' },
      { id: 'docker', name: 'Docker', logo: L.docker, text: 'Everything I host runs in Docker Compose, with multi-stage builds and Caddy in front for HTTPS. Security labs run in containers too.' },
      { id: 'claude', name: 'Claude Code', logo: L.claude, text: 'Part of how I work every day. claude-container runs it in a sandboxed container on its own Git branch.' },
      { id: 'kubernetes', name: 'Kubernetes', logo: L.kubernetes, learning: true, text: 'Learning it now, as the next step after Docker Compose.' },
      { id: 'cloud-init', name: 'cloud-init', glyph: 'cloud-cog', learning: true, text: 'Learning it to set up new servers from a single config file.' },
      { id: 'vm', name: 'Virtual machines', glyph: 'server', learning: true, text: 'Learning to build and run my own virtual machines for test servers and labs.' },
    ],
  },
]

// ---- Work and education -----------------------------------------------------------------------------
export const work = [
  {
    role: 'Data scientist',
    org: 'Knauf Insulation',
    when: 'Since May 2025',
    text: 'Command-line and desktop tools that analyse images with scikit-image and OpenCV, dashboards, data migrations, and the documentation that brings new tools into the team.',
    icons: [L.python, L.opencv],
  },
  {
    role: 'Programmer',
    org: 'Biolab, University of Ljubljana',
    when: 'Summer 2024',
    text: 'An interface for viewing, maintaining and editing research datasets, built with React and Material UI, with Python and Orange3.',
    icons: [L.react, L.mui, L.python],
  },
  {
    role: 'Programmer',
    org: 'Sibo',
    when: 'Summer 2023',
    text: 'An interactive scheduler for booking meeting rooms, written in C# and Visual Basic.',
    icons: [L.csharp, L.vb],
  },
]

export const education = [
  {
    role: 'BSc, Computer and Information Science',
    org: 'Faculty of Computer and Information Science, University of Ljubljana',
    when: 'Studying',
    text: 'Focus on program and system security, DevOps, AI and game engines.',
    link: { label: 'Visit fri.uni-lj.si', href: 'https://fri.uni-lj.si' },
  },
  {
    role: 'Computer technician',
    org: 'School Centre Kranj',
    when: 'Finished',
    text: 'Secondary school in computer and information technology.',
    link: { label: 'Visit sckr.si', href: 'https://www.sckr.si' },
  },
]

// ---- About ------------------------------------------------------------------------------------------
export const about = {
  text: [
    'At university I focus on program and system security, DevOps and AI. In my own time I am writing a game engine in Rust.',
    'Away from the screen I climb, hike and play board games.',
  ],
  // the photos sit a little crooked on purpose; tone colours the tag on each
  hobbies: [
    { name: 'Climbing', photo: photos.climbing, tilt: '-3deg', tone: 'blue' },
    { name: 'Hiking', photo: photos.hiking, tilt: '2.5deg', tone: 'green' },
    { name: 'Board games', photo: photos.boardGames, tilt: '-1.5deg', tone: 'orange' },
  ],
}

// ---- The three cards under the hero -----------------------------------------------------------------
export const now = [
  { label: 'Now', title: 'Data scientist at Knauf Insulation', meta: 'Since May 2025', href: '#work', logo: L.python },
  { label: 'Studying', title: 'Computer science at FRI, University of Ljubljana', meta: 'BSc', href: '#education', glyph: 'graduation-cap' },
  { label: 'Building', title: 'TINR, my own game engine in Rust', meta: 'In progress', href: '#projects', logo: L.rust },
]
