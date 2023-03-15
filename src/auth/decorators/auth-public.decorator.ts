import { SetMetadata } from '@nestjs/common';

//Declaramos un decorador para poder definir que endpoint van a ser publicos
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
