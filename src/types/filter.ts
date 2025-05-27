
/**
 * Type pour les filtres
 */
export type Filter = {
    name: string;
    value: string;
}

/**
 * Type pour les options de filtre
 */
export type FilterOption = {
    value: string;
    label: string;
}

/**
 * Type pour les props du composant de filtre
 */
export interface FilterComponentProps {
    selectedTypes: string[]
    onSelectTypes: (types: string[]) => void
  }