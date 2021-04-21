export interface Books {
  _id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  fechaPubliccion?: Date;
  autor: {
    id: string;
    nombrecompleto: string;
  }

}
