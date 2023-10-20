import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.HOST_DB,
      port: +process.env.PORT_DB,
      user: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.NAME_DB,
    });
  }

    //Se verifica si ya estan creado el usuario presidencia antes de insertar

    async usuariopresidenciaExists(): Promise<boolean> {
      const client = await this.pool.connect();
      try {
        const query = `
        SELECT COUNT(*) FROM usuarios WHERE id_usuarios = 1;
      `;
        const result = await client.query(query);
        return result.rows[0].count > 0;
      } finally {
        client.release();
      }
    }
  //Se verifica si ya estan creados primeramente antes de insertar

  async estadoExistsActivo(): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const query = `
      SELECT COUNT(*) FROM estados WHERE nombre = 'Activo';
    `;
      const result = await client.query(query);
      return result.rows[0].count > 0;
    } finally {
      client.release();
    }
  }

  async estadoExistsInactivo(): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const query = `
      SELECT COUNT(*) FROM estados WHERE nombre = 'Inactivo';
    `;
      const result = await client.query(query);
      return result.rows[0].count > 0;
    } finally {
      client.release();
    }
  }
  async roleExistsPresidencia(): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const query = `
        SELECT COUNT(*) FROM roles WHERE nombre = 'Presidencia';
      `;
      const result = await client.query(query);
      return result.rows[0].count > 0;
    } finally {
      client.release();
    }
  }

  async roleExistsProyectos(): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const query = `
        SELECT COUNT(*) FROM roles WHERE nombre = 'Proyectos';
      `;
      const result = await client.query(query);
      return result.rows[0].count > 0;
    } finally {
      client.release();
    }
  }

  async roleExistsSecretaria(): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const query = `
        SELECT COUNT(*) FROM roles WHERE nombre = 'Secretaria';
      `;
      const result = await client.query(query);
      return result.rows[0].count > 0;
    } finally {
      client.release();
    }
  }

  async roleExistsContabilidad(): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const query = `
        SELECT COUNT(*) FROM roles WHERE nombre = 'Bienes';
      `;
      const result = await client.query(query);
      return result.rows[0].count > 0;
    } finally {
      client.release();
    }
  }

  //insercion de datos

  async insertIntoRoles() {
    const client = await this.pool.connect();
    try {
      // Verifica si ya existe estado 'Activo'
      if (!(await this.estadoExistsActivo())) {
        const queryestadoActivo = `
          INSERT INTO estados (id_estados, nombre, acronimo, descripcion)
          VALUES (1, 'Activo', 'EA', 'Estado activo del Usuario');
        `;
        await client.query(queryestadoActivo);
      }
      // Verifica si ya existe estado 'Inactivo'
      if (!(await this.estadoExistsInactivo())) {
        const queryestadoInactivo = `
          INSERT INTO estados (id_estados, nombre, acronimo, descripcion)
          VALUES (2, 'Inactivo', 'IA', 'Estado inactivo del Usuario');
        `;
        await client.query(queryestadoInactivo);
      }
      // Verifica si ya existe 'Presidencia'
      if (!(await this.roleExistsPresidencia())) {
        const queryPresidencia = `
          INSERT INTO roles (id_roles, nombre, descripcion)
          VALUES (1, 'Presidencia', 'Se administra el modulo de Presidencia');
        `;
        await client.query(queryPresidencia);
      }
      // Verifica si ya existe 'Proyectos'
      if (!(await this.roleExistsProyectos())) {
        const queryProyectos = `
          INSERT INTO roles (id_roles, nombre, descripcion)
          VALUES (2, 'Proyectos', 'Se administra el modulo de Proyectos');
        `;
        await client.query(queryProyectos);
      }
      // Verifica si ya existe 'Secretaria'
      if (!(await this.roleExistsSecretaria())) {
        const querySecretaria = `
          INSERT INTO roles (id_roles, nombre, descripcion)
          VALUES (3, 'Secretaria', 'Se administra el modulo de Secretaria');
        `;
        await client.query(querySecretaria);
      }
      // Verifica si ya existe 'Bienes'
      if (!(await this.roleExistsContabilidad())) {
        const queryContabilidad = `
          INSERT INTO roles (id_roles, nombre, descripcion)
          VALUES (4, 'Bienes', 'Se administra el modulo de Bienes');
        `;
        await client.query(queryContabilidad);
      }
      
      // Realiza la inserción de usuarios al final
      // Verifica si ya existe usuario 'Presidencia'
      if (!(await this.usuariopresidenciaExists())) {
        const queryusuariopresidencia = `
          INSERT INTO usuarios (id_usuarios, nombres, apellidos, clave, correo, identificacion, celular, id_roles, id_estado)
          VALUES (1, 'Gad Tumbaco', 'Tumbaco', 'tumbaco2023', 'tumbaco@hotmail.com', '', '', 1, 1);
        `;
        await client.query(queryusuariopresidencia);
      }
    } finally {
      client.release();
    }
  }
  
}
