export enum UserRole {
  Desarrollador = 'desarrollador',
  Admin = 'administrador',
  Vendedor = 'vendedor',
}

export const roleRoutes = {
  [UserRole.Desarrollador]: [
    '/admin/pages/dashboard',
    '/admin/pages/usuario',
    '/admin/pages/usuarios',
    '/admin/pages/maps',
    '/admin/pages/table-maps',
    '/admin/pages/draw',
    '/admin/pages/hero',
    '/admin/pages/amenities',
    '/admin/pages/slides',
    '/admin/pages/mis-lotes',
    '/admin/pages/transactions'
  ],

  [UserRole.Admin]: [
    '/admin/pages/dashboard',
    '/admin/pages/usuario',
    '/admin/pages/maps',
    '/admin/pages/table-maps',
    '/admin/pages/hero',
    '/admin/pages/amenities',
    '/admin/pages/slides',
    '/admin/pages/mis-lotes',
    '/admin/pages/transactions'
  ],

  [UserRole.Vendedor]: [
    '/admin/pages/dashboard',
    '/admin/pages/usuario',
    '/admin/pages/maps',
    '/admin/pages/table-maps',
    '/admin/pages/mis-lotes',
  ],
};
