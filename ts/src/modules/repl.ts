import { createInterface } from "readline";
import { Lexer } from "./lexer/lexer";
import { Tokens } from "./token";

const rl = createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query: string) => new Promise((resolve) => rl.question(query, resolve));

export async function start() {
  while (true) {
    const input = await prompt("λ ") as string;
    rl.on('pause', () => process.exit(0));
    const l = new Lexer(input)
    for (let tok = l.nextToken(); tok.type != Tokens.ILLEGAL; tok = l.nextToken()) {
      console.log(tok);
    }
  }
};
