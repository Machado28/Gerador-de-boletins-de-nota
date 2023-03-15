import { Router } from 'express';
import multer from 'multer';
import GerarBoletinController from './app/controllers/GerarBoletinController';
import CadastroUsuarioController from './app/controllers/CadastroUsuarioController';
import SigninController from './app/controllers/SignInController';
import AlterarSenhaController from './app/controllers/AlterarSenhaController';
import multerConfig from './config/multer';
import verifiacarSeUsuarioEstáLogadoMiddleware from './app/middleware/auth';
import verificarSeÉAdminMiddleware from './app/middleware/verificarSeÉAdmin';
import RecuperarSenhaController from './app/controllers/RecuperarSenhaController';
import SolicitarRecuperaçãoDeSenhaController from './app/controllers/SolicitarRecuperaçãoDeSenhaController';
import verificarCodigoDeConfirmação from './app/middleware/verificarCodigoDeConfirmação';
import DownloadController from './app/controllers/DownloadController';
import ConvidarUsuarioController from './app/controllers/ConvidarUsuarioController';
import ListagemDeUsuarioCotnroller from './app/controllers/ListagemDeUsuarioController';
import ListagemDeBoletinBoletinsParaUsuariosController from './app/controllers/ListagemDeBoletinParaUsuariosController';
import ListagemDeBoletinBoletinsParaAdminController from './app/controllers/ListagemDeBoletinParaAdminController';
import ListagemDeCursoComBoletinsController from './app/controllers/ListagemDeCursoComBoletinsController';
import ApagarUsuarioController from './app/controllers/ApagarUsuarioController';
import ActualizarEmailController from './app/controllers/ActualizarEmailController';
import ApagarBoletinController from './app/controllers/ApagarBoletinController';
import Avatar from './app/models/Avatar';
import AvatarController from './app/controllers/AvatarController';
import ActualizarUsuarioController from './app/controllers/ActualizarUsuarioController';

const routes = new Router();

routes.post(
  '/signup',
  CadastroUsuarioController.criar,
);
routes.get('/', async (req, res) => res.status(200).json({
  mensagem: 'bem-vindo a api de gerador de boletins',
  status: '200',
}));
routes.post('/signin', SigninController.criar);
routes.post(
  '/solicitacao/recuperar/senha',
  SolicitarRecuperaçãoDeSenhaController.solicitar,
);
routes.patch(
  '/recuperar/senha/:token',
  verificarCodigoDeConfirmação,
  RecuperarSenhaController.recuperar,
);
routes.get('/download', DownloadController.download);

routes.use(verifiacarSeUsuarioEstáLogadoMiddleware);
const upload = multer(multerConfig);
routes.post('/avatar', upload.single('file'), AvatarController.store);

routes.post('/pauta', upload.single('file'), GerarBoletinController.gerar);
routes.post('/convidar/usuario', verificarSeÉAdminMiddleware, ConvidarUsuarioController.criar);
routes.patch('/senha/actualizar', AlterarSenhaController.alterar);
routes.get('/boletins', ListagemDeBoletinBoletinsParaUsuariosController.todos);
routes.get('/boletins/admin', verificarSeÉAdminMiddleware, ListagemDeBoletinBoletinsParaAdminController.todos);
routes.get('/cursos/menos/boletin', verificarSeÉAdminMiddleware, ListagemDeCursoComBoletinsController.menorBoletin);
routes.get('/cursos/mais/boletin', verificarSeÉAdminMiddleware, ListagemDeCursoComBoletinsController.maisBoletin);
routes.get('/cursos/menos/boletin', verificarSeÉAdminMiddleware, ListagemDeCursoComBoletinsController.menorBoletin);
routes.get('/usuarios/activos', verificarSeÉAdminMiddleware, ListagemDeUsuarioCotnroller.listarActivo);
routes.get('/usuarios/inactivos', verificarSeÉAdminMiddleware, ListagemDeUsuarioCotnroller.listarInactivo);
routes.get('/usuarios', verificarSeÉAdminMiddleware, ListagemDeUsuarioCotnroller.listarTodos);
routes.get('/usuarios/:id', verificarSeÉAdminMiddleware, ListagemDeUsuarioCotnroller.listarUm);
routes.delete('/usuarios/:id', verificarSeÉAdminMiddleware, ApagarUsuarioController.apagar);
routes.patch('/usuarios/:email', verificarSeÉAdminMiddleware, ActualizarEmailController.atualizar);
routes.patch('/usuarios', ActualizarUsuarioController.atualizar);
routes.delete('/boletins/:id', ApagarBoletinController.apagar);



export default routes;
