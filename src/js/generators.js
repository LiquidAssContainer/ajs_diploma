import Team from "./Team";

/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  const index = Math.floor(Math.random() * allowedTypes.length);
  const characterType = allowedTypes[index];
  const level = Math.floor(Math.random() * maxLevel - 1);
  yield new characterType(level);
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const team = new Team();
  const generator = characterGenerator(allowedTypes, maxLevel);
  for (let i = 0; i <= characterCount; i++) {
    // const character =
    team.push(generator.next());
  }
  return team;
}
