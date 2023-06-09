import { LetStatement, Program } from "../ast";
import { Lexer } from "../lexer/lexer";
import { Token, TokenType, Tokens } from "../token";

export class Parser {
  // @ts-ignore
  private curToken: Token = undefined;
  // @ts-ignore
  private peekToken: Token = undefined;
  constructor(public l: Lexer, private errors: string[] = []) {
    this.nextToken()
    this.nextToken()
    return this;
  }

  nextToken() {
    this.curToken = this.peekToken
    this.peekToken = this.l.nextToken()
  }

  parseStatement() {
    switch (this.curToken.type) {
      case Tokens.LET:
        return this.parseLetStatement()
      default:
        return null
    }
  }

  parseLetStatement(): LetStatement | null {
    const stmt = new LetStatement(this.curToken)

    if (!this.expectPeek(Tokens.IDENT)) {
      return null
    }

    if (!this.expectPeek(Tokens.ASSIGN)) {
      return null
    }

    // TODO: We're skipping the expressions until we
    // encounter a semicolon
    while (!this.curTokenIs(Tokens.SEMICOLON)) {
      this.nextToken()
    }

    return stmt
  }

  expectPeek(t: TokenType): boolean {
    if (this.peekTokenIs(t)) {
      this.nextToken()
      return true
    } else {
      this.peekError(t)
      return false
    }
  }

  curTokenIs(t: TokenType): boolean {
    return this.curToken.type == t
  }

  peekTokenIs(t: TokenType): boolean {
    return this.peekToken.type == t
  }

  peekError(t: TokenType) {
    const msg = `expected next token to be ${t}, got ${this.peekToken.type} instead`;
    this.errors.push(msg)
  }

  parseProgram() {
    const program = new Program()
    while (!this.curTokenIs(Tokens.EOF)) {
      const stmt = this.parseStatement()
      if (stmt) {
        program.addStatement(stmt)
      }
      this.nextToken()
    }
    return program
  }

  getErrors() {
    return this.errors
  }
}
