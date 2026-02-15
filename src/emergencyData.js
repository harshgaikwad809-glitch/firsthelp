// Emergency scenarios data with symptoms and first aid information
const emergencyData = [
    {
        id: 1,
        title: 'Burns',
        symptomImage: '/assets/symptoms/burn.jpg',
        firstAidImage: '/assets/first-aid/burn1.jpg',
        category: 'Injury',
        severity: 'Medium',
        symptoms: [
            'Redness and swelling',
            'Blistering or peeling skin',
            'Severe pain or numbness',
            'Charred or white burned area'
        ],
        firstAidSteps: [
            'Cool the burn with running water for 10-20 minutes',
            'Remove jewelry and tight clothing before swelling',
            'Cover with sterile, non-stick bandage',
            'Do NOT pop blisters or apply ice directly',
            'Seek medical help for severe burns'
        ]
    },
    {
        id: 2,
        title: 'Choking',
        symptomImage: '/assets/symptoms/choking.jpg',
        firstAidImage: '/assets/first-aid/choking.jpg',
        category: 'Breathing Emergency',
        severity: 'Critical',
        symptoms: [
            'Unable to speak or cry out',
            'Difficulty breathing or noisy breathing',
            'Clutching throat with hands',
            'Turning blue in face or lips',
            'Loss of consciousness (severe cases)'
        ],
        firstAidSteps: [
            'Encourage coughing if person can breathe',
            'Give 5 back blows between shoulder blades',
            'Perform 5 abdominal thrusts (Heimlich maneuver)',
            'Alternate back blows and abdominal thrusts',
            'Call 911 if object not dislodged or person unconscious'
        ]
    },
    {
        id: 3,
        title: 'Severe Bleeding',
        symptomImage: '/assets/symptoms/bleeding.jpg',
        firstAidImage: '/assets/first-aid/bleeding.jpg',
        category: 'Injury',
        severity: 'High',
        symptoms: [
            'Heavy, continuous blood flow',
            'Blood soaking through bandages',
            'Pale, cold, clammy skin',
            'Rapid pulse and breathing',
            'Dizziness or loss of consciousness'
        ],
        firstAidSteps: [
            'Call 911 immediately for severe bleeding',
            'Apply firm, direct pressure with clean cloth',
            'Maintain pressure continuously for 10-15 minutes',
            'Elevate wounded area above heart level',
            'Do NOT remove cloth if soaked - add more layers'
        ]
    },
    {
        id: 4,
        title: 'Broken Bones (Fracture)',
        symptomImage: '/assets/symptoms/brokenbones.jpg',
        firstAidImage: '/assets/first-aid/brokenbones1.jpg',
        category: 'Injury',
        severity: 'High',
        symptoms: [
            'Severe pain that worsens with movement',
            'Visible deformity or abnormal angle',
            'Swelling and bruising',
            'Inability to use or bear weight on limb',
            'Bone protruding through skin (open fracture)'
        ],
        firstAidSteps: [
            'Do NOT move the injured person unless necessary',
            'Immobilize the injured area with splint or padding',
            'Apply ice packs wrapped in cloth to reduce swelling',
            'Treat for shock (elevate legs, keep warm)',
            'Seek immediate medical attention'
        ]
    },
    {
        id: 5,
        title: 'Heart Attack',
        symptomImage: '/assets/symptoms/heartattack.jpg',
        firstAidImage: '/assets/first-aid/heartattack1.jpg',
        category: 'Cardiac Emergency',
        severity: 'Critical',
        symptoms: [
            'Chest pain or pressure (lasting > 5 minutes)',
            'Pain radiating to arm, jaw, or back',
            'Shortness of breath',
            'Cold sweat, nausea, lightheadedness',
            'Sense of impending doom'
        ],
        firstAidSteps: [
            'Call 911 IMMEDIATELY - every second counts',
            'Have person sit and rest, stay calm',
            'Give aspirin (if not allergic) - chew it',
            'Loosen tight clothing around neck and chest',
            'Be ready to perform CPR if person loses consciousness'
        ]
    },
    {
        id: 6,
        title: 'Stroke',
        symptomImage: '/assets/symptoms/stroke.jpg',
        firstAidImage: '/assets/first-aid/stroke1.jpg',
        category: 'Neurological Emergency',
        severity: 'Critical',
        symptoms: [
            'Face drooping on one side',
            'Arm weakness or numbness',
            'Slurred or confused speech',
            'Sudden severe headache',
            'Loss of balance or coordination'
        ],
        firstAidSteps: [
            'Call 911 immediately - remember FAST (Face, Arms, Speech, Time)',
            'Note the time when symptoms first appeared',
            'Keep person calm and lying down with head elevated',
            'Do NOT give food, drink, or medications',
            'Monitor breathing and be ready for CPR'
        ]
    },
    {
        id: 7,
        title: 'Seizure',
        symptomImage: '/assets/symptoms/seizure.jpg',
        firstAidImage: '/assets/first-aid/seizure1.jpg',
        category: 'Neurological Emergency',
        severity: 'High',
        symptoms: [
            'Uncontrollable muscle contractions',
            'Loss of consciousness',
            'Temporary confusion',
            'Staring spell or blank look',
            'Loss of bladder or bowel control'
        ],
        firstAidSteps: [
            'Stay calm and time the seizure',
            'Clear area of hard or sharp objects',
            'Turn person on their side to keep airway clear',
            'Do NOT put anything in their mouth',
            'Call 911 if seizure lasts > 5 minutes or person is injured'
        ]
    },
    {
        id: 8,
        title: 'Allergic Reaction',
        symptomImage: '/assets/symptoms/allergic.jpg',
        firstAidImage: '/assets/first-aid/allergic.jpg',
        category: 'Allergic Emergency',
        severity: 'High',
        symptoms: [
            'Hives, itching, or skin rash',
            'Swelling of face, lips, or tongue',
            'Difficulty breathing or wheezing',
            'Rapid or weak pulse',
            'Dizziness or fainting (anaphylaxis)'
        ],
        firstAidSteps: [
            'Call 911 if signs of severe reaction (anaphylaxis)',
            'Use EpiPen immediately if available',
            'Have person lie flat with legs elevated',
            'Give antihistamine if person can swallow',
            'Monitor breathing - be ready for CPR'
        ]
    },
    {
        id: 9,
        title: 'Abdominal Pain',
        symptomImage: '/assets/symptoms/abdominal.jpg',
        firstAidImage: '/assets/first-aid/abdominal1.jpg',
        category: 'Medical Emergency',
        severity: 'Medium',
        symptoms: [
            'Severe, persistent abdominal pain',
            'Tenderness when touching abdomen',
            'Vomiting blood or severe nausea',
            'Rigid, board-like abdomen',
            'Pain with fever or bleeding'
        ],
        firstAidSteps: [
            'Have person rest in comfortable position',
            'Do NOT give food, drink, or pain medication',
            'Do NOT apply heat to abdomen',
            'Call 911 if pain is severe or worsening',
            'Seek immediate medical attention if signs of shock'
        ]
    }
];

export default emergencyData;
