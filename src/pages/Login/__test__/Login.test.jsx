import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor, global } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from "../Login";

const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useNavigate: () => mockedUsedNavigate, 
    };
});

const renderWithRouter = (ui, { route = "/" } = {}) => {
    window.history.pushState({}, 'Test page', route);

    return render(ui, { wrapper: MemoryRouter });
};

beforeEach(() => {
    renderWithRouter(<Login />);
})

describe("Login", () => {
    it("true", () => {
        expect(true).toBe(true);
    })
})

describe("Login structure", () => {
    it("renders correct heading", () => {
        expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/Social Media/i);
    });

    it("renders username label and input", () => {
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter your username/i)).toBeInTheDocument();
    });

    it("renders password label and input", () => {
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
    });

    it("renders button with Submit text", () => {
        const button = screen.getByRole("button", { name: /submit/i });
        expect(button).toHaveTextContent("Submit");
    });

    it("renders button with Submit text", () => {
        const button = screen.getByRole("button", { name: /demo user/i });
        expect(button).toHaveTextContent("Demo User");
    });

    it("renders link to sign up", () => {
        const link = screen.getByRole("link", { name: /sign up/i });
        expect(link).toHaveTextContent("Sign up");
    });
})


describe("Login error flags", () => {
    it("Missing username", async () => {
        const user = userEvent.setup();
        const button = screen.getByRole("button", { name: /submit/i });
        await user.click(button);
        expect(screen.getByTestId("username-error")).toHaveTextContent("Please enter username");
    })

    it("Missing password", async () => {
        const user = userEvent.setup();
        const button = screen.getByRole("button", { name: /submit/i });
        await user.click(button);
        expect(screen.getByTestId("password-error")).toHaveTextContent("Please enter password")
    })

})

// demo user success

