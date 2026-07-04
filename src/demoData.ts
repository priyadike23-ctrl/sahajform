import { SimplifiedForm, GlossaryTerm } from './types';

export const demoForms: { [key: string]: SimplifiedForm } = {
  ration_card_hi: {
    form_title: "नया राशन कार्ड आवेदन पत्र (Ration Card Form)",
    language: "hi",
    detected_purpose: "यह फॉर्म आपके परिवार के लिए सरकारी राशन दुकान से सस्ती दरों पर अनाज (गेहूं, चावल, चीनी) प्राप्त करने के लिए नया राशन कार्ड बनवाने के लिए है।",
    required_documents: [
      "परिवार के सभी सदस्यों का आधार कार्ड (Aadhaar Card)",
      "वर्तमान पते का प्रमाण (जैसे बिजली बिल, पानी बिल या किरायानामा)",
      "परिवार के मुखिया की 3 पासपोर्ट साइज फोटो",
      "आय प्रमाण पत्र (Income Certificate) या स्व-घोषणा पत्र",
      "बैंक पासबुक के पहले पन्ने की फोटोकॉपी"
    ],
    common_mistakes: [
      "परिवार के सदस्यों का नाम आधार कार्ड से अलग लिखना। नाम बिल्कुल आधार जैसा होना चाहिए।",
      "गलत वार्षिक आय दर्ज करना। यदि आय सरकारी सीमा से अधिक पाई गई, तो आवेदन खारिज हो सकता है।",
      "बैंक खाता नंबर या IFSC कोड गलत लिखना, जिससे सरकारी सब्सिडी मिलने में दिक्कत आ सकती है।"
    ],
    fields: [
      {
        id: "rc_1",
        field_name: "परिवार के मुखिया का विवरण (Details of Head of Family)",
        original_text: "परिवार के मुखिया का पूर्ण नाम (स्पष्ट अक्षरों में), पिता/पति का नाम तथा माता का नाम दर्ज करें।",
        simplified_explanation: "यहाँ आपके परिवार के मुख्य व्यक्ति (सामान्यतः घर की महिला या सबसे बुजुर्ग सदस्य) का पूरा नाम लिखना है। उनके पिता या पति का नाम और माता का नाम भी लिखें। नाम वैसे ही लिखें जैसा उनके आधार कार्ड पर लिखा है।",
        example_answer: "सरला देवी, पति: राम कुमार, माता: शांति देवी"
      },
      {
        id: "rc_2",
        field_name: "स्थायी एवं वर्तमान पता (Residential Address)",
        original_text: "पूर्ण आवासीय पता विवरण: मकान संख्या, गली/मोहल्ला, ग्राम/नगर, वार्ड संख्या, ब्लॉक, तहसील एवं जिला।",
        simplified_explanation: "यहाँ वह पता लिखें जहाँ आपका परिवार वर्तमान में रह रहा है। इसमें आपके घर का नंबर, गली, गाँव या शहर, तहसील और जिला साफ-साफ लिखें।",
        example_answer: "मकान नंबर १२, वार्ड नंबर ४, गांधी चौक, रामपुर, तहसील: सदर, जिला: पटना"
      },
      {
        id: "rc_3",
        field_name: "परिवार के सदस्यों का विवरण (Details of Family Members)",
        original_text: "क्रमवार सदस्य का नाम, मुखिया से संबंध, लिंग, आयु, आधार कार्ड संख्या, वर्तमान व्यवसाय एवं मासिक आय।",
        simplified_explanation: "घर के बाकी सभी लोगों की जानकारी एक-एक करके लिखें। उनका नाम, मुखिया से क्या संबंध है (जैसे बेटा, बहू, पोता), वे महिला हैं या पुरुष, उनकी उम्र कितनी है, उनका आधार नंबर क्या है और वे क्या काम करते हैं।",
        example_answer: "१. सुनील कुमार, संबंध: बेटा, पुरुष, उम्र २५ वर्ष, आधार: १२३४-५६७८-९०१२, काम: दुकान सहायक"
      },
      {
        id: "rc_4",
        field_name: "वार्षिक कुल पारिवारिक आय (Total Annual Family Income)",
        original_text: "समस्त स्रोतों से होने वाली परिवार के सभी सदस्यों की कुल संचयी वार्षिक आय (रुपयों में)।",
        simplified_explanation: "सालभर में आपके घर के सभी कमाने वाले सदस्यों को मिलाकर कुल कितने रुपयों की कमाई होती है। इसके लिए आपको अपना आय प्रमाण पत्र भी साथ लगाना होगा।",
        example_answer: "रु ९६,०००/- (छियानवे हजार रुपये प्रति वर्ष)"
      },
      {
        id: "rc_5",
        field_name: "बैंक खाता विवरण (Bank Account Details)",
        original_text: "मुख्य बैंक खाता धारक का नाम, बैंक का नाम, शाखा का नाम, खाता संख्या तथा बैंक का आई.एफ.एस.सी (IFSC) कोड अंकित करें।",
        simplified_explanation: "यहाँ परिवार के मुखिया के बैंक खाते की जानकारी देनी है। खाता किस बैंक में है, बैंक की कौन सी शाखा है, खाता नंबर क्या है और ११ अंकों का IFSC कोड क्या है (यह कोड आपकी पासबुक पर लिखा होता है)।",
        example_answer: "एसबीआई (State Bank of India), शाखा: रामपुर, खाता संख्या: ३३४४५५६६७७८, IFSC: SBIN0001234"
      },
      {
        id: "rc_6",
        field_name: "एलपीजी कनेक्शन विवरण (LPG Connection Details)",
        original_text: "क्या आपके पास गैस कनेक्शन उपलब्ध है? यदि हाँ, तो कनेक्शन का प्रकार (एकल/द्वि), उपभोक्ता संख्या तथा गैस एजेंसी का नाम दर्ज करें।",
        simplified_explanation: "क्या आपके घर में एलपीजी (रसोई गैस) कनेक्शन है? यदि हाँ, तो आपके पास एक सिलेंडर है या दो, आपका उपभोक्ता (Consumer) नंबर क्या है और गैस एजेंसी का नाम क्या है।",
        example_answer: "हाँ, एकल सिलेंडर, उपभोक्ता नंबर: ९८७६५४, एजेंसी: भारत गैस एजेंसी रामपुर"
      }
    ]
  },
  ration_card_en: {
    form_title: "New Ration Card Application Form",
    language: "en",
    detected_purpose: "This form is used to get a new Ration Card for your family to obtain subsidized food grains (wheat, rice, sugar) from government fair price shops.",
    required_documents: [
      "Aadhaar Card of all family members",
      "Proof of current address (such as electricity bill, water bill, or rent agreement)",
      "3 passport size photos of the head of the family",
      "Income Certificate or self-declaration form",
      "Photocopy of the first page of bank passbook"
    ],
    common_mistakes: [
      "Writing family members' names differently from their Aadhaar cards. Names must match Aadhaar exactly.",
      "Entering incorrect annual income. If income is found to exceed the government limit, the application may be rejected.",
      "Writing incorrect bank account number or IFSC code, which can block government subsidy transfers."
    ],
    fields: [
      {
        id: "rc_1",
        field_name: "Details of Head of Family",
        original_text: "परिवार के मुखिया का पूर्ण नाम (स्पष्ट अक्षरों में), पिता/पति का नाम तथा माता का नाम दर्ज करें।",
        simplified_explanation: "Here you need to write the full name of the main person in your family (usually the female head or the oldest member). Also write their father's or husband's name, and mother's name. Write the names exactly as they appear on their Aadhaar Card.",
        example_answer: "Sarla Devi, Husband: Ram Kumar, Mother: Shanti Devi"
      },
      {
        id: "rc_2",
        field_name: "Residential Address",
        original_text: "पूर्ण आवासीय पता विवरण: मकान संख्या, गली/मोहल्ला, ग्राम/नगर, वार्ड संख्या, ब्लॉक, तहसील एवं जिला।",
        simplified_explanation: "Write the address where your family is currently living. Clearly write your house number, street, village or city, tehsil, and district.",
        example_answer: "House No. 12, Ward No. 4, Gandhi Chowk, Rampur, Tehsil: Sadar, District: Patna"
      },
      {
        id: "rc_3",
        field_name: "Details of Family Members",
        original_text: "क्रमवार सदस्य का नाम, मुखिया से संबंध, लिंग, आयु, आधार कार्ड संख्या, वर्तमान व्यवसाय एवं मासिक आय।",
        simplified_explanation: "Enter details for all other family members one by one. Write their name, relationship to the head (e.g., son, daughter-in-law, grandson), gender, age, Aadhaar number, and what they do for a living.",
        example_answer: "1. Sunil Kumar, Relationship: Son, Male, Age: 25 years, Aadhaar: 1234-5678-9012, Occupation: Shop assistant"
      },
      {
        id: "rc_4",
        field_name: "Total Annual Family Income",
        original_text: "समस्त स्रोतों से होने वाली परिवार के सभी सदस्यों की कुल संचयी वार्षिक आय (रुपयों में)।",
        simplified_explanation: "What is the total money earned in a year by all earning members of your household combined? You will also need to attach your Income Certificate as proof.",
        example_answer: "Rs 96,000/- (Ninety-Six Thousand Rupees per year)"
      },
      {
        id: "rc_5",
        field_name: "Bank Account Details",
        original_text: "मुख्य बैंक खाता धारक का नाम, बैंक का नाम, शाखा का नाम, खाता संख्या तथा बैंक का आई.एफ.एस.सी (IFSC) कोड अंकित करें।",
        simplified_explanation: "Write the bank account details of the head of the family. Mention the bank name, branch, account number, and the 11-digit IFSC code (usually printed on your passbook).",
        example_answer: "SBI (State Bank of India), Branch: Rampur, Account No: 33445566778, IFSC: SBIN0001234"
      },
      {
        id: "rc_6",
        field_name: "LPG Connection Details",
        original_text: "क्या आपके पास गैस कनेक्शन उपलब्ध है? यदि हाँ, तो कनेक्शन का प्रकार (एकल/द्वि), उपभोक्ता संख्या तथा गैस एजेंसी का नाम दर्ज करें।",
        simplified_explanation: "Do you have an LPG (cooking gas) connection at home? If yes, select if you have a single or double cylinder, and write your consumer number and gas agency name.",
        example_answer: "Yes, Single Cylinder, Consumer No: 987654, Agency: Bharat Gas Agency Rampur"
      }
    ]
  },
  income_certificate_en: {
    form_title: "Application for Revenue Income Certificate (आय प्रमाण पत्र)",
    language: "en",
    detected_purpose: "This form is used to apply for an official Income Certificate from the state government. This certificate is required to apply for school/college scholarships, subsidized schemes, fee concessions, and other government benefits.",
    required_documents: [
      "Aadhaar Card of the applicant",
      "Salary slip (if working in private/govt sector) or self-declaration for agricultural/unorganized income",
      "Land ownership documents (if income is from farming)",
      "Affidavit declaring total family income",
      "Ration Card or Residential Proof"
    ],
    common_mistakes: [
      "Not declaring income from minor family members or secondary sources (like interest/rent).",
      "Failing to get the self-declaration witnessed by a local authority or Gazetted officer if required.",
      "Spelling discrepancies between Aadhaar Card and Income Certificate application."
    ],
    fields: [
      {
        id: "ic_1",
        field_name: "Applicant's Identity Details",
        original_text: "Full Name of applicant (in block letters as per matriculation/Aadhaar record), Father's/Husband's name, and gender.",
        simplified_explanation: "Write your full name in capital letters. It must match the name on your Aadhaar card exactly. Also write your Father's name (or Husband's name if you are married) and choose your gender.",
        example_answer: "RAJESH SHARMA, Father: OM PRAKASH SHARMA, Gender: Male"
      },
      {
        id: "ic_2",
        field_name: "Income from Agriculture",
        original_text: "Annual gross revenue accrued from agricultural holdings, horticulture, and animal husbandry activities.",
        simplified_explanation: "How much money does your family earn in a year from farming, selling crops, or raising cows/buffaloes/poultry? If you do not have farming income, write 'NIL' or '0'.",
        example_answer: "Rs 45,000 (Forty-Five Thousand Rupees per year)"
      },
      {
        id: "ic_3",
        field_name: "Income from Business/Trade/Professional Services",
        original_text: "Net taxable or non-taxable annual receipts derived from commercial ventures, retail trade, or consulting practices.",
        simplified_explanation: "If you run a small shop, tea stall, tailor shop, or provide services (like driving, plumbing, etc.), write down the total amount of money you earn from it in a year after paying expenses.",
        example_answer: "Rs 60,000 (Sixty Thousand Rupees per year from grocery shop)"
      },
      {
        id: "ic_4",
        field_name: "Income from Salary/Pension",
        original_text: "Consolidated yearly emoluments received from government, public sector undertakings, or private establishments, including allowances.",
        simplified_explanation: "If any family member has a regular job and gets a monthly salary, or gets a government pension, multiply the monthly amount by 12 and write the yearly total here.",
        example_answer: "NIL (No family member has a fixed salaried job)"
      },
      {
        id: "ic_5",
        field_name: "Purpose of Certificate",
        original_text: "Specify the exact regulatory or administrative purpose for which the issuance of this certificate is solicited.",
        simplified_explanation: "Why do you need this Income Certificate? Is it for a school scholarship, a bank loan, a government flat, or a fee waiver in college? Mention it clearly.",
        example_answer: "For college scholarship and tuition fee concession for my daughter."
      }
    ]
  },
  income_certificate_hi: {
    form_title: "आय प्रमाण पत्र के लिए आवेदन (Application for Income Certificate)",
    language: "hi",
    detected_purpose: "यह फॉर्म राज्य सरकार से आधिकारिक आय प्रमाण पत्र प्राप्त करने के लिए है। यह प्रमाण पत्र स्कूल/कॉलेज छात्रवृत्ति, रियायती योजनाओं, शुल्क छूट और अन्य सरकारी लाभों के लिए आवश्यक है।",
    required_documents: [
      "आवेदक का आधार कार्ड",
      "वेतन पर्ची (यदि निजी/सरकारी क्षेत्र में कार्यरत हैं) या कृषि/असंगठित आय के लिए स्व-घोषणा पत्र",
      "भूमि स्वामित्व के दस्तावेज (यदि आय खेती से है)",
      "कुल पारिवारिक आय घोषित करने वाला शपथ पत्र",
      "राशन कार्ड या निवास का प्रमाण"
    ],
    common_mistakes: [
      "नाबालिग परिवार के सदस्यों या अन्य स्रोतों (जैसे ब्याज/किराया) से होने वाली आय को न दर्शाना।",
      "यदि आवश्यक हो, तो स्थानीय प्राधिकारी या राजपत्रित अधिकारी द्वारा स्व-घोषणा पत्र को सत्यापित न करवाना।",
      "आधार कार्ड और आय प्रमाण पत्र आवेदन के बीच नाम की स्पेलिंग में अंतर होना।"
    ],
    fields: [
      {
        id: "ic_1",
        field_name: "आवेदक का पहचान विवरण",
        original_text: "Full Name of applicant (in block letters as per matriculation/Aadhaar record), Father's/Husband's name, and gender.",
        simplified_explanation: "अपना पूरा नाम अंग्रेजी के बड़े अक्षरों में लिखें। यह आपके आधार कार्ड पर लिखे नाम से बिल्कुल मेल खाना चाहिए। अपने पिता का नाम (या यदि आप शादीशुदा हैं तो पति का नाम) भी लिखें और अपना लिंग चुनें।",
        example_answer: "RAJESH SHARMA, पिता: OM PRAKASH SHARMA, लिंग: पुरुष"
      },
      {
        id: "ic_2",
        field_name: "कृषि से आय",
        original_text: "Annual gross revenue accrued from agricultural holdings, horticulture, and animal husbandry activities.",
        simplified_explanation: "खेती, फसल बेचने, या गाय/भैंस/मुर्गी पालन से आपका परिवार एक साल में कितना पैसा कमाता है? यदि आपकी खेती से कोई आय नहीं है, तो 'NIL' या '0' लिखें।",
        example_answer: "रु ४५,००० (पैंतालीस हजार रुपये प्रति वर्ष)"
      },
      {
        id: "ic_3",
        field_name: "व्यवसाय/व्यापार/पेशेवर सेवाओं से आय",
        original_text: "Net taxable or non-taxable annual receipts derived from commercial ventures, retail trade, or consulting practices.",
        simplified_explanation: "यदि आप कोई छोटी दुकान, चाय की दुकान, दर्जी की दुकान चलाते हैं, या कोई सेवा प्रदान करते हैं (जैसे ड्राइविंग, प्लंबिंग आदि), तो खर्चों को घटाने के बाद एक साल में आप इससे कुल कितना पैसा कमाते हैं, वह यहाँ लिखें।",
        example_answer: "रु ६०,००० (किराना दुकान से साठ हजार रुपये प्रति वर्ष)"
      },
      {
        id: "ic_4",
        field_name: "वेतन/पेंशन से आय",
        original_text: "Consolidated yearly emoluments received from government, public sector undertakings, or private establishments, including allowances.",
        simplified_explanation: "यदि परिवार के किसी सदस्य के पास नियमित नौकरी है और उन्हें मासिक वेतन मिलता है, या सरकारी पेंशन मिलती है, तो मासिक राशि को 12 से गुणा करें और यहाँ कुल वार्षिक राशि लिखें।",
        example_answer: "NIL (परिवार में किसी की भी नियमित वेतन वाली नौकरी नहीं है)"
      },
      {
        id: "ic_5",
        field_name: "प्रमाण पत्र का उद्देश्य",
        original_text: "Specify the exact regulatory or administrative purpose for which the issuance of this certificate is solicited.",
        simplified_explanation: "आपको इस आय प्रमाण पत्र की आवश्यकता क्यों है? क्या यह स्कूल छात्रवृत्ति, बैंक ऋण, सरकारी फ्लैट, या कॉलेज में शुल्क माफी के लिए है? इसे साफ-साफ लिखें।",
        example_answer: "मेरी बेटी की कॉलेज छात्रवृत्ति और ट्यूशन फीस छूट के लिए।"
      }
    ]
  },
  passport_en: {
    form_title: "Fresh Passport Application Form",
    language: "en",
    detected_purpose: "This form is to apply for a fresh (first-time) Indian Passport, which is a vital legal identity document enabling you to travel abroad and acting as a strong proof of citizenship.",
    required_documents: [
      "Proof of Date of Birth (Birth Certificate, School Leaving Certificate, or PAN Card)",
      "Proof of Present Address (Aadhaar Card, Water/Electricity/Gas Bill, or Bank statement of running account)",
      "Non-ECR Category proof (Matriculation/10th standard pass certificate or above) - optional but recommended"
    ],
    common_mistakes: [
      "Providing an address where you have lived for less than 1 year without mentioning previous addresses. This leads to police verification failure.",
      "Entering incorrect details for the Emergency Contact person.",
      "Discrepancies in the spelling of names, birthplaces, or dates of birth compared to supporting documents."
    ],
    fields: [
      {
        id: "pp_1",
        field_name: "Service Required",
        original_text: "Applying for: Fresh Passport / Re-issue of Passport. Type of Application: Normal / Tatkaal. Booklet Type: 36 Pages / 60 Pages.",
        simplified_explanation: "Choose if you are applying for a passport for the very first time ('Fresh') or getting an old one renewed ('Re-issue'). Choose 'Normal' (cheaper, takes 2-3 weeks) or 'Tatkaal' (faster, more expensive, takes 2-4 days). Choose 36 pages (standard) or 60 pages (if you travel very often).",
        example_answer: "Fresh Passport, Normal, 36 Pages"
      },
      {
        id: "pp_2",
        field_name: "Applicant Given Name & Surname",
        original_text: "Enter applicant's given name and surname as appearing in proof documents. Initials are not permitted.",
        simplified_explanation: "Write your first name and middle name in the 'Given Name' section, and your last name/family name in 'Surname'. Do not write short names or initials (like R. K. Prasad, write Ram Kumar Prasad instead).",
        example_answer: "Given Name: SUNITA DEVI, Surname: PRASAD"
      },
      {
        id: "pp_3",
        field_name: "Place of Birth",
        original_text: "Village or Town or City, District, State. If born outside India, specify Country.",
        simplified_explanation: "Where were you born? Write the name of the village, town, or city. Also write the district and state. Make sure it matches what is written on your birth proof (like PAN or Birth Certificate).",
        example_answer: "Village: Rampur, District: Patna, State: Bihar"
      },
      {
        id: "pp_4",
        field_name: "Educational Qualification & Non-ECR status",
        original_text: "Specify education category (e.g., 10th standard or above) to determine Emigration Check Required (ECR) status.",
        simplified_explanation: "If you have passed the 10th standard/matriculation or higher, you are eligible for 'Non-ECR' status. This means you do not need special emigration clearance to work in certain countries. You will need to show your 10th mark sheet/certificate.",
        example_answer: "10th Standard or Above (Eligible for Non-ECR: Yes)"
      },
      {
        id: "pp_5",
        field_name: "Emergency Contact Details",
        original_text: "Name, Address, Mobile Number, and Email Address of the emergency contact person.",
        simplified_explanation: "In case of any emergency when you are travelling, whom should the authorities contact? Write the name, full address, phone number, and email of a family member, neighbor, or close friend.",
        example_answer: "Name: AMIT KUMAR PRASAD (Brother), Address: Gandhi Nagar, Patna, Mobile: 9876543210"
      }
    ]
  },
  passport_hi: {
    form_title: "नया पासपोर्ट आवेदन पत्र (Fresh Passport Application Form)",
    language: "hi",
    detected_purpose: "यह फॉर्म पहली बार भारतीय पासपोर्ट के लिए आवेदन करने के लिए है, जो विदेश यात्रा करने के लिए एक महत्वपूर्ण कानूनी पहचान दस्तावेज है और नागरिकता के मजबूत प्रमाण के रूप में कार्य करता है।",
    required_documents: [
      "जन्म तिथि का प्रमाण (जन्म प्रमाण पत्र, स्कूल छोड़ने का प्रमाण पत्र, या पैन कार्ड)",
      "वर्तमान पते का प्रमाण (आधार कार्ड, पानी/बिजली/गैस बिल, या बैंक खाता विवरण)",
      "नॉन-ईसीआर (Non-ECR) श्रेणी का प्रमाण (10वीं कक्षा या उससे ऊपर का उत्तीर्ण प्रमाण पत्र) - वैकल्पिक लेकिन अनुशंसित"
    ],
    common_mistakes: [
      "ऐसे पते की जानकारी देना जहाँ आप 1 वर्ष से कम समय से रह रहे हैं, बिना पिछले पते का उल्लेख किए। इससे पुलिस सत्यापन विफल हो जाता है।",
      "आपातकालीन संपर्क व्यक्ति (Emergency Contact) के लिए गलत विवरण दर्ज करना।",
      "सहायक दस्तावेजों की तुलना में नाम की स्पेलिंग, जन्म स्थान या जन्म तिथि में अंतर होना।"
    ],
    fields: [
      {
        id: "pp_1",
        field_name: "आवश्यक सेवा (Service Required)",
        original_text: "Applying for: Fresh Passport / Re-issue of Passport. Type of Application: Normal / Tatkaal. Booklet Type: 36 Pages / 60 Pages.",
        simplified_explanation: "चुनें कि क्या आप पहली बार पासपोर्ट के लिए आवेदन कर रहे हैं ('Fresh') या पुराना पासपोर्ट रिन्यू करा रहे हैं ('Re-issue')। 'Normal' चुनें (सस्ता, 2-3 सप्ताह लगते हैं) या 'Tatkaal' (तेज, अधिक महंगा, 2-4 दिन लगते हैं)। 36 पेज (मानक) या 60 पेज (यदि आप बहुत अक्सर यात्रा करते हैं) चुनें।",
        example_answer: "Fresh Passport, Normal, 36 Pages"
      },
      {
        id: "pp_2",
        field_name: "आवेदक का नाम और उपनाम (Applicant Given Name & Surname)",
        original_text: "Enter applicant's given name and surname as appearing in proof documents. Initials are not permitted.",
        simplified_explanation: "अपना पहला नाम और मध्य नाम 'Given Name' वाले हिस्से में लिखें, और अपना आखिरी नाम/उपनाम 'Surname' में लिखें। संक्षिप्त नाम या आद्याक्षर (जैसे R. K. Prasad नहीं, बल्कि Ram Kumar Prasad लिखें) न लिखें।",
        example_answer: "Given Name: SUNITA DEVI, Surname: PRASAD"
      },
      {
        id: "pp_3",
        field_name: "जन्म स्थान (Place of Birth)",
        original_text: "Village or Town or City, District, State. If born outside India, specify Country.",
        simplified_explanation: "आपका जन्म कहाँ हुआ था? गाँव, कस्बे या शहर का नाम लिखें। साथ ही जिला और राज्य का नाम भी लिखें। सुनिश्चित करें कि यह आपके जन्म प्रमाण (जैसे पैन या जन्म प्रमाण पत्र) पर लिखे विवरण से मेल खाता हो।",
        example_answer: "Village: Rampur, District: Patna, State: Bihar"
      },
      {
        id: "pp_4",
        field_name: "शैक्षणिक योग्यता और नॉन-ईसीआर स्थिति (Educational Qualification & Non-ECR status)",
        original_text: "Specify education category (e.g., 10th standard or above) to determine Emigration Check Required (ECR) status.",
        simplified_explanation: "यदि आपने 10वीं कक्षा/मैट्रिक या उससे अधिक की पढ़ाई की है, तो आप 'Non-ECR' स्थिति के पात्र हैं। इसका मतलब है कि आपको कुछ देशों में काम करने के लिए विशेष आव्रजन मंजूरी (emigration clearance) की आवश्यकता नहीं है। आपको अपनी 10वीं की मार्कशीट/प्रमाण पत्र दिखाना होगा।",
        example_answer: "10th Standard or Above (Eligible for Non-ECR: Yes)"
      },
      {
        id: "pp_5",
        field_name: "आपातकालीन संपर्क विवरण (Emergency Contact Details)",
        original_text: "Name, Address, Mobile Number, and Email Address of the emergency contact person.",
        simplified_explanation: "यात्रा के दौरान किसी भी आपात स्थिति के मामले में, अधिकारियों को किससे संपर्क करना चाहिए? परिवार के किसी सदस्य, पड़ोसी या करीबी दोस्त का नाम, पूरा पता, फोन नंबर और ईमेल लिखें।",
        example_answer: "Name: AMIT KUMAR PRASAD (Brother), Address: Gandhi Nagar, Patna, Mobile: 9876543210"
      }
    ]
  }
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Affidavit (शपथ पत्र)",
    translation: "शपथ पत्र / हलफनामा",
    definition: "A written statement made under oath, signed in front of a notary public or legal authority, confirming that the facts mentioned in it are 100% true.",
    example: "Used when you need to state your actual income, declare a change in name, or confirm that you do not own another house.",
    category: "Legal",
    definitions: {
      en: "A written statement made under oath, signed in front of a notary public or legal authority, confirming that the facts mentioned in it are 100% true.",
      hi: "शपथ लेकर लिखित में दिया गया बयान, जिस पर नोटरी पब्लिक या कानूनी अधिकारी के सामने हस्ताक्षर किए जाते हैं, जो पुष्टि करता है कि उसमें लिखे तथ्य शत-प्रतिशत सच हैं।",
      mr: "शपथेवर दिलेले लेखी विधान, ज्यावर नोटरी पब्लिक किंवा कायदेशीर अधिकाऱ्यासमोर स्वाक्षरी केली जाते, ज्यामुळे त्यातील माहिती पूर्णपणे खरी असल्याची खात्री पटते.",
      bn: "শপথ নিয়ে লিখিতভাবে দেওয়া একটি বিবৃতি, যা কোনো নোটারি পাবলিক বা আইনি কর্মকর্তার সামনে স্বাক্ষরিত হয়, যা নিশ্চিত করে যে এতে উল্লিখিত তথ্যগুলি ১০০% সত্য।"
    },
    examples: {
      en: "Used when you need to state your actual income, declare a change in name, or confirm that you do not own another house.",
      hi: "इसका उपयोग तब किया जाता है जब आपको अपनी वास्तविक आय घोषित करनी हो, नाम में बदलाव की घोषणा करनी हो, या पुष्टि करनी हो कि आपके पास दूसरा घर नहीं है।",
      mr: "जेव्हा तुम्हाला तुमची खरी उत्पन्न पातळी जाहीर करायची असेल, नाव बदलल्याचे घोषित करायचे असेल किंवा तुमच्याकडे दुसरे घर नसल्याची खात्री द्यायची असेल तेव्हा वापरले जाते.",
      bn: "এটি তখন ব্যবহৃত হয় যখন আপনাকে আপনার প্রকৃত আয় জানাতে হয়, নাম পরিবর্তনের ঘোষণা করতে হয়, বা নিশ্চিত করতে হয় যে আপনার অন্য কোনো বাড়ি নেই।"
    }
  },
  {
    term: "Domicile Certificate (निवास प्रमाण पत्र)",
    translation: "मूल निवास प्रमाण पत्र",
    definition: "A certificate issued by the state government proving that a person is a permanent resident of a particular state or union territory.",
    example: "Needed to get admission under state-quota in local colleges, or to apply for state government jobs.",
    category: "Address",
    definitions: {
      en: "A certificate issued by the state government proving that a person is a permanent resident of a particular state or union territory.",
      hi: "राज्य सरकार द्वारा जारी किया जाने वाला एक प्रमाण पत्र जो यह साबित करता है कि कोई व्यक्ति किसी विशेष राज्य या केंद्र शासित प्रदेश का स्थायी निवासी है।",
      mr: "राज्य सरकारने जारी केलेले प्रमाणपत्र जे हे सिद्ध करते की एखादी व्यक्ती विशिष्ट राज्य किंवा केंद्रशासित प्रदेशाची कायमची रहिवासी आहे.",
      bn: "রাজ্য সরকার দ্বারা জারি করা একটি শংসাপত্র যা প্রমাণ করে যে একজন ব্যক্তি একটি নির্দিষ্ট রাজ্য বা কেন্দ্রশাসিত অঞ্চলের স্থায়ী বাসিন্দা।"
    },
    examples: {
      en: "Needed to get admission under state-quota in local colleges, or to apply for state government jobs.",
      hi: "स्थानीय कॉलेजों में राज्य कोटे के तहत प्रवेश पाने के लिए, या राज्य सरकार की नौकरियों के लिए आवेदन करने के लिए आवश्यक है।",
      mr: "स्थानिक महाविद्यालयांमध्ये राज्य कोठ्यांतर्गत प्रवेश मिळवण्यासाठी किंवा राज्य सरकारच्या नोकऱ्यांसाठी अर्ज करण्यासाठी आवश्यक आहे.",
      bn: "স্থানীয় কলেজগুলিতে রাজ্য কোটার অধীনে ভর্তি হতে বা রাজ্য সরকারের চাকরির জন্য আবেদন করতে প্রয়োজন।"
    }
  },
  {
    term: "Aadhaar Card (आधार कार्ड)",
    translation: "आधार कार्ड",
    definition: "A 12-digit unique identity number issued by the Indian government (UIDAI) based on your biometric data (fingerprints and iris scan).",
    example: "Acts as primary proof of identity and address for almost all government forms.",
    category: "Identity",
    definitions: {
      en: "A 12-digit unique identity number issued by the Indian government (UIDAI) based on your biometric data (fingerprints and iris scan).",
      hi: "आपके बायोमेट्रिक डेटा (उंगलियों के निशान और आंख की पुतली के स्कैन) के आधार पर भारत सरकार (UIDAI) द्वारा जारी किया जाने वाला 12 अंकों का एक अनूठा पहचान नंबर।",
      mr: "तुमच्या बायोमेट्रिक डेटाच्या (बोटांचे ठसे आणि डोळ्यांचे स्कॅन) आधारे भारत सरकारने (UIDAI) जारी केलेला १२ अंकी अद्वितीय ओळख क्रमांक.",
      bn: "আপনার বায়োমেট্রিক ডেটার (আঙুলের ছাপ এবং চোখের স্ক্যান) ভিত্তিতে ভারত সরকার (UIDAI) দ্বারা জারি করা একটি ১২-ডিজিটের অনন্য পরিচয় নম্বর।"
    },
    examples: {
      en: "Acts as primary proof of identity and address for almost all government forms.",
      hi: "लगभग सभी सरकारी फॉर्मों के लिए पहचान और पते के प्राथमिक प्रमाण के रूप में कार्य करता है।",
      mr: "जवळपास सर्वच सरकारी अर्जांसाठी ओळख आणि पत्त्याचा मुख्य पुरावा म्हणून काम करतो.",
      bn: "প্রায় সমস্ত সরকারি ফর্মের জন্য পরিচয় এবং ঠিকানার প্রাথমিক প্রমাণ হিসাবে কাজ করে।"
    }
  },
  {
    term: "Gazetted Officer (राजपत्रित अधिकारी)",
    translation: "राजपत्रित अधिकारी",
    definition: "High-ranking government officials (like government doctors, high school principals, magistrates, police officers) whose signatures can verify/attest photocopy documents.",
    example: "Required to self-attest or certify character certificates and photocopy documents for passport or visa applications.",
    category: "Legal",
    definitions: {
      en: "High-ranking government officials (like government doctors, high school principals, magistrates, police officers) whose signatures can verify/attest photocopy documents.",
      hi: "उच्च पदस्थ सरकारी अधिकारी (जैसे सरकारी डॉक्टर, हाई स्कूल के प्रधानाचार्य, मजिस्ट्रेट, पुलिस अधिकारी) जिनके हस्ताक्षर फोटोकॉपी दस्तावेजों को सत्यापित/प्रमाणित कर सकते हैं।",
      mr: "उच्च दर्जाचे सरकारी अधिकारी (जसे की सरकारी डॉक्टर, हायस्कूलचे मुख्याध्यापक, दंडाधिकारी, पोलीस अधिकारी) ज्यांच्या स्वाक्षरीमुळे छायांकित प्रती (फोटोकॉपी) प्रमाणित किंवा सत्यापित केल्या जाऊ शकतात.",
      bn: "উচ্চপদস্থ সরকারি কর্মকর্তা (যেমন সরকারি ডাক্তার, হাই স্কুলের প্রধান শিক্ষক, ম্যাজিস্ট্রেট, পুলিশ কর্মকর্তা) যাদের স্বাক্ষর ফটোকপি নথিপত্র যাচাই/প্রত্যয়িত করতে পারে।"
    },
    examples: {
      en: "Required to self-attest or certify character certificates and photocopy documents for passport or visa applications.",
      hi: "पासपोर्ट या वीजा आवेदनों के लिए चरित्र प्रमाण पत्र और फोटोकॉपी दस्तावेजों को स्वयं सत्यापित या प्रमाणित करने के लिए आवश्यक है।",
      mr: "पासपोर्ट किंवा व्हिसा अर्जासाठी चारित्र्य प्रमाणपत्र आणि छायांकित प्रती स्वतः प्रमाणित किंवा साक्षांकित करण्यासाठी आवश्यक आहे.",
      bn: "পাসপোর্ট বা ভিসা আবেদনের জন্য চারিত্রিক শংসাপত্র এবং ফটোকপি নথিপত্র স্ব-প্রত্যয়িত বা শংসাপত্র করতে প্রয়োজনীয়।"
    }
  },
  {
    term: "PAN Card (पैन कार्ड)",
    translation: "पैन कार्ड (स्थायी खाता संख्या)",
    definition: "A 10-character alphanumeric card issued by the Income Tax Department to track financial transactions and income.",
    example: "Required to open a bank account, receive a salary above certain limits, or buy land.",
    category: "Financial",
    definitions: {
      en: "A 10-character alphanumeric card issued by the Income Tax Department to track financial transactions and income.",
      hi: "वित्तीय लेनदेन और आय पर नजर रखने के लिए आयकर विभाग द्वारा जारी किया जाने वाला 10-अक्षरों का अक्षरांकीय (अक्षर और नंबर वाला) कार्ड।",
      mr: "आर्थिक व्यवहार आणि उत्पन्नाचा maगो घेण्यासाठी आयकर विभागाने जारी केलेले १० अंकी अक्षरात्मक (अल्फान्यूमेरिक) कार्ड.",
      bn: "আর্থিক লেনদেন এবং আয়ের হিসাব রাখতে আয়কর বিভাগ দ্বারা জারি করা একটি ১০-অক্ষরের আলফানিউমেরিক কার্ড।"
    },
    examples: {
      en: "Required to open a bank account, receive a salary above certain limits, or buy land.",
      hi: "बैंक खाता खोलने, एक निश्चित सीमा से अधिक वेतन प्राप्त करने, या जमीन खरीदने के लिए आवश्यक है।",
      mr: "बँक खाते उघडण्यासाठी, ठराविक मर्यादेपेक्षा जास्त वेतन मिळवण्यासाठी किंवा जमीन खरेदी करण्यासाठी आवश्यक आहे.",
      bn: "একটি ব্যাঙ্ক অ্যাকাউন্ট খুলতে, নির্দিষ্ট সীমার উপরে বেতন পেতে, বা জমি কিনতে প্রয়োজনীয়।"
    }
  },
  {
    term: "IFSC Code (आईएफएससी कोड)",
    translation: "बैंक शाखा कोड",
    definition: "An 11-digit code unique to every bank branch in India. It is used to transfer money directly from one bank account to another online.",
    example: "Found printed on your bank chequebook or the first page of your bank passbook (e.g., SBIN0001234).",
    category: "Financial",
    definitions: {
      en: "An 11-digit code unique to every bank branch in India. It is used to transfer money directly from one bank account to another online.",
      hi: "भारत में प्रत्येक bank शाखा के लिए एक अनूठा 11 अंकों का कोड। इसका उपयोग ऑनलाइन पैसे को सीधे एक बैंक खाते से दूसरे बैंक खाते में भेजने के लिए किया जाता है।",
      mr: "भारतातील प्रत्येक बँक शाखेचा ११ अंकी अद्वितीय कोड. याचा वापर एका बँक खात्यातून दुसऱ्या खात्यात थेट पैसे ऑनलाइन ट्रान्सफर करण्यासाठी केला जातो.",
      bn: "ভারতের প্রতিটি ব্যাঙ্ক শাখার জন্য একটি অনন্য ১১-সংখ্যার কোড। এটি অনলাইনে সরাসরি একটি ব্যাঙ্ক অ্যাকাউন্ট থেকে অন্য অ্যাকাউন্টে টাকা স্থানান্তর করতে ব্যবহৃত হয়।"
    },
    examples: {
      en: "Found printed on your bank chequebook or the first page of your bank passbook (e.g., SBIN0001234).",
      hi: "यह आपकी बैंक चेकबुक या बैंक पासबुक के पहले पन्ने पर छपा होता है (जैसे, SBIN0001234)।",
      mr: "तुमच्या बँकेच्या धनादेश पुस्तकावर (चेकबुक) किंवा बँक पासबुकच्या पहिल्या पानावर छापलेला आढळतो (उदा. SBIN0001234).",
      bn: "আপনার ব্যাঙ্ক চেক বই বা ব্যাঙ্ক পাসবুকের প্রথম পৃষ্ঠায় মুদ্রিত পাওয়া যায় (যেমন, SBIN0001234)।"
    }
  },
  {
    term: "Income Certificate (आय प्रमाण पत्र)",
    translation: "आय प्रमाण पत्र",
    definition: "An official certificate issued by the local Tehsildar or revenue authority stating the total yearly income of your entire family.",
    example: "Essential to claim fee waivers in government schools, apply for poor-family food cards (Ration card), or government scholarships.",
    category: "Financial",
    definitions: {
      en: "An official certificate issued by the local Tehsildar or revenue authority stating the total yearly income of your entire family.",
      hi: "स्थानीय तहसीलदार या राजस्व अधिकारी द्वारा जारी किया जाने वाला एक आधिकारिक प्रमाण पत्र, जिसमें आपके पूरे परिवार की कुल वार्षिक आय दर्ज होती है।",
      mr: "स्थानिक तहसीलदार किंवा महसूल अधिकाऱ्याने जारी केलेले अधिकृत प्रमाणपत्र, ज्यामध्ये तुमच्या संपूर्ण कुटुंबाचे एकूण वार्षिक उत्पन्न दर्शविले जाते.",
      bn: "স্থানীয় তহশিলদার বা রাজস্ব কর্তৃপক্ষ দ্বারা জারি করা একটি সরকারী শংসাপত্র যা আপনার পুরো পরিবারের মোট বার্ষিক আয় নির্দেশ করে।"
    },
    examples: {
      en: "Essential to claim fee waivers in government schools, apply for poor-family food cards (Ration card), or government scholarships.",
      hi: "सरकारी स्कूलों में फीस माफी का दावा करने, गरीब परिवारों के लिए खाद्य कार्ड (राशन कार्ड) के लिए आवेदन करने, या सरकारी छात्रवृत्ति प्राप्त करने के लिए आवश्यक है।",
      mr: "शासकीय शाळांमध्ये फी सवलतीचा दावा करण्यासाठी, गरीब कुटुंबासाठी अन्न कार्ड (रेशन कार्ड) किंवा शासकीय शिष्यवृत्तीसाठी अर्ज करण्यासाठी आवश्यक आहे.",
      bn: "সরকারী স্কুলে ফি মকুবের দাবি জানাতে, দরিদ্র পরিবারের খাদ্য কার্ডের (রেশন कार्ड) জন্য আবেদন করতে বা সরকারী বৃত্তির জন্য প্রয়োজনীয়।"
    }
  },
  {
    term: "Attestation (सत्यापन)",
    translation: "सत्यापन / प्रमाणित करना",
    definition: "The act of showing that a document copy is genuine by getting it signed and stamped by an authorized officer or by yourself (self-attestation).",
    example: "Signing your own name at the bottom of an Aadhaar copy with 'Self-Attested' written next to it.",
    category: "Legal",
    definitions: {
      en: "The act of showing that a document copy is genuine by getting it signed and stamped by an authorized officer or by yourself (self-attestation).",
      hi: "यह साबित करने की क्रिया कि किसी दस्तावेज की कॉपी असली है, इसके लिए किसी अधिकृत अधिकारी से हस्ताक्षर और मोहर लगवाई जाती है या खुद हस्ताक्षर किए जाते हैं (स्व-सत्यापन)।",
      mr: "एखाद्या कागदपत्राची प्रत खरी असल्याचे सिद्ध करण्याची क्रिया, यासाठी अधिकृत अधिकाऱ्याची स्वाक्षरी व शिक्का मिळवला जातो किंवा स्वतः स्वाक्षरी केली जाते (स्व-साक्षांकन).",
      bn: "একটি নথির ফটোকপি আসল তা প্রমাণ করার প্রক্রিয়া, যা কোনো অনুমোদিত কর্মকর্তার স্বাক্ষর ও সিলমোহর নিয়ে বা নিজের স্বাক্ষরের (স্ব-প্রত্যয়ন) মাধ্যমে করা হয়।"
    },
    examples: {
      en: "Signing your own name at the bottom of an Aadhaar copy with 'Self-Attested' written next to it.",
      hi: "आधार कार्ड की कॉपी के नीचे अपना नाम लिखना और उसके पास 'स्व-सत्यापित' (Self-Attested) लिखना।",
      mr: "आधार कार्डच्या प्रतीवर खाली स्वतःची स्वाक्षरी करून त्याजवळ 'स्व-साक्षांकित' (Self-Attested) लिहिणे.",
      bn: "আধার কার্ডের কপির নিচে নিজের স্বাক্ষর করা এবং তার পাশে 'স্ব-প্রত্যয়িত' (Self-Attested) লেখা।"
    }
  }
];
