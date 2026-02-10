/**
 * Encounter data bank for One-Minute Dungeon.
 * AI-generated medieval fantasy encounters with satirical humor.
 */

export interface EncounterChoice {
  text: string;
  stat: "str" | "dex" | "int" | "cha";
  difficulty: number;
  successText: string;
  failText: string;
  damage: number; // damage on failure
}

export interface Encounter {
  id: string;
  text: string;
  image: string;
  choices: [EncounterChoice, EncounterChoice];
}

export const ENCOUNTERS: Encounter[] = [
  {
    id: "e_001",
    text: "A goblin in a tiny top hat blocks your path, demanding a toll of 3 gold coins you definitely don't have.",
    image: "/encounters/goblin_top_hat_1770744596170.png",
    choices: [
      { text: "Kick the goblin", stat: "str", difficulty: 10, successText: "You punt the goblin into the ceiling. He sticks there, hat and all.", failText: "You swing your leg and miss. The goblin bites your ankle.", damage: 2 },
      { text: "Negotiate a payment plan", stat: "cha", difficulty: 13, successText: "The goblin agrees to 12 easy installments. You walk past while he's doing math.", failText: "The goblin sees through your economic sophistry and stabs your knee.", damage: 3 },
    ],
  },
  {
    id: "e_002",
    text: "A pit trap yawns open before you. It's not very deep, but there are definitely spiders down there.",
    image: "/encounters/pit_trap_spiders_1770744611560.png",
    choices: [
      { text: "Leap across", stat: "dex", difficulty: 11, successText: "You soar gracefully over the pit like a caffeinated gazelle.", failText: "You trip on your own cloak and tumble into the spider pit. So many legs.", damage: 3 },
      { text: "Find a way around", stat: "int", difficulty: 12, successText: "You spot a hidden ledge along the wall and shimmy past.", failText: "Your 'shortcut' leads you through a face-full of cobwebs. And more spiders.", damage: 2 },
    ],
  },
  {
    id: "e_003",
    text: "A skeleton warrior rises from a pile of bones, its jaw hanging open in what might be a scream or a yawn.",
    image: "/encounters/skeleton_warrior_1770744627857.png",
    choices: [
      { text: "Smash it to pieces", stat: "str", difficulty: 12, successText: "You shatter the skeleton like a xylophone. A rib flies past your ear.", failText: "The skeleton blocks your strike and counter-attacks with its own femur.", damage: 3 },
      { text: "Dodge past it", stat: "dex", difficulty: 10, successText: "You slide between its legs. It tries to turn and its pelvis falls off.", failText: "You dodge left. It also goes left. Awkward collision.", damage: 2 },
    ],
  },
  {
    id: "e_004",
    text: "An ancient riddle is carved into the wall: 'What has keys but no locks?' Below it, a door won't budge.",
    image: "/encounters/riddle_door_1770744783858.png",
    choices: [
      { text: "Answer the riddle", stat: "int", difficulty: 11, successText: "'A piano!' you shout. The door opens. A tiny audience of mice applauds.", failText: "'A... keychain?' The door electrocutes you mildly.", damage: 2 },
      { text: "Force the door open", stat: "str", difficulty: 14, successText: "You rip the door off its hinges. The riddle looks offended.", failText: "The door doesn't move. Your shoulder does, out of its socket.", damage: 4 },
    ],
  },
  {
    id: "e_005",
    text: "A treasure chest sits in the middle of the room. It's definitely not a mimic. Probably.",
    image: "/encounters/treasure_chest_mimic_1770744646019.png",
    choices: [
      { text: "Open it carefully", stat: "dex", difficulty: 12, successText: "Not a mimic! You find a stale sandwich and a sense of relief.", failText: "It's a mimic. It bites your hand. You knew. You KNEW.", damage: 3 },
      { text: "Talk to it first", stat: "cha", difficulty: 10, successText: "'Hello chest.' It doesn't respond because it's a normal chest. Phew.", failText: "You sweet-talk a regular chest for 30 seconds. A goblin watches, judging.", damage: 1 },
    ],
  },
  {
    id: "e_006",
    text: "A bridge of questionable structural integrity spans a bottomless chasm. It sways ominously.",
    image: "/encounters/rickety_bridge_1770744662037.png",
    choices: [
      { text: "Sprint across", stat: "dex", difficulty: 13, successText: "You dash across before the bridge realizes it should collapse.", failText: "A plank gives way. You grab the rope but your dignity falls into the abyss.", damage: 3 },
      { text: "Test each plank first", stat: "int", difficulty: 11, successText: "Your methodical approach reveals a safe path. Boring, but alive.", failText: "Your testing causes the whole middle section to collapse. Whoops.", damage: 4 },
    ],
  },
  {
    id: "e_007",
    text: "A dire wolf with glowing red eyes blocks the corridor. It growls. Its breath is... actually terrible.",
    image: "/encounters/dire_wolf_1770744682057.png",
    choices: [
      { text: "Stare it down", stat: "cha", difficulty: 14, successText: "You assert dominance with an unblinking gaze. The wolf whimpers and slinks away.", failText: "The wolf is NOT impressed by your eye contact and lunges at your face.", damage: 4 },
      { text: "Fight it head-on", stat: "str", difficulty: 11, successText: "You wrestle the wolf into submission. It licks your face. You have a dog now.", failText: "The wolf is faster than expected. Teeth meet shin.", damage: 3 },
    ],
  },
  {
    id: "e_008",
    text: "A magical rune on the floor pulses with arcane energy. It's either a trap or a disco light.",
    image: "/encounters/magical_rune_1770744698306.png",
    choices: [
      { text: "Decipher the rune", stat: "int", difficulty: 13, successText: "It's a healing rune! You activate it and feel slightly less terrible.", failText: "You misread the rune. It's a fire rune. Your eyebrows are gone.", damage: 3 },
      { text: "Jump over it", stat: "dex", difficulty: 10, successText: "You hop over it like a medieval frog. The rune seems disappointed.", failText: "You clip the edge. A shock runs through your body. Spicy.", damage: 2 },
    ],
  },
  {
    id: "e_009",
    text: "A ghostly bard appears and challenges you to a rhyming contest. 'Orange!' he shouts smugly.",
    image: "/encounters/ghostly_bard_1770744715587.png",
    choices: [
      { text: "Accept the challenge", stat: "int", difficulty: 15, successText: "'Door hinge!' The ghost's jaw drops. He fades away in shame.", failText: "'Uhh... banana?' The ghost roasts you so hard it does psychic damage.", damage: 3 },
      { text: "Smash his lute", stat: "str", difficulty: 10, successText: "You grab the ghostly lute and snap it. He cries and vanishes.", failText: "Your hand passes through the ghost. He laughs. It hurts your feelings AND your HP.", damage: 2 },
    ],
  },
  {
    id: "e_010",
    text: "A room full of pressure plates. One wrong step and... well, you've seen Indiana Jones.",
    image: "/encounters/pressure_plates_1770744732760.png",
    choices: [
      { text: "Memorize the pattern", stat: "int", difficulty: 12, successText: "Your pattern recognition is flawless. You moonwalk across safely.", failText: "Left, right, left, lef—WRONG. A dart hits your neck.", damage: 3 },
      { text: "Tiptoe through", stat: "dex", difficulty: 13, successText: "Your footwork would make a ballerina jealous.", failText: "You step on three plates at once. Darts, flames, AND a swinging axe.", damage: 4 },
    ],
  },
  {
    id: "e_011",
    text: "Two goblins are arm-wrestling over who gets to ambush you. They haven't noticed you yet.",
    image: "/encounters/goblins_arm_wrestling_1770744800330.png",
    choices: [
      { text: "Sneak past them", stat: "dex", difficulty: 10, successText: "You tiptoe past. One goblin wins and they both forget about you.", failText: "You knock over a vase. Both goblins unite against you.", damage: 2 },
      { text: "Challenge the winner", stat: "str", difficulty: 12, successText: "You out-arm-wrestle the goblin. He respects you now. His friend doesn't.", failText: "The goblin is weirdly strong. He slams your hand AND your ego.", damage: 3 },
    ],
  },
  {
    id: "e_012",
    text: "A locked door with a sign: 'Password is the meaning of life.' There's a keypad with numbers.",
    image: "/encounters/door_keypad_1770744816343.png",
    choices: [
      { text: "Type 42", stat: "int", difficulty: 9, successText: "Click. The door opens. Douglas Adams would be proud.", failText: "You type 69. The door says 'Nice try' and zaps you.", damage: 2 },
      { text: "Shoulder-charge the door", stat: "str", difficulty: 13, successText: "Who needs passwords? The door explodes inward.", failText: "The door is reinforced steel disguised as wood. Your shoulder is not.", damage: 4 },
    ],
  },
  {
    id: "e_013",
    text: "A dragon the size of a house cat sits on a pile of copper coins, trying to look intimidating.",
    image: "/encounters/tiny_dragon_1770744832151.png",
    choices: [
      { text: "Pet the tiny dragon", stat: "cha", difficulty: 11, successText: "It purrs! It breathes a tiny flame of joy. Adorable.", failText: "It bites your finger. Tiny teeth, but VERY sharp.", damage: 2 },
      { text: "Steal a coin", stat: "dex", difficulty: 13, successText: "You pocket a coin while it's yawning. Score.", failText: "The dragon notices and sets your sleeve on fire.", damage: 3 },
    ],
  },
  {
    id: "e_014",
    text: "A corridor fills with poison gas! You can see a lever on the far wall through the green haze.",
    image: "/encounters/poison_gas_corridor_1770744860795.png",
    choices: [
      { text: "Hold breath and sprint", stat: "str", difficulty: 12, successText: "You reach the lever and pull it! The gas vents clear. Your lungs burn but you're alive.", failText: "You gasp halfway. The gas tastes like old broccoli. And pain.", damage: 3 },
      { text: "Use cloth as a filter", stat: "int", difficulty: 11, successText: "Your improvised gas mask works! Sort of. You reach the lever dizzy but alive.", failText: "The cloth does nothing. You now have no shirt AND poison damage.", damage: 3 },
    ],
  },
  {
    id: "e_015",
    text: "An orc merchant offers you a 'definitely not cursed' amulet for the low price of your left shoe.",
    image: "/encounters/goblin_top_hat_1770744596170.png",
    choices: [
      { text: "Haggle for both shoes", stat: "cha", difficulty: 12, successText: "He gives YOU the amulet AND a shoe. Worst merchant ever. Best day ever.", failText: "He's insulted. He's also 7 feet tall. He takes the shoe by force. And some HP.", damage: 2 },
      { text: "Inspect the amulet", stat: "int", difficulty: 11, successText: "It IS cursed, but the curse is just mild inconvenience. You take it anyway.", failText: "You put it on. Your hand is now a crab claw. Temporarily.", damage: 2 },
    ],
  },
  {
    id: "e_016",
    text: "The floor turns to ice! Your feet are sliding. A wall of spikes approaches slowly from behind.",
    image: "/encounters/rickety_bridge_1770744662037.png",
    choices: [
      { text: "Slide with style", stat: "dex", difficulty: 13, successText: "You ice-skate to safety like a medieval Olympian.", failText: "You do the splits involuntarily. The spikes graze your back.", damage: 3 },
      { text: "Melt the ice with torch", stat: "int", difficulty: 10, successText: "Science wins! The ice melts and you wade through the puddle.", failText: "Your torch sputters out. The ice laughs at your hubris.", damage: 2 },
    ],
  },
  {
    id: "e_017",
    text: "A giant spider drops from the ceiling wearing what appears to be a tiny crown. Spider royalty.",
    image: "/encounters/pit_trap_spiders_1770744611560.png",
    choices: [
      { text: "Bow to the Spider Queen", stat: "cha", difficulty: 12, successText: "She appreciates the gesture and lets you pass. Diplomacy works on arachnids.", failText: "She takes your bow as weakness and wraps you in silk. Briefly.", damage: 3 },
      { text: "Squish the royal spider", stat: "str", difficulty: 11, successText: "Long live the— never mind. You step on her. The crown is yours now.", failText: "She's faster than she looks. Web to the face.", damage: 2 },
    ],
  },
  {
    id: "e_018",
    text: "A sentient door begs you not to open it. 'Please, I have a family!' it wails.",
    image: "/encounters/riddle_door_1770744783858.png",
    choices: [
      { text: "Talk it through", stat: "cha", difficulty: 11, successText: "After a heartfelt therapy session, the door opens willingly. Growth.", failText: "The door starts crying so hard it swells shut. You push through anyway.", damage: 2 },
      { text: "Kick it open", stat: "str", difficulty: 12, successText: "BAM. The door's feelings are hurt but you're through.", failText: "The door fights back! It slams on you. Doors: 1, You: 0.", damage: 3 },
    ],
  },
  {
    id: "e_019",
    text: "You step on a whoopee cushion. The entire dungeon goes silent. Something stirs in the darkness.",
    image: "/encounters/magical_rune_1770744698306.png",
    choices: [
      { text: "Hide immediately", stat: "dex", difficulty: 12, successText: "You dive behind a pillar. Whatever woke up goes back to sleep.", failText: "You hide, but your armor clanks. A rock hits your head from the darkness.", damage: 2 },
      { text: "Yell 'IT WAS THE CHAIR'", stat: "cha", difficulty: 14, successText: "The darkness chuckles. Apparently monsters appreciate comedy.", failText: "The darkness does not appreciate comedy. Something bites you.", damage: 3 },
    ],
  },
  {
    id: "e_020",
    text: "The final chamber! A massive stone golem awakens. Its eyes glow. Its fist is the size of your torso.",
    image: "/encounters/skeleton_warrior_1770744627857.png",
    choices: [
      { text: "Go for the weak point", stat: "int", difficulty: 13, successText: "You spot the glowing rune on its back, grab a rock, and nail it. Golem down!", failText: "There is no weak point. It's just rock. You throw a pebble at it. It's angry now.", damage: 4 },
      { text: "Tackle it head-on", stat: "str", difficulty: 14, successText: "You channel everything into one epic punch. It cracks! LEGENDARY MOVE!", failText: "It punches you first. You see stars. Medieval stars.", damage: 4 },
    ],
  },
];
