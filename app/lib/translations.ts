export interface Translations {
  meta: {
    locale: string;
    direction: "ltr" | "rtl";
    dateFormat: string;
  };

  navbar: {
    about: string;
    contestForm: string;
    prizes: string;
    faq: string;
    joinContest: string;
  };
  intro: {
    subtitle: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    joinNow: string;
    learnMore: string;
  };
  contestForm: {
    title: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    referralLabel: string;
    referralPlaceholder: string;
    submitButton: string;
    submitting: string;
    successMessage: string;
    errorMessage: string;
    signupCount: string;
    entriesEarned: string;
    referralLink: string;
    shareText: string;
    copyLink: string;
    linkCopied: string;
  };
  howItWorks: {
    howItWorks: string;
    step1: string;
    step2: string;
    step3: string;
    eligibility: string;
    contestType: string;
  };
  prizes: {
    title: string;
    subtitle: string;
    firstPlace: {
      title: string;
      description: string;
    };
    secondPlace: {
      title: string;
      description: string;
    };
    thirdPlace: {
      title: string;
      description: string;
    };
    creatorBonus: {
      title: string;
      description: string;
      cta: string;
    };
  };
  faq: {
    title: string;
    subtitle: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export const translations: Record<string, Translations> = {
  EN: {
    meta: {
      locale: "en-US",
      direction: "ltr",
      dateFormat: "MMMM dd, yyyy",
    },
    navbar: {
      about: "About",
      contestForm: "Contest Form",
      prizes: "Prizes",
      faq: "FAQ",
      joinContest: "Join Contest",
    },
    intro: {
      subtitle: "Move your mouse to enter",
    },
    hero: {
      title: "Win 30,000 DZD in Cash Prizes",
      subtitle: "Join Algeria's First All-in-One Fashion Marketplace",
      description:
        "Modyon brings together clothing sellers, buyers, designers, and printers in one platform. Join our pre-launch contest and be part of Algeria's fashion revolution!",
      joinNow: "Join Now",
      learnMore: "Learn More",
    },
    howItWorks: {
      howItWorks: "How to Win",
      step1: "Sign up with your email",
      step2: "Share your referral code",
      step3: "Top referrers win cash prizes",
      eligibility: "Open to all Algerians",
      contestType: "Referral-Based Contest",
    },
    contestForm: {
      title: "Enter Giveaway",
      subtitle: "Enter your details and start winning",
      emailLabel: "Email",
      emailPlaceholder: "user@example.com",
      referralLabel: "Referral Code (if available)",
      referralPlaceholder: "Enter your referral code",
      submitButton: "Sign Up Now",
      submitting: "Processing...",
      successMessage: "Welcome to the Contest!",
      errorMessage: "Failed to join contest. Please try again.",
      signupCount: "participants joined",
      entriesEarned: "Contest Entries",
      referralLink: "Share Your Referral Code",
      shareText:
        "Join this amazing giveaway! Use my referral link to get started:",
      copyLink: "Copy Code",
      linkCopied: "Copied!",
    },
    prizes: {
      title: "30,000 DZD Cash Prizes",
      subtitle: "Top 3 referrers win",
      firstPlace: {
        title: "1st Place - Most Referrals",
        description: "15,000 DZD Cash Prize",
      },
      secondPlace: {
        title: "2nd Place",
        description: "10,000 DZD Cash Prize",
      },
      thirdPlace: {
        title: "3rd Place",
        description: "5,000 DZD Cash Prize",
      },
      creatorBonus: {
        title: "Special Offer for Creators",
        description: "Sellers, designers & printers: 0% commission for Year 1",
        cta: "Register as Creator",
      },
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle:
        "Got questions? We've got answers! Find everything you need to know about the Modyon giveaway.",
      questions: [
        {
          question: "Who can participate?",
          answer: "Any Algerian resident can join the contest.",
        },
        {
          question: "How do I win?",
          answer:
            "Winners are determined by referral count. The top 3 people who refer the most participants win cash prizes.",
        },
        {
          question: "What is Modyon?",
          answer:
            "Modyon is Algeria's upcoming all-in-one fashion platform connecting clothing sellers, buyers, designers, and printers.",
        },
        {
          question: "Are there benefits for sellers/designers?",
          answer:
            "Yes! Sellers, designers, and printers who join get 0% commission for the entire first year.",
        },
        {
          question: "When does Modyon launch?",
          answer: "[Add launch date]",
        },
        {
          question: "How will I receive my prize?",
          answer:
            "You will get a voucher code via email to redeem your cash prize.",
        },
      ],
    },
  },

  AR: {
    meta: {
      locale: "ar-DZ",
      direction: "rtl",
      dateFormat: "dd MMMM, yyyy",
    },
    navbar: {
      about: "حول",
      contestForm: "نموذج المسابقة",
      prizes: "الجوائز",
      faq: "الأسئلة الشائعة",
      joinContest: "انضم للمسابقة",
    },
    intro: {
      subtitle: "حرّك الماوس للدخول",
    },
    hero: {
      title: "اربح 30,000 دج كجوائز نقدية",
      subtitle: "انضم إلى أول سوق أزياء شامل في الجزائر",
      description:
        "موديون يجمع بين البائعين والمشترين والمصممين والطابعين في منصة واحدة. شارك في مسابقة الإطلاق المسبق وكن جزءًا من ثورة الأزياء الجزائرية!",
      joinNow: "انضم الآن",
      learnMore: "اعرف المزيد",
    },
    howItWorks: {
      howItWorks: "كيفية الفوز",
      step1: "سجّل باستخدام بريدك الإلكتروني",
      step2: "شارك رمز الإحالة الخاص بك",
      step3: "الأشخاص الذين لديهم أكبر عدد من الإحالات يفوزون بجوائز نقدية",
      eligibility: "المسابقة مفتوحة لجميع الجزائريين",
      contestType: "مسابقة تعتمد على الإحالات",
    },
    contestForm: {
      title: "ادخل السحب",
      subtitle: "أدخل بياناتك وابدأ بالفوز",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "user@example.com",
      referralLabel: "رمز الإحالة (إن وجد)",
      referralPlaceholder: "أدخل رمز الإحالة",
      submitButton: "سجّل الآن",
      submitting: "جاري المعالجة...",
      successMessage: "مرحبًا بك في المسابقة!",
      errorMessage: "فشل في الانضمام للمسابقة. حاول مرة أخرى.",
      signupCount: "مشارك انضم",
      entriesEarned: "مشاركات المسابقة",
      referralLink: "شارك رمز الإحالة الخاص بك",
      shareText:
        "انضم إلى هذه المسابقة المذهلة! استخدم رابط الإحالة الخاص بي للبدء:",
      copyLink: "نسخ الرمز",
      linkCopied: "تم النسخ!",
    },
    prizes: {
      title: "30,000 دج كجوائز نقدية",
      subtitle: "الفائزون الثلاثة الأوائل",
      firstPlace: {
        title: "المركز الأول - أكثر إحالات",
        description: "15,000 دج جائزة نقدية",
      },
      secondPlace: {
        title: "المركز الثاني",
        description: "10,000 دج جائزة نقدية",
      },
      thirdPlace: {
        title: "المركز الثالث",
        description: "5,000 دج جائزة نقدية",
      },
      creatorBonus: {
        title: "عرض خاص للمبدعين",
        description: "للبائعين والمصممين والطابعين: عمولة 0٪ للسنة الأولى",
        cta: "سجّل كمبدع",
      },
    },
    faq: {
      title: "الأسئلة الشائعة",
      subtitle:
        "عندك أسئلة؟ عندنا الأجوبة! كل ما تحتاج معرفته عن مسابقة موديون هنا.",
      questions: [
        {
          question: "من يمكنه المشاركة؟",
          answer: "أي مقيم في الجزائر يمكنه الانضمام إلى المسابقة.",
        },
        {
          question: "كيف أفوز؟",
          answer:
            "الفائزون يُحددون حسب عدد الإحالات. الثلاثة الأوائل الذين يحققون أكبر عدد من الإحالات يفوزون بجوائز نقدية.",
        },
        {
          question: "ما هو موديون؟",
          answer:
            "موديون هو منصة أزياء جزائرية جديدة تجمع البائعين والمشترين والمصممين والطابعين في مكان واحد.",
        },
        {
          question: "هل هناك مزايا للمصممين أو البائعين؟",
          answer:
            "نعم! البائعون والمصممون والطابعون يحصلون على عمولة 0٪ طوال السنة الأولى.",
        },
        {
          question: "متى يتم إطلاق موديون؟",
          answer: "[أضف تاريخ الإطلاق]",
        },
        {
          question: "كيف سأستلم جائزتي؟",
          answer: "ستتلقى رمز قسيمة عبر البريد الإلكتروني لاستلام الجائزة النقدية.",
        },
      ],
    },
  },

  FR: {
    meta: {
      locale: "fr-DZ",
      direction: "ltr",
      dateFormat: "dd MMMM, yyyy",
    },
    navbar: {
      about: "À propos",
      contestForm: "Formulaire du concours",
      prizes: "Prix",
      faq: "FAQ",
      joinContest: "Rejoindre le concours",
    },
    intro: {
      subtitle: "Bougez votre souris pour participer",
    },
    hero: {
      title: "Gagnez 30 000 DZD en prix en espèces",
      subtitle:
        "Rejoignez le premier marché de la mode tout-en-un en Algérie",
      description:
        "Modyon réunit vendeurs de vêtements, acheteurs, designers et imprimeurs sur une seule plateforme. Participez à notre concours de pré-lancement et faites partie de la révolution de la mode en Algérie !",
      joinNow: "Rejoindre maintenant",
      learnMore: "En savoir plus",
    },
    howItWorks: {
      howItWorks: "Comment gagner",
      step1: "Inscrivez-vous avec votre e-mail",
      step2: "Partagez votre code de parrainage",
      step3: "Les meilleurs parrains gagnent des prix en argent",
      eligibility: "Ouvert à tous les Algériens",
      contestType: "Concours basé sur le parrainage",
    },
    contestForm: {
      title: "Participer au tirage",
      subtitle: "Entrez vos informations et commencez à gagner",
      emailLabel: "E-mail",
      emailPlaceholder: "user@example.com",
      referralLabel: "Code de parrainage (si disponible)",
      referralPlaceholder: "Entrez votre code de parrainage",
      submitButton: "S'inscrire maintenant",
      submitting: "Traitement...",
      successMessage: "Bienvenue au concours !",
      errorMessage:
        "Échec de l'inscription au concours. Veuillez réessayer.",
      signupCount: "participants inscrits",
      entriesEarned: "Participations au concours",
      referralLink: "Partagez votre code de parrainage",
      shareText:
        "Rejoignez ce concours incroyable ! Utilisez mon lien de parrainage pour commencer :",
      copyLink: "Copier le code",
      linkCopied: "Copié !",
    },
    prizes: {
      title: "30 000 DZD en prix en espèces",
      subtitle: "Les 3 meilleurs parrains gagnent",
      firstPlace: {
        title: "1ère place - Plus grand nombre de parrainages",
        description: "15 000 DZD en espèces",
      },
      secondPlace: {
        title: "2ème place",
        description: "10 000 DZD en espèces",
      },
      thirdPlace: {
        title: "3ème place",
        description: "5 000 DZD en espèces",
      },
      creatorBonus: {
        title: "Offre spéciale pour les créateurs",
        description:
          "Vendeurs, designers et imprimeurs : 0 % de commission pendant la première année",
        cta: "S'inscrire en tant que créateur",
      },
    },
    faq: {
      title: "Questions fréquentes",
      subtitle:
        "Des questions ? Nous avons les réponses ! Découvrez tout ce qu'il faut savoir sur le concours Modyon.",
      questions: [
        {
          question: "Qui peut participer ?",
          answer: "Tout résident algérien peut rejoindre le concours.",
        },
        {
          question: "Comment puis-je gagner ?",
          answer:
            "Les gagnants sont déterminés par le nombre de parrainages. Les trois premiers remportent des prix en espèces.",
        },
        {
          question: "Qu'est-ce que Modyon ?",
          answer:
            "Modyon est la future plateforme algérienne tout-en-un de mode reliant vendeurs, acheteurs, designers et imprimeurs.",
        },
        {
          question: "Y a-t-il des avantages pour les créateurs ?",
          answer:
            "Oui ! Les vendeurs, designers et imprimeurs bénéficient de 0 % de commission pendant toute la première année.",
        },
        {
          question: "Quand Modyon sera-t-il lancé ?",
          answer: "[Ajouter la date de lancement]",
        },
        {
          question: "Comment recevrai-je mon prix ?",
          answer:
            "Vous recevrez un code de bon par e-mail pour encaisser votre prix en espèces.",
        },
      ],
    },
  },
};
