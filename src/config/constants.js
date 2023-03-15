/* eslint-disable max-len */
/* eslint-disable no-irregular-whitespace */
// Semelhante à função auxiliar, também criaremos uma constante que define um auth e um objeto mailOptions . Nós os usaremos quando enviarmos um e-mail. Também importamos o pacote dotenv dentro deste arquivo para poder usar nossas variáveis ​​de ambiente.

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const auth = {
  type: 'OAuth2',
  user: 'sid.cd.varma@gmail.com',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

const mailoptions = {
  from: 'Gerador de Boletin APP IPIL <ipil@gmail.com>',
  to: 'ulundoatonio@gmail.com',
  subject: 'Confirmação',
};

export default {
  auth,
  mailoptions,
};
