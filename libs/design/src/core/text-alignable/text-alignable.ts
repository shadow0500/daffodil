/**
 * An interface for giving a component the ability to customize text alignment for component-specific UI.
 * In order to be text alignable, a component class must implement this property.
 */
export interface DaffTextAlignable {
  textAlignment: DaffTextAlignment;
}

export type DaffTextAlignment = 'left' | 'center' | 'right';

export enum DaffTextAlignmentEnum {
  Left = 'left',
  Center = 'center',
  Right = 'right'
}
