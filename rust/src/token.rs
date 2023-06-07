#[derive(Debug, PartialEq)]
pub enum Token {
    Illegal,
    Eof,

    // identifiers + literals
    Ident(String),
    Int(String),
    Float(String),

    // operators
    Assign,
    Plus,
    Minus,
    Bang,
    Asterisk,
    Slash,
    Lt,
    Gt,
    Eq,
    NotEq,

    // delimiters
    Comma,
    Semicolon,
    Lparen,
    Rparen,
    Lbrace,
    Rbrace,

    // keywords
    Function,
    Let,
    If,
    Else,
    True,
    False,
    Return,

    // todo:
    Lte,
    Gte,
    // keyword with space
    ElseIf,
}
