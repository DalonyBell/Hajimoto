
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

interface Haiku {
  id: string;
  lines: [string, string, string];
  prompt: string;
  createdAt: Date;
}

export function useHaikuGenerator() {
  const [prompt, setPrompt] = useState<string>('');
  const [currentHaiku, setCurrentHaiku] = useState<Haiku | null>(null);
  const [savedHaikus, setSavedHaikus] = useState<Haiku[]>(() => {
    const saved = localStorage.getItem('savedHaikus');
    return saved ? JSON.parse(saved) : [];
  });
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const { toast } = useToast();

  // Enhanced AI Haiku generation logic with expanded vocabulary
  const generateHaiku = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Your prompt will inspire Hajimoto.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // This is a simulation of AI generation
      // In a real app, you'd call an API here
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Greatly expanded vocabulary for more versatile and creative haikus
      const seasons = [
        'spring', 'summer', 'autumn', 'winter', 'dawn', 'dusk', 'twilight', 'midnight',
        'solstice', 'equinox', 'monsoon', 'harvest', 'bloom', 'thaw', 'frost', 'mist',
        'morning', 'evening', 'noon', 'nightfall', 'daybreak', 'sunset', 'sunrise', 'gloaming',
        'eclipse', 'zenith', 'golden hour', 'blue hour', 'witching hour', 'starlight', 'moonlight'
      ];
      
      const nature = [
        'mountain', 'river', 'ocean', 'forest', 'flower', 'moon', 'sun', 'stars', 
        'rain', 'snow', 'petal', 'blossom', 'garden', 'meadow', 'waterfall', 'breeze', 
        'thunder', 'mist', 'fog', 'cloud', 'desert', 'valley', 'canyon', 'lake', 
        'stream', 'pond', 'cliff', 'cave', 'glacier', 'volcano', 'geyser', 'reef',
        'island', 'peninsula', 'horizon', 'shadow', 'rainbow', 'storm', 'lightning',
        'dew', 'frost', 'ice', 'flame', 'ember', 'smoke', 'ash', 'dust', 'pollen',
        'vine', 'thorn', 'reed', 'moss', 'lichen', 'fern', 'pine', 'willow', 'oak',
        'aurora', 'avalanche', 'cosmos', 'prairie', 'savanna', 'tundra', 'basin', 'summit', 
        'crest', 'ravine', 'fjord', 'atoll', 'everglades', 'oasis', 'citadel', 'precipice',
        'escarpment', 'plateau', 'archipelago', 'current', 'eddy', 'cascade', 'cataract',
        'delta', 'estuary', 'glade', 'gorge', 'inlet', 'isthmus', 'lagoon', 'marsh'
      ];
      
      const emotions = [
        'peace', 'joy', 'wonder', 'silence', 'solitude', 'harmony', 'tranquility', 
        'sadness', 'longing', 'hope', 'serenity', 'nostalgia', 'awe', 'contentment', 
        'melancholy', 'bliss', 'passion', 'courage', 'fear', 'love', 'grief', 
        'yearning', 'desire', 'regret', 'euphoria', 'excitement', 'envy', 'pride',
        'gratitude', 'compassion', 'empathy', 'enlightenment', 'wisdom', 'clarity',
        'confusion', 'curiosity', 'wonder', 'anticipation', 'patience', 'persistence',
        'equanimity', 'reverence', 'veneration', 'astonishment', 'bewilderment', 'elation',
        'exuberance', 'adoration', 'amazement', 'trepidation', 'delight', 'rapture',
        'ecstasy', 'tenderness', 'affection', 'fondness', 'intimacy', 'devotion',
        'mirth', 'merriment', 'joviality', 'euphony', 'epiphany', 'realization'
      ];
      
      const subjects = [
        'cat', 'dog', 'bird', 'butterfly', 'dragonfly', 'child', 'elder', 'traveler', 
        'monk', 'artist', 'farmer', 'fisherman', 'cherry blossom', 'pine', 'bamboo', 
        'frog', 'cricket', 'firefly', 'fox', 'deer', 'wolf', 'bear', 'eagle', 'hawk', 
        'sparrow', 'crow', 'raven', 'swan', 'heron', 'turtle', 'fish', 'whale', 'dolphin',
        'shark', 'octopus', 'squid', 'crab', 'lobster', 'shrimp', 'snail', 'beetle',
        'ant', 'bee', 'wasp', 'spider', 'scorpion', 'serpent', 'dragon', 'phoenix',
        'unicorn', 'griffin', 'pegasus', 'mermaid', 'centaur', 'minotaur', 'cyclops',
        'giant', 'dwarf', 'elf', 'fairy', 'sprite', 'nymph', 'dryad', 'sylph', 'gnome',
        'goblin', 'troll', 'ogre', 'witch', 'wizard', 'mage', 'sorcerer', 'necromancer',
        'paladin', 'knight', 'samurai', 'ninja', 'pirate', 'captain', 'sailor', 'warrior',
        'lioness', 'panda', 'koala', 'lemur', 'otter', 'peacock', 'nightingale', 'wren',
        'kestrel', 'osprey', 'falcon', 'owl', 'bat', 'salamander', 'newt', 'chameleon',
        'iguana', 'gecko', 'python', 'cobra', 'viper', 'woodpecker', 'cardinal', 'jay',
        'robin', 'finch', 'dove', 'seagull', 'albatross', 'pelican', 'swallow', 'sable',
        'ermine', 'chipmunk', 'squirrel', 'raccoon', 'badger', 'wolverine', 'monk seal'
      ];
      
      // Additional word banks for more versatility
      const urban = [
        'city', 'street', 'skyscraper', 'alley', 'subway', 'café', 'restaurant', 'park',
        'museum', 'gallery', 'theater', 'cinema', 'concert', 'festival', 'parade', 'market',
        'shop', 'store', 'mall', 'plaza', 'square', 'boulevard', 'avenue', 'bridge', 'tunnel',
        'metropolis', 'downtown', 'suburb', 'neighborhood', 'quarter', 'district', 'precinct',
        'terrace', 'balcony', 'rooftop', 'courtyard', 'garden', 'pavilion', 'promenade',
        'esplanade', 'boardwalk', 'pier', 'wharf', 'dock', 'harbor', 'port', 'station',
        'terminal', 'airport', 'railway', 'highway', 'freeway', 'intersection', 'junction',
        'landmark', 'monument', 'statue', 'fountain', 'obelisk', 'spire', 'dome', 'minaret'
      ];
      
      const celestial = [
        'star', 'planet', 'moon', 'sun', 'comet', 'asteroid', 'meteor', 'galaxy',
        'universe', 'cosmos', 'constellation', 'nebula', 'supernova', 'black hole',
        'quasar', 'pulsar', 'aurora', 'eclipse', 'solstice', 'equinox', 'zodiac',
        'orbital', 'celestial', 'cosmic', 'interstellar', 'galactic', 'astral', 'ethereal',
        'heavenly', 'firmament', 'planetoid', 'satellite', 'lunar', 'solar', 'stellar',
        'astronomical', 'astrophysical', 'astrological', 'cosmological', 'cosmogonic',
        'Big Dipper', 'Orion', 'Pleiades', 'Andromeda', 'Milky Way', 'Cygnus', 'Ursa',
        'corona', 'chromosphere', 'photosphere', 'magnetosphere', 'ionosphere', 'atmosphere'
      ];
      
      const abstract = [
        'dream', 'thought', 'idea', 'memory', 'vision', 'illusion', 'reality', 'truth',
        'lie', 'secret', 'mystery', 'enigma', 'paradox', 'eternity', 'infinity', 'void',
        'chaos', 'order', 'balance', 'harmony', 'discord', 'rhythm', 'melody', 'symphony',
        'freedom', 'bondage', 'duality', 'unity', 'synchronicity', 'symmetry', 'asymmetry',
        'polarity', 'opacity', 'transparency', 'luminosity', 'obscurity', 'clarity', 'ambiguity',
        'complexity', 'simplicity', 'entropy', 'synergy', 'apathy', 'vitality', 'mortality',
        'immortality', 'vulnerability', 'invincibility', 'fragility', 'resilience', 'transience',
        'permanence', 'ephemeral', 'perpetual', 'momentary', 'everlasting', 'temporary', 'eternal'
      ];
      
      const literary = [
        'verse', 'stanza', 'rhyme', 'meter', 'alliteration', 'metaphor', 'simile', 'personification',
        'imagery', 'symbolism', 'allegory', 'irony', 'paradox', 'oxymoron', 'hyperbole', 'understatement',
        'sonnet', 'ballad', 'ode', 'elegy', 'epic', 'lyric', 'narrative', 'dramatic', 'didactic',
        'fable', 'parable', 'myth', 'legend', 'folklore', 'saga', 'tale', 'story', 'anecdote',
        'prose', 'poetry', 'verse', 'stanza', 'couplet', 'tercet', 'quatrain', 'quintain', 'sestet',
        'octave', 'refrain', 'chorus', 'prelude', 'interlude', 'postlude', 'crescendo', 'diminuendo'
      ];
      
      const philosophical = [
        'being', 'becoming', 'existence', 'essence', 'substance', 'form', 'matter', 'mind',
        'soul', 'spirit', 'consciousness', 'unconsciousness', 'subconscious', 'perception', 'cognition',
        'intuition', 'reason', 'logic', 'dialectic', 'discourse', 'argument', 'thesis', 'antithesis',
        'synthesis', 'analysis', 'induction', 'deduction', 'abduction', 'syllogism', 'premise',
        'conclusion', 'causality', 'teleology', 'determinism', 'indeterminism', 'destiny', 'fate',
        'chance', 'necessity', 'contingency', 'possibility', 'actuality', 'potentiality', 'virtuality'
      ];
      
      const actions = [
        'dance', 'sing', 'whisper', 'shout', 'run', 'walk', 'fly', 'swim', 'dive', 'float',
        'soar', 'glide', 'drift', 'meander', 'wander', 'roam', 'explore', 'discover', 'find',
        'lose', 'seek', 'hide', 'reveal', 'conceal', 'illuminate', 'darken', 'brighten', 'dim',
        'reflect', 'refract', 'disperse', 'concentrate', 'gather', 'scatter', 'collect', 'dispense',
        'create', 'destroy', 'build', 'dismantle', 'construct', 'deconstruct', 'assemble', 'disassemble',
        'bloom', 'wither', 'grow', 'shrink', 'expand', 'contract', 'inflate', 'deflate', 'rise', 'fall',
        'ascend', 'descend', 'climb', 'slide', 'slip', 'glide', 'twirl', 'spin', 'revolve', 'rotate'
      ];
      
      const descriptors = [
        'luminous', 'radiant', 'brilliant', 'dull', 'vibrant', 'vivid', 'pale', 'faded', 'lustrous',
        'gleaming', 'glimmering', 'shimmering', 'sparkling', 'glittering', 'glistening', 'twinkling',
        'flickering', 'flashing', 'blazing', 'burning', 'smoldering', 'incandescent', 'phosphorescent',
        'fluorescent', 'iridescent', 'opalescent', 'pearlescent', 'translucent', 'transparent', 'opaque',
        'diaphanous', 'filmy', 'gossamer', 'ethereal', 'delicate', 'robust', 'sturdy', 'fragile', 'brittle',
        'malleable', 'fluid', 'rigid', 'flexible', 'supple', 'stiff', 'soft', 'hard', 'smooth', 'rough',
        'mute', 'silent', 'quiet', 'loud', 'melodious', 'harmonious', 'cacophonous', 'discordant', 'euphonious'
      ];
      
      const promptLower = prompt.toLowerCase();
      const promptWords = promptLower.split(/\s+/);
      
      // Extract keywords from prompt with better matching
      const extractedWords = promptWords.filter(word => 
        word.length > 2 && !['the', 'and', 'for', 'with', 'about', 'that', 'this', 'from', 'have', 'will'].includes(word)
      );
      
      // Generate haiku based on prompt words with more creative variations
      const lines: [string, string, string] = generateCreativeHaiku(extractedWords, promptLower, { 
        seasons, nature, emotions, subjects, urban, celestial, abstract, literary, philosophical, actions, descriptors
      });

      const newHaiku: Haiku = {
        id: Date.now().toString(),
        lines,
        prompt,
        createdAt: new Date()
      };

      setCurrentHaiku(newHaiku);
      setPrompt('');
    } catch (error) {
      toast({
        title: "Error generating haiku",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error("Error generating haiku:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Enhanced creative haiku generation with better prompt utilization
  const generateCreativeHaiku = (
    extractedWords: string[], 
    fullPrompt: string, 
    wordBanks: { 
      seasons: string[], 
      nature: string[], 
      emotions: string[], 
      subjects: string[],
      urban: string[],
      celestial: string[],
      abstract: string[],
      literary: string[],
      philosophical: string[],
      actions: string[],
      descriptors: string[]
    }
  ): [string, string, string] => {
    
    // Check for specific themes in prompt with expanded categories
    const hasWater = fullPrompt.includes('water') || fullPrompt.includes('ocean') || fullPrompt.includes('river') || fullPrompt.includes('lake');
    const hasMountain = fullPrompt.includes('mountain') || fullPrompt.includes('hill') || fullPrompt.includes('peak');
    const hasSky = fullPrompt.includes('sky') || fullPrompt.includes('cloud') || fullPrompt.includes('star');
    const hasLove = fullPrompt.includes('love') || fullPrompt.includes('heart') || fullPrompt.includes('romance');
    const hasTime = fullPrompt.includes('time') || fullPrompt.includes('moment') || fullPrompt.includes('memory');
    const hasFlower = fullPrompt.includes('flower') || fullPrompt.includes('blossom') || fullPrompt.includes('bloom');
    const hasCity = fullPrompt.includes('city') || fullPrompt.includes('urban') || fullPrompt.includes('street');
    const hasSpace = fullPrompt.includes('space') || fullPrompt.includes('cosmos') || fullPrompt.includes('galaxy');
    const hasMusic = fullPrompt.includes('music') || fullPrompt.includes('song') || fullPrompt.includes('melody');
    const hasDream = fullPrompt.includes('dream') || fullPrompt.includes('sleep') || fullPrompt.includes('nightmare');
    const hasPhilosophy = fullPrompt.includes('philosophy') || fullPrompt.includes('meaning') || fullPrompt.includes('existence');
    const hasLight = fullPrompt.includes('light') || fullPrompt.includes('shine') || fullPrompt.includes('glow');
    const hasDark = fullPrompt.includes('dark') || fullPrompt.includes('night') || fullPrompt.includes('shadow');
    const hasAnimal = fullPrompt.includes('animal') || fullPrompt.includes('creature') || fullPrompt.includes('beast');
    const hasColor = fullPrompt.includes('color') || fullPrompt.includes('hue') || fullPrompt.includes('shade');
    
    // Combine detected themes with extracted words
    const keyThemes = [
      ...(hasWater ? ['ripples', 'waves', 'flowing', 'current', 'tide', 'splash', 'droplet', 'trickle', 'cascade', 'deluge'] : []),
      ...(hasMountain ? ['towering', 'ancient', 'stone', 'peak', 'summit', 'ridge', 'valley', 'crag', 'precipice', 'monolith'] : []),
      ...(hasSky ? ['endless', 'vast', 'celestial', 'horizon', 'firmament', 'atmosphere', 'expanse', 'boundless', 'ether', 'azure'] : []),
      ...(hasLove ? ['tender', 'embrace', 'passion', 'affection', 'devotion', 'adoration', 'ardor', 'cherish', 'yearning', 'longing'] : []),
      ...(hasTime ? ['fleeting', 'eternal', 'passing', 'moment', 'eternity', 'duration', 'ephemeral', 'transient', 'sempiternal', 'instantaneous'] : []),
      ...(hasFlower ? ['petals', 'fragrance', 'delicate', 'bloom', 'blossom', 'budding', 'unfurling', 'withering', 'aromatic', 'botanical'] : []),
      ...(hasCity ? ['bustling', 'crowded', 'neon', 'skyscraper', 'pavement', 'subway', 'metropolis', 'urbanite', 'asphalt', 'structure'] : []),
      ...(hasSpace ? ['infinite', 'stellar', 'cosmic', 'interstellar', 'nebula', 'void', 'vacuum', 'astral', 'galactic', 'universal'] : []),
      ...(hasMusic ? ['rhythm', 'harmony', 'melody', 'symphony', 'orchestra', 'tempo', 'cadence', 'refrain', 'crescendo', 'diminuendo'] : []),
      ...(hasDream ? ['subconscious', 'ethereal', 'surreal', 'fantasy', 'illusion', 'chimera', 'phantasm', 'reverie', 'slumber', 'hypnagogic'] : []),
      ...(hasPhilosophy ? ['existential', 'ontological', 'epistemological', 'metaphysical', 'transcendental', 'phenomenological', 'axiological', 'ethical', 'aesthetical', 'logical'] : []),
      ...(hasLight ? ['luminescent', 'radiant', 'illuminated', 'brilliant', 'lustrous', 'incandescent', 'effulgent', 'phosphorescent', 'lambent', 'lucent'] : []),
      ...(hasDark ? ['umbral', 'tenebrous', 'obscure', 'murky', 'dusky', 'crepuscular', 'nocturnal', 'vespertine', 'shadowy', 'gloaming'] : []),
      ...(hasAnimal ? ['feral', 'untamed', 'instinctual', 'primal', 'bestial', 'savage', 'predatory', 'primitive', 'natural', 'wild'] : []),
      ...(hasColor ? ['chromatic', 'prismatic', 'vivid', 'vibrant', 'polychromatic', 'iridescent', 'variegated', 'multihued', 'technicolor', 'kaleidoscopic'] : []),
      ...extractedWords
    ];
    
    // Select random words from prompt and banks if no specific themes detected
    const getRandomWord = (array: string[]) => array[Math.floor(Math.random() * array.length)];
    
    // If prompt has good content, use it more; otherwise rely more on word banks
    const usePromptHeavily = keyThemes.length > 3;
    
    // Create more diverse template structures for different haiku styles
    const templates = [
      // Nature observation template
      (): [string, string, string] => {
        const subject = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.subjects);
        const nature = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.nature);
        const descriptor = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.descriptors);
        const action = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.actions);
        
        return [
          `${subject} in ${nature}`,
          `${descriptor} as it ${action}s`,
          `${hasPhilosophy ? getRandomWord(wordBanks.philosophical) : getRandomWord(wordBanks.abstract)} found`
        ];
      },
      
      // Season transition template
      (): [string, string, string] => {
        const season = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.seasons);
        const nature = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.nature);
        const action = hasWater ? getRandomWord(['flowing', 'rippling', 'cascading', 'streaming', 'pouring']) : 
                      (hasSky ? getRandomWord(['drifting', 'floating', 'soaring', 'gliding', 'hovering']) : 
                      getRandomWord(['dancing', 'swaying', 'trembling', 'rustling', 'stirring']));
        
        return [
          `${season} ${action} by`,
          `${nature} ${hasLove ? getRandomWord(['embraces', 'cherishes', 'caresses', 'nurtures', 'cradles']) : 
                              getRandomWord(['welcomes', 'accepts', 'receives', 'greets', 'acknowledges'])} change`,
          `${hasDark ? 'shadows' : (hasLight ? 'light' : 'time')} ${getRandomWord(wordBanks.actions)}s`
        ];
      },
      
      // Emotional reflection template
      (): [string, string, string] => {
        const emotion = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.emotions);
        const subject = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.subjects);
        const descriptor = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.descriptors);
        
        return [
          `${emotion} like ${hasWater ? getRandomWord(['water', 'waves', 'river', 'rain', 'mist']) : 
                         (hasFlower ? getRandomWord(['blossoms', 'petals', 'flowers', 'gardens', 'buds']) : 
                         getRandomWord(['shadows', 'echoes', 'whispers', 'memories', 'dreams']))}`,
          `${subject} ${hasSky ? getRandomWord(['gazes at stars', 'watches clouds', 'sees the moon', 'feels the breeze', 'breathes the air']) : 
                           getRandomWord(['finds the path', 'seeks the truth', 'discovers meaning', 'follows instinct', 'listens closely'])}`,
          `${descriptor} ${getRandomWord(['vision', 'insight', 'wisdom', 'revelation', 'understanding'])}`
        ];
      },
      
      // Urban life template
      (): [string, string, string] => {
        const urban = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.urban);
        const emotion = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.emotions);
        const action = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.actions);
        
        return [
          `${urban} ${getRandomWord(['lights', 'sounds', 'scenes', 'sights', 'moments'])} ${getRandomWord(['flicker', 'echo', 'unfold', 'emerge', 'appear'])}`,
          `${emotion} amid the ${hasMusic ? getRandomWord(['rhythm', 'melody', 'harmony', 'tempo', 'beat']) : 
                                    getRandomWord(['bustle', 'crowd', 'noise', 'movement', 'energy'])}`,
          `${action}ing in ${hasTime ? getRandomWord(['stillness', 'silence', 'pauses', 'moments', 'intervals']) : 
                                      getRandomWord(['peace', 'solitude', 'quiet', 'sanctuary', 'retreat'])}`
        ];
      },
      
      // Cosmic wonder template
      (): [string, string, string] => {
        const celestial = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.celestial);
        const abstract = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.abstract);
        const philosophical = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.philosophical);
        
        return [
          `distant ${celestial} ${getRandomWord(['shine', 'glow', 'pulse', 'flare', 'beam'])}`,
          `${abstract} across vast ${hasSpace ? getRandomWord(['galaxies', 'nebulae', 'constellations', 'cosmos', 'universe']) : 
                                        getRandomWord(['expanse', 'distance', 'horizon', 'infinity', 'eternity'])}`,
          `${hasDream ? getRandomWord(['dreams', 'visions', 'imaginings', 'fantasies', 'reveries']) : 
                       philosophical} ${getRandomWord(['infinite', 'boundless', 'limitless', 'eternal', 'endless'])}`
        ];
      },
      
      // Dream sequence template
      (): [string, string, string] => {
        const abstract = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.abstract);
        const subject = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.subjects);
        const descriptor = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.descriptors);
        
        return [
          `${abstract} ${hasDream ? getRandomWord(['dreams', 'visions', 'fantasies', 'illusions', 'mirages']) : 
                                getRandomWord(['thoughts', 'ideas', 'concepts', 'notions', 'impressions'])} float`,
          `${subject} in ${hasSpace ? getRandomWord(['ethereal', 'cosmic', 'astral', 'celestial', 'interstellar']) : 
                                  getRandomWord(['surreal', 'phantasmal', 'mystical', 'magical', 'enchanted'])} ${getRandomWord(['dance', 'movement', 'rhythm', 'flow', 'current'])}`,
          `${descriptor} ${hasTime ? getRandomWord(['moments', 'instances', 'seconds', 'minutes', 'intervals']) : 
                                   getRandomWord(['thoughts', 'musings', 'contemplations', 'reflections', 'meditations'])} emerge`
        ];
      },

      // Philosophical contemplation template
      (): [string, string, string] => {
        const philosophical = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.philosophical);
        const abstract = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.abstract);
        const emotion = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.emotions);
        
        return [
          `${philosophical} ${getRandomWord(['questions', 'ponderings', 'inquiries', 'contemplations', 'deliberations'])}`,
          `${abstract} ${getRandomWord(['reveals', 'unfolds', 'discloses', 'manifests', 'presents'])} ${getRandomWord(['meaning', 'purpose', 'essence', 'significance', 'relevance'])}`,
          `${emotion} ${getRandomWord(['awakens', 'arises', 'emerges', 'blossoms', 'develops'])}`
        ];
      },
      
      // Literary allusion template
      (): [string, string, string] => {
        const literary = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.literary);
        const emotion = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.emotions);
        const abstract = usePromptHeavily && keyThemes.length ? keyThemes[Math.floor(Math.random() * keyThemes.length)] : getRandomWord(wordBanks.abstract);
        
        return [
          `${literary} ${getRandomWord(['forms', 'shapes', 'creates', 'molds', 'crafts'])} ${getRandomWord(['words', 'verses', 'stanzas', 'phrases', 'expressions'])}`,
          `${emotion} ${getRandomWord(['flows', 'surges', 'pulsates', 'resonates', 'vibrates'])} through ${getRandomWord(['lines', 'passages', 'sections', 'segments', 'fragments'])}`,
          `${abstract} ${getRandomWord(['captured', 'seized', 'grasped', 'apprehended', 'comprehended'])}`
        ];
      }
    ];
    
    // Choose a template based on the prompt content for more varied output
    let templateIndex = Math.floor(Math.random() * templates.length); // Default: random template
    
    // But if we have specific themes, let's try to match them
    if (hasWater || hasSky) templateIndex = 1;
    if (hasLove || hasTime) templateIndex = 2;
    if (hasCity || hasMusic) templateIndex = 3;
    if (hasSpace) templateIndex = 4;
    if (hasDream) templateIndex = 5;
    if (hasPhilosophy) templateIndex = 6;
    if (fullPrompt.includes('literature') || fullPrompt.includes('poetry') || fullPrompt.includes('writing')) templateIndex = 7;
    
    // Apply template and return haiku
    return templates[templateIndex]();
  };

  // Save haiku to localStorage
  const saveHaiku = () => {
    if (!currentHaiku) return;

    const updatedHaikus = [currentHaiku, ...savedHaikus];
    setSavedHaikus(updatedHaikus);
    localStorage.setItem('savedHaikus', JSON.stringify(updatedHaikus));
    
    toast({
      title: "Haiku saved",
      description: "Your haiku has been saved to your collection.",
    });
  };

  // Delete haiku from localStorage
  const deleteHaiku = (id: string) => {
    const updatedHaikus = savedHaikus.filter(haiku => haiku.id !== id);
    setSavedHaikus(updatedHaikus);
    localStorage.setItem('savedHaikus', JSON.stringify(updatedHaikus));
    
    toast({
      title: "Haiku deleted",
      description: "Your haiku has been removed from your collection.",
    });
  };

  // Copy haiku text to clipboard
  const copyToClipboard = (haiku: Haiku) => {
    const text = haiku.lines.join('\n');
    navigator.clipboard.writeText(text);
    
    toast({
      title: "Copied to clipboard",
      description: "Haiku has been copied to your clipboard.",
    });
  };

  return {
    prompt,
    setPrompt,
    currentHaiku,
    savedHaikus,
    isGenerating,
    generateHaiku,
    saveHaiku,
    deleteHaiku,
    copyToClipboard
  };
}
