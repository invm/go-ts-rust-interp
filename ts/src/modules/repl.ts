import { createInterface } from "readline";
import { Lexer } from "./lexer/lexer";
import { Tokens } from "./token";

const rl = createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query: string) => new Promise((resolve) => rl.question(query, resolve));

(async () => {
  while (true) {
    const input = await prompt(">>") as string;
    rl.on('pause', () => process.exit(0));
    console.log({ input });
    const l = new Lexer(input)
    for (let tok = l.nextToken(); tok.type != Tokens.ILLEGAL; tok = l.nextToken()) {
      console.log(tok);
    }
    console.log('asd')
  }
  rl.close();
})();

rl.on('line', (input) => console.log(`Received: ${input}`));
rl.on('close', () => console.log(`Readline closed.`));

rl.on('close', () => process.exit(0));
