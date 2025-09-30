# HueX - Color Picker and Code Generator

HueX is a modern color picker application that helps designers and developers select colors and generate code snippets for their projects.

Go To: https://huex-theta.vercel.app/

## Features

- **Interactive Color Picker**: Select colors using an intuitive interface
- **Color Value Display**: View color values in HEX, RGB, HSL and HSV formats
- **Code Snippet Generator**: Generate code snippets for CSS, Tailwind, and other frameworks
- **Dark/Light Mode**: Supports both dark and light themes

## Getting Started

1. **Installation**

```bash
npm install
```

2. **Development**

```bash
npm run dev
```

This will start the development server on port 9002. Open [http://localhost:9002](http://localhost:9002) in your browser to view the application.

3. **Build**

```bash
npm run build
```

## Project Structure

- `src/app/page.tsx` - Main application page
- `src/components/` - React components
  - `HueXApp.tsx` - Main application component
  - `ColorPicker.tsx` - Color selection component
  - `ColorValueDisplay.tsx` - Displays color values in different formats
  - `CodeSnippetGenerator.tsx` - Generates code snippets for selected colors

## Technologies

- Next.js
- React
- Tailwind CSS
- TypeScript

## License

This project is licensed under the MIT License.
