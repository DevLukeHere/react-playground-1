# Testing Guide

Complete guide for testing in this React + TypeScript + Vitest project.

This project follows the **Atomic Design** methodology for component organization.

---

## 🚀 Running Tests

```bash
bun test              # Watch mode (default)
bun test:run          # Run once (CI/CD)
bun test:ui           # Open UI interface
bun test:coverage     # Generate coverage report
```

---

## 📁 Project Structure

This project uses **Atomic Design** for component organization:

```
src/
├── ui/                      # Atomic Design Components
│   ├── atoms/               # Basic building blocks (buttons, inputs, labels)
│   ├── molecules/           # Simple groups (form fields, cards)
│   ├── organisms/           # Complex components (headers, forms, tables)
│   └── templates/           # Page-level layouts
├── features/                # Feature-based modules
├── states/                  # Zustand stores
├── app/                     # Application routes
├── lib/                     # Utilities and libraries
├── tests/                   # Test utilities & setup
│   ├── setup.ts             # Vitest configuration & matchers
│   ├── test-utils.tsx       # Custom render with providers
│   ├── mocks/               # Mock data
│   └── README.md            # This file
└── App.test.tsx             # Example test file
```

### Testing Atomic Design Components

Different levels of the Atomic Design hierarchy require different testing strategies:

#### Atoms - Test in Isolation
- Focus on props and rendering variations
- Test basic interactions (clicks, focus, etc.)
- No complex state or side effects
- Example: Button variants, input validation, icon rendering

#### Molecules - Test Composition
- Test how atoms work together
- Verify data flow between child components
- Test simple component logic
- Example: Form field with label and error, search box with button

#### Organisms - Test Integration
- Test complex behaviors and business logic
- Mock external dependencies (APIs, stores)
- Use custom render with providers
- Test state management integration
- Example: Navigation with user menu, data table with sorting

#### Templates - Test Layout
- Test component placement and structure
- Test responsive behavior if applicable
- Focus on layout composition, not content
- Example: Page layouts, grid systems

---

## ⚙️ Configuration

### vite.config.ts
- Test environment: `jsdom`
- Global test utilities enabled
- Setup file: `src/tests/setup.ts`
- Coverage provider: `v8`

### tsconfig.app.json
- Types: `vitest/globals`, `@testing-library/jest-dom`
- Path alias: `@/*` → `./src/*`

### Test Utils (`test-utils.tsx`)
Custom render function that includes:
- React Query provider (pre-configured)
- Any other context providers your app needs

---

## ✍️ Writing Tests

### Basic Component Test (Atoms)

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/ui/atoms/Button";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });
});
```

### Test with User Interactions (Molecules)

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchField } from "@/ui/molecules/SearchField";

describe("SearchField", () => {
  it("calls onSearch when user types and submits", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<SearchField onSearch={onSearch} />);
    
    await user.type(screen.getByRole("textbox"), "test query");
    await user.click(screen.getByRole("button", { name: /search/i }));
    
    expect(onSearch).toHaveBeenCalledWith("test query");
  });
});
```

### Test with Providers (Organisms with State)

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@/tests/test-utils"; // Custom render!
import { UserProfile } from "@/ui/organisms/UserProfile";

describe("UserProfile", () => {
  it("renders user data from store", () => {
    render(<UserProfile userId="123" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    // Then test loaded state...
  });
});
```

### Mock Functions

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "./Form";

describe("Form", () => {
  it("calls onSubmit when submitted", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    
    render(<Form onSubmit={handleSubmit} />);
    
    await user.click(screen.getByRole("button", { name: /submit/i }));
    
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
```

### Test Async/Loading States

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AsyncComponent } from "./AsyncComponent";

describe("AsyncComponent", () => {
  it("shows loading then data", async () => {
    render(<AsyncComponent />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
    // Wait for element to appear
    expect(await screen.findByText("Data loaded")).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
```

### Test Zustand Stores

```tsx
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCounterStore } from "@/states/useCounterStore";

describe("useCounterStore", () => {
  beforeEach(() => {
    useCounterStore.setState({ count: 0 });
  });

  it("increments count", () => {
    const { result } = renderHook(() => useCounterStore());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

---

## 🔍 Queries Reference

### Priority Order (Use in this order!)

1. **`getByRole`** ⭐ Most accessible
   ```tsx
   screen.getByRole("button", { name: /submit/i })
   screen.getByRole("textbox", { name: /email/i })
   screen.getByRole("heading", { name: /welcome/i })
   ```

2. **`getByLabelText`** - Form fields
   ```tsx
   screen.getByLabelText("Email Address")
   ```

3. **`getByPlaceholderText`** - Input placeholders
   ```tsx
   screen.getByPlaceholderText("Enter email...")
   ```

4. **`getByText`** - Non-interactive elements
   ```tsx
   screen.getByText("Welcome")
   screen.getByText(/hello world/i)
   ```

5. **`getByTestId`** - Last resort only!
   ```tsx
   screen.getByTestId("custom-element")
   ```

### Query Variants

| Variant | Returns | Use Case |
|---------|---------|----------|
| `getBy...` | Element or throws | Assert element exists |
| `queryBy...` | Element or `null` | Assert element doesn't exist |
| `findBy...` | Promise<Element> | Wait for async element |

```tsx
// Element exists
expect(screen.getByText("Hello")).toBeInTheDocument();

// Element doesn't exist
expect(screen.queryByText("Goodbye")).not.toBeInTheDocument();

// Wait for element
const element = await screen.findByText("Loaded!");
```

---

## 👆 User Interactions

```tsx
const user = userEvent.setup();

// Click
await user.click(element);
await user.dblClick(element);

// Type
await user.type(input, "Hello World");
await user.clear(input);

// Select
await user.selectOptions(select, "option1");

// Checkbox/Radio
await user.click(checkbox);

// Keyboard
await user.keyboard("{Enter}");
await user.tab();
```

---

## ✅ Common Matchers

### Presence
```tsx
expect(element).toBeInTheDocument()
expect(element).toBeVisible()
expect(element).not.toBeInTheDocument()
```

### Text Content
```tsx
expect(element).toHaveTextContent("Hello")
expect(element).toContainHTML("<span>Hi</span>")
```

### Attributes
```tsx
expect(element).toHaveAttribute("href", "/path")
expect(element).toHaveClass("active")
expect(element).toHaveStyle({ color: "red" })
```

### Form Elements
```tsx
expect(input).toHaveValue("test")
expect(checkbox).toBeChecked()
expect(button).toBeDisabled()
expect(input).toHaveFocus()
```

### Functions (Mocks)
```tsx
expect(fn).toHaveBeenCalled()
expect(fn).toHaveBeenCalledTimes(2)
expect(fn).toHaveBeenCalledWith(arg1, arg2)
expect(fn).toHaveReturned()
```

---

## 🎭 Mocking

### Mock Functions
```tsx
const mockFn = vi.fn();
const mockFn = vi.fn(() => "return value");
const mockFn = vi.fn().mockResolvedValue("async value");
```

### Mock Modules
```tsx
vi.mock("axios");
vi.mock("@/utils/api", () => ({
  fetchData: vi.fn(),
}));

// Use in test
vi.mocked(axios.get).mockResolvedValueOnce({
  data: { id: 1, name: "Test" }
});
```

### Clear/Reset Mocks
```tsx
beforeEach(() => {
  vi.clearAllMocks();    // Clear call history
  vi.resetAllMocks();    // Reset implementation
});
```

---

## ⏱️ Async Testing

### Using `findBy` (Preferred)
```tsx
const element = await screen.findByText("Loaded");
expect(element).toBeInTheDocument();
```

### Using `waitFor`
```tsx
await waitFor(() => {
  expect(screen.getByText("Loaded")).toBeInTheDocument();
});
```

---

## 🎯 Best Practices

### ✅ DO

```tsx
// Test what users see
expect(screen.getByText("Welcome")).toBeInTheDocument();

// Use accessible queries
screen.getByRole("button", { name: /submit/i });

// Wait for async operations
await screen.findByText("Loaded");

// Use descriptive test names
it("displays error when email is invalid", () => { ... });

// Reset state between tests
beforeEach(() => {
  useStore.setState({ value: 0 });
});
```

### ❌ DON'T

```tsx
// Don't test implementation details
expect(component.state.isOpen).toBe(true);

// Don't use container queries
container.querySelector(".my-class");

// Don't use arbitrary waits
await new Promise(r => setTimeout(r, 1000));

// Don't write generic test names
it("works", () => { ... });
```

---

## 🐛 Troubleshooting

### TypeScript errors after installation
1. Restart TypeScript server: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"
2. Close and reopen your editor
3. Run `bun install` to ensure dependencies are linked

### Path alias `@/` not working
- Already configured in both `vite.config.ts` and `tsconfig.app.json`
- Restart your dev server and TypeScript server

### Tests not running
- Check that test files end with `.test.tsx` or `.spec.tsx`
- Ensure files are inside the `src` directory

---

## 📚 Resources

- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [jest-dom Matchers](https://github.com/testing-library/jest-dom)
- [User Event](https://testing-library.com/docs/user-event/intro)
- [Common RTL Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

## 💡 Quick Example

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  it("submits form with email and password", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    
    render(<LoginForm onSubmit={onSubmit} />);
    
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /log in/i }));
    
    expect(onSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });
});
```

---

**Happy Testing!** 🎉

For a working example, check out `src/App.test.tsx`.