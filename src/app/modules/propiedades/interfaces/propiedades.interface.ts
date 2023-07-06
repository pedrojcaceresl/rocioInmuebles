export default interface Propiedad {
  id?: string;
  titulo: string | null | undefined;
  descripcion: string | null | undefined;
  imgUrl: string | null | undefined;
  tipo: string | null | undefined;
  estado: string | null | undefined;
  ubicacion: Coords | null | undefined;
  etiquetas?: string[] | null | undefined;
}

interface Coords {
  lat: number | null | undefined;
  lng: number | null | undefined;
}

enum PropiedadTipo {
  lote = 'lote',
  duplex = 'duplex',
  casa = 'casa',
  terreno = 'terreno'
}
