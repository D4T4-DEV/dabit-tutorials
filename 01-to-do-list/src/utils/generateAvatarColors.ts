const AVATAR_COLORS = [
  "#FF6B6B", // rojo coral
  "#FF922B", // naranja
  "#FCC419", // amarillo
  "#51CF66", // verde
  "#20C997", // turquesa
  "#22B8CF", // cyan
  "#339AF0", // azul
  "#5C7CFA", // índigo
  "#845EF7", // violeta
  "#CC5DE8", // púrpura
  "#F06595", // rosa
  "#FF8787", // salmón
];

/**
 * Genera una paleta de 5 colores determinista para el usuario.
 */
export function generateAvatarColors(seed: string) {
  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = [...AVATAR_COLORS];

  // Mezclamos la paleta de forma determinista
  for (let i = colors.length - 1; i > 0; i--) {
    hash = (hash * 9301 + 49297) % 233280;

    const j = Math.abs(hash) % (i + 1);

    [colors[i], colors[j]] = [colors[j], colors[i]];
  }

  return colors.slice(0, 5);
}
