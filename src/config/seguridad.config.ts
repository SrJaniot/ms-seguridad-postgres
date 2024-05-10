export namespace ConfiguracionSeguridad {
  //-------------------------jwt -------------------------------------
  export const claveJWT = process.env.CLAVE_JWT;
  //-------------------------menus -------------------------------------
  export const menu_ADMINISTAR_UsuarioID = "";
  export const menuRolID = "";
  export const menuTorneoID = "";
  //-------------------------acciones -------------------------------------
  export const listarAccion = "listar";
  export const guardarAccion = "guardar";
  export const eliminarAccion = "eliminar";
  export const editarAccion = "editar";
  export const buscarAccion_id = "buscar_id";

  //-------------------------roles -------------------------------------
  //TENER EN CUENTA QUE TOCA INSERTAR LOS ROLES EN LA BASE DE DATOS
  export const rolAdministradorID = 1;
  export const rolCoordinadorID = 2;
  export const rolTutorID = 3;
  export const rolEstudianteID = 4;
  export const rolInvitadoID = 5;









  //------------------------variables de entorno-------------------------------------
  //instalar el paquete dotenv npm i dotenv para poder leer variables de entorno  y
  //importar en application.ts require('dotenv').config();
  export const connection_user_postgres = process.env.CONNECTION_USER_POSTGRES ;
  export const connection_password_postgres = process.env.CONNECTION_PASSWORD_POSTGRES ;
  export const connection_database_postgres = process.env.CONNECTION_DATABASE_POSTGRES ;

}
