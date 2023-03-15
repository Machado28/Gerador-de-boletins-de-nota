/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-lone-blocks */
/* eslint-disable max-len */
/* eslint-disable eqeqeq */
/* eslint-disable no-sparse-arrays */
/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable object-curly-newline */
import XLSX from 'xlsx';
import path from 'path';
import pdf from 'html-pdf';
import bcrypt from 'bcrypt';
import ejs from 'ejs';
import Boletins from '../models/Boletins';

class GerarBoletinController {
  async gerar(req, res, next) {
    if (!req.file) return res.status(400).json({ error: 'seleciona um ficheiro' })
    const { path: caminho, mimetype: formato, filename: name } = req.file;

    const FORMATO_EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    if (formato !== FORMATO_EXCEL) { return res.status(400).json({ error: 'seleciona somente formato .xlsx' }) }

    { console.log(req.file); }

    const ficheiro = path.resolve(
      __dirname,
      '..',
      'temp',
      'upload',
      `${caminho}`,
    );

    const logoIpil = path.resolve(
      __dirname,
      'templates',
      'makarenco.jpg',
    );

    let boletinNome = await bcrypt.hash(name, 8);

    req.boletin = `${boletinNome}.pdf`

    const date = new Date();

    const { trimestre = 'I', anoLectivo = date.getFullYear(), curso = 'Informática' } = req.query
    const workbook = XLSX.readFile(ficheiro);

    // extrair dados do arquivo excel
    const workbookSheets = workbook.SheetNames;

    const sheet = workbookSheets[0];

    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
const NExcel= XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

const NovaInstanciaDoJsonPauta = NExcel.splice(':')
    const NovoExcel = dataExcel.splice(':');
    console.log()
    //  COLCAL EM UM ARRAY DE OBJECTO OS DAOD EXTRAIDOS DO EXCEL
    const Curso = NovoExcel.filter((item, index) => index === 0 && (item !== item.__EMPTY_2 && item !== item.__EMPTY_8 && item !== item.__EMPTY_14 && item !== item.__EMPTY_20 && item !== item.__EMPTY_26 && item !== item.__EMPTY_32 && item !== item.__EMPTY_38 && item !== item.__EMPTY_44 && item !== item.__EMPTY_50 && item !== item.__EMPTY_56 && item !== item.__EMPTY_62 && item !== item.__EMPTY_68 && item !== item.__EMPTY_74))


    const [disciplinas, Notas] = NovaInstanciaDoJsonPauta.splice(' : ')
    const [, n1] = workbookSheets.splice(' : ')
    let _disciplinas = [
      disciplinas?.__EMPTY_2,
      disciplinas?.__EMPTY_8,
      disciplinas?.__EMPTY_14,
      disciplinas?.__EMPTY_20,
      disciplinas?.__EMPTY_26,
      disciplinas?.__EMPTY_32,
      disciplinas?.__EMPTY_38,
      disciplinas?.__EMPTY_44,
      disciplinas?.__EMPTY_50,
      disciplinas?.__EMPTY_56,
      disciplinas?.__EMPTY_62,
      disciplinas?.__EMPTY_68,
      disciplinas?.__EMPTY_74,
    ]
    let aluno;
    const data = NovoExcel.map((item, index) => aluno = [
      {
        numero: index >= 3 ? index - 2 : null,
        processo: item.__EMPTY,
        nome: item.__EMPTY_1,
        disciplinas: [
          { nome: disciplinas?.__EMPTY_2,
            notas: {
              MAC: Math.ceil(item.__EMPTY_4),
              NPP: Math.ceil(item.__EMPTY_5),
              NPT: Math.ceil(item.__EMPTY_6),
              MT1: Math.ceil(item.__EMPTY_7),
            },
          },
          { nome: disciplinas?.__EMPTY_8,
            notas: {
              MAC: Math.ceil(item.__EMPTY_10),
              NPP: Math.ceil(item.__EMPTY_11),
              NPT: Math.ceil(item.__EMPTY_12),
              MT1: Math.ceil(item.__EMPTY_13),
            },
          },
          { nome: disciplinas?.__EMPTY_14,
            notas: {
              MAC: Math.ceil(item.__EMPTY_16),
              NPP: Math.ceil(item.__EMPTY_17),
              NPT: Math.ceil(item.__EMPTY_18),
              MT1: Math.ceil(item.__EMPTY_29),
            },
          },
          { nome: disciplinas?.__EMPTY_20,
            notas: {
              MAC: Math.ceil(item.__EMPTY_16),
              NPP: Math.ceil(item.__EMPTY_17),
              NPT: Math.ceil(item.__EMPTY_18),
              MT1: Math.ceil(item.__EMPTY_29),
            },
          },
          { nome: disciplinas?.__EMPTY_26,
            notas: {
              MAC: Math.ceil(item.__EMPTY_22),
              NPP: Math.ceil(item.__EMPTY_23),
              NPT: Math.ceil(item.__EMPTY_24),
              MT1: Math.ceil(item.__EMPTY_25),
            },
          },
          { nome: disciplinas?.__EMPTY_32,
            notas: {
              MAC: Math.ceil(item.__EMPTY_28),
              NPP: Math.ceil(item.__EMPTY_29),
              NPT: Math.ceil(item.__EMPTY_30),
              MT1: Math.ceil(item.__EMPTY_31),
            },
          },
          { nome: disciplinas?.__EMPTY_38,
            notas: {
              MAC: Math.ceil(item.__EMPTY_34),
              NPP: Math.ceil(item.__EMPTY_35),
              NPT: Math.ceil(item.__EMPTY_36),
              MT1: Math.ceil(item.__EMPTY_37),
            },
          },
          { nome: disciplinas?.__EMPTY_44,
            notas: {
              MAC: Math.ceil(item.__EMPTY_40),
              NPP: Math.ceil(item.__EMPTY_41),
              NPT: Math.ceil(item.__EMPTY_42),
              MT1: Math.ceil(item.__EMPTY_43),
            },
          },
          { nome: disciplinas?.__EMPTY_50,
            notas: {
              MAC: Math.ceil(item.__EMPTY_46),
              NPP: Math.ceil(item.__EMPTY_47),
              NPT: Math.ceil(item.__EMPTY_49),
              MT1: Math.ceil(item.__EMPTY_52),
            },
          }, { nome: disciplinas?.__EMPTY_56,
            notas: {
              MAC: Math.ceil(item.__EMPTY_53),
              NPP: Math.ceil(item.__EMPTY_54),
              NPT: Math.ceil(item.__EMPTY_55),
              MT1: Math.ceil(item.__EMPTY_58),
            },
          },
          { nome: disciplinas?.__EMPTY_62,
            notas: {
              MAC: Math.ceil(item.__EMPTY_59),
              NPP: Math.ceil(item.__EMPTY_60),
              NPT: Math.ceil(item.__EMPTY_61),
              MT1: Math.ceil(item.__EMPTY_64),
            },
          },
          { nome: disciplinas?.__EMPTY_68,
            notas: {
              MAC: Math.ceil(item.__EMPTY_65),
              NPP: Math.ceil(item.__EMPTY_66),
              NPT: Math.ceil(item.__EMPTY_67),
              MT1: Math.ceil(item.__EMPTY_72),
            },
          },
          { nome: disciplinas?.__EMPTY_74,
            notas: {
              MAC: Math.ceil(item.__EMPTY_73),
              NPP: Math.ceil(item.__EMPTY_76),
              NPT: Math.ceil(item.__EMPTY_77),
              MT1: Math.ceil(item.__EMPTY_78),
            },
          },

        ],
      },
    ]).filter((item, index) => (item.__EMPTY !== null) && (index <= 63) && (index > 2));
    req.Boletins = data
console.log(_disciplinas);
    // let notaDisc = []
    // for (let index = 0; index <= data.length - 6; index++) {
    //   for (let index2 = 0; index2 <= 3; index2++) {
    //     notaDisc = data[index].map((item) => item.notas[index2])
    //   }
    // }

    let contador = 0;
    // adicionar no arquivo ejs na pasta template/index.ejs os seguintes dados
    ejs.renderFile(path.resolve(__dirname, 'templates', '', 'index.ejs'), { logoIpil, contador, Notas, data, _disciplinas, anoLectivo, curso, trimestre, turma: workbookSheets[0] }, (err, html) => {
      if (err) {
        console.log({ message: `Erro ao ler o aquivo index.ejs!:${err}` });
      }
      // configurações do arquivo pdfdata[index].map(item=>item.notas[index2])
      const optons = {
        format: 'A4',
        border: {
          right: '8',
        },
      };

      /// PEGAR A PROPIEDADE HML ONDE CONTEM A ESTILIZAÇÃO DO BOLETIN, E METER AQUI, PARA GERAR UM ARQUIVO PDF NA PASTA temp/upload/ e com o nome Boltein
      pdf.create(html, optons).toFile(path.resolve(__dirname, '..', 'temp', 'upload', `${boletinNome}.pdf`), (err, response) => {
        if (err) {
          console.log({ mesage: 'Erro ao gerar PDF!' });
        }
        // senaão der erro mostre no console.log o resultado
        if (!err) {
          console.log({ mesage: response });
        }
      });
    });

    // let Aluno=[
    //   {disciplinas:[
    //     {nome:,
    //       notas:[
    //         {
    //           MAC:
    //         },
    //         {
    //           PP:
    //         },
    //         {
    //           PT:
    //         },

    //         {
    //           MEDIA:
    //         }
    //       ]
    //     }
    //   ]}
    // ]

    const boletin = await Boletins.create({
      usuario_id: req.usuario_id,
      name,
      path: `${boletinNome}.pdf`,
      quantidade: data.length,
    });
    //= >
    console.log(NovoExcel)

    // se tudo em cima estiver bem retorna uma mensagem (boletin pronto para o download)
    return res.status(201).json({ message: 'boletin pronto para o download', description: boletin });
  }
}
export default new GerarBoletinController();
