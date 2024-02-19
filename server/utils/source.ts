import 'dotenv/config';
import fs from 'fs';
import { exec } from 'child_process';

const password = process.env.DB_PASSWORD || '';

const sourceSQL = async () => {
  const cnf = `[client]\nuser=root\npassword=${password}\n`;

  await fs.promises.writeFile(`./config/.my.cnf`, cnf);

  const command = `mysql --defaults-file=./config/.my.cnf < ./db/schema.sql`;

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