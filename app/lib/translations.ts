export interface Translations {
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
    navbar: {
      about: "About",
      contestForm: "Contest Form",
      prizes: "Prizes",
      faq: "FAQ",
      joinContest: "Join Contest"
    },
    intro: {
      subtitle: "Move your mouse to enter"
    },
    hero: {
      title: "Win Amazing Prizes with Modyon",
      subtitle: "Join the Ultimate Giveaway",
      description: "Modyon is a creative online marketplace where independent artists, designers, and makers can showcase and sell their unique creations. Similar to Etsy or Redbubble, it connects creators with an interested audience, offering everything from pre-made goods and art prints to personalized accessories and lifestyle products. Whether you're looking to express your creativity or discover one-of-a-kind items, Modyon is the place where originality meets community.",
      joinNow: "Join Now",
      learnMore: "Learn More"
    },
    contestForm: {
      title: "Enter Giveaway",
      subtitle: "Enter your details and start winning",
      emailLabel: "Email",
      emailPlaceholder: "jane@example.com",
      referralLabel: "Referral Code (if available)",
      referralPlaceholder: "Enter your referral code",
      submitButton: "Sign Up Now",
      submitting: "Processing...",
      successMessage: "Welcome to the Contest!",
      errorMessage: "Failed to join contest. Please try again.",
      signupCount: "participants joined",
      entriesEarned: "Contest Entries",
      referralLink: "Share Your Referral Code",
      shareText: "Join this amazing giveaway! Use my referral link to get started:",
      copyLink: "Copy Code",
      linkCopied: "Copied!"
    },
    prizes: {
      title: "Amazing Prizes",
      subtitle: "What you can win",
      firstPlace: {
        title: "1st Place",
        description: "Premium Prize Package"
      },
      secondPlace: {
        title: "2nd Place", 
        description: "Exclusive Rewards"
      },
      thirdPlace: {
        title: "3rd Place",
        description: "Special Gift Set"
      }
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Got questions? We've got answers! Find everything you need to know about the Modyon giveaway.",
      questions: [
        {
          question: "How do I enter the Modyon giveaway?",
          answer: "Simply fill out the contest entry form above with your email address. That's it! you've successfully entered."
        },
        {
          question: "When will the winners be announced?",
          answer: "Winners will be selected randomly and announced on oct 31st, 2025. We'll notify winners via email and also announce them on our social media channels."
        },
        {
          question: "Can I enter multiple times?",
          answer: "No, only one entry per person is allowed. Multiple entries from the same person will be disqualified. However, you can increase your chances by sharing your code with your friends!"
        },
        {
          question: "What happens to my email address?",
          answer: "Your email will only be used for contest communication and occasional updates about Modyon platform. You can unsubscribe at any time, and we never share your information with third parties."
        }
      ]
    }
  },
  AR: {
    navbar: {
      about: "حول",
      contestForm: "نموذج المسابقة",
      prizes: "الجوائز",
      faq: "الأسئلة الشائعة",
      joinContest: "انضم للمسابقة"
    },
    intro: {
      subtitle: "حرك الماوس للدخول"
    },
    hero: {
      title: "اربح جوائز مذهلة مع موديون",
      subtitle: "انضم إلى السحب النهائي",
      description: "موديون هو سوق إبداعي عبر الإنترنت حيث يمكن للفنانين والمصممين والصناع المستقلين عرض وبيع إبداعاتهم الفريدة. مثل Etsy أو Redbubble، يربط المبدعين بجمهور مهتم، ويقدم كل شيء من السلع الجاهزة والمطبوعات الفنية إلى الإكسسوارات المخصصة ومنتجات نمط الحياة. سواء كنت تتطلع للتعبير عن إبداعك أو اكتشاف عناصر فريدة من نوعها، موديون هو المكان الذي يلتقي فيه الأصالة مع المجتمع.",
      joinNow: "انضم الآن",
      learnMore: "اعرف المزيد"
    },
    contestForm: {
      title: "ادخل السحب",
      subtitle: "أدخل بياناتك وابدأ الفوز",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "jane@example.com",
      referralLabel: "رمز الإحالة (إن وجد)",
      referralPlaceholder: "أدخل رمز الإحالة",
      submitButton: "سجل الآن",
      submitting: "جاري المعالجة...",
      successMessage: "مرحباً بك في المسابقة!",
      errorMessage: "فشل في الانضمام للمسابقة. يرجى المحاولة مرة أخرى.",
      signupCount: "مشارك انضم",
      entriesEarned: "مشاركات المسابقة",
      referralLink: "شارك رمز الإحالة الخاص بك",
      shareText: "انضم إلى هذا السحب المذهل! استخدم رابط الإحالة الخاص بي للبدء:",
      copyLink: "نسخ الرمز",
      linkCopied: "تم النسخ!"
    },
    prizes: {
      title: "جوائز مذهلة",
      subtitle: "ما يمكنك الفوز به",
      firstPlace: {
        title: "المركز الأول",
        description: "حزمة جوائز مميزة"
      },
      secondPlace: {
        title: "المركز الثاني",
        description: "مكافآت حصرية"
      },
      thirdPlace: {
        title: "المركز الثالث",
        description: "مجموعة هدايا خاصة"
      }
    },
    faq: {
      title: "الأسئلة الشائعة",
      subtitle: "لديك أسئلة؟ لدينا إجابات! اعثر على كل ما تحتاج لمعرفته حول سحب موديون.",
      questions: [
        {
          question: "كيف أدخل سحب موديون؟",
          answer: "ببساطة املأ نموذج دخول المسابقة أعلاه بعنوان بريدك الإلكتروني. هذا كل شيء! لقد دخلت بنجاح."
        },
        {
          question: "متى سيتم الإعلان عن الفائزين؟",
          answer: "سيتم اختيار الفائزين عشوائياً والإعلان عنهم في 31 أكتوبر 2025. سنخطر الفائزين عبر البريد الإلكتروني وننشر أيضاً على قنوات التواصل الاجتماعي."
        },
        {
          question: "هل يمكنني الدخول عدة مرات؟",
          answer: "لا، مسموح بدخول واحد فقط لكل شخص. الدخولات المتعددة من نفس الشخص ستؤدي إلى الاستبعاد. ومع ذلك، يمكنك زيادة فرصك بمشاركة رمزك مع أصدقائك!"
        },
        {
          question: "ماذا يحدث لعنوان بريدي الإلكتروني؟",
          answer: "سيتم استخدام بريدك الإلكتروني فقط للتواصل حول المسابقة والتحديثات العرضية حول منصة موديون. يمكنك إلغاء الاشتراك في أي وقت، ولا نشارك معلوماتك مع أطراف ثالثة أبداً."
        }
      ]
    }
  },
  FR: {
    navbar: {
      about: "À propos",
      contestForm: "Formulaire de concours",
      prizes: "Prix",
      faq: "FAQ",
      joinContest: "Rejoindre le concours"
    },
    intro: {
      subtitle: "Bougez votre souris pour entrer"
    },
    hero: {
      title: "Gagnez des prix incroyables avec Modyon",
      subtitle: "Rejoignez le tirage au sort ultime",
      description: "Modyon est une place de marché créative en ligne où les artistes, designers et créateurs indépendants peuvent présenter et vendre leurs créations uniques. Similaire à Etsy ou Redbubble, il connecte les créateurs avec un public intéressé, offrant tout, des produits prêts à l'emploi et impressions d'art aux accessoires personnalisés et produits de style de vie. Que vous cherchiez à exprimer votre créativité ou à découvrir des articles uniques en leur genre, Modyon est l'endroit où l'originalité rencontre la communauté.",
      joinNow: "Rejoindre maintenant",
      learnMore: "En savoir plus"
    },
    contestForm: {
      title: "Entrer dans le tirage",
      subtitle: "Entrez vos détails et commencez à gagner",
      emailLabel: "E-mail",
      emailPlaceholder: "jane@example.com",
      referralLabel: "Code de parrainage (si disponible)",
      referralPlaceholder: "Entrez votre code de parrainage",
      submitButton: "S'inscrire maintenant",
      submitting: "Traitement...",
      successMessage: "Bienvenue au concours!",
      errorMessage: "Échec de l'inscription au concours. Veuillez réessayer.",
      signupCount: "participants inscrits",
      entriesEarned: "Participations au concours",
      referralLink: "Partagez votre code de parrainage",
      shareText: "Rejoignez ce tirage incroyable! Utilisez mon lien de parrainage pour commencer:",
      copyLink: "Copier le code",
      linkCopied: "Copié!"
    },
    prizes: {
      title: "Prix incroyables",
      subtitle: "Ce que vous pouvez gagner",
      firstPlace: {
        title: "1ère place",
        description: "Pack de prix premium"
      },
      secondPlace: {
        title: "2ème place",
        description: "Récompenses exclusives"
      },
      thirdPlace: {
        title: "3ème place",
        description: "Ensemble cadeau spécial"
      }
    },
    faq: {
      title: "Questions fréquemment posées",
      subtitle: "Vous avez des questions? Nous avons des réponses! Trouvez tout ce que vous devez savoir sur le tirage Modyon.",
      questions: [
        {
          question: "Comment entrer dans le tirage Modyon?",
          answer: "Remplissez simplement le formulaire d'inscription au concours ci-dessus avec votre adresse e-mail. C'est tout! vous êtes inscrit avec succès."
        },
        {
          question: "Quand les gagnants seront-ils annoncés?",
          answer: "Les gagnants seront sélectionnés au hasard et annoncés le 31 octobre 2025. Nous notifierons les gagnants par e-mail et annoncerons également sur nos canaux de médias sociaux."
        },
        {
          question: "Puis-je participer plusieurs fois?",
          answer: "Non, une seule participation par personne est autorisée. Les participations multiples de la même personne seront disqualifiées. Cependant, vous pouvez augmenter vos chances en partageant votre code avec vos amis!"
        },
        {
          question: "Que se passe-t-il avec mon adresse e-mail?",
          answer: "Votre e-mail ne sera utilisé que pour la communication du concours et les mises à jour occasionnelles sur la plateforme Modyon. Vous pouvez vous désabonner à tout moment, et nous ne partageons jamais vos informations avec des tiers."
        }
      ]
    }
  }
};