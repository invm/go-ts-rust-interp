import { TokenType, Tokens } from "../token"
import { Lexer } from "./lexer"

const input = `
let five = 5;
let ten = 10;

let add = fn(x, y) {
x + y;
};
`

test('test next token', function() {
  const tests: [TokenType, string][] = [
    [Tokens.LET, "let"],
    [Tokens.IDENT, "five"],
    [Tokens.ASSIGN, "="],
    [Tokens.INT, "5"],
    [Tokens.SEMICOLON, ";"],
    [Tokens.LET, "let"],
    [Tokens.IDENT, "ten"],
    [Tokens.ASSIGN, "="],
    [Tokens.INT, "10"],
    [Tokens.SEMICOLON, ";"],
    [Tokens.LET, "let"],
    [Tokens.IDENT, "add"],
    [Tokens.ASSIGN, "="],
    [Tokens.FUNCTION, "fn"],
    [Tokens.LPAREN, "("],
    [Tokens.IDENT, "x"],
    [Tokens.COMMA, ","],
    [Tokens.IDENT, "y"],
    [Tokens.RPAREN, ")"],
    [Tokens.LBRACE, "{"],
    [Tokens.IDENT, "x"],
    [Tokens.PLUS, "+"],
    [Tokens.IDENT, "y"],
    [Tokens.SEMICOLON, ";"],
    [Tokens.RBRACE, "}"],
    [Tokens.SEMICOLON, ";"],
  ]

  const l = new Lexer(input)

  tests.forEach(([expectedType, expectedLiteral]) => {
    const tok = l.nextToken();
    expect(expectedType).toEqual(tok.type)
    expect(expectedLiteral).toEqual(tok.literal)
  });
})
