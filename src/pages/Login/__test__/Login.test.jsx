import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("Login", () => {
    it("true", () => {
        expect(true).toBe(true);
    })
})
/*

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
})


describe("Login error flags", () => {
    // error for username
    it("Missing username", async () => {
        const user = userEvent.setup();
        const button = screen.getByRole("button", { name: /submit/i });
        await user.click(button);
        expect(screen.getByTestId("username-error")).toHaveTextContent("Please enter username");
    })
    // error for password
    it("Missing password", async () => {
        const user = userEvent.setup();
        const button = screen.getByRole("button", { name: /submit/i});
        await user.click(button);
        expect(screen.getByTestId("password-error")).toHaveTextContent("Please enter password")
    })

    // error for user does not exist

})

// mock user is successfull login

// demo user success
*/

