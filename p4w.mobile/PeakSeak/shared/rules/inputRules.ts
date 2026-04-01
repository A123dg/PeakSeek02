export const INPUT_RULES = {
  NO_TRIPLE_WHITESPACE: /\s{3,}/,
  ONLY_KEYBOARD_CHARS: /^[\p{L}\p{N}\p{P}\p{Zs}\t\r\n]*$/u,
} as const;

export const INPUT_RULE_MESSAGES = {
  NO_TRIPLE_WHITESPACE: 'Không được nhập 3 khoảng trắng liên tiếp.',
  ONLY_KEYBOARD_CHARS: 'Kí tự không hợp lệ',
} as const;

export type InputRuleError =
  | 'NO_TRIPLE_WHITESPACE'
  | 'ONLY_KEYBOARD_CHARS';

export const validateInputRules = (value: string): InputRuleError[] => {
  const errors: InputRuleError[] = [];

  if (INPUT_RULES.NO_TRIPLE_WHITESPACE.test(value)) {
    errors.push('NO_TRIPLE_WHITESPACE');
  }

  if (!INPUT_RULES.ONLY_KEYBOARD_CHARS.test(value)) {
    errors.push('ONLY_KEYBOARD_CHARS');
  }

  return errors;
};

export const sanitizeKeyboardInput = (value: string): string => {
  const withoutTripleWhitespace = value.replace(/\s{3,}/g, '  ');
  return Array.from(withoutTripleWhitespace)
    .filter((char) => INPUT_RULES.ONLY_KEYBOARD_CHARS.test(char))
    .join('');
};
