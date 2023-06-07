use anyhow::Result;
use std::io;

use interpreter::repl::repl;

fn main() -> Result<()> {
    let stdin = io::stdin();
    let stdout = io::stdout();

    repl(stdin, stdout)?;
    Ok(())
}
