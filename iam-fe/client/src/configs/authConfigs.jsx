export const authConfigs = {
  login: {
    title: "Welcome Back!",
    description: "Get back in and keep things moving!",
    fields: [
      { name: "email", label: "Email", type: "text", required: true },
      { name: "password", label: "Password", type: "password", required: true },
      { name: "roleCode", label: "Select Role", type: "select", options: [
        { value: "SUPER_ADMIN", label: "Super Admin" },
        { value: "ADMIN", label: "Admin" },
        { value: "NORMAL_USER", label: "Normal User" },
      ], required: true },

      // Special layout types
      { name: "rememberMe", label: "Remember me", type: "rememberMe" },
      { name: "forgotPassword", label: "Forgot password?", type: "forgotPasswordLink", href: "/forgot-password" },
      { name: "loginWithGoogle", label: "Login with Google", type: "loginWithGoogle", href: "/auth/google" },
      { name: "signUp", label: "Haven't had an account? Sign up now!", type: "signUpLink", href: "/signup" }
    ],
    submitText: "Sign in",
  },

  forgot: {
    title: "Forgot Your Password?",
    description: "Enter your email and we'll send you instructions to reset your password.",
    fields: [
      { name: "email", label: "Email", type: "text", required: true },
    ],
    submitText: "Request Reset",
  },

  reset: {
    title: "Reset Your Password",
    description: "Please enter a new password and confirm it to update your account.",
    fields: [
      { name: "newPassword", label: "New Password", type: "password", required: true },
      { name: "confirmPassword", label: "Confirm Password", type: "password", required: true },
    ],
    submitText: "Update Password",
  },
};
