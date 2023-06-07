import { start } from "./modules/repl";

(async () => {
  const user = process.env['USER']
  console.log(`Hello ${user}! This is the Monkey programming language!`)
  console.log(`Feel free to type in commands\n`)
  await start()
})()
