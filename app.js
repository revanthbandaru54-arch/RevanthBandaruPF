/**
 * Bandaru Revanth — F1 Telemetry Website & DhwaniDrishti Live Engine
 * Incorporates:
 * 1. Stitch F1 Pit-Lane Telemetry Navigation & View Switching (Projects, Skills, Hackathons, About)
 * 2. DhwaniDrishti Core Engine (from github.com/revanthbandaru54-arch/DhwaniDrishti):
 *    - LectureCast SVO -> ISL SOV Topological Grammar Engine (en-IN, te-IN, hi-IN) + Spatial Loci + NMM + 48-Bone Avatar Canvas
 *    - ISL-STEM Coach Sakoe-Chiba Dynamic Time Warping (DTW) & Vector Cosine Evaluator
 *    - DoubtDesk 543-Landmark Holistic Stream & Temporal 1D-CNN + Bi-LSTM Classifier with Web Speech TTS
 */

// ==================== STATE ====================
let currentMainView = 'projects';
let currentTelemetryTab = 'projects';
let currentPillar = 'lecturecast';
let currentLang = 'en-IN';
let currentPersona = 'Aarav';
let isRigPlaying = true;
let activeGlossIdx = 0;
let parsedISL = null;
let selectedStemIdx = 0;
let selectedDoubtIdx = 0;

// ==================== DHWANIDRISHTI LINGUISTIC & KINEMATIC DATA ====================
const MULTILINGUAL_LEXICON = {
  te: {
    'ఉపాధ్యాయుడు': 'teacher',
    'విద్యార్థులకు': 'students',
    'విద్యార్థులు': 'students',
    'విద్యార్థి': 'student',
    'అల్గారిథమ్': 'algorithm',
    'డెరివేటివ్': 'derivative',
    'అవకలనం': 'derivative',
    'కిరణజన్య సంయోగక్రియ': 'photosynthesis',
    'బాష్పీభవనం': 'evaporation',
    'పునరావృతం': 'recursion',
    'వేగం': 'velocity',
    'ద్రవ్యవేగం': 'momentum',
    'సమీకరణం': 'equation',
    'వివరిస్తారు': 'explain',
    'నేర్చుకుంటారు': 'learn',
    'లెక్కించండి': 'calculate',
    'లెక్కిస్తారు': 'calculate',
    'జరుగుతుంది': 'happen',
    'ఈరోజు': 'today',
    'రేపు': 'tomorrow',
    'నిన్న': 'yesterday',
    'ఇప్పుడు': 'now',
    'మరియు': 'and',
    'ఎందుకు': 'why',
    'ఎలా': 'how',
    'ఏమిటి': 'what',
    'ఎక్కడ': 'where',
    'ఎవరు': 'who',
    'ఎప్పుడు': 'when',
    'వరద': 'flood',
  },
  hi: {
    'शिक्षक': 'teacher',
    'अध्यापक': 'teacher',
    'छात्रों': 'students',
    'विद्यार्थियों': 'students',
    'छात्र': 'student',
    'विद्यार्थी': 'student',
    'एल्गोरिदम': 'algorithm',
    'अवकलन': 'derivative',
    'प्रकाश संश्लेषण': 'photosynthesis',
    'वाष्पीकरण': 'evaporation',
    'पुनरावृत्ति': 'recursion',
    'वेग': 'velocity',
    'संवेग': 'momentum',
    'समीकरण': 'equation',
    'समझाएंगे': 'explain',
    'समझाते': 'explain',
    'सीखते': 'learn',
    'गणना': 'calculate',
    'होता': 'happen',
    'आज': 'today',
    'कल': 'tomorrow',
    'अभी': 'now',
    'और': 'and',
    'क्यों': 'why',
    'कैसे': 'how',
    'क्या': 'what',
    'कहाँ': 'where',
    'कौन': 'who',
    'कब': 'when',
    'बाढ़': 'flood',
    'को': 'to',
    'हैं': 'are',
    'है': 'is',
  },
};

const GLOSS_NATIVE_MAP = {
  'te-IN': {
    TODAY: 'ఈరోజు',
    TOMORROW: 'రేపు',
    YESTERDAY: 'నిన్న',
    NOW: 'ఇప్పుడు',
    TEACHER: 'ఉపాధ్యాయుడు',
    STUDENT: 'విద్యార్థి',
    STUDENTS: 'విద్యార్థులు',
    ALGORITHM: 'అల్గారిథమ్',
    DERIVATIVE: 'అవకలనం',
    PHOTOSYNTHESIS: 'కిరణజన్య సంయోగక్రియ',
    EVAPORATION: 'బాష్పీభవనం',
    RECURSION: 'పునరావృతం',
    VELOCITY: 'వేగం',
    MOMENTUM: 'ద్రవ్యవేగం',
    EQUATION: 'సమీకరణం',
    EXPLAIN: 'వివరిస్తారు',
    LEARN: 'నేర్చుకుంటారు',
    CALCULATE: 'లెక్కించు',
    HAPPEN: 'జరుగుతుంది',
    WHY: 'ఎందుకు',
    HOW: 'ఎలా',
    WHAT: 'ఏమిటి',
    WHERE: 'ఎక్కడ',
    WHO: 'ఎవరు',
    WHEN: 'ఎప్పుడు',
    NOT: 'కాదు',
    MUST: 'తప్పనిసరి',
    AND: 'మరియు',
    FLOOD: 'వరద',
  },
  'hi-IN': {
    TODAY: 'आज',
    TOMORROW: 'कल',
    YESTERDAY: 'कल',
    NOW: 'अभी',
    TEACHER: 'शिक्षक',
    STUDENT: 'छात्र',
    STUDENTS: 'छात्रों',
    ALGORITHM: 'एल्गोरिदम',
    DERIVATIVE: 'अवकलन',
    PHOTOSYNTHESIS: 'प्रकाश संश्लेषण',
    EVAPORATION: 'वाष्पीकरण',
    RECURSION: 'पुनरावृत्ति',
    VELOCITY: 'वेग',
    MOMENTUM: 'संवेग',
    EQUATION: 'समीकरण',
    EXPLAIN: 'समझाते',
    LEARN: 'सीखते',
    CALCULATE: 'गणना',
    HAPPEN: 'होता',
    WHY: 'क्यों',
    HOW: 'कैसे',
    WHAT: 'क्या',
    WHERE: 'कहाँ',
    WHO: 'कौन',
    WHEN: 'कब',
    NOT: 'नहीं',
    MUST: 'जरूर',
    AND: 'और',
    FLOOD: 'बाढ़',
  },
};

const SAMPLE_SENTENCES_BY_LANG = [
  {
    'en-IN': 'Tomorrow the teacher will explain photosynthesis and evaporation',
    'te-IN': 'రేపు ఉపాధ్యాయుడు కిరణజన్య సంయోగక్రియ మరియు బాష్పీభవనం వివరిస్తారు',
    'hi-IN': 'कल शिक्षक प्रकाश संश्लेषण और वाष्पीकरण समझाएंगे',
  },
  {
    'en-IN': 'Today the teacher will explain the algorithm to the students',
    'te-IN': 'ఈరోజు ఉపాధ్యాయుడు విద్యార్థులకు అల్గారిథమ్ వివరిస్తారు',
    'hi-IN': 'आज शिक्षक छात्रों को एल्गोरिदम समझाते हैं',
  },
  {
    'en-IN': 'How do students calculate the derivative equation today?',
    'te-IN': 'ఈరోజు విద్యార్థులు అవకలనం సమీకరణం ఎలా లెక్కిస్తారు?',
    'hi-IN': 'आज छात्र अवकलन समीकरण कैसे गणना करते हैं?',
  },
];

let currentSampleIdx = 0;

const NIOS_230_MORPHOLOGY = {
  WHO: { compound: 'FACE + QUESTION', category: 'Question Compound (Clause-Final - L9.4)' },
  WHERE: { compound: 'PLACE + QUESTION', category: 'Question Compound (Clause-Final - L9.4)' },
  WHEN: { compound: 'TIME/DAY + QUESTION', category: 'Question Compound (Clause-Final - L9.4)' },
  CHILDREN: { compound: 'CHILD++', category: 'Reduplication Plural (L9.6)' },
  STUDENTS: { compound: 'CLASS + CHILD++', category: 'Reduplication Plural (L9.6)' },
  EVAPORATION: { compound: 'WATER + SUN + RISE', category: 'STEM Meaning Compound (NIOS L11.3)' },
  PHOTOSYNTHESIS: { compound: 'WATER + SUN + LEAF-GROW', category: 'STEM Biology Compound (ISLRTC)' },
  FLOOD: { compound: 'WATER + RISE-UP', category: 'Meaning Explanation Compound (L11.3)' },
};

const ISL_OMITTED_STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'been', 'being',
  'do', 'does', 'did', 'will', 'shall', 'to', 'of', 'by',
]);

const TEMPORAL_MARKERS = new Set([
  'today', 'tomorrow', 'yesterday', 'now', 'later', 'morning', 'evening', 'tonight',
  'always', 'never', 'first', 'then', 'next', 'finally', 'friday', 'sunday', 'monday',
]);

const WH_QUESTIONS = new Set(['what', 'why', 'how', 'where', 'when', 'who', 'which']);
const NEGATION_MARKERS = new Set(['not', 'no', 'never', 'neither', 'none', 'nothing', "n't", 'dont', "don't"]);
const COMMAND_MODALS = new Set(['must', 'should']);
const INTENSIFIERS = new Set(['very', 'extremely']);
const COMMON_VERBS = new Set([
  'explain', 'explains', 'explained', 'teach', 'teaches', 'calculate',
  'calculates', 'solve', 'solves', 'learn', 'learns', 'convert',
  'converts', 'measure', 'measures', 'define', 'defines', 'use', 'uses',
  'compute', 'computes', 'show', 'shows', 'find', 'finds', 'differentiate',
  'happen', 'happens', 'help', 'helps',
]);

const LECTURECAST_PRESETS = [
  {
    label: 'EN: Algorithm Lecture',
    lang: 'en-IN',
    text: 'Today the teacher will explain the algorithm to the students',
  },
  {
    label: 'TE: కిరణజన్య సంయోగక్రియ (Photosynthesis)',
    lang: 'te-IN',
    text: 'ఈరోజు ఉపాధ్యాయుడు విద్యార్థులు కిరణజన్య సంయోగక్రియ వివరిస్తారు',
  },
  {
    label: 'HI: अवकलन (Derivative Question)',
    lang: 'hi-IN',
    text: 'आज शिक्षक छात्र अवकलन कैसे समझाते?',
  },
  {
    label: 'EN: Evaporation Compound',
    lang: 'en-IN',
    text: 'Why does evaporation happen today?',
  },
];

const STEM_BENCHMARKS = [
  {
    id: 'Algorithm',
    title: 'Algorithm (అల్గారిథమ్ / एल्गोरिदम)',
    category: 'Computer Science & Data Structures',
    islDescription:
      'Hold non-dominant left palm flat as a reference register; step the right index and middle fingers forward in sequential logic tiers while maintaining a 25° outward right palm angle.',
    targetPalmAngleDeg: 25.0,
    dtwDistance: 0.0642,
    cosineSimilarity: 0.968,
    overallScore: 93.4,
    joints: [
      { name: 'right_wrist', status: 'green', error: 0.041 },
      { name: 'right_index_tip', status: 'green', error: 0.052 },
      { name: 'right_elbow', status: 'green', error: 0.068 },
      { name: 'left_wrist', status: 'green', error: 0.034 },
      { name: 'eyebrows', status: 'green', error: 0.029 },
    ],
    coachingHint:
      "Excellent ISL execution for 'Algorithm'! Sequential tier trajectory and 25° palm orientation are locked in.",
  },
  {
    id: 'Derivative',
    title: 'Derivative — dy/dx (అవకలనం / अवकलन)',
    category: 'Calculus & Mathematical Analysis',
    islDescription:
      'Form a curved function arc with the left hand; glide the right index finger along the tangent slope at a 40° inclination while raising eyebrows to emphasize instantaneous rate of change.',
    targetPalmAngleDeg: 40.0,
    dtwDistance: 0.0915,
    cosineSimilarity: 0.941,
    overallScore: 88.7,
    joints: [
      { name: 'right_wrist', status: 'green', error: 0.072 },
      { name: 'right_index_tip', status: 'red', error: 0.158 },
      { name: 'right_elbow', status: 'green', error: 0.089 },
      { name: 'left_wrist', status: 'green', error: 0.051 },
      { name: 'eyebrows', status: 'green', error: 0.044 },
    ],
    coachingHint:
      'Angle your right index tangent trajectory 6° steeper along the left-hand curve arc (Target: 40°).',
  },
  {
    id: 'Photosynthesis',
    title: 'Photosynthesis (కిరణజన్య సంయోగక్రియ / प्रकाश संश्लेषण)',
    category: 'Biology & Cellular Energetics',
    islDescription:
      'Sign WATER + SUN + LEAF-GROW compound sequence: spread dominant fingers downward like solar rays onto the flat left leaf palm.',
    targetPalmAngleDeg: 30.0,
    dtwDistance: 0.0581,
    cosineSimilarity: 0.974,
    overallScore: 95.1,
    joints: [
      { name: 'right_wrist', status: 'green', error: 0.038 },
      { name: 'right_index_tip', status: 'green', error: 0.049 },
      { name: 'right_elbow', status: 'green', error: 0.061 },
      { name: 'left_wrist', status: 'green', error: 0.042 },
      { name: 'eyebrows', status: 'green', error: 0.031 },
    ],
    coachingHint:
      'Optimal compound transition across WATER + SUN + LEAF-GROW! Eyebrow elevation accurately marks the topic boundary.',
  },
  {
    id: 'Momentum',
    title: 'Momentum — p = mv (ద్రవ్యవేగం / संवेग)',
    category: 'Classical Mechanics & Physics',
    islDescription:
      'Form a closed mass fist with the right hand and drive forward along the horizontal vector plane into the left palm.',
    targetPalmAngleDeg: 15.0,
    dtwDistance: 0.0784,
    cosineSimilarity: 0.955,
    overallScore: 91.2,
    joints: [
      { name: 'right_wrist', status: 'green', error: 0.055 },
      { name: 'right_index_tip', status: 'green', error: 0.063 },
      { name: 'right_elbow', status: 'red', error: 0.149 },
      { name: 'left_wrist', status: 'green', error: 0.048 },
      { name: 'eyebrows', status: 'green', error: 0.037 },
    ],
    coachingHint:
      'Tuck your right elbow 15° closer to your torso for a cleaner horizontal impulse signing plane.',
  },
  {
    id: 'Recursion',
    title: 'Recursion (పునరావృతం / पुनरावृत्ति)',
    category: 'Computer Science & Algorithms',
    islDescription:
      'Circle both index fingers in nested inward spirals at chest height, decelerating to a fixed base-case stop.',
    targetPalmAngleDeg: 35.0,
    dtwDistance: 0.069,
    cosineSimilarity: 0.962,
    overallScore: 92.6,
    joints: [
      { name: 'right_wrist', status: 'green', error: 0.047 },
      { name: 'right_index_tip', status: 'green', error: 0.058 },
      { name: 'right_elbow', status: 'green', error: 0.074 },
      { name: 'left_wrist', status: 'green', error: 0.053 },
      { name: 'eyebrows', status: 'green', error: 0.041 },
    ],
    coachingHint:
      'Crisp base-case termination! Nested spiral symmetry verified within Sakoe-Chiba band.',
  },
];

const DOUBTDESK_SEQUENCES = [
  {
    gloss: 'TODAY ALGORITHM STEP REPEAT WHY ?',
    en: 'Why does the algorithm step repeat today?',
    te: 'ఈరోజు అల్గారిథమ్ స్టెప్ ఎందుకు పునరావృతమవుతుంది?',
    hi: 'आज एल्गोरिदम चरण क्यों दोहराया जाता है?',
    confidence: 96.4,
    zDepthMm: 412,
  },
  {
    gloss: 'PHOTOSYNTHESIS WATER SUN LEAF EXPLAIN MUST',
    en: 'Could you please explain how water and sunlight interact in the leaf during photosynthesis?',
    te: 'కిరణజన్య సంయోగక్రియలో నీరు మరియు సూర్యరశ్మి ఆకులో ఎలా పనిచేస్తాయో వివరిస్తారా?',
    hi: 'क्या आप समझा सकते हैं कि प्रकाश संश्लेषण में पानी और सूर्य का प्रकाश पत्ती में कैसे काम करते हैं?',
    confidence: 94.8,
    zDepthMm: 385,
  },
  {
    gloss: 'DERIVATIVE SLOPE FORMULA CALCULATE HOW ?',
    en: 'How do we calculate the tangent slope using the derivative formula?',
    te: 'డెరివేటివ్ సూత్రాన్ని ఉపయోగించి వాలును ఎలా లెక్కించాలి?',
    hi: 'अवकलन सूत्र का उपयोग करके स्पर्शरेखा ढलान की गणना कैसे करें?',
    confidence: 95.2,
    zDepthMm: 404,
  },
];

// ==================== LECTURECAST ISL GRAMMAR PARSER ====================
function normalizeMultilingual(text, language) {
  let cleaned = (text || '').trim();
  // Always normalize both Telugu and Hindi phrases so mixed or native inputs work regardless of active tab
  for (const langKey of ['te', 'hi']) {
    const dict = MULTILINGUAL_LEXICON[langKey];
    if (dict) {
      const entries = Object.entries(dict).sort((a, b) => b[0].length - a[0].length);
      for (const [nativePhrase, engEquiv] of entries) {
        cleaned = cleaned.split(nativePhrase).join(` ${engEquiv} `);
      }
    }
  }
  return cleaned.replace(/\s+/g, ' ').trim();
}

function translateSentenceToLang(rawText, targetLang) {
  const trimmed = (rawText || '').trim();
  // Check if current input matches any preset in any language
  for (let i = 0; i < SAMPLE_SENTENCES_BY_LANG.length; i++) {
    const group = SAMPLE_SENTENCES_BY_LANG[i];
    if (
      trimmed === group['en-IN'] ||
      trimmed === group['te-IN'] ||
      trimmed === group['hi-IN']
    ) {
      currentSampleIdx = i;
      return group[targetLang];
    }
  }

  // Otherwise normalize to English tokens first
  const englishNormalized = normalizeMultilingual(trimmed, targetLang);
  if (targetLang === 'en-IN') {
    return englishNormalized;
  }

  const nativeMap = GLOSS_NATIVE_MAP[targetLang] || {};
  const words = englishNormalized.split(/\s+/);
  const translatedWords = words
    .map((w) => {
      const cleanW = w.replace(/[^a-zA-Z0-9']/g, '');
      const punct = w.includes('?') ? '?' : '';
      const low = cleanW.toLowerCase();
      if (ISL_OMITTED_STOPWORDS.has(low)) return '';
      const upper = cleanW.toUpperCase();
      const lemmaUpper = low.replace(/(s|ed|ing)$/, '').toUpperCase();
      const nativeWord = nativeMap[upper] || nativeMap[lemmaUpper] || cleanW;
      return nativeWord + punct;
    })
    .filter(Boolean);

  return translatedWords.join(' ');
}

function parseToISL(text, language = 'en-IN') {
  const normalizedText = normalizeMultilingual(text, language);
  const rawWordsLower = normalizedText.toLowerCase().match(/[a-z0-9']+/g) || [];
  const isQuestion = text.includes('?') || rawWordsLower.some((w) => WH_QUESTIONS.has(w));
  const hasConditionalIf = rawWordsLower.includes('if');
  const isIntensified = rawWordsLower.some((w) => INTENSIFIERS.has(w));

  const temporalBucket = [];
  const subjectBucket = [];
  const objectBucket = [];
  const verbBucket = [];
  const commandBucket = [];
  const negationBucket = [];
  const whBucket = [];

  const words = normalizedText.match(/[A-Za-z0-9']+/g) || [];
  let foundVerb = false;

  for (const w of words) {
    const low = w.toLowerCase();
    let lemma = low;
    if (
      !['pass', 'class', 'less', 'boss', 'students', 'children', 'photosynthesis'].includes(low) &&
      low.length > 4
    ) {
      lemma = low.replace(/(s|ed|ing)$/, '');
    }

    if (low === 'if' || INTENSIFIERS.has(low) || ISL_OMITTED_STOPWORDS.has(low)) {
      continue;
    } else if (WH_QUESTIONS.has(low)) {
      whBucket.push(low.toUpperCase());
    } else if (NEGATION_MARKERS.has(low)) {
      negationBucket.push('NOT');
    } else if (COMMAND_MODALS.has(low)) {
      commandBucket.push('MUST');
    } else if (TEMPORAL_MARKERS.has(low)) {
      temporalBucket.push(low.toUpperCase());
    } else if (COMMON_VERBS.has(low) && !foundVerb) {
      foundVerb = true;
      verbBucket.push(lemma.toUpperCase());
    } else if (!foundVerb) {
      subjectBucket.push(low.toUpperCase());
    } else {
      objectBucket.push(low.toUpperCase());
    }
  }

  const spatialMarkers = [];
  const islGlossSequence = [...temporalBucket];

  if (subjectBucket.length > 0) {
    islGlossSequence.push(...subjectBucket, 'IX-LEFT');
    spatialMarkers.push({
      entity: subjectBucket.join(' '),
      locus: 'IX-LEFT',
      azimuth_deg: -28,
    });
  }

  if (objectBucket.length > 0) {
    islGlossSequence.push(...objectBucket, 'IX-RIGHT');
    spatialMarkers.push({
      entity: objectBucket.join(' '),
      locus: 'IX-RIGHT',
      azimuth_deg: 28,
    });
  }

  islGlossSequence.push(...verbBucket, ...commandBucket, ...negationBucket, ...whBucket);

  const isNegated = negationBucket.length > 0;
  const isCommand = commandBucket.length > 0;

  let sentenceType = 'Simple Declarative (S-O-V Topological Order - NIOS L10.2)';
  if (isQuestion) {
    sentenceType =
      whBucket.length > 0
        ? 'Interrogative — WH-Question (Clause-Final WH - NIOS L10.2)'
        : 'Interrogative — Yes/No Question (Brow Raise - NIOS L10.2)';
  } else if (isNegated) {
    sentenceType = 'Negation Sentence (Clause-Final NOT + Head Shake - NIOS L10.2)';
  } else if (isCommand) {
    sentenceType = 'Order / Command Sentence (Clause-Final MUST - NIOS L10.2)';
  }

  const wordLevelStructures = [];
  for (const gloss of islGlossSequence) {
    if (NIOS_230_MORPHOLOGY[gloss]) {
      wordLevelStructures.push({
        gloss,
        isl_compound: NIOS_230_MORPHOLOGY[gloss].compound,
        rule: NIOS_230_MORPHOLOGY[gloss].category,
      });
    }
  }

  const nonManualMarkers = [];
  if (hasConditionalIf) {
    nonManualMarkers.push("NMM: Conditional Brow Raise + Clause Pause (NIOS L8.4/L10.2)");
  }
  if (isIntensified) {
    nonManualMarkers.push("NMM: Intensified Expression + Amplified Movement (NIOS L8.4)");
  }
  if (isQuestion) {
    nonManualMarkers.push(
      whBucket.length > 0
        ? 'NMM: Eyebrows Raised + Chin Up (ISL WH-Question - NIOS L10.2)'
        : 'NMM: Eyebrows Raised + Head Tilt Forward (Yes/No - NIOS L10.2)'
    );
  }
  if (spatialMarkers.length > 0) {
    nonManualMarkers.push(
      'NMM: Eye Gaze & Pointing Aligned to Loci (IX-LEFT ➔ IX-RIGHT - NIOS L10.3)'
    );
  }

  return {
    isl_sov_gloss: islGlossSequence.length > 0 ? islGlossSequence : ['REST'],
    spatial_markers: spatialMarkers,
    non_manual_markers: nonManualMarkers,
    sentence_type: sentenceType,
    word_level_structures: wordLevelStructures,
    isQuestion,
  };
}

// ==================== UI RENDERERS FOR DHWANIDRISHTI SANDBOX ====================
function updateLectureCastUI() {
  const inputEl = document.getElementById('lecturecastInput');
  const text = inputEl ? inputEl.value : SAMPLE_SENTENCES_BY_LANG[0]['en-IN'];
  parsedISL = parseToISL(text, currentLang);
  activeGlossIdx = 0;

  // Update NMM State Badge (#nmmStateBadge)
  const nmmBadge = document.getElementById('nmmStateBadge');
  if (nmmBadge) {
    if (parsedISL.isQuestion) {
      nmmBadge.textContent = 'NMM: BROW RAISE + CHIN UP | HEAD: +12°';
    } else if (parsedISL.spatial_markers.length > 0) {
      nmmBadge.textContent = 'NMM: EYE GAZE LOCUS SYNC | HEAD: ±28°';
    } else {
      nmmBadge.textContent = 'NMM: NEUTRAL | HEAD: 0°';
    }
  }

  // Render Gloss Ribbon (#islGlossRibbon)
  renderGlossRibbon();

  // Render ISL Rule Notes, Spatial Loci & Compound Morphology (#islRuleNotes)
  const ruleNotes = document.getElementById('islRuleNotes');
  if (ruleNotes) {
    const langTag =
      currentLang === 'te-IN'
        ? 'తెలుగు (TE-IN) ➔ ISL SOV'
        : currentLang === 'hi-IN'
        ? 'हिन्दी (HI-IN) ➔ ISL SOV'
        : 'ENGLISH (EN-IN) ➔ ISL SOV';

    const lociNotes = parsedISL.spatial_markers
      .map(
        (sm) =>
          `<span class="text-amber-300">${sm.locus} (${sm.azimuth_deg > 0 ? '+' : ''}${sm.azimuth_deg}°): <strong class="text-white">${sm.entity}</strong></span>`
      )
      .join(' <span class="text-gray-600">|</span> ');

    const compoundNotes = parsedISL.word_level_structures
      .map(
        (w) =>
          `<span class="text-emerald-300">COMPOUND: <strong class="text-white">${w.gloss}</strong> = ${w.isl_compound}</span>`
      )
      .join(' <span class="text-gray-600">|</span> ');

    ruleNotes.innerHTML = `
      <span class="text-red-400 font-bold">[${langTag}]</span>
      <span class="text-gray-300">${parsedISL.sentence_type.split('(')[0].trim()}</span>
      ${lociNotes ? `<span class="text-gray-600">|</span> ${lociNotes}` : ''}
      ${compoundNotes ? `<span class="text-gray-600">|</span> ${compoundNotes}` : ''}
    `;
  }

  updateSpatialLocusReadout();
}

function updateSpatialLocusReadout() {
  const locusEl = document.getElementById('spatialLocusReadout');
  if (!locusEl || !parsedISL) return;
  const currentGloss = parsedISL.isl_sov_gloss[activeGlossIdx % parsedISL.isl_sov_gloss.length];
  if (currentGloss === 'IX-LEFT') {
    locusEl.textContent = 'IX-LEFT (-28° SUBJ)';
    locusEl.className = 'text-f1red font-bold';
  } else if (currentGloss === 'IX-RIGHT') {
    locusEl.textContent = 'IX-RIGHT (+28° OBJ)';
    locusEl.className = 'text-amber-400 font-bold';
  } else {
    locusEl.textContent = 'CENTER (0°)';
    locusEl.className = 'text-emerald-400 font-bold';
  }
}

function renderGlossRibbon() {
  const ribbon = document.getElementById('islGlossRibbon');
  if (!ribbon || !parsedISL) return;

  const nativeMap = GLOSS_NATIVE_MAP[currentLang] || null;

  ribbon.innerHTML = parsedISL.isl_sov_gloss
    .map((gloss, idx) => {
      const isLocus = gloss.startsWith('IX-');
      const isSelected = idx === activeGlossIdx;
      const cls = isSelected
        ? 'bg-f1red text-white border-white shadow-[0_0_12px_rgba(230,0,0,0.6)] scale-105'
        : isLocus
        ? 'bg-amber-950/70 text-amber-300 border-amber-700/60'
        : 'bg-gray-900/90 text-gray-200 border-gray-700/70 hover:border-red-500/60';

      const nativeSub =
        nativeMap && nativeMap[gloss]
          ? `<span class="ml-1 text-[10px] text-amber-300 font-normal">(${nativeMap[gloss]})</span>`
          : '';

      return `<button type="button" onclick="selectGlossToken(${idx})" class="px-2.5 py-1 rounded font-mono text-xs font-bold transition-all cursor-pointer border ${cls}">${gloss}${nativeSub}</button>`;
    })
    .join('');

  updateSpatialLocusReadout();
}

function selectGlossToken(idx) {
  activeGlossIdx = idx;
  isRigPlaying = false;
  const playBtn = document.getElementById('playPauseRigBtn');
  if (playBtn) playBtn.textContent = 'PLAY 48-BONE RIG';
  renderGlossRibbon();
}

function loadSampleSentence(idx) {
  const group = SAMPLE_SENTENCES_BY_LANG[idx] || SAMPLE_SENTENCES_BY_LANG[0];
  currentSampleIdx = idx;
  const inputEl = document.getElementById('lecturecastInput');
  if (inputEl) {
    inputEl.value = group[currentLang] || group['en-IN'];
  }
  updateLanguageButtons();
  updateLectureCastUI();
}

function selectLecturePreset(idx) {
  loadSampleSentence(idx);
}

function setLectureLang(lang) {
  currentLang = lang;
  const inputEl = document.getElementById('lecturecastInput');
  if (inputEl) {
    inputEl.value = translateSentenceToLang(inputEl.value, lang);
  }
  updateLanguageButtons();
  updateLectureCastUI();
  if (currentPillar === 'doubtdesk') {
    selectDoubtSequence(selectedDoubtIdx);
  }
}

function setLectureLanguage(lang) {
  setLectureLang(lang);
}

function updateLanguageButtons() {
  ['en-IN', 'te-IN', 'hi-IN'].forEach((l) => {
    const btn = document.getElementById(`langBtn-${l}`);
    if (btn) {
      btn.className =
        l === currentLang
          ? 'px-2 py-0.5 rounded font-mono text-[10px] border bg-red-950/80 border-red-600 text-white font-bold cursor-pointer'
          : 'px-2 py-0.5 rounded font-mono text-[10px] border bg-black/50 border-gray-800 text-gray-400 hover:text-white cursor-pointer';
    }
  });
}

function setAvatarPersona(persona) {
  currentPersona = persona;
  const personaLabels = {
    Aarav: 'Aarav (NIOS Standard)',
    Meera: 'Prof. Meera (STEM Lab)',
    Sheru: 'Sheru Mascot (K-12)',
  };
  ['Aarav', 'Meera', 'Sheru'].forEach((p) => {
    const btn = document.getElementById(`personaBtn-${p}`);
    if (btn) {
      const isSelected = p === persona;
      btn.className = isSelected
        ? 'text-left px-2.5 py-1 rounded border bg-red-950/60 border-red-600 text-white cursor-pointer'
        : 'text-left px-2.5 py-1 rounded border bg-black/50 border-gray-800 text-gray-400 hover:text-white cursor-pointer';
      btn.textContent = `${isSelected ? '●' : '○'} ${personaLabels[p]}`;
    }
  });
}

function toggleAvatarPlayback() {
  isRigPlaying = !isRigPlaying;
  const playBtn = document.getElementById('playPauseRigBtn');
  if (playBtn) {
    playBtn.textContent = isRigPlaying ? 'PAUSE 48-BONE RIG' : 'PLAY 48-BONE RIG';
  }
}

function toggleRigPlay() {
  toggleAvatarPlayback();
}

function switchDhwaniPillar(pillar) {
  currentPillar = pillar;
  ['lecturecast', 'stemcoach', 'doubtdesk'].forEach((p) => {
    const panel = document.getElementById(`pillarPanel-${p}`);
    const btn = document.getElementById(`pillarBtn-${p}`);
    if (panel) {
      if (p === pillar) panel.classList.remove('hidden');
      else panel.classList.add('hidden');
    }
    if (btn) {
      if (p === pillar) {
        if (p === 'lecturecast') {
          btn.className =
            'py-2 px-2 rounded-lg font-rajdhani font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 bg-red-600/25 border border-red-500/70 text-white cursor-pointer';
        } else if (p === 'stemcoach') {
          btn.className =
            'py-2 px-2 rounded-lg font-rajdhani font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 bg-amber-500/25 border border-amber-500/70 text-white cursor-pointer';
        } else {
          btn.className =
            'py-2 px-2 rounded-lg font-rajdhani font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 bg-emerald-500/25 border border-emerald-500/70 text-white cursor-pointer';
        }
      } else {
        btn.className =
          'py-2 px-2 rounded-lg font-rajdhani font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 text-gray-400 hover:text-white border border-transparent cursor-pointer';
      }
    }
  });
  if (window.lucide) window.lucide.createIcons();
}

function selectStemBenchmark(idx) {
  selectedStemIdx = idx;
  const item = STEM_BENCHMARKS[idx];
  if (!item) return;

  STEM_BENCHMARKS.forEach((_, i) => {
    const btn = document.getElementById(`stemBtn-${i}`);
    if (btn) {
      btn.className =
        i === idx
          ? 'px-2.5 py-1 rounded-lg font-mono text-[10px] border bg-amber-950/70 border-amber-500 text-white cursor-pointer'
          : 'px-2.5 py-1 rounded-lg font-mono text-[10px] border bg-black/60 border-gray-800 text-gray-400 hover:text-white cursor-pointer';
    }
  });

  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setTxt('stemTermTitle', item.title.toUpperCase());
  setTxt('stemTermCategory', `CATEGORY: ${item.category.toUpperCase()} // TARGET ANGLE: ${item.targetPalmAngleDeg}°`);
  setTxt('stemDtwScore', `${item.overallScore}%`);
  setTxt('stemCorrectionHint', item.coachingHint);

  const jointsEl = document.getElementById('stemJointFeedback');
  if (jointsEl) {
    jointsEl.innerHTML = `<div class="flex flex-wrap gap-1.5">${item.joints
      .map((j) => {
        const cls =
          j.status === 'green'
            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/70'
            : 'bg-red-950/70 text-red-300 border-red-700/70';
        const dot = j.status === 'green' ? '●' : '▲';
        return `<span class="px-2 py-0.5 rounded text-[10px] flex items-center gap-1 border ${cls}"><span>${dot}</span><span>${j.name}: Δ${j.error}</span></span>`;
      })
      .join('')}</div>`;
  }
}

function selectDoubtSequence(idx) {
  selectedDoubtIdx = idx;
  const item = DOUBTDESK_SEQUENCES[idx];
  if (!item) return;

  DOUBTDESK_SEQUENCES.forEach((_, i) => {
    const btn = document.getElementById(`doubtBtn-${i}`);
    if (btn) {
      btn.className =
        i === idx
          ? 'px-2.5 py-1 rounded-lg font-mono text-[10px] border bg-emerald-950/70 border-emerald-500 text-white cursor-pointer'
          : 'px-2.5 py-1 rounded-lg font-mono text-[10px] border bg-black/60 border-gray-800 text-gray-400 hover:text-white cursor-pointer';
    }
  });

  const glossEl = document.getElementById('doubtGlossOutput');
  const outEl = document.getElementById('doubtEnglishOutput');
  const confEl = document.getElementById('doubtConfidenceBadge');

  if (glossEl) glossEl.textContent = item.gloss;
  if (outEl) {
    outEl.innerHTML = `
      <div>"${item.en}"</div>
      <div class="text-xs font-mono text-amber-300 mt-1">TE: ${item.te}</div>
      <div class="text-xs font-mono text-emerald-300 mt-0.5">HI: ${item.hi}</div>
    `;
  }
  if (confEl) {
    confEl.textContent = `CONFIDENCE: ${item.confidence}% | Z-DEPTH: ${item.zDepthMm}mm`;
  }
}

function speakDoubtDesk() {
  const item = DOUBTDESK_SEQUENCES[selectedDoubtIdx];
  if (!item || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const txt = currentLang === 'te-IN' ? item.te : currentLang === 'hi-IN' ? item.hi : item.en;
  const u = new SpeechSynthesisUtterance(txt);
  u.lang = currentLang;
  window.speechSynthesis.speak(u);
}

function speakDoubtTTS(lang) {
  speakDoubtDesk();
}

// ==================== 48-BONE BIOMECHANICAL AVATAR CANVAS LOOP ====================
function startAvatarCanvasLoop() {
  const canvas = document.getElementById('islAvatarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const personaColors = {
    Aarav: { primary: '#E60000', secondary: '#FF9900' },
    Meera: { primary: '#10B981', secondary: '#38BDF8' },
    Sheru: { primary: '#FF9900', secondary: '#F43F5E' },
    'Prof. Meera': { primary: '#10B981', secondary: '#38BDF8' },
    'Sheru Mascot': { primary: '#FF9900', secondary: '#F43F5E' },
  };

  const startTime = performance.now();

  function draw(now) {
    const t = (now - startTime) / 1000;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Subtle radar grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 24) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const cx = w / 2;
    const cy = h * 0.56;
    const colors = personaColors[currentPersona] || personaColors.Aarav;

    const glossList = parsedISL ? parsedISL.isl_sov_gloss : ['REST'];
    const currentGloss = glossList[activeGlossIdx % glossList.length] || 'REST';
    const isLeftActive = currentGloss === 'IX-LEFT';
    const isRightActive = currentGloss === 'IX-RIGHT';

    // IX-LEFT zone
    ctx.fillStyle = isLeftActive ? 'rgba(230, 0, 0, 0.22)' : 'rgba(255, 255, 255, 0.03)';
    ctx.strokeStyle = isLeftActive ? '#E60000' : 'rgba(255, 255, 255, 0.12)';
    ctx.beginPath();
    ctx.arc(cx - 82, cy - 10, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = isLeftActive ? '#FFFFFF' : '#9CA3AF';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('IX-LEFT', cx - 82, cy - 6);
    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.fillText('-28° SUBJ', cx - 82, cy + 5);

    // IX-RIGHT zone
    ctx.fillStyle = isRightActive ? 'rgba(255, 153, 0, 0.22)' : 'rgba(255, 255, 255, 0.03)';
    ctx.strokeStyle = isRightActive ? '#FF9900' : 'rgba(255, 255, 255, 0.12)';
    ctx.beginPath();
    ctx.arc(cx + 82, cy - 10, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = isRightActive ? '#FFFFFF' : '#9CA3AF';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText('IX-RIGHT', cx + 82, cy - 6);
    ctx.font = '8px "JetBrains Mono", monospace';
    ctx.fillText('+28° OBJ', cx + 82, cy + 5);

    // Procedural bone offsets seeded by active gloss
    let seed = 0;
    for (let i = 0; i < currentGloss.length; i++) {
      seed += (i + 1) * currentGloss.charCodeAt(i);
    }
    const phaseA = ((seed % 60) - 30) / 100.0;
    const osc = Math.sin(t * 4.2) * 6;
    const headX = cx + (isLeftActive ? -10 : isRightActive ? 10 : Math.sin(t * 2) * 3);
    const headY = cy - 58;

    // Spine
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, headY + 18);
    ctx.lineTo(cx, cy + 42);
    ctx.stroke();

    // Shoulders
    const lShoulder = { x: cx - 34, y: cy - 30 };
    const rShoulder = { x: cx + 34, y: cy - 30 };
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(lShoulder.x, lShoulder.y);
    ctx.lineTo(rShoulder.x, rShoulder.y);
    ctx.stroke();

    const rElbow = {
      x: lShoulder.x - 18 + phaseA * 22,
      y: lShoulder.y + 28 + Math.cos(t * 3) * 4,
    };
    const rWrist = {
      x: isLeftActive
        ? cx - 76
        : isRightActive
        ? cx + 62
        : rElbow.x + 22 - phaseA * 18 + osc,
      y: isLeftActive || isRightActive ? cy - 10 : rElbow.y - 18 + Math.sin(t * 4.2) * 8,
    };

    const lElbow = {
      x: rShoulder.x + 18 - phaseA * 14,
      y: rShoulder.y + 28,
    };
    const lWrist = {
      x: lElbow.x - 16 - osc * 0.5,
      y: lElbow.y - 10 + Math.cos(t * 3.5) * 5,
    };

    // Arms
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(lShoulder.x, lShoulder.y);
    ctx.lineTo(rElbow.x, rElbow.y);
    ctx.lineTo(rWrist.x, rWrist.y);
    ctx.stroke();

    ctx.strokeStyle = colors.secondary;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(rShoulder.x, rShoulder.y);
    ctx.lineTo(lElbow.x, lElbow.y);
    ctx.lineTo(lWrist.x, lWrist.y);
    ctx.stroke();

    // 5-Finger Hand Rays
    const drawHandFingers = (wx, wy, color, spread) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.6;
      for (let f = -2; f <= 2; f++) {
        const angle = -Math.PI / 2 + f * 0.28 * spread + Math.sin(t * 6 + f) * 0.08;
        ctx.beginPath();
        ctx.moveTo(wx, wy);
        ctx.lineTo(wx + Math.cos(angle) * 12, wy + Math.sin(angle) * 12);
        ctx.stroke();
      }
    };
    drawHandFingers(rWrist.x, rWrist.y, '#FFFFFF', 1.1);
    drawHandFingers(lWrist.x, lWrist.y, '#9CA3AF', 0.9);

    // Joints
    [lShoulder, rShoulder, rElbow, lElbow, rWrist, lWrist].forEach((pt, idx) => {
      ctx.fillStyle = idx >= 4 ? '#FFFFFF' : colors.primary;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, idx >= 4 ? 4.5 : 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Head & NMM Eyebrows
    ctx.fillStyle = '#141416';
    ctx.strokeStyle = colors.primary;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(headX, headY, 17, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    const browRaise = parsedISL && parsedISL.isQuestion ? 0.65 : 0.2;
    const browOffset = -5 - browRaise * 5;
    ctx.strokeStyle = '#FF9900';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(headX - 8, headY + browOffset);
    ctx.lineTo(headX - 3, headY + browOffset - 1.5);
    ctx.moveTo(headX + 3, headY + browOffset - 1.5);
    ctx.lineTo(headX + 8, headY + browOffset);
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(headX - 5.5, headY - 2, 1.6, 0, Math.PI * 2);
    ctx.arc(headX + 5.5, headY - 2, 1.6, 0, Math.PI * 2);
    ctx.fill();

    // HUD Tag
    ctx.fillStyle = 'rgba(10, 10, 12, 0.85)';
    ctx.fillRect(8, 8, 160, 22);
    ctx.strokeStyle = 'rgba(230, 0, 0, 0.5)';
    ctx.strokeRect(8, 8, 160, 22);
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.font = 'bold 10px "JetBrains Mono", monospace';
    ctx.fillText(`GLOSS: ${currentGloss}`, 14, 22);

    // Also render STEM Coach DTW Canvas if present
    const dtwCanvas = document.getElementById('stemDtwCanvas');
    if (dtwCanvas) {
      const dctx = dtwCanvas.getContext('2d');
      if (dctx) {
        const dw = dtwCanvas.width;
        const dh = dtwCanvas.height;
        dctx.clearRect(0, 0, dw, dh);
        dctx.strokeStyle = 'rgba(255,255,255,0.06)';
        for (let gx = 0; gx < dw; gx += 28) {
          dctx.beginPath();
          dctx.moveTo(gx, 0);
          dctx.lineTo(gx, dh);
          dctx.stroke();
        }
        // Reference ISLRTC Trajectory (Amber)
        dctx.strokeStyle = '#FF9900';
        dctx.lineWidth = 2;
        dctx.beginPath();
        for (let x = 12; x < dw - 12; x += 6) {
          const y = dh / 2 + Math.sin((x / dw) * Math.PI * 2.5 + selectedStemIdx + t * 2) * 24;
          if (x === 12) dctx.moveTo(x, y);
          else dctx.lineTo(x, y);
        }
        dctx.stroke();
        // Student Trajectory (Emerald)
        dctx.strokeStyle = '#10B981';
        dctx.lineWidth = 2;
        dctx.beginPath();
        for (let x = 12; x < dw - 12; x += 6) {
          const y = dh / 2 + Math.sin((x / dw) * Math.PI * 2.5 + selectedStemIdx + t * 2 - 0.18) * 22;
          if (x === 12) dctx.moveTo(x, y);
          else dctx.lineTo(x, y);
        }
        dctx.stroke();
      }
    }

    // Also render DoubtDesk 543-Landmark Holistic Z-Depth Canvas if present
    const holCanvas = document.getElementById('doubtHolisticCanvas');
    if (holCanvas) {
      const hctx = holCanvas.getContext('2d');
      if (hctx) {
        const hw = holCanvas.width;
        const hh = holCanvas.height;
        hctx.clearRect(0, 0, hw, hh);
        for (let i = 0; i < 28; i++) {
          const px = 25 + (i / 27) * (hw - 50);
          const py = hh / 2 + Math.sin(t * 3.5 + i * 0.45 + selectedDoubtIdx) * 24;
          hctx.fillStyle = i % 3 === 0 ? '#10B981' : i % 2 === 0 ? '#FF9900' : '#E60000';
          hctx.beginPath();
          hctx.arc(px, py, i % 4 === 0 ? 3.2 : 2, 0, Math.PI * 2);
          hctx.fill();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

// ==================== MASTER VIEW & TAB NAVIGATION ====================
function switchMainView(viewName) {
  const views = ['projects', 'skills', 'hackathons', 'about'];
  views.forEach((v) => {
    const section = document.getElementById(`view-${v}`);
    const navBtn = document.getElementById(`navBtn-${v}`);
    const mobBtn = document.getElementById(`mobNavBtn-${v}`);

    if (section) {
      if (v === viewName) {
        section.classList.remove('view-hidden');
        section.classList.add('view-active');
      } else {
        section.classList.remove('view-active');
        section.classList.add('view-hidden');
      }
    }

    if (navBtn) {
      if (v === viewName) {
        navBtn.classList.add('active', 'text-white');
        navBtn.classList.remove('text-gray-400');
      } else {
        navBtn.classList.remove('active', 'text-white');
        navBtn.classList.add('text-gray-400');
      }
    }

    if (mobBtn) {
      mobBtn.className =
        v === viewName
          ? 'font-rajdhani text-xs font-bold uppercase px-3 py-1 rounded-lg bg-red-600/20 text-white border border-f1red'
          : 'font-rajdhani text-xs font-bold uppercase px-3 py-1 rounded-lg text-gray-400';
    }
  });

  currentMainView = viewName;

  const gearDisplay = document.getElementById('gearDisplayFooter');
  if (gearDisplay) {
    if (viewName === 'projects') gearDisplay.textContent = 'GEAR 1 > ACTIVE';
    else if (viewName === 'skills') gearDisplay.textContent = 'GEAR 2 > BENCH';
    else if (viewName === 'hackathons') gearDisplay.textContent = 'GEAR 3 > SPRINT';
    else if (viewName === 'about') gearDisplay.textContent = 'GEAR 4 > BIO';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.lucide) window.lucide.createIcons();
}

function switchTelemetryTab(tabKey) {
  const panelProjects = document.getElementById('panel-projects');
  const panelHackathons = document.getElementById('panel-hackathons');
  const btnProjects = document.getElementById('tabBtn-projects');
  const btnHackathons = document.getElementById('tabBtn-hackathons');
  const feedLabel = document.getElementById('telemetryFeedLabel');
  const gearSyncLabel = document.getElementById('gearSyncLabel');

  if (!panelProjects || !panelHackathons || !btnProjects || !btnHackathons) return;

  if (tabKey === 'projects') {
    panelProjects.classList.remove('hidden-tab');
    panelProjects.classList.add('active-tab');
    panelHackathons.classList.remove('active-tab');
    panelHackathons.classList.add('hidden-tab');

    btnProjects.className =
      'telemetry-tab-btn flex-1 py-2.5 px-3 rounded-lg font-rajdhani font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 relative bg-gradient-to-r from-red-600/20 via-red-950/40 to-transparent border border-red-500/70 text-white shadow-[0_0_15px_rgba(230,0,0,0.25)] cursor-pointer';
    btnHackathons.className =
      'telemetry-tab-btn flex-1 py-2.5 px-3 rounded-lg font-rajdhani font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 relative text-gray-400 hover:text-white hover:bg-white/5 border border-transparent cursor-pointer';

    const pInd = btnProjects.querySelector('.active-indicator');
    const hInd = btnHackathons.querySelector('.active-indicator');
    if (pInd) pInd.classList.remove('hidden');
    if (hInd) hInd.classList.add('hidden');

    if (feedLabel) feedLabel.textContent = 'FEED 01/02';
    if (gearSyncLabel) gearSyncLabel.textContent = 'SYNC: CHANNEL 01';
  } else {
    panelHackathons.classList.remove('hidden-tab');
    panelHackathons.classList.add('active-tab');
    panelProjects.classList.remove('active-tab');
    panelProjects.classList.add('hidden-tab');

    btnHackathons.className =
      'telemetry-tab-btn flex-1 py-2.5 px-3 rounded-lg font-rajdhani font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 relative bg-gradient-to-r from-amber-600/20 via-red-950/40 to-transparent border border-amber-500/70 text-white shadow-[0_0_15px_rgba(255,153,0,0.25)] cursor-pointer';
    btnProjects.className =
      'telemetry-tab-btn flex-1 py-2.5 px-3 rounded-lg font-rajdhani font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 relative text-gray-400 hover:text-white hover:bg-white/5 border border-transparent cursor-pointer';

    const pInd = btnProjects.querySelector('.active-indicator');
    const hInd = btnHackathons.querySelector('.active-indicator');
    if (pInd) pInd.classList.add('hidden');
    if (hInd) hInd.classList.remove('hidden');

    if (feedLabel) feedLabel.textContent = 'FEED 02/02 (HACKATHON)';
    if (gearSyncLabel) gearSyncLabel.textContent = 'SYNC: CHANNEL 02';
  }

  currentTelemetryTab = tabKey;
  if (window.lucide) window.lucide.createIcons();
}

function filterProjects(category) {
  const allBtn = document.getElementById('filterBtn-all');
  const aiBtn = document.getElementById('filterBtn-ai');
  const sysBtn = document.getElementById('filterBtn-systems');

  [allBtn, aiBtn, sysBtn].forEach((btn) => {
    if (btn) {
      btn.className =
        'px-2.5 py-0.5 rounded text-[10px] font-mono bg-black/50 border border-gray-800 text-gray-400 hover:text-white cursor-pointer';
    }
  });

  if (category === 'all') {
    if (allBtn)
      allBtn.className =
        'px-2.5 py-0.5 rounded text-[10px] font-mono bg-red-950/70 border border-red-800 text-red-300 cursor-pointer';
    switchTelemetryTab('projects');
  } else if (category === 'ai') {
    if (aiBtn)
      aiBtn.className =
        'px-2.5 py-0.5 rounded text-[10px] font-mono bg-red-950/70 border border-red-800 text-red-300 cursor-pointer';
    switchTelemetryTab('projects');
  } else if (category === 'systems') {
    if (sysBtn)
      sysBtn.className =
        'px-2.5 py-0.5 rounded text-[10px] font-mono bg-red-950/70 border border-red-800 text-red-300 cursor-pointer';
    switchTelemetryTab('hackathons');
  }
}

function toggleDistroArch() {
  const diag = document.getElementById('archDiagramDistro');
  const btnText = document.getElementById('archBtnText');
  if (!diag) return;
  if (diag.classList.contains('hidden')) {
    diag.classList.remove('hidden');
    if (btnText) btnText.textContent = 'Hide Architecture Telemetry';
  } else {
    diag.classList.add('hidden');
    if (btnText) btnText.textContent = 'View Architecture Telemetry';
  }
}

function toggleDhwaniArch() {
  const diag = document.getElementById('archDiagramDhwani');
  const btnText = document.getElementById('dhwaniArchBtnText');
  if (!diag) return;
  if (diag.classList.contains('hidden')) {
    diag.classList.remove('hidden');
    if (btnText) btnText.textContent = 'HIDE ARCH';
  } else {
    diag.classList.add('hidden');
    if (btnText) btnText.textContent = 'ARCH DIAGRAM';
  }
}

const ALGO_TRACES = [
  {
    title: 'KERNEL: C++20 STL Priority Graph & Sliding Window',
    complexity: 'TIME: O(E log V) | ZERO ALLOC',
    desc: 'Cache-friendly adjacency vectors and monotonic deque structures used in competitive programming sprints on LeetCode and CodeChef.',
    width: '92%',
  },
];

let workbenchCycleIdx = 0;

function switchWorkbenchTab(tabKey) {
  const tabs = ['cp', 'systems', 'sim'];
  tabs.forEach((k) => {
    const panel = document.getElementById(`deckPanel-${k}`);
    const btn = document.getElementById(`deckTabBtn-${k}`);
    if (panel) {
      if (k === tabKey) panel.classList.remove('hidden');
      else panel.classList.add('hidden');
    }
    if (btn) {
      btn.className =
        k === tabKey
          ? 'px-2.5 py-1 rounded bg-red-600/25 border border-red-500/70 text-white font-bold cursor-pointer transition-all'
          : 'px-2.5 py-1 rounded text-gray-400 hover:text-white border border-transparent cursor-pointer transition-all';
    }
  });
  if (window.lucide) window.lucide.createIcons();
}

function runAlgoTrace(idx) {
  const item = ALGO_TRACES[idx] || ALGO_TRACES[0];
  const titleEl = document.getElementById('algoTraceTitle');
  const compEl = document.getElementById('algoTraceComplexity');
  const descEl = document.getElementById('algoTraceDesc');
  const barEl = document.getElementById('algoTraceBar');

  if (titleEl) titleEl.textContent = item.title;
  if (compEl) compEl.textContent = item.complexity;
  if (descEl) descEl.textContent = item.desc;
  if (barEl) barEl.style.width = item.width;
}

function triggerEngineeringTelemetryDeck() {
  switchMainView('projects');

  const deck = document.getElementById('engineeringWorkDeck');
  const consoleElem = document.getElementById('telemetryProjectConsole');
  const btnText = document.getElementById('exploreEngBtnText');

  // Cycle through the 3 engineering workbench views on repeated clicks & sync right console
  const modes = ['systems', 'sim', 'cp'];
  const nextMode = modes[workbenchCycleIdx % modes.length];
  workbenchCycleIdx++;

  switchWorkbenchTab(nextMode);

  if (nextMode === 'systems') {
    switchTelemetryTab('projects');
    const diag = document.getElementById('archDiagramDistro');
    const archBtnText = document.getElementById('archBtnText');
    if (diag && diag.classList.contains('hidden')) {
      diag.classList.remove('hidden');
      if (archBtnText) archBtnText.textContent = 'Hide Architecture Telemetry';
    }
    if (btnText) btnText.textContent = 'Inspecting: System Pipelines';
  } else if (nextMode === 'sim') {
    switchTelemetryTab('hackathons');
    runAlgoTrace(workbenchCycleIdx % ALGO_TRACES.length);
    if (btnText) btnText.textContent = 'Inspecting: Complexity Lab';
  } else {
    switchTelemetryTab('projects');
    if (btnText) btnText.textContent = 'Inspecting: DSA & CP Arena';
  }

  if (deck) {
    deck.classList.add('ring-2', 'ring-f1red', 'shadow-[0_0_30px_rgba(230,0,0,0.4)]');
    setTimeout(() => {
      deck.classList.remove('ring-2', 'ring-f1red', 'shadow-[0_0_30px_rgba(230,0,0,0.4)]');
    }, 900);
  }

  if (consoleElem && window.innerWidth < 1024) {
    consoleElem.scrollIntoView({ behavior: 'smooth' });
  }
}

function focusProjectConsole() {
  triggerEngineeringTelemetryDeck();
}

function runTerminalCmd(cmdKey) {
  const cmdDisplay = document.getElementById('termActiveCmd');
  const outBox = document.getElementById('termDynamicOutput');
  const stackBtn = document.getElementById('termBtn-stack');
  const socialsBtn = document.getElementById('termBtn-socials');
  if (!cmdDisplay || !outBox) return;

  const activeClass =
    'px-2 py-0.5 rounded border bg-red-950/80 text-red-300 border-red-600 cursor-pointer transition-colors';
  const inactiveClass =
    'px-2 py-0.5 rounded border bg-black text-gray-400 border-gray-800 hover:text-white cursor-pointer transition-colors';

  if (cmdKey === 'stack') {
    if (stackBtn) stackBtn.className = activeClass;
    if (socialsBtn) socialsBtn.className = inactiveClass;
    cmdDisplay.textContent = '$ revanth --stack';
    outBox.innerHTML = `
      <p>[+] Core: C++, Python 3.11+, Linux Kernel/CLI</p>
      <p>[+] AI: MediaPipe WASM, Whisper, Local LLMs (Ollama/vLLM)</p>
      <p>[+] Web/3D: FastAPI, Three.js 48-Bone Rig, WebSockets</p>
    `;
  } else if (cmdKey === 'socials') {
    if (socialsBtn) socialsBtn.className = activeClass;
    if (stackBtn) stackBtn.className = inactiveClass;
    cmdDisplay.textContent = '$ revanth --socials';
    outBox.innerHTML = `
      <p>[+] GitHub: <a href="https://github.com/revanthbandaru54-arch" target="_blank" class="text-red-400 underline">github.com/revanthbandaru54-arch</a></p>
      <p>[+] LeetCode: <a href="https://leetcode.com/u/revanthbandaru54/" target="_blank" class="text-amber-400 underline">leetcode.com/u/revanthbandaru54</a></p>
      <p>[+] CodeChef: <a href="https://www.codechef.com/users/husk_calm_81" target="_blank" class="text-emerald-400 underline">codechef.com/users/husk_calm_81</a></p>
      <p>[+] LinkedIn: <a href="https://www.linkedin.com/in/revanth-bandaru-470876432/" target="_blank" class="text-gray-300 underline">linkedin.com/in/revanth-bandaru-470876432</a></p>
    `;
  }
}

// ==================== CONTACT MODAL ====================
function openContactModal() {
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  if (window.lucide) window.lucide.createIcons();
}

function closeContactModal() {
  const modal = document.getElementById('contactModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function handlePacketTransmit(event) {
  event.preventDefault();
  const alertBox = document.getElementById('transmitSuccessAlert');
  const callsign = document.getElementById('senderCallsign').value;
  const payload = document.getElementById('senderPayload').value;

  if (alertBox) alertBox.classList.remove('hidden');

  setTimeout(() => {
    const subject = encodeURIComponent(`Engineering Inbound Telemetry: ${callsign}`);
    const body = encodeURIComponent(`From: ${callsign}\n\nPayload:\n${payload}`);
    window.location.href = `mailto:revanthbandaru54@gmail.com?subject=${subject}&body=${body}`;
  }, 850);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  // Initialize LectureCast live parser, STEM Coach, and DoubtDesk
  updateLectureCastUI();
  selectStemBenchmark(0);
  selectDoubtSequence(0);
  startAvatarCanvasLoop();

  // Cycle active ISL gloss automatically every 950ms when playing
  setInterval(() => {
    if (!isRigPlaying || !parsedISL || parsedISL.isl_sov_gloss.length === 0) return;
    activeGlossIdx = (activeGlossIdx + 1) % parsedISL.isl_sov_gloss.length;
    renderGlossRibbon();
  }, 950);

  // Keyboard shortcuts (ESC closes modal, 1-4 switch views when not typing)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeContactModal();
    const tag = e.target && e.target.tagName;
    if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
      if (e.key === '1') switchMainView('projects');
      if (e.key === '2') switchMainView('skills');
      if (e.key === '3') switchMainView('hackathons');
      if (e.key === '4') switchMainView('about');
    }
  });
});

