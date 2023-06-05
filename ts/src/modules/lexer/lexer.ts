import { TokenType, Tokens, Token, LookupIdent } from '../token'

type Char = string | number

export class Lexer {
  private position: number = 0;
  private readPosition: number = 0;
  private ch: Char = "";

  constructor(
    private input: string,
  ) {
    this.readChar()
  }

  public readChar() {
    if (this.readPosition > this.input.length) {
      this.ch = 0
    } else {
      this.ch = this.input[this.readPosition]! // guaranteed to be here
    }
    this.position = this.readPosition;
    this.readPosition++
  }

  public readIdentifier(): string {
    const start = this.position;
    while (isLetter(this.ch)) {
      this.readChar()
    }

    return this.input.substring(start, this.position)
  }

  public readNumber(): { literal: string, type: TokenType } {
    const start = this.position;
    let hasDot = false;
    while (isDigit(this.ch) || this.ch == '.') {
      if (this.ch == '.' && hasDot) {
        return { literal: "", type: Tokens.ILLEGAL }
      } else if (this.ch == '.') {
        hasDot = true
      }
      this.readChar()
    }
    if (hasDot) {
      return { literal: this.input.substring(start, this.position), type: Tokens.FLOAT }
    }
    return { literal: this.input.substring(start, this.position), type: Tokens.INT }
  }

  public skipWhitespace() {
    while (this.ch == ' ' || this.ch == '\t' || this.ch == '\n' || this.ch == '\r') {
      this.readChar()
    }
  }

  public peekChar(): Char {
    if (this.readPosition >= this.input.length) {
      return 0
    } else {
      return this.input[this.readPosition]!
    }
  }

  public nextToken(): Token {
    let tok: Token = { type: Tokens.EOF, literal: "" }

    this.skipWhitespace()

    switch (this.ch) {
      case '=':
        // if this.peekChar() == '=' {
        //   tok = l.newTwoCharToken(Tokens.EQ)
        // } else {
        tok = newToken(Tokens.ASSIGN, this.ch)
        // }
        break;
      case '-':
        tok = newToken(Tokens.MINUS, this.ch)
        break;
      case '!':
        // if l.peekChar() == '=' {
        //   tok = l.newTwoCharToken(Tokens.NOT_EQ)
        // } else {
        tok = newToken(Tokens.BANG, this.ch)
        // }
        break;
      case '/':
        tok = newToken(Tokens.SLASH, this.ch)
        break;
      case '*':
        tok = newToken(Tokens.ASTERISK, this.ch)
        break;
      case '<':
        tok = newToken(Tokens.LT, this.ch)
        break;
      case '>':
        tok = newToken(Tokens.GT, this.ch)
        break;
      case ';':
        tok = newToken(Tokens.SEMICOLON, this.ch)
        break;
      case '(':
        tok = newToken(Tokens.LPAREN, this.ch)
        break;
      case ')':
        tok = newToken(Tokens.RPAREN, this.ch)
        break;
      case ',':
        tok = newToken(Tokens.COMMA, this.ch)
        break;
      case '+':
        tok = newToken(Tokens.PLUS, this.ch)
        break;
      case '{':
        tok = newToken(Tokens.LBRACE, this.ch)
        break;
      case '}':
        tok = newToken(Tokens.RBRACE, this.ch)
        break;
      case 0:
        tok.literal = ""
        tok.type = Tokens.EOF
        break;
      default:
        if (isLetter(this.ch)) {
          tok.literal = this.readIdentifier()
          tok.type = LookupIdent(tok.literal)
          return tok
        } else if (isDigit(this.ch)) {
          tok = this.readNumber()
          return tok
        } else {
          tok = newToken(Tokens.ILLEGAL, this.ch)
        }

    }

    this.readChar()
    return tok

  }
}

function newToken(tokenType: TokenType, ch: Char): Token {
  return { type: tokenType, literal: String(ch) }
}

function isLetter(ch: Char): boolean {
  return !!ch && ('a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || ch == '_')
}

function isDigit(ch: Char): boolean {
  return !!ch && '0' <= ch && ch <= '9'
}
