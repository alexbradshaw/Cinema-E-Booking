import 'dotenv/config';
import { promises } from 'fs';
import { exec } from 'child_process';
import { input } from '@inquirer/prompts';
import pass from '../utils/env.js';

const sourceSQL = async () => {
  const password = process.env.DB_PASSWORD != undefined ? "" : pass.length != 0 ? pass : await input({ message: 'What is the mySQL password for your system?' });

  await promises.writeFile(`.env`, `DB_PASSWORD="${password}"\nSECRET="${password}"`);
  await promises.writeFile(`../.env`, `DB_PASSWORD="${password}"\nSECRET="${password}"`);
  await promises.writeFile(`./utils/env.ts`, `export default "${password}";`);

  const command = `mysql -u root ${password ? `--password=${password}` : ""} -e "DROP DATABASE IF EXISTS CinemaEBooking; CREATE DATABASE CinemaEBooking;"`

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