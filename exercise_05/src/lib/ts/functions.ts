function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function format(num: number, separator = "."): string {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  const result = parts.length === 2 ? parts.join(".") : parts[0];

  return result;
}

export { delay, random, format };
