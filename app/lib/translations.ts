export interface Translations {
  meta: {
    locale: string;
    direction: "ltr" | "rtl";
    dateFormat: string;
  };

  navbar: {
    about: string;
    contestForm: string;
    howItWorks: string;
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
    // New form fields
    userTypeLabel: string;
    clientTitle: string;
    clientDescription: string;
    creatorTitle: string;
    creatorDescription: string;
    checkingMessage: string;
    returningUserMessage: string;
    successfulReferrals: string;
    shareTitle: string;
    creatorShareText: string;
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
      howItWorks: "How to Win",
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
        "Modyon is a creative marketplace connecting independent artists and designers with those who love unique, handmade, and personalized creations.",
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
      userTypeLabel: "I am a:",
      clientTitle: "Client",
      clientDescription: "I want to buy unique fashion items",
      creatorTitle: "Seller",
      creatorDescription: "I want to sell my designs or services",
      checkingMessage: "Checking your information...",
      returningUserMessage: "Welcome back! You're already registered.",
      successfulReferrals: "Successful Referrals",
      shareTitle: "Share & Earn",
      creatorShareText: "Share your referral code and earn rewards for every new seller/Buyer you bring to Modyon!",
    },
    prizes: {
      title: "30,000 DZD Cash Prizes",
      subtitle: "Top 3 referrers win",
      firstPlace: {
        title: "1st Place - Most Referrals",
        description: "15,000 DZD",
      },
      secondPlace: {
        title: "2nd Place",
        description: "10,000 DZD",
      },
      thirdPlace: {
        title: "3rd Place",
        description: "5,000 DZD",
      },
      creatorBonus: {
        title: "Special Offer for Sellers/Creators",
        description: "Sellers, designers & printers: 0% commission for Year 1",
        cta: "Register as Seller",
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
          answer: "launch date will be announced after the giveaway inchallah",
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
      howItWorks: "كيفية الفوز",
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
        "موديون هو سوق إبداعي يربط الفنانين والمصممين المستقلين مع أولئك الذين يحبون الإبداعات الفريدة والمصنوعة يدوياً والمخصصة.",
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
      userTypeLabel: "أنا:",
      clientTitle: "عميل",
      clientDescription: "أريد شراء قطع أزياء فريدة",
      creatorTitle: "بائع",
      creatorDescription: "أريد بيع تصاميمي أو خدماتي",
      checkingMessage: "جاري التحقق من معلوماتك...",
      returningUserMessage: "مرحبًا بعودتك! أنت مسجل بالفعل.",
      successfulReferrals: "الإحالات الناجحة",
      shareTitle: "شارك واربح",
      creatorShareText: "شارك رمز الإحالة الخاص بك واربح مكافآت عن كل بائع أو مشتري جديد تجلبه إلى موديون!",
    },
    prizes: {
      title: "30,000 دج كجوائز نقدية",
      subtitle: "الفائزون الثلاثة الأوائل",
      firstPlace: {
        title: "المركز الأول - أكثر إحالات",
        description: "15,000 دج ",
      },
      secondPlace: {
        title: "المركز الثاني",
        description: "10,000 دج ",
      },
      thirdPlace: {
        title: "المركز الثالث",
        description: "5,000 دج ",
      },
      creatorBonus: {
        title: "عرض خاص للبائعين",
        description: "للبائعين والمصممين والطابعين: عمولة 0٪ للسنة الأولى",
        cta: "سجّل كبائع",
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
          answer: "سيتم الإعلان عن موهد الاطلاق بعد نهاية المسابقة",
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
      howItWorks: "Comment gagner",
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
        "Modyon est un marché créatif qui connecte les artistes et designers indépendants avec ceux qui aiment les créations uniques, faites à la main et personnalisées.",
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
      userTypeLabel: "Je suis un :",
      clientTitle: "Client",
      clientDescription: "Je veux acheter des articles de mode uniques",
      creatorTitle: "Vendeur",
      creatorDescription: "Je veux vendre mes créations ou services",
      checkingMessage: "Vérification de vos informations...",
      returningUserMessage: "Bon retour ! Vous êtes déjà inscrit.",
      successfulReferrals: "Parrainages réussis",
      shareTitle: "Partagez et gagnez",
      creatorShareText: "Partagez votre code de parrainage et gagnez des récompenses pour chaque nouveau vendeur ou acheteur que vous amenez à Modyon !",
    },
    prizes: {
      title: "30 000 DZD en prix en espèces",
      subtitle: "Les 3 meilleurs parrains gagnent",
      firstPlace: {
        title: "1ère place - Plus grand nombre de parrainages",
        description: "15 000 DZD",
      },
      secondPlace: {
        title: "2ème place",
        description: "10 000 DZD",
      },
      thirdPlace: {
        title: "3ème place",
        description: "5 000 DZD",
      },
      creatorBonus: {
        title: "Offre spéciale pour les vendeurs",
        description:
          "Vendeurs, designers et imprimeurs : 0 % de commission pendant la première année",
        cta: "S'inscrire en tant que vendeur",
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
          question: "Y a-t-il des avantages pour les vendeurs ?",
          answer:
            "Oui ! Les vendeurs, designers et imprimeurs bénéficient de 0 % de commission pendant toute la première année.",
        },
        {
          question: "Quand Modyon sera-t-il lancé ?",
          answer: "la date de lancement sera annoncée après le concours inchallah",
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
