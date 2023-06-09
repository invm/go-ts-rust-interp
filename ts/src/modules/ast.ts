import { Token } from "./token";

interface Node {
  tokenLiteral(): string;
}

export interface Statement extends Node {
  statementNode(): void
}

export interface Expression extends Node {
  expressionNode(): void
}

export class Identifier {
  constructor(public token: Token, public value: string) { }

  expressionNode() { }

  tokenLiteral(): string {
    return this.token.literal
  }
}

export class LetStatement implements Statement {
  public name: Identifier;
  // @ts-ignore
  public value: Expression;

  constructor(public token: Token) {
    this.name = new Identifier(token, token.literal)
  }

  statementNode() { }

  tokenLiteral(): string {
    return this.token.literal
  }
}

export class Program {
  public statements: Statement[] = []

  addStatement(stmt: Statement) {
    this.statements.push(stmt)
  }

  tokenLiteral() {
    if (this.statements.length > 0) {
      return this.statements[0]?.tokenLiteral()
    } else {
      return ""
    }
  }
}
