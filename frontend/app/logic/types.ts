export interface Coche {
  id: number
  nombre: string
  codigo: number
  piloto?: Piloto
  consumo: number
  erscurvaMedia: number
  erscurvaLenta: number
  erscurvaRapida: number
}

export interface Carrera {
  id: number
  circuito: Circuito
  nombre: string
  fecha: number
}

export interface Circuito {
  id: number
  ciudad: string
  curvas_lentas: number
  curvas_medias: number
  curvas_rapidas: number
  longitud: number
  nombre: string
  numero_vueltas: number
  pais: string
  trazado: string
  gran_premio: string
  fecha?: number
}

export interface Equipo {
  id: number
  logo: string
  nombre: string
  twitter: string
  pilotos?: Piloto[]
}

export interface Piloto {
  id: number
  nombre: string
  apellidos: string
  siglas: string
  dorsal: number
  foto: string
  twitter: string
  pais: string
  activo: boolean
}

export interface Miembro {
  id: number
  nombre: string;
  email: string;
  usuario: string;
  rol: string;
}

export interface Usuario {
  id: number
  nombre: string
  email: string
  username: string
  rol: string
  enabled: boolean
  estado: boolean,
  equipo: Equipo
}
