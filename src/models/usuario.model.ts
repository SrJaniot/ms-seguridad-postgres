import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Login} from './login.model';
import {Rol} from './rol.model';



// ACA SE AGREGA LA ESP
@model(
  {
    settings: {
      foreignKeys: {
        fk_rolid: {
          name: 'fk_rolid',
          entity: 'Rol',
          entityKey: 'id_rol',
          foreignKey: 'rolid',
        },
      },
    },
  },
)
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id_usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @hasMany(() => Login, {keyTo: 'usuarioid'})
  logins: Login[];

  @belongsTo(() => Rol, {name: 'rol'})
  rolid: number;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
