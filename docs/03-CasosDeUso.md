# Casos de Uso del Sistema

## Actores

## Administrador

Descripción:
Usuario encargado de gestionar y supervisar la aplicación 

Casos de uso:

CU-01 Iniciar sesión
CU-02 Gestionar usuarios
CU-03 Gestionar empleados
CU-04 Gestionar productos
CU-05 Consultar ventas
CU-06 Visualizar reportes

-----

## Vendedor

Descripción:
Usuario encargado del proceso comercial

Casos de uso:

CU-07 Iniciar sesión
CU-08 Registrar clientes
CU-09 Consultar clientes
CU-10 Registar ventas
CU-11 Consultar productos

-----

## Gerente

Descripción:
Usuario encargado del análisis del negocio

Casos de uso:

CU-12 Consultar reportes
CU-13 Visualizar indicadores
CU-14 Analizar información en power bi

-----

## Detalle de casos de uso

## CU-10 Registrar ventas

Actor:
Vendedor

objetivo:
Registrar una nueva venta dentro del sistema

Flujo Principal:

1. El vendedor inicia sesión
2. Selecciona un cliente
3. Selecciona los productos
4. El sistema calcula el total
5. El vendedor confirma la venta
6. El sistema guarda la información

Resultado esperado:

La venta queda registrada y disponible para consultas y reportes

-----

## CU-14 Analizar información en power bi

Actor:
Gerente

objetivo:
Visualizar indicadores del negocio

Flujo principal:

1. El gerente abre el dashboard
2. power bi consulta la información
3. se muestra indicadores de ventas

Resultado esperado:

El gerente puede tomar decisiones basadas en datos