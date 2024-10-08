# Phlebologist website

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Technologies used:

- Next.js (app router)
- TypeScript
- Tailwind CSS
- Tina CMS

## Design Layout

[Figma](https://www.figma.com/file/bNPI6P1GKpYdnDjYJYV5AO/Medical-web-site)

## Getting Started

1. Clone repo

```bash
git@github.com:SoftRyzen-internship/phlebologist.git
```

> if you don't have access to repo - contact
> [@LanaSvetCat](https://t.me/LanaSvetCat) in telegram

1. Recommended for use **npm** - `npm i` or `npm install`
2. Create file `.env` in the project root using `.env.local.example` as a
   template.
3. Run the CMS via `npm run cms-build` and wait for the build to compile.
4. Run the local server via `npm run dev` command.
5. Access the website at `http://localhost:3000`. The admin panel is available
   at `http://localhost:3000/admin`. Note, that you need to be logged in at Tina
   Cloud to be able to access the CMS.

### Personal branch

1. Go to **dev** branch (`git checkout dev`) and fetch the contents
   (`git pull`).
2. Create your working branch from **dev**. The naming policy for the branches
   is: **add/update/fix/delete** + **feature name** + **your surname**.

### Pre-commit actions

1. Run `npm run format` so that prettier could check and adjust your formatting.
2. Run `npm run test-all` if you'd like to perform a full code test. This
   command will also be executed automatically before commiting your changes to
   GH.
3. Fix the errors and if there are none - you can go ahead with commiting your
   changes to your branch.
4. Make sure to give your commit a name that clearly states what has been done:
   **add/update/fix/remove** + **feature/component name**. Example: _"update
   Header types & styles"_.

### Pull requests

1. Before creating a PR, make sure to `git pull` the current version of **dev**
   into your branch and resolve the conflicts locally.
2. When creating a PR, make sure to choose **dev** as a branch to merge your
   working branch into.
3. Request your PR to be reviewed by the Team Lead - **Yana Palamarchuk**
   (**Yana-Palam**).

## Project structure

> Attention! The project structure is not final and can be changed at any time.

**☝️ Create a components folder for each module**

<details>

<summary><b>💡 Example:</b></summary>

<br/>

```
# ✅ Good

├── components
    ├── Header
        ├── Header.tsx
    ├── Footer
        ├── Footer.tsx
```

</details>

---

**☝️ Use the default export for the component**

<details>

<summary><b>💡 Example:</b></summary>

<br/>

```ts
# ✅ Good

const Header = () => { ... }

export default Header;
```

</details>

---

**☝️ Perform a re-export of your component from the `index.ts` file in the
`components` folder**

<details>

<summary><b>💡 Example:</b></summary>

<br/>

```ts
# ✅ Good

// @/components/index.ts

export { default as Header } from '@/components/Header/Header';
```

</details>

---

**☝️ Add `Section` to the section name when performing a re-export**

<details>

<summary><b>💡 Example:</b></summary>

<br/>

```ts
# ✅ Good

// @/sections/About/About.tsx

const About = () => { ... }

export default About;

// @/sections/index.ts

export { default as AboutSection } from '@/sections/About/About';
```

</details>

---

**☝️ Reusable css classes should be placed in the `styles` folder .**

<details>

<summary><b>💡 Example:</b></summary>

<br/>

```css
/*globals.css */

@layer components {
  .your-class {
    @apply ...;
  }
}
```

</details>

---

**☝️ Static data and CMS-stored data usage**

Static data is stored within the dictionaries and can be accessed via
`getDictionary(lang)`. Fetch functions for requesting data from admin system
also require passing `lang` as an argument. The CMS stores the data in the
following collections:

- About (AboutSection - tab data)
- Banner (Banner, Section 5 - text data)
- Reviews (ReviewsSection - slider data)
- Results (ResultsSection - slider data)

<details>

<summary><b>💡 Examples:</b></summary>

<br/>

```ts
// page.tsx

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  // fetching local data for the selected lang
  const { page, socials } = await getDictionary(lang);
  ...
}

// @sections/About/About.tsx

const data = await fetchAbout(lang);
```

</details>

---

**☝️ Description of object structure**

<details>

<summary><b>💡 Structure: </b></summary>

<br/>

```
|-- components -> folder with reusable components
  |-- NameComponent -> folders for each component
    |-- NameComponent.tsx -> main component
    |-- NameComponent.props.ts -> prop types for this component
    |-- NameComponent.module.css -> additional styles for the component (only if necessary)
  |-- index.ts -> file for re-exports
|-- app
  |-- [lang] -> layout, pages and routing
|-- public -> static files
  |-- icons -> folder with icons
  |-- images -> folder with images
|-- styles -> global styles
|-- sections -> folder with section components
  |-- SectionComponent -> folders for each section component
    |-- SectionComponent.tsx -> main section component
    |-- SectionComponent.props.ts -> prop types for this section component
    |-- SectionComponent.module.css -> additional styles for the component (only if necessary)
  |-- index.ts -> file for re-exports
|-- types -> global types
|-- dictionaries -> website content for different locales
|-- data -> data for the project (can be created if necessary)
|-- hooks -> custom users hooks (can be created if necessary)
|-- utils -> helpers, functions, etc.
|-- api -> data fetching requests
```

</details>

---

## 📚 Components API

Each reusable component has its own API. You can find it in the component's
folder. This is a list of most common components and their API.

- ### Heading

| Prop        | Default     | Description                                       |
| ----------- | ----------- | ------------------------------------------------- |
| `tag`       | `h2`        | choose the tag of title you'd need: `h1` - `h3`   |
| `view`      | `undefined` | if the heading is in Hero section, specify `hero` |
| `variant`   | `primary`   | `main`, `primary`, `secondary`                    |
| `children`  | `undefined` | required, any content                             |
| `className` | `undefined` | add custom or additional css class you'd need     |

- ### ButtonPrimary

The Primary Button has `button` tag and performs an action when clicked.

| Prop            | Default     | Description                                               |
| --------------- | ----------- | --------------------------------------------------------- |
| `view`          | `undefined` | if the button is used in Header, specify `header`         |
| `variant`       | `light`     | choose the color variant of the button: `light` or `dark` |
| `className`     | `undefined` | add any custom styles                                     |
| `children`      | `undefined` | a necessary prop. any text content                        |
| `actionHandler` | `undefined` | a function that is executed when clicked                  |

- ### ButtonSecondary

The Secondary Button has `a` tag and performs a transition to another part of
the site when pressed.

| Prop        | Default     | Description                                           |
| ----------- | ----------- | ----------------------------------------------------- |
| `linkto `   | `undefined` | a necessary prop. the address of the link             |
| `view`      | `undefined` | if the button is used in Hero section, specify `hero` |
| `className` | `undefined` | add any custom styles                                 |
| `children`  | `undefined` | a necessary prop. any text content                    |

- ### SubmitButton

The button of `Form`.

| Prop            | Default     | Description                              |
| --------------- | ----------- | ---------------------------------------- |
| `className`     | `undefined` | add any custom styles                    |
| `children`      | `undefined` | a necessary prop. any text content       |
| `actionHandler` | `undefined` | a function that is executed when clicked |

- ### ExternalLinkButton

Has `a` tag and leads to an external source.

| Prop        | Default     | Description                                   |
| ----------- | ----------- | --------------------------------------------- |
| `linkto `   | `undefined` | the address of the link                       |
| `className` | `undefined` | add any custom styles                         |
| `children`  | `undefined` | a necessary prop. any text content            |
| `variant`   | `default`   | choose the style variant: `default` or `menu` |

- ### RoutingLinkButton

Has `a` tag and provides navigation between routes.

| Prop        | Default     | Description                        |
| ----------- | ----------- | ---------------------------------- |
| `linkto `   | `undefined` | the address of the route           |
| `className` | `undefined` | add any custom styles              |
| `children`  | `undefined` | a necessary prop. any text content |

- ### ScrollLinkButton

Has `a` tag and provide scrolling to the appropriate `section`.

| Prop        | Default     | Description                                         |
| ----------- | ----------- | --------------------------------------------------- |
| `linkto `   | `undefined` | the address of the link                             |
| `variant`   | `light`     | choose the color variant: `light`, `dark` or `menu` |
| `className` | `undefined` | add any custom styles                               |
| `children`  | `undefined` | a necessary prop. any text content                  |

- ### IconBtn

The Icon Button has either `anchor` or `button` tag.

| Prop           | Type          | Description                                           |
| -------------- | ------------- | ----------------------------------------------------- |
| `icon`         | 'tiktok'      | - Anchor that leads to Tiktok page,                   |
|                | 'facebook'    | - Anchor that leads to Facebook page,                 |
|                | 'instagram'   | - Anchor that leads to Instagram page,                |
|                | 'arrow'       | - Navigation button with arrow to the right,          |
|                | 'location'    | - Geolocation anchor,                                 |
|                | 'close'       | - Modal close button,                                 |
|                |               |                                                       |
|                |               |                                                       |
| `variant`      | 'result'      | - Button in treatment result section,                 |
|                | 'feedback'    | - Button in feedback section,                         |
|                | 'contacts'    | - Button in contacts section,                         |
|                | 'footer'      | - Button in footer section,                           |
|                | 'location'    | - Geolocation button,                                 |
|                | 'close'       | - Modal close button,                                 |
|                |               |                                                       |
|                |               |                                                       |
| `onClick`      | void function | Optional, click handler                               |
|                |               |                                                       |
| `reverse`      | boolean       | Optional, false by default, turns icon by 180 degrees |
|                |               |                                                       |
| `className`    | string        | Optional, add additional tailwind classes,            |
|                |               | e.g. to position component                            |
|                |               |                                                       |
| `iconFunction` | string        | Aria-label on button/anchor element,                  |
|                |               | taken from dictionary.ts                              |
|                |               |                                                       |
| `iconLabel`    | string        | Aria-label on svg element, taken from dictionary.ts   |
|                |               |                                                       |
| `url`          | string        | Optional, url address, applies anchor element         |
|                |               | instead of button element,                            |
|                |               | and is used inside `href` attribute                   |
|                |               |                                                       |

- ### Slider

The `Slider` component is created using `keen slider` library.

| Prop             | Type       | Description                                                    |
| ---------------- | ---------- | -------------------------------------------------------------- |
| `slides `        | `array`    | Array of objects fetched from backend and to be mapped inside  |
|                  |            | slider. Each object must contain `__typename` field (string).  |
|                  |            |                                                                |
| `staticData`     | `object`   | Data from dictionary. const staticData = page.home.iconBtnData |
|                  |            |                                                                |
| `section`        | `result`   | In which section the slider will be used - treatment results   |
|                  | `feedback` | patients' feedback.                                            |
|                  |            |                                                                |
| `slide`          | `function` | A function component that will be used as a slide              |
|                  |            | inside the slider. The component must have two props:          |
|                  |            | 1. data - an object from slides array (see above)              |
|                  |            | 2. className - optional prop with additional tailwind classes  |
|                  |            | IMPORTANT! - the component must have "use client" directive    |
|                  |            | specified explicitly at the top!                               |
|                  |            |                                                                |
| `slideClassName` | `string`   | Optional, additional tailwind classes string that              |
|                  |            | will be passed to the slide component (see above)              |

- ### InfoBlock

The `InfoBlock` is a universal component that always has a title and optionally
some content of different type - text, url, list or other component.

- IMPORTANT! The `InfoBlock` does not have a container, therefore you can wrap
  it in any kind of container you need - div, li, article etc.
- IMPORTANT! The component only receives one prop -`config` which is an object
  of the following properties:

| Property           | Type        | Description                                        |
| ------------------ | ----------- | -------------------------------------------------- |
| `section`          | 'treatment' | Specifies, in which section the component is used: |
|                    | 'contacts'  | `Treatment Methods` or `Contacts`                  |
|                    |             |                                                    |
| `title`            | string      | Text of the block title                            |
|                    |             |                                                    |
| `titleClassName`   | string      | Optional, add additional tailwind classes to title |
|                    |             |                                                    |
| `contentType`      |             | Optional, 'text' by default, defines content type: |
|                    | 'text'      | - if content is an ordinary text string (<p>)      |
|                    | 'link'      | - if content is a url string (<a>),                |
|                    | 'list'      | - if content is a list of text strings,            |
|                    | 'component' | - if content is a component/components             |
|                    |             |                                                    |
| `content`          |             | Optional, pass the content that goes under title:  |
|                    | string      | - necessary if `contentType` is 'text' or 'link'   |
|                    |             | (`<p>{string}</p>` or `<a>{string}</a>`)           |
|                    |             |                                                    |
|                    | string[]    | - necessary if `contentType` is 'list',            |
|                    |             |                                                    |
|                    | 'list'      | - if content is a list of text strings,            |
|                    |             |                                                    |
|                    |             | - IMPORTANT! if `contentType` is 'component' -     |
|                    |             | content is inserted as children, not as a prop     |
|                    |             |                                                    |
| `link`             | string      | Optional, necessary if `contentType` is 'link',    |
|                    |             | a url that is passed into href attribute           |
|                    |             | (`<a href={string}></a>`)                          |
|                    |             |                                                    |
| `contentClassName` | string      | Optional, add additional tailwind classes to       |
|                    |             | text content in a text, link or list item          |
|                    |             |                                                    |
