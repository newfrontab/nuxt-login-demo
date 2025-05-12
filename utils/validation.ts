// Validation rules
export type ValidationRule = (value: string, state?: Record<string, any>) => string | null;

export function required(value: string): string | null {
  if (!value) {
    return 'This field is required';
  }
  return null;
}

export function email(value: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email address';
  }
  return null;
}

export function minLength(length: number): ValidationRule {
  return (value: string): string | null => {
    if (value.length < length) {
      return `Must be at least ${length} characters`;
    }
    return null;
  };
}

export function password(value: string): string | null {
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumbers = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
    return 'Password must contain uppercase, lowercase, number and special character';
  }
  return null;
}

export function sameAs(fieldName: string): ValidationRule {
  return (value: string, state?: Record<string, any>): string | null => {
    if (state && state[fieldName] && state[fieldName].value !== value) {
      return `Must match the "${fieldName}" field`;
    }
    return null;
  };
} 