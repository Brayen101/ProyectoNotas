# Estructura del Proyecto - Keep Notes

## 📁 Organización de Carpetas

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/                    # Servicios y lógica central
│   │   │   └── services/           # Servicios de la aplicación
│   │   │       ├── auth.service.ts      # Autenticación
│   │   │       ├── usuario.service.ts   # Usuarios
│   │   │       ├── notas.service.ts     # Notas
│   │   │       └── index.ts             # Barril de exportaciones
│   │   │
│   │   ├── shared/                 # Componentes y utilidades compartidas
│   │   │   └── components/         # Componentes reutilizables
│   │   │       ├── header/         # Header principal
│   │   │       └── sidebar/        # Sidebar
│   │   │
│   │   ├── features/               # Características/Módulos principales
│   │   │   ├── auth/               # Feature de autenticación
│   │   │   │   ├── login/          # Componente login
│   │   │   │   └── registro/       # Componente registro
│   │   │   │
│   │   │   └── notas/              # Feature de notas
│   │   │       ├── notas/          # Componente principal notas
│   │   │       ├── principal/      # Componente principal (contenedor)
│   │   │       └── models/         # Tipos/Interfaces de notas
│   │   │
│   │   ├── models/                 # Interfaces y tipos globales
│   │   ├── app.config.ts
│   │   ├── app.routes.ts           # Rutas principales
│   │   └── app.ts                  # Componente raíz
│   │
│   └── styles.css                  # Estilos globales
│
├── package.json
└── angular.json
```

## 🎯 Principios de Organización

### Core Services
- **auth.service.ts**: Manejo de autenticación y estado del usuario
- **usuario.service.ts**: CRUD de usuarios
- **notas.service.ts**: CRUD de notas

### Shared Components
- **header**: Componente header reutilizable
- **sidebar**: Componente sidebar reutilizable

### Features
Cada feature contiene:
- Componentes específicos
- Servicios específicos de esa feature (si es necesario)
- Modelos/Interfaces propias

## 📝 Importaciones Recomendadas

```typescript
// Importar servicios desde core
import { UsuarioService, NotasService, AuthService } from '@app/core/services';

// Importar componentes compartidos
import { HeaderComponent } from '@app/shared/components/header/header';
import { SidebarComponent } from '@app/shared/components/sidebar/sidebar';

// Importar modelos
import { Usuario, Nota } from '@app/models';
```

## 🔄 Flujo de Datos

```
Componente → Servicio (Core/Feature) → HTTP → Backend
                ↓
         AuthService (gestiona estado)
                ↓
         localStorage (persistencia)
```

## ✅ Checklist de Buenas Prácticas

- ✅ Servicios centralizados en `core/services`
- ✅ Componentes reutilizables en `shared/components`
- ✅ Features organizadas por funcionalidad
- ✅ Archivos index.ts como barril de exportaciones
- ✅ Inyección de dependencias centralizada
- ✅ Tipado fuerte con interfaces
- ✅ Separación de responsabilidades
