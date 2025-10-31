# React + TypeScript + Vite Project

Modern React application with TypeScript, Vite, and a comprehensive testing setup.

---

## 🚀 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **TailwindCSS 4** - Styling
- **Zustand** - State management
- **TanStack Query** - Data fetching
- **TanStack Router** - Routing
- **Vitest** - Testing framework
- **React Testing Library** - Component testing
- **Biome** - Linting & formatting
- **Atomic Design** - Component architecture

---

## 📦 Installation

```bash
# Install dependencies
bun install
```

---

## 🏃 Running the Project

```bash
# Development server (port 3500)
bun dev

# Build for production
bun build

# Preview production build
bun preview

# Lint code
bun lint

# Format code
bun format

# Check code quality
bun check
```

---

## 🧪 Testing

### Run Tests

```bash
bun test              # Watch mode (default)
bun test:run          # Run once (for CI/CD)
bun test:ui           # Open UI interface
bun test:coverage     # Generate coverage report
```

### Writing Tests

Create test files next to your components with `.test.tsx` or `.spec.tsx` extension.

**Basic Component Test:**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MyComponent } from "./MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
```

**Test with User Interactions:**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";

describe("Counter", () => {
  it("increments count on button click", async () => {
    const user = userEvent.setup();
    render(<Counter />);
    
    const button = screen.getByRole("button", { name: /increment/i });
    await user.click(button);
    
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
```

**Test with Providers (React Query, etc.):**

```tsx
import { render, screen } from "@/tests/test-utils"; // Custom render with providers

describe("MyComponent", () => {
  it("renders with all providers", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

### Testing Queries (Priority Order)

1. **`getByRole`** ⭐ - Most accessible (use first!)
   ```tsx
   screen.getByRole("button", { name: /submit/i })
   ```

2. **`getByLabelText`** - For form fields
   ```tsx
   screen.getByLabelText("Email Address")
   ```

3. **`getByPlaceholderText`** - For input placeholders
   ```tsx
   screen.getByPlaceholderText("Enter email...")
   ```

4. **`getByText`** - For non-interactive elements
   ```tsx
   screen.getByText("Welcome")
   ```

5. **`getByTestId`** - Last resort only!

### Common Matchers

```tsx
// Presence
expect(element).toBeInTheDocument()
expect(element).toBeVisible()

// Text
expect(element).toHaveTextContent("Hello")

// Attributes
expect(element).toHaveAttribute("href", "/path")
expect(element).toHaveClass("active")

// Form elements
expect(input).toHaveValue("test")
expect(checkbox).toBeChecked()
expect(button).toBeDisabled()

// Functions
expect(mockFn).toHaveBeenCalled()
expect(mockFn).toHaveBeenCalledWith(arg1, arg2)
```

### User Interactions

```tsx
const user = userEvent.setup();

await user.click(element);
await user.type(input, "Hello World");
await user.clear(input);
await user.selectOptions(select, "option1");
await user.keyboard("{Enter}");
```

### Async Testing

```tsx
// Wait for element to appear (preferred)
const element = await screen.findByText("Loaded");

// Or use waitFor
await waitFor(() => {
  expect(screen.getByText("Loaded")).toBeInTheDocument();
});
```

For complete testing documentation, see [`src/tests/README.md`](./src/tests/README.md).

---

## 🎯 Path Aliases

The `@` symbol is configured to point to the `src` directory:

```tsx
// Instead of this:
import { MyComponent } from '../../../components/MyComponent';

// You can do this:
import { MyComponent } from '@/components/MyComponent';
```

Works in both source code and tests!

---

## 📁 Project Structure

This project follows the **Atomic Design** methodology for component organization.

```
react-test-project-v1/
├── src/
│   ├── ui/                      # Atomic Design Components
│   │   ├── atoms/               # Smallest building blocks (buttons, inputs, etc.)
│   │   ├── molecules/           # Simple groups of atoms (form fields, cards, etc.)
│   │   ├── organisms/           # Complex UI components (headers, forms, etc.)
│   │   └── templates/           # Page-level layouts
│   ├── app/                     # Application routes
│   ├── features/                # Feature-based modules
│   ├── states/                  # Zustand stores (state management)
│   ├── lib/                     # Utilities and libraries
│   ├── design-system/           # Design tokens and theme
│   ├── assets/                  # Static assets (images, icons, etc.)
│   ├── tests/                   # Test utilities & setup
│   │   ├── setup.ts             # Vitest configuration
│   │   ├── test-utils.tsx       # Custom render with providers
│   │   ├── mocks/               # Mock data
│   │   └── README.md            # Complete testing guide
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
├── public/                      # Public assets
├── vite.config.ts               # Vite & Vitest config
├── tsconfig.json                # TypeScript config
├── biome.json                   # Biome config
└── package.json                 # Dependencies & scripts
```

### Atomic Design Structure

The `ui/` directory follows Brad Frost's Atomic Design methodology:

- **Atoms** (`ui/atoms/`) - Basic building blocks like buttons, inputs, labels
  - Smallest, indivisible UI components
  - Highly reusable and independent
  - Example: `Button`, `Input`, `Label`, `Icon`

- **Molecules** (`ui/molecules/`) - Simple component groups like search forms, card headers
  - Combinations of atoms working together
  - Single responsibility, still relatively simple
  - Example: `SearchField`, `FormGroup`, `CardHeader`

- **Organisms** (`ui/organisms/`) - Complex components like navigation bars, data tables
  - Complex UI sections with multiple molecules and atoms
  - Can contain business logic and state
  - Example: `Header`, `Sidebar`, `DataTable`, `UserProfile`

- **Templates** (`ui/templates/`) - Page layouts that define content structure
  - Page-level layouts without actual content
  - Define structure and component placement
  - Example: `DashboardLayout`, `AuthLayout`

This structure promotes:
- ✅ Reusability and consistency
- ✅ Clear component hierarchy
- ✅ Easier testing and maintenance
- ✅ Better separation of concerns

---

## ⚙️ Configuration

### Vite
- Port: 3500
- Auto-open browser on dev
- React Compiler enabled
- Path aliases configured

### TypeScript
- Strict mode enabled
- Path aliases: `@/*` → `./src/*`
- Vitest globals enabled

### Testing
- Environment: jsdom
- Coverage provider: v8
- Setup file: `src/tests/setup.ts`
- Custom render with providers

---

## 🔧 Additional Features

### React Compiler
This project uses the React Compiler for automatic optimizations. See [React Compiler documentation](https://react.dev/learn/react-compiler) for more information.

### Biome
Fast linter and formatter (replaces ESLint + Prettier):
```bash
bun lint      # Lint and auto-fix
bun format    # Format code
bun check     # Check everything
```

### Husky
Git hooks are configured for pre-commit checks.

---

## 📚 Resources

### Framework & Build
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Styling & UI
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

### State & Data
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [TanStack Router Documentation](https://tanstack.com/router/latest)

### Testing
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [jest-dom Matchers](https://github.com/testing-library/jest-dom)
- [User Event API](https://testing-library.com/docs/user-event/intro)

### Tools
- [Biome Documentation](https://biomejs.dev/)

---

## 🐛 Troubleshooting

### TypeScript errors after installing testing dependencies
1. Restart TypeScript server: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"
2. Close and reopen your editor
3. Run `bun install` to ensure dependencies are linked

### Path alias not working
- Already configured in both `vite.config.ts` and `tsconfig.app.json`
- Restart your dev server and TypeScript server

### Tests not running
- Ensure test files end with `.test.tsx` or `.spec.tsx`
- Check that files are inside the `src` directory
- Run `bun test` to see detailed error messages

---

## 📄 License

Private project - All rights reserved

---

**Happy Coding!** 🎉

For detailed testing documentation, see [`src/tests/README.md`](./src/tests/README.md).