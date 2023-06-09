import { LetStatement, Statement } from "../ast";
import { Lexer } from "../lexer/lexer";
import { Parser } from "./parser";

const input = `
let x = 5;
let y = 10;
let foobar = 838383;
`

// const _invalid = `
// let x 5;
// let = 10;
// let 838383;
//   `

test('test parser', function() {
  const l = new Lexer(input);
  const p = new Parser(l);

  const program = p.parseProgram()
  checkParserErrors(p)
  if (!program) {
    throw new Error("parseProgram retured null")
  }
  if (program.statements.length != 3) {
    console.error(`program.statements does not contain 3 statements. got=${program.statements.length}`)
    const expectedIndentifiers = [
      "x", "y", "foobar"
    ]

    expectedIndentifiers.forEach((ident, i) => {
      const stmt = program.statements[i]!
      if (!testLetStatement(stmt, ident)) {
        return
      }
    })
  }
});

function checkParserErrors(p: Parser) {
  const errors = p.getErrors()
  if (errors.length == 0) {
    return
  }

  errors.forEach(err => {
    console.log("Parser error: ", err)
  })
  throw new Error(`Parser had ${errors.length} errors`)
}

function testLetStatement(s: Statement, name: string): boolean {
  if (s.tokenLiteral() != "let") {
    console.log(`s.tokenLiteral not 'let', got ${s.tokenLiteral()}`)
    return false
  }
  const letStmt = s as LetStatement

  if (letStmt.name.value != name) {
    console.log(`letStmt.name.value not 'let', got ${letStmt.name.value}`)
    return false
  }

  if (letStmt.name.tokenLiteral() != name) {
    console.log(`letStmt.name.TokenLiteral() not ${name} got ${letStmt.name.tokenLiteral()}`)
    return false
  }

  return true
}
