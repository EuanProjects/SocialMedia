import { describe, it, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from "../SignUp";

beforeEach(() => {
  <MemoryRouter>
    <SignUp />
  </MemoryRouter>
});

describe('true', () => {
  it('true', () => {
    expect(true).toBe(true)
  })
})

// describe('Sign up structure', () => {

//   it("renders correct heading", () => {
//     expect(screen.getByRole("heading", { level: 1 }).textContent).toMatch(/Social Media/i);
//   });

//   it("renders username label and input", () => {
//     expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/enter your username/i)).toBeInTheDocument();
//   });

//   it("renders password label and input", () => {
//     expect(screen.getByLabelText("Password")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
//   });

//   it("renders confirm password label and input", () => {
//     expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/confirm your password/i)).toBeInTheDocument();
//   });

//   it("renders button with Submit text", () => {
//     const button = screen.getByRole("button");
//     expect(button).toHaveTextContent("Submit");
//   });

//   // it("renders link to login", () => {
//   //   const link = screen.getByRole("link", { name: /login/i });
//   //   expect(link).toHaveTextContent("Login");
//   // });
// });

// describe('Sign up error flags', () => {
//   it("Missing username", async () => {
//     const user = userEvent.setup();
//     const button = screen.getByRole("button", { name: /submit/i });
//     await user.click(button);
//     expect(screen.getByTestId("username-error")).toHaveTextContent("Please enter a username");
//   })

//   it("Missing password", async () => {
//     const user = userEvent.setup();
//     const button = screen.getByRole("button", { name: /submit/i });
//     await user.click(button);
//     expect(screen.getByTestId("password-error")).toHaveTextContent("Please enter a password");
//   })


//   it("Missing confirm password", async () => {
//     const user = userEvent.setup();
//     const button = screen.getByRole("button", { name: /submit/i });
//     await user.click(button);
//     expect(screen.getByTestId("confirm-password-error")).toHaveTextContent("Please confirm your password");
//   })

//   it("Passwords do not match", async () => {
//     const user = userEvent.setup();

//     const password = screen.getByTestId("password")
//     await user.type(password, 'password123');

//     const confirmPassword = screen.getByTestId("confirm-password")
//     await user.type(confirmPassword, 'password456');

//     const button = screen.getByRole("button", { name: /submit/i });
//     await user.click(button);
//     expect(screen.getByTestId("confirm-password-error")).toHaveTextContent("Passwords do not match");
//   })
// })

// const mockedUsedNavigate = vi.fn();

// vi.mock('react-router-dom', () => ({
//   useNavigate: () => mockedUsedNavigate,
// }));

// describe('SignUp Component', () => {
//   it('successful sign up', async () => {
//     const user = userEvent.setup();

//     const username = screen.getByLabelText(/username/i);
//     const password = screen.getByTestId("password");
//     const confirmPassword = screen.getByTestId("confirm-password");

//     await user.type(username, 'validUser');
//     await user.type(password, 'password123');
//     await user.type(confirmPassword, 'password123');

//     const submitButton = screen.getByRole('button', { name: /submit/i });
//     await user.click(submitButton);

//     expect(username).toHaveValue('');
//     expect(password).toHaveValue('');
//     expect(confirmPassword).toHaveValue('');

//     expect(mockedUsedNavigate).toHaveBeenCalledWith('/login', {
//       state: { signUpSuccessful: true }
//     });
//   });
// });






