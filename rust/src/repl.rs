use std::io::{Result, Stdin, Stdout, Write};

use crate::{lexer::Lexer, token::Token};

pub fn repl(stdin: Stdin, stdout: Stdout) -> Result<()> {
    loop {
        let mut line = String::new();

        print!("λ ");

        stdout.lock().flush()?;
        stdin.read_line(&mut line)?;
        line = line
            .chars()
            .filter(|char| *char != '\n' && *char != '\r')
            .collect();

        let mut lexer = Lexer::new(&line.to_owned());

        while let Ok(token) = lexer.next_token() {
            println!("{token:?}");

            if token == Token::Eof {
                break;
            }
        }
    }
}
