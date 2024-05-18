const specials = '!@#$%^&*()_+{}:"<>?|[];\',./`~';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';

const all = specials + lowercase + uppercase + numbers;

export function generatePassword() {
  let password = '';

  password += pick(password, specials, 1, 3);
  password += pick(password, lowercase, 1, 3);
  password += pick(password, uppercase, 1, 3);
  password += pick(password, all, 10);

  return shuffle(password);
}

function pick(exclusions: string, string: string, min: number, max?: number) {
  let n,
    chars = '';

  if (max === undefined) {
    n = min;
  } else {
    n = min + Math.floor(Math.random() * (max - min + 1));
  }

  let i = 0;
  while (i < n) {
    const character = string.charAt(Math.floor(Math.random() * string.length));
    if (exclusions.indexOf(character) < 0 && chars.indexOf(character) < 0) {
      chars += character;
      i++;
    }
  }

  return chars;
}

function shuffle(string: string) {
  const array = string.split('');
  let tmp,
    current,
    top = array.length;

  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

  return array.join('');
}
