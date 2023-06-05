export type TokenType = string;

export type Token = {
  type: TokenType;
  literal: string;
}

export enum Tokens {
  ILLEGAL = "ILLEGAL",
  EOF = "EOF",

  // Identifiers + literals
  IDENT = "IDENT", // add, foobar, x, y, ...
  INT = "INT", // 1343456
  FLOAT = "FLOAT",

  // Operators
  ASSIGN = "=",
  PLUS = "+",
  MINUS = "-",
  BANG = "!",
  ASTERISK = "*",
  SLASH = "/",
  LT = "<",
  GT = ">",
  EQ = "==",
  NOT_EQ = "!=",
  COMMA = ",",
  SEMICOLON = ";",
  LPAREN = "(",
  RPAREN = ")",
  LBRACE = "{",
  RBRACE = "}",

  // Keywords
  FUNCTION = "FUNCTION",
  LET = "LET",
  IF = "IF",
  ELSE = "ELSE",
  TRUE = "TRUE",
  FALSE = "FALSE",
  RETURN = "RETURN",

  // TODOS
  LTE = "<",
  GTE = ">",
  ELSE_IF = "ELSE_IF",
}


export const keywords: Record<string, TokenType> = {
  "fn": Tokens.FUNCTION,
  "let": Tokens.LET,
  "true": Tokens.TRUE,
  "false": Tokens.FALSE,
  "return": Tokens.RETURN,
  "if": Tokens.IF,
  "else": Tokens.ELSE,
}

export function LookupIdent(ident: string): TokenType {
  return keywords[ident] ?? Tokens.IDENT
}
