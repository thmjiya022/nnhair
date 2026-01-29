# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# NN HAIR - COMPLETE TYPESCRIPT PROJECT STRUCTURE

```
nn-hair-tsx/
├── src/
│   ├── components/
│   │   ├── home/
│   │   │   ├── HeroSection.tsx ✅
│   │   │   ├── FeaturedProducts.tsx ✅
│   │   │   ├── CategoryShowcase.tsx ✅
│   │   │   ├── Testimonials.tsx ✅
│   │   │   └── InstagramFeed.tsx ✅
│   │   └── Layout.tsx ✅
│   │
│   ├── pages/
│   │   ├── Home.tsx ✅
│   │   ├── Catalog.tsx ✅
│   │   ├── ProductDetail.tsx ⏳
│   │   ├── Cart.tsx ⏳
│   │   ├── Checkout.tsx ⏳
│   │   ├── OrderSuccess.tsx ⏳
│   │   ├── About.tsx ⏳
│   │   └── Contact.tsx ⏳
│   │
│   ├── data/
│   │   ├── products.ts ✅
│   │   ├── orders.ts ✅
│   │   └── contactMessages.ts ✅
│   │
│   ├── types/
│   │   └── index.ts ✅
│   │
│   ├── utils/
│   │   └── index.ts ✅
│   │
│   ├── App.tsx ⏳
│   ├── main.tsx ⏳
│   └── index.css ⏳
│
├── public/
├── index.html ⏳
├── package.json ⏳
├── tsconfig.json ⏳
├── vite.config.ts ⏳
├── tailwind.config.js ⏳
├── postcss.config.js ⏳
├── .gitignore ⏳
├── README.md ⏳
└── QUICKSTART.md ⏳
```

✅ = Created
⏳ = Creating now