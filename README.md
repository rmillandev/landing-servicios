# NEXO Servicios

Landing de demostración para profesionales independientes y empresas que ofrecen mantenimiento, electricidad, plomería y climatización. Sigue el enfoque de `WebBarberia` y `WebRestaurante`: una página visual, adaptable y fácil de personalizar para un cliente real.

## Qué incluye

- Portada con formulario de cotización y mensaje preparado para WhatsApp.
- Servicios que preseleccionan la categoría al solicitar una cotización.
- Secciones de presentación, proceso y contacto.
- Diseño adaptable a móvil y escritorio, navegación por teclado y movimiento reducido.
- Imagen original de portada en `public/images/hero-servicios.webp`.

## Ejecutar

Requiere Node.js 20.9 o superior.

```bash
npm ci
npm run dev
```

Abre `http://localhost:3000`. Para comprobar el proyecto: `npm run typecheck` y `npm run build`.

## Adaptar para un prestador real

1. Actualiza nombre, número de WhatsApp, zona, horario y correo en `lib/site-config.ts`. El número debe tener código de país y solo dígitos. Si está vacío, WhatsApp abrirá el mensaje sin destinatario.
2. Ajusta las categorías y textos en `app/page.tsx`. Añade o elimina servicios según el trabajo que ofrezca la persona o empresa.
3. Sustituye la imagen de `public/images` por una fotografía autorizada del negocio si la hay.
4. Cambia los metadatos en `app/layout.tsx` y el ícono en `public/favicon.svg`.

Esta demo no representa una empresa real. Los servicios, el proceso y la imagen son ilustrativos; no se muestran precios ni se afirman certificaciones o trabajos realizados.
