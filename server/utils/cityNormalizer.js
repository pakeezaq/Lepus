
const CITY_MAPPINGS = {
    'lahore': 'Lahore',
    'karachi': 'Karachi',
    'islamabad': 'Islamabad',
    'rawalpindi': 'Rawalpindi',
    'faisalabad': 'Faisalabad',
    'multan': 'Multan',
    'peshawar': 'Peshawar',
    'quetta': 'Quetta',
    'sialkot': 'Sialkot',
    'gujranwala': 'Gujranwala',
    // Add common variations or other cities as needed. PostEx likely expects standard Proper Case.
    'lhr': 'Lahore',
    'khi': 'Karachi',
    'isb': 'Islamabad',
    'pindi': 'Rawalpindi'
}

export const normalizeCity = (inputCity) => {
    if (!inputCity) return 'Unknown'
    const lower = inputCity.trim().toLowerCase()
    return CITY_MAPPINGS[lower] || inputCity.replace(/\b\w/g, c => c.toUpperCase()) // Default to Title Case
}
