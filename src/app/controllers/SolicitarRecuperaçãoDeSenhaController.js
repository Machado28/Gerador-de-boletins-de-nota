/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import { post } from 'request-promise';
import authConfig from '../../config/authConfirmCodigo';
import Usuario from '../models/Usuario';

class SolicitarRecuperaçãoDeSenhaController {
  async solicitar(req, res) {
    const schema = yup.object().shape({
      email: yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).end();
    }
    const ACCESS_TOKEN = 'Exh5GlZ34B2J-8jd2AvjLMkr3kTnZSsoC_RB';
    const { email } = req.body;
    const usuario = await Usuario.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(404).json('usuario não encontrado!');
    }

    const { id } = usuario;

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,

    });

    const endereço = `http://localhost:3000/recuperar/senha/${token}`;
    console.log({
      usuario: email,
      link: endereço,
    });

    // enviar SMS PARA O email:
    await post({
      uri: 'https://api.zenvia.com/v2/channels/sms/messages',
      headers: {
        'X-API-TOKEN': ACCESS_TOKEN,
      },
      body: {
        from: 'GB-IPIL',
        to: `+244${telefone}`,
        contents: [{
          type: 'text',
          text: `Você solicitou recuperação de senha. clique no Link para continuar:${endereço}`,
        }],
      },
      json: true,
    })
      .then((response) => {
        console.log('Response:', response);
      })
      .catch((error) => {
        console.log('Error:', error);
      });

    // ENVIO DE WHATSSAP

    await post({
      uri: 'https://api.zenvia.com/v2/channels/whatsapp/messages',
      headers: {
        'X-API-TOKEN': ACCESS_TOKEN,
      },
      body: {
        from: 'GB-IPIL',
        to: `+244${telefone}`,
        contents: [{
          type: 'text',
          text: `Você solicitou recuperação de senha. clique no Link para continuar:${endereço}`,
        }],
      },
      json: true,
    })
      .then((response) => {
        console.log('Response:', response);
      })
      .catch((error) => {
        console.log('Error:', error);
      });

    return res.status(200).json({ link: endereço });
  }
}
export default new SolicitarRecuperaçãoDeSenhaController();
