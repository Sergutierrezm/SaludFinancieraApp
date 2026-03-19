// Basado en tu Entity de Ingreso
export interface Ingreso {
    id?: number;
    origen: string;          // Ej: Nómina, Freelance
    cantidad: number;        // Mapea tu BigDecimal
    fechaIngreso: string;    // El formato JSON será "yyyy-MM-dd"
    mesContabilizacion: string; // Mapea tu YearMonth (ej: "2026-03")
    descripcion?: string;
  }
  
  // Basado en tu Entity de GastoFijo
  export interface GastoFijo {
    id?: number;
    nombre: string;
    cantidad: number;
    fechaInicio: string;
    fechaFin?: string | null;
    mesContabilizacion: string;
    descripcion?: string;
  }
  
  // Basado en tu Entity de Gasto (Variable)
  export interface Gasto {
    id?: number;
    fechaGasto: string;
    fechaRegistro?: string; // 👈 Añade el '?' para que sea opcional
    mesContabilizacion: string;
    comercio: string;
    cantidad: number;
    descripcion: string;
  }