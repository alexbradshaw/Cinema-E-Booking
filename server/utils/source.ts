import { promises } from 'fs';
import { exec } from 'child_process';
import { input } from '@inquirer/prompts';

const sourceSQL = async () => {

  const password = await input({ message: 'What is your mySQL password for your system?' });

  await promises.writeFile(`../.env`, `DB_PASSWORD="${password}"\nSECRET="supersecret"`);
  await promises.writeFile(`./utils/env.ts`, `export default "${password}";`);

  const command = `mysql -u root ${password ? "--password=" + password : ""} -e "DROP DATABASE IF EXISTS CinemaEBooking; CREATE DATABASE CinemaEBooking;"`

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