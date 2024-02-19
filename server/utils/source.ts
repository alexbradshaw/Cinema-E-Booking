import 'dotenv/config';
import fs from 'fs';
import { exec } from 'child_process';
import { input } from '@inquirer/prompts';

const sourceSQL = async () => {

  const password = await input({ message: 'What is your mySQL password for your system?' })

  await fs.promises.writeFile(`../.env`, `DB_PASSWORD=${password}`);
  
  const cnf = `[client]\nuser=root\npassword=${password}\n`;

  await fs.promises.writeFile(`./config/.mysql.cnf`, cnf);

  const command = `mysql --defaults-file=./config/.mysql.cnf < ./db/schema.sql`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error Sourcing DB: ${error}`);
      return;
    } else if (stderr != '') {
      console.error(`stderr: ${stderr}`);
    } else {
      console.log(`Successfully Sourced Schema`);
    }
  });
}

sourceSQL();