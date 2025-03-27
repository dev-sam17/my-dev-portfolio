import { Feature197 } from "@/components/accordion-feature-section";

const demoData = {
  features: [
    {
      id: 1,
      title: " Core Web Technologies",
      image: "/skills/html.webp",
      description:
        " HTML5 (Semantic HTML), CSS3 (Flexbox, Grid, Animations), JavaScript (ES6+ Features, DOM Manipulation)",
    },
    {
      id: 2,
      title: "CSS Frameworks & Preprocessors",
      image: "/skills/css-frameworks.png",
      description:
        "Bootstrap, Material UI, Tailwind CSS, shadcn/ui, SCSS, Styled Components, CSS-in-JS",
    },
    {
      id: 3,
      title: "JavaScript (Typescript)  Frameworks & Libraries",
      image: "/skills/frameworks.png",
      description:
        "React (Hooks, Context API, React Router), Next.js  (Server-side Rendering, Static Site Generation), Redux/Redux Toolkit, Lodash, Moment.js, Axios, Fetch API",
    },
    {
      id: 4,
      title: "Core Backend Technologies",
      image: "/skills/backend.png",
      description:
        "Node.js (Event Loop, Streams, Clusters), Express.js (Routing, Middleware, Error Handling), RESTful APIs, GraphQL, WebSockets, gRPC (High-performance APIs)",
    },
    {
      id: 5,
      title: "Databases & ORMs",
      image: "/skills/databases.png",
      description:
        "MongoDB (Mongoose), MySQL, PostgreSQL (TypeORM), SQLite, Redis, Firebase, Prisma",
    },
    {
      id: 6,
      title: "Security Best Practices",
      image: "/skills/security.png",
      description:
        "Helmet.js (Security Headers), CORS, JWT (JSON Web Tokens), OAuth, HTTPS, Content Security Policy, Data Validation (Joi, Yup, Zod)",
    },
    {
      id: 7,
      title: "Must Have Tools",
      image: "/skills/must-have.png",
      description:
        "Git (Version Control), VS Code, Docker (Containerized Applications), Postman (API Testing & Documentation), ESLint & Prettier (Code Formatting & Linting),  AWS / Google Cloud / Azure (Cloud Services), Vercel / Netlify (Serverless Hosting)",
    },
  ],
};

function Feature197Demo() {
  return <Feature197 {...demoData} />;
}

export { Feature197Demo };
