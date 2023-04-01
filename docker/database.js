// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { Client } = require('pg');
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { exit } = require('process');

const run = async () => {
    const client = new Client({
        user: 'app',
        password: 'test',
        host: 'localhost', // dirección IP del contenedor Docker
        port: 5432, // puerto predeterminado para PostgreSQL
        database: 'wordle'
      });
      await client.connect();
      await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
      await client.query('CREATE TABLE IF NOT EXISTS users (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),email VARCHAR(255) UNIQUE NOT NULL,password VARCHAR(255) NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);')
      await client.query('CREATE TABLE IF NOT EXISTS words (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),word CHAR(5) UNIQUE NOT NULL,status CHAR(10) NOT NULL DEFAULT \'NOT_USED\', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);');
      await client.query('CREATE TABLE IF NOT EXISTS games (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),user_id UUID REFERENCES users (id),playes INTEGER NOT NULL DEFAULT 0,wins INTEGER NOT NULL DEFAULT 0,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);')
      await client.query('CREATE TABLE IF NOT EXISTS attempts (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),user_id UUID REFERENCES users (id),attempt INTEGER NOT NULL DEFAULT 0,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);');
      await client.query('insert into words (word) values (\'GATOS\'), (\'PERRO\'),(\'PATOS\'),(\'TAZAS\'),(\'GANZO\');');
      console.log('Se creo correctamente todo');
      exit();
};  
run();
