export const CATEGORIES = [
  'Philosophy',
  'Literature',
  'Poetry',
  'Science',
  'History',
  'Art',
  'Essays',
  'Film',
  'Psychology'
];

export const TEXT_SIZE_OPTIONS = [
  { label: 'S', value: 0.8, fontSize: 10 },
  { label: 'M', value: 1, fontSize: 12 },
  { label: 'L', value: 1.2, fontSize: 14 },
  { label: 'XL', value: 1.5, fontSize: 16 }
];

// Sample placeholder readings
export const READINGS = [
  {
    id: '1',
    title: 'The Enigma of Consciousness',
    author: 'Elena Markova',
    category: 'Philosophy',
    content: `In the quiet hours before dawn, when the world seems suspended between dreams and reality, I often contemplate the nature of consciousness. What does it mean to be aware? To perceive oneself as separate from the vast cosmos, yet intrinsically connected to it?\n\nConsciousness remains one of the great mysteries of existence. Scientists can map neural pathways, philosophers can debate the mind-body problem, but the subjective experience of being—the qualia, as some call it—eludes complete explanation.\n\nPerhaps consciousness isn't merely an emergent property of complex neural networks, but something more fundamental to the universe itself. What if, as some theories suggest, consciousness is a basic feature of reality, like space, time, or energy?\n\nI recall walking through an ancient forest once, the sunlight filtering through leaves, creating patterns on the forest floor. In that moment, I felt my boundaries dissolve, my sense of self expanding to include the trees, the earth, the sky. Was this merely a trick of perception, or a glimpse of a deeper truth—that consciousness transcends individual minds?\n\nWe speak of consciousness as if it were a single, unified phenomenon, but perhaps it exists on a spectrum. From the basic responsiveness of single-celled organisms to the complex self-awareness of humans, there may be countless gradations of being.\n\nAnd what of artificial intelligence? Can consciousness be programmed or simulated? Or is there something ineffable about subjective experience that cannot be reduced to algorithms, no matter how sophisticated?\n\nThese questions lead us to the edge of knowledge, where science meets philosophy, where reason meets intuition. Here, in this liminal space, we might not find definitive answers, but perhaps something equally valuable: a profound appreciation for the mystery of being conscious in a universe that seems, against all odds, to have produced minds capable of contemplating itself.`,
    imageUrl: 'https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    readingTime: 5
  },
  {
    id: '2',
    title: 'Midnight in the Garden',
    author: 'Samuel Rivera',
    category: 'Literature',
    content: `The garden at midnight was a different world entirely. Elena knew this, had known it since childhood, but tonight it felt especially true. The moon hung low and heavy, casting silvery light through the branches of the old oak tree. Shadows danced as the breeze stirred the leaves, creating patterns on the lawn that seemed almost deliberate, like a message in a forgotten language.\n\nShe sat on the stone bench, cool against her skin despite the summer warmth that lingered in the air. From here, she could see the entirety of her grandmother's garden—the rose bushes with their nodding blooms, the herb garden with its pungent scents, and beyond, the wild area that her grandmother had allowed to grow untamed, a concession to nature's own designs.\n\n"The garden knows things we don't," her grandmother used to say. Elena had laughed at this as a child, but now, at thirty-five, with her grandmother ten years gone, she wasn't so sure it was a fanciful notion.\n\nA sound caught her attention—a rustling from the direction of the wild garden. Fox or cat, probably, she thought. The garden attracted all manner of nocturnal visitors. But when she turned to look, she saw something unusual: a faint blue light, hovering just above the tall grasses.\n\nElena blinked, certain it must be a trick of moonlight on dew, or perhaps her eyes playing tricks after too many hours of staring at a computer screen. But the light remained, pulsing gently, like a heartbeat.\n\nShe should have been afraid, she supposed. Mysterious lights in the night weren't generally considered benign. But fear was the furthest thing from her mind as she rose from the bench and began to walk toward the light. It felt right, somehow, as if she'd been waiting for this moment without knowing it.\n\nAs she approached, the light retreated, maintaining the distance between them. Elena smiled. "Playing hard to get?" she murmured, surprised by the sound of her own voice in the quiet night.\n\nThe light pulsed brighter for a moment, as if in response, then continued its retreat toward the old stone wall that marked the boundary of the property. Elena followed, her bare feet soundless on the soft grass.\n\nAt the wall, the light paused, hovering at the exact spot where, as a child, Elena had discovered a gap in the stones, a secret passage to the meadow beyond. She hadn't thought of that hiding place in years.\n\nThe light slipped through the gap and vanished. Elena stood before the wall, remembering how she used to squeeze through that space, emerging into a world that felt entirely her own. Was she really considering following this strange phenomenon?\n\n"The garden knows things we don't," she heard her grandmother's voice whisper in her memory.\n\nElena knelt down, finding the gap exactly as she remembered it, though it would be a tighter fit now. She hesitated just a moment longer, then pushed aside the curtain of ivy and began to make her way through the wall, toward whatever awaited her on the other side.`,
    imageUrl: 'https://images.pexels.com/photos/1125278/pexels-photo-1125278.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    readingTime: 6
  },
  {
    id: '3',
    title: 'Ode to Starlight',
    author: 'Lian Chen',
    category: 'Poetry',
    content: `How strange it is to gaze skyward\nAt night, when the veil between worlds thins,\nAnd realize the light that meets my eye\nBegan its journey long before my birth.\n\nAncient photons, travelers across the void,\nBearing witness to cosmic histories\nI will never know—supernovas flaring,\nPlanets forming, stars dying and being born.\n\nWhat stories could you tell, starlight,\nIf I had ears to hear your silent narratives?\nOf civilizations rising and falling perhaps,\nOn worlds circling your distant suns?\n\nI stand barefoot on cool earth,\nRooted to this spinning planet,\nWhile you, ethereal messenger,\nComplete your journey in my upturned gaze.\n\nThere is comfort in this connection—\nMy atoms and yours, forged in stellar furnaces,\nSeparated by time and space, yet\nSomehow meeting in this moment of perception.\n\nSo I will continue to look up,\nA small creature on a small world,\nReceiving your ancient light with wonder,\nAnd sending back, in exchange, my awe.`,
    imageUrl: 'https://images.pexels.com/photos/1694000/pexels-photo-1694000.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    readingTime: 3
  },
  {
    id: '4',
    title: 'The Quantum Observer Effect',
    author: 'Dr. Mira Patel',
    category: 'Science',
    content: `Among the many counterintuitive aspects of quantum mechanics, perhaps none is more philosophically provocative than the observer effect. At its most basic, this principle suggests that the very act of measuring or observing a quantum system can change its behavior.\n\nConsider the famous double-slit experiment. When particles like electrons are fired at a barrier with two slits, without observation, they create an interference pattern on the detecting screen behind—behaving like waves. But when we attempt to observe which slit each electron passes through, the interference pattern disappears, and the electrons behave like particles.\n\nIt's as if the particles "know" they're being watched.\n\nThis has led to heated debates about the nature of reality itself. Does objective reality exist independent of observation? Or does consciousness somehow play a role in the manifestation of physical reality at the quantum level?\n\nNiels Bohr, one of quantum theory's founding fathers, advocated for the Copenhagen interpretation, which suggests that quantum systems exist in superpositions of states until measured, at which point they "collapse" into definite states. But what constitutes a measurement? Must it involve consciousness, or could any physical interaction qualify?\n\nOther interpretations, like Hugh Everett's Many-Worlds theory, suggest that all possible outcomes of quantum measurements occur, but in different "worlds" or branches of a universal wavefunction. In this view, observation doesn't collapse possibilities—it simply determines which branch of reality we experience.\n\nMore recently, theories of quantum decoherence have provided mechanisms by which quantum systems can appear to collapse without invoking observers. As quantum systems interact with their environments, their quantum nature becomes effectively hidden, appearing classical to us.\n\nYet the philosophical implications remain profound. If the act of observation can influence physical reality at its most fundamental level, what does this tell us about the relationship between mind and matter? Are they truly separate, as Descartes believed, or intricately connected in ways we're only beginning to understand?\n\nAs we probe deeper into quantum reality, we may find that the distinction between observer and observed, between consciousness and the physical world, is not as clear-cut as classical science once led us to believe. The universe may be less like a machine operating independently of us, and more like a participatory reality in which consciousness plays an integral role.`,
    imageUrl: 'https://images.pexels.com/photos/714699/pexels-photo-714699.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    readingTime: 5
  },
  {
    id: '5',
    title: 'The Lost Library of Alexandria',
    author: 'Historian Marcus Edwards',
    category: 'History',
    content: `In the ancient city of Alexandria, along the Mediterranean coast of Egypt, once stood humanity's greatest repository of knowledge: the Great Library of Alexandria. Founded in the 3rd century BCE during the reign of Ptolemy II, it represented the pinnacle of intellectual achievement in the ancient world.\n\nImagine walking through its columned halls, where scrolls containing as many as 700,000 works—poetry, drama, science, mathematics, astronomy, medicine, philosophy—were carefully preserved. Scholars from across the Mediterranean world traveled to Alexandria to study these texts, to debate ideas, and to contribute to humanity's understanding of the universe.\n\nThe library wasn't merely a collection of books; it was an institution dedicated to the pursuit of knowledge. Attached to it was the Mouseion, a research institute where scholars lived and worked. Here, Euclid developed geometry, Archimedes conducted early experiments in physics, and Eratosthenes calculated the Earth's circumference with astonishing accuracy.\n\nBut perhaps most tragic about the Library of Alexandria is not just what it was, but what it could have been. And what humanity lost when it was destroyed.\n\nThe circumstances of the library's destruction remain contested. Some blame Julius Caesar's fire during his Alexandrian campaign in 48 BCE. Others point to later conflicts: the attack of Emperor Aurelian in the 270s CE, the decree of Theophilus in 391 CE, or the Muslim conquest in 642 CE. Most likely, the library declined gradually through multiple destructive events.\n\nWhat was lost? Works of literature we know existed but have never recovered. Scientific knowledge that might have accelerated human progress. Alternative perspectives on history, philosophy, and religion that could have broadened our understanding of ancient cultures.\n\nConsider this: much of what we know about Greek tragedy comes from just 33 surviving plays, yet we know that thousands were written. How many masterpieces vanished in Alexandria's destruction? How many discoveries had to be rediscovered centuries later?\n\nThe story of the Library of Alexandria serves as both inspiration and warning. It demonstrates humanity's capacity for intellectual greatness and collaboration across cultures. But it also reminds us of our vulnerability to forces of destruction, whether through conflict, ideological fervor, or simple neglect.\n\nIn our digital age, as we build new repositories of knowledge more vast than the Alexandrians could have imagined, the lesson of the lost library remains relevant: knowledge, once lost, may be lost forever. Its preservation requires not just technology, but commitment to the fundamental value of human understanding in all its diversity.`,
    imageUrl: 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    readingTime: 6
  }
];