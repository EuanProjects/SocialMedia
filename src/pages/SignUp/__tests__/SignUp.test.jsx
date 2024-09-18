import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from '@testing-library/react';
import SignUp from "../SignUp";

describe('Sign up structure', () => {
  beforeEach(() => {
    render(<SignUp />);
  });

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

  it("renders confirm password label and input", () => {
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/confirm your password/i)).toBeInTheDocument();
  });

  it("renders button with Submit text", () => {
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Submit");
  });
});

// sign up with confirmation
// describe('Successful sign up', () => {
//   expect(true).toMatch(true);
// })

// sign up missing username

// sign up missing password

// sign up missing confirm password

// sign up error signing up


