import { reactive, computed, watch } from 'vue';
import { debounce } from '@/utils/debounce';
import type { ValidationRule } from '@/utils/validation';

type ValidationRules = Record<string, ValidationRule[]>;

interface ValidationState {
  value: string;
  errors: string[];
  touched: boolean;
  valid: boolean;
}

interface FormState {
  [key: string]: ValidationState;
}

/**
 * @description A composable for form validation
 * @param options - The options for the validation
 * @param options.rules - The rules for the validation
 * @param options.validateOnInput - Whether to validate on input
 * @returns The validation state
 */
export function useValidation(options: {
  rules: ValidationRules;
  validateOnInput?: boolean;
}) {
  const { rules, validateOnInput = true } = options;
  const state = reactive<FormState>({});
  const isValid = computed(() =>
    Object.values(state).every((field) => field.valid)
  );

  // Initialize form state
  Object.entries(rules).forEach(([field, fieldRules]) => {
    state[field] = {
      value: '',
      errors: [],
      touched: false,
      valid: !fieldRules.includes(required),
    };
  });

  // Individual field validation
  function validate(field: string, value: string) {
    const fieldRules = rules[field];
    if (!fieldRules.length) return;
    const errors: string[] = [];
    let isValid = true;

    fieldRules.forEach((rule) => {
      const error = rule(value, state);
      if (error) {
        errors.push(error);
        isValid = false;
      }
    });

    state[field].errors = errors;
    state[field].valid = isValid;
    state[field].touched = true;
  }

  // Validate all provided fields
  function validateForm() {
    Object.keys(rules).forEach((field) => {
      validate(field, state[field].value);
    });
  }

  if (validateOnInput) {
    // Watch for changes
    Object.keys(rules).forEach((field) => {
      watch(
        () => state[field].value,
        debounce((newValue) => validate(field, newValue), 500)
      );
    });
  }

  return {
    state,
    isValid,
    validateForm,
  };
}
