export interface Plan {
  id: number;
  nombre: string;
  descripcion: string;
  caracteristicas: string[];
  costo: number;
}

export const planes: Plan[] = [
  {
    id: 1,
    nombre: "Plan Básico",
    descripcion: "Protección esencial para tu mascota.",
    caracteristicas: [
      "Examenes básico de control hemograma, orina, coprologico cada 180 días",
      "Vacunación esquema inicial y refuerzos anuales",
      "Refuerzo anual vacuna antirrabica",
      "Desparasitación interna y externa",
      "Baños",
      "Corte Uñas",
      "Limpieza externa de oidos",
      "Limpieza de dientes",
      "Multivitamínico",
      "Orientación médica telefónica",
      "Servicio de eutanasia por enfermedad o accidente",
      "Guarderia en casa hasta por 1 jornada una vez al mes",
      "Asistencia medica veterinaria virtual",
      "Consulta medica veterinaria de control",
      "Descuento en laboratorios"
    ],
    costo: 87000,
  },
  {
    id: 2,
    nombre: "Plan Silver",
    descripcion: "Cobertura del 40%",
    caracteristicas: [
      "Urgencias",
      "Consultas",
      "Hospitalización",
      "Exámenes diagnósticos nivel 2 y 3",
      "Laboratorios completos",
      "Cirugías",
      "Terapias",
      "Baños",
      "Además de todo lo del plan básico"
    ],
    costo: 148000,
  },
  {
    id: 3,
    nombre: "Plan Gold",
    descripcion: "Cobertura del 50%",
    caracteristicas: [
      "Urgencias",
      "Consultas",
      "Hospitalización",
      "Exámenes diagnósticos nivel 2 y 3",
      "Laboratorios completos",
      "Cirugías",
      "Terapias",
      "Enfermedades crónicas",
      "Condiciones hereditarias",
      "Ligamentos (segun diagnostico medico)",
      "Displasia de cadera (segun diagnostico medico)",
      "Pre-existencias",
      "Baños"
    ],
    costo: 148000,
  }
];