// Hardcoded operative data
// This replaces the database for authentication

export interface Operative {
  operative_name: string
  operative_password: string
  password_hint: string | null
  second_hint: string | null
}

export const OPERATIVES_DATA: Operative[] = [
  {
    operative_name: 'Beñ',
    operative_password: 'waxed_guys_go_deeper',
    password_hint: 'slippery surfaces',
    second_hint: 'preparation is key',
  },
  {
    operative_name: 'Bill Squilliam',
    operative_password: 'keg',
    password_hint: 'keg',
    second_hint: 'keg',
  },
  {
    operative_name: 'Whip Route',
    operative_password: 'democratea',
    password_hint: 'I could use a cup right now',
    second_hint: 'divers',
  },
  {
    operative_name: 'Big Fudge',
    operative_password: 'game_master',
    password_hint: 'dungeon leader',
    second_hint: 'DM for short',
  },
  {
    operative_name: 'AI_SLOP',
    operative_password: 'Azuli',
    password_hint: 'Your very own AI slop',
    second_hint: 'sutdios',
  },
  {
    operative_name: 'C',
    operative_password: 'Ca!seAlex!s2022',
    password_hint: null,
    second_hint: null,
  },
  {
    operative_name: 'Canadian Tux',
    operative_password: 'milk',
    password_hint: 'what is everywhere?',
    second_hint: 'living room spill',
  },
]

// Helper function to authenticate an operative
export function authenticateOperative(
  operativeName: string,
  password: string
): { success: boolean; operative?: Operative } {
  const operative = OPERATIVES_DATA.find(
    (op) => op.operative_name === operativeName
  )

  if (!operative) {
    return { success: false }
  }

  if (operative.operative_password === password) {
    return { success: true, operative }
  }

  return { success: false }
}

// Get operative by name (for displaying hints)
export function getOperativeByName(operativeName: string): Operative | undefined {
  return OPERATIVES_DATA.find((op) => op.operative_name === operativeName)
}

// Get all operatives (for the dropdown list)
export function getAllOperatives(): Pick<Operative, 'operative_name' | 'password_hint' | 'second_hint'>[] {
  return OPERATIVES_DATA.map((op) => ({
    operative_name: op.operative_name,
    password_hint: op.password_hint,
    second_hint: op.second_hint,
  }))
}
