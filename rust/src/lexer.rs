use anyhow::Result;

use crate::token::Token;

#[allow(dead_code)]
pub struct Lexer {
    input: Vec<u8>,
    position: usize,
    read_position: usize,
    ch: u8,
}

#[allow(dead_code)]
impl Lexer {
    pub fn new(input: &str) -> Lexer {
        let mut lex = Lexer {
            position: 0,
            read_position: 0,
            ch: 0,
            input: input.into(),
        };
        lex.read_char();

        return lex;
    }

    fn read_ident(&mut self) -> String {
        let start = self.position;
        while self.ch.is_ascii_alphabetic() || self.ch == b'_' {
            self.read_char();
        }

        return String::from_utf8_lossy(&self.input[start..self.position]).to_string();
    }

    fn read_number(&mut self) -> Token {
        let start = self.position;
        let mut has_dot = false;
        while self.ch.is_ascii_digit() || self.ch == b'.' {
            if self.ch == b'.' && has_dot {
                return Token::Illegal;
            } else if self.ch == b'.' {
                has_dot = true
            }
            self.read_char();
        }
        let num = String::from_utf8_lossy(&self.input[start..self.position]).to_string();
        if has_dot {
            return Token::Float(num);
        }

        return Token::Int(num);
    }

    fn read_char(&mut self) {
        if self.read_position >= self.input.len() {
            self.ch = 0
        } else {
            self.ch = self.input[self.read_position]
        }
        self.position = self.read_position;
        self.read_position += 1
    }

    fn peek(&mut self) -> u8 {
        if self.read_position >= self.input.len() {
            return 0;
        } else {
            return self.input[self.read_position];
        }
    }

    pub fn next_token(&mut self) -> Result<Token> {
        self.skip_whitespace();
        let tok = match self.ch {
            b'=' => match self.peek() {
                b'=' => {
                    self.read_char();
                    Token::Eq
                }
                _ => Token::Assign,
            },
            b'-' => Token::Minus,
            b'!' => match self.peek() {
                b'=' => {
                    self.read_char();
                    Token::NotEq
                }
                _ => Token::Bang,
            },
            b'/' => Token::Slash,
            b'*' => Token::Asterisk,
            b'<' => Token::Lt,
            b'>' => Token::Gt,
            b';' => Token::Semicolon,
            b'(' => Token::Lparen,
            b')' => Token::Rparen,
            b',' => Token::Comma,
            b'+' => Token::Plus,
            b'{' => Token::Lbrace,
            b'}' => Token::Rbrace,
            b'a'..=b'z' | b'A'..=b'Z' | b'_' => {
                let ident = self.read_ident();
                return Ok(match ident.as_str() {
                    "fn" => Token::Function,
                    "let" => Token::Let,
                    "if" => Token::If,
                    "false" => Token::False,
                    "true" => Token::True,
                    "return" => Token::Return,
                    "else" => Token::Else,
                    _ => Token::Ident(ident),
                });
            }
            b'0'..=b'9' => return Ok(self.read_number()),
            0 => Token::Eof,
            _ => Token::Illegal,
        };
        self.read_char();
        Ok(tok)
    }

    fn skip_whitespace(&mut self) {
        while self.ch.is_ascii_whitespace() {
            self.read_char();
        }
    }
}

#[cfg(test)]
mod test {
    use anyhow::Result;

    use crate::lexer::Lexer;
    use crate::token::Token;

    fn get_input() -> &'static str {
        return "
let five = 5;
let ten = 10;
let two_and_half = 2.5;

let add = fn(x, y) {
x + y;
};


let fifteen = add(five, ten);
let twelve_and_half = add(ten, two_and_half);
!-/*5;
5 <10 >5;
if (5 <10) {
return true;
} else {
return false;
}
10 == 10;
10 != 9;
        ";
    }

    #[test]
    fn base_next_token() -> Result<()> {
        let input = "=+(){},;";
        let mut lexer = Lexer::new(input.into());

        let tokens = vec![
            Token::Assign,
            Token::Plus,
            Token::Lparen,
            Token::Rparen,
            Token::Lbrace,
            Token::Rbrace,
            Token::Comma,
            Token::Semicolon,
        ];

        for t in tokens {
            let token = lexer.next_token()?;
            println!("expected: {:?}, received {:?}", t, token);
            assert_eq!(t, token);
        }

        return Ok(());
    }

    #[test]
    fn text_next_token() -> Result<()> {
        let input = get_input();

        // vector of tuple of tokentype and string
        let tokens = vec![
            Token::Let,
            Token::Ident("five".to_string()),
            Token::Assign,
            Token::Int("5".to_string()),
            Token::Semicolon,
            Token::Let,
            Token::Ident("ten".to_string()),
            Token::Assign,
            Token::Int("10".to_string()),
            Token::Semicolon,
            Token::Let,
            Token::Ident("two_and_half".to_string()),
            Token::Assign,
            Token::Float("2.5".to_string()),
            Token::Semicolon,
            Token::Let,
            Token::Ident("add".to_string()),
            Token::Assign,
            Token::Function,
            Token::Lparen,
            Token::Ident("x".to_string()),
            Token::Comma,
            Token::Ident("y".to_string()),
            Token::Rparen,
            Token::Lbrace,
            Token::Ident("x".to_string()),
            Token::Plus,
            Token::Ident("y".to_string()),
            Token::Semicolon,
            Token::Rbrace,
            Token::Semicolon,
        ];

        let mut l = Lexer::new(input);

        for t in tokens {
            let token = l.next_token()?;
            println!("expected: {:?}, received {:?}", t, token);
            assert_eq!(t, token)
        }

        return Ok(());
    }
}
