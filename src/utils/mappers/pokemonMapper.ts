import type { RawPokemonDetail } from '../../types/pokemon'      // ton type brut
import type { Pokemon } from '../../types/pokemon'

/**
 * Transforme la réponse brute de l’API en un objet conforme à `Pokemon`
 */
function mapDetailToPokemon(detail: RawPokemonDetail): Pokemon {

  //image : on prend l’officielle si dispo, sinon front_default
  const image =
    detail.sprites.other?.['official-artwork']?.front_default
    ?? detail.sprites.front_default

  // types: triés par slot
  const types = detail.types
    .sort((a, b) => a.slot - b.slot)
    .map((entry) => entry.type.name)

  // abilities : on garde toutes les abilities
  const abilities = detail.abilities
    .sort((a, b) => a.slot - b.slot)
    .map((entry) => entry.ability.name)


  // price : prix généré par l'id du pokémon
  const price = detail.id * 10

  return {
    id: detail.id,
    name: detail.name,
    image,
    types,
    abilities,
    price,
  }
}

export default mapDetailToPokemon;