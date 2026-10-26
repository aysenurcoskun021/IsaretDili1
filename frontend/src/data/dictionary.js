const entries = [
  // Şahıs ve İşaret Zamirleri
  [
    "Ben",
    "Konuşan kişinin kendisini ifade etmek için kullandığı zamir.",
    "Şahıs ve İşaret Zamirleri"
  ],
  [
    "Sen",
    "Konuşulan kişiyi ifade etmek için kullanılan zamir.",
    "Şahıs ve İşaret Zamirleri"
  ],
  [
    "O",
    "Konuşan ve dinleyen dışındaki bir kişi veya varlığı ifade eden zamir.",
    "Şahıs ve İşaret Zamirleri"
  ],
  [
    "Bu",
    "Yakında bulunan veya işaret edilen kişi, nesne ya da varlığı belirtmek için kullanılan sözcük.",
    "Şahıs ve İşaret Zamirleri"
  ],
  [
    "Biz",
    "Konuşan kişinin kendisiyle birlikte birden fazla kişiyi ifade eden zamir.",
    "Şahıs ve İşaret Zamirleri"
  ],
  [
    "Siz",
    "Birden fazla kişiye veya saygı amacıyla tek bir kişiye hitap etmek için kullanılan zamir.",
    "Şahıs ve İşaret Zamirleri"
  ],
  [
    "Onlar",
    "Birden fazla kişi veya varlığı ifade eden zamir.",
    "Şahıs ve İşaret Zamirleri"
  ],

  // Soru Kelimeleri
  [
    "Ne",
    "Bir şeyin ne olduğunu sormak için kullanılan soru sözcüğü.",
    "Soru Kelimeleri"
  ],
  [
    "Neden",
    "Bir olayın veya durumun sebebini sormak için kullanılan soru sözcüğü.",
    "Soru Kelimeleri"
  ],
  [
    "Kim",
    "Bir kişinin kimliğini sormak için kullanılan soru sözcüğü.",
    "Soru Kelimeleri"
  ],
  [
    "Nerede",
    "Bir kişinin, nesnenin veya yerin konumunu sormak için kullanılan soru sözcüğü.",
    "Soru Kelimeleri"
  ],
  [
    "Nereye",
    "Bir hareketin yöneldiği yeri sormak için kullanılan soru sözcüğü.",
    "Soru Kelimeleri"
  ],
  [
    "Nasıl",
    "Bir şeyin yapılma biçimini veya durumunu sormak için kullanılan soru sözcüğü.",
    "Soru Kelimeleri"
  ],
  [
    "Ne zaman",
    "Bir olayın gerçekleştiği veya gerçekleşeceği zamanı sormak için kullanılan soru ifadesi.",
    "Soru Kelimeleri"
  ],
  [
    "Kaç",
    "Bir şeyin sayısını veya miktarını sormak için kullanılan soru sözcüğü.",
    "Soru Kelimeleri"
  ],

  // Temel Fiiller
  [
    "Olmak",
    "Bir durumda bulunmak veya bir duruma gelmek.",
    "Temel Fiiller"
  ],
  [
    "Yapmak",
    "Bir işi, eylemi veya etkinliği gerçekleştirmek.",
    "Temel Fiiller"
  ],
  [
    "Gelmek",
    "Bir yere doğru hareket etmek veya ulaşmak.",
    "Temel Fiiller"
  ],
  [
    "Gitmek",
    "Bulunulan yerden başka bir yere doğru hareket etmek.",
    "Temel Fiiller"
  ],
  [
    "Almak",
    "Bir şeyi edinmek, kabul etmek veya bulunduğu yerden götürmek.",
    "Temel Fiiller"
  ],
  [
    "Vermek",
    "Bir şeyi başka bir kişiye aktarmak veya teslim etmek.",
    "Temel Fiiller"
  ],
  [
    "Görmek",
    "Bir şeyi göz yoluyla algılamak.",
    "Temel Fiiller"
  ],
  [
    "Bilmek",
    "Bir konu hakkında bilgi sahibi olmak.",
    "Temel Fiiller"
  ],
  [
    "İstemek",
    "Bir şeyin olmasını veya elde edilmesini arzu etmek.",
    "Temel Fiiller"
  ],
  [
    "Sevmek",
    "Bir kişiye, varlığa veya şeye karşı sevgi ve yakınlık duymak.",
    "Temel Fiiller"
  ],
  [
    "Demek",
    "Bir düşünceyi veya ifadeyi dile getirmek.",
    "Temel Fiiller"
  ],
  [
    "Söylemek",
    "Bir düşünceyi, bilgiyi veya ifadeyi başka bir kişiye aktarmak.",
    "Temel Fiiller"
  ],
  [
    "Var",
    "Bir şeyin mevcut veya bulunduğunu ifade eden sözcük.",
    "Temel Fiiller"
  ],
  [
    "Yok",
    "Bir şeyin mevcut veya bulunmadığını ifade eden sözcük.",
    "Temel Fiiller"
  ],
  [
    "Anlamak",
    "Bir sözün, işaretin, olayın veya durumun anlamını kavramak.",
    "Temel Fiiller"
  ],
  [
    "Çalışmak",
    "Bir amaç doğrultusunda emek vermek veya bir işi gerçekleştirmek.",
    "Temel Fiiller"
  ],

  // Günlük İletişim, Hal ve Sosyal İfadeler
  [
    "Merhaba",
    "Karşılaşma sırasında kullanılan temel selamlama ifadesi.",
    "Günlük İletişim, Hal ve Sosyal İfadeler"
  ],
  [
    "Günaydın",
    "Sabah saatlerinde kullanılan selamlama ifadesi.",
    "Günlük İletişim, Hal ve Sosyal İfadeler"
  ],
  [
    "Teşekkür ederim",
    "Bir kişiye yapılan yardım veya davranış için minnet bildiren ifade.",
    "Günlük İletişim, Hal ve Sosyal İfadeler"
  ],
  [
    "Evet",
    "Onay veya kabul bildiren ifade.",
    "Günlük İletişim, Hal ve Sosyal İfadeler"
  ],
  [
    "Hayır",
    "Olumsuzluk, ret veya kabul etmeme bildiren ifade.",
    "Günlük İletişim, Hal ve Sosyal İfadeler"
  ],
  [
    "İyi",
    "Olumlu, uygun veya iyi durumda olmayı ifade eden sözcük.",
    "Günlük İletişim, Hal ve Sosyal İfadeler"
  ],
  [
    "Kötü",
    "Olumsuz, istenmeyen veya iyi olmayan bir durumu ifade eden sözcük.",
    "Günlük İletişim, Hal ve Sosyal İfadeler"
  ],
  [
    "Lütfen",
    "Bir isteği kibar ve nazik biçimde belirtmek için kullanılan ifade.",
    "Günlük İletişim, Hal ve Sosyal İfadeler"
  ],
  [
    "Rica ederim",
    "Teşekküre karşılık vermek veya nezaket bildirmek için kullanılan ifade.",
    "Günlük İletişim, Hal ve Sosyal İfadeler"
  ],
  [
    "Pardon",
    "Dikkat çekmek veya küçük bir hata ya da rahatsızlık için özür belirtmek amacıyla kullanılan ifade.",
    "Günlük İletişim, Hal ve Sosyal İfadeler"
  ],
  [
    "Özür dilerim",
    "Bir hata, rahatsızlık veya yanlış anlaşılma sonrasında özür bildiren ifade.",
    "Günlük İletişim, Hal ve Sosyal İfadeler"
  ],
  [
    "Ad",
    "Bir kişiyi, varlığı, yeri veya nesneyi tanımlamak için kullanılan sözcük.",
    "Günlük İletişim, Hal ve Sosyal İfadeler"
  ],
  [
    "İsim",
    "Bir kişi, varlık, yer veya nesneyi adlandırmak için kullanılan sözcük.",
    "Günlük İletişim, Hal ve Sosyal İfadeler"
  ],
  [
    "Tanışmak",
    "İki veya daha fazla kişinin birbirini tanıması ve ilk iletişimi kurması.",
    "Günlük İletişim, Hal ve Sosyal İfadeler"
  ],

  // Zaman ve Temel Hal Kelimeleri
  [
    "Bugün",
    "İçinde bulunulan gün.",
    "Zaman ve Temel Hal Kelimeleri"
  ],
  [
    "Yarın",
    "Bugünden sonraki gün.",
    "Zaman ve Temel Hal Kelimeleri"
  ],
  [
    "Dün",
    "Bugünden önceki gün.",
    "Zaman ve Temel Hal Kelimeleri"
  ],
  [
    "Şimdi",
    "İçinde bulunulan an veya mevcut zaman.",
    "Zaman ve Temel Hal Kelimeleri"
  ],
  [
    "Saat",
    "Gün içindeki belirli bir zamanı veya zamanı ölçen aracı ifade eden sözcük.",
    "Zaman ve Temel Hal Kelimeleri"
  ],
  [
    "Çok",
    "Miktarı, derecesi veya sayısı fazla olan.",
    "Zaman ve Temel Hal Kelimeleri"
  ],
  [
    "Az",
    "Miktarı, derecesi veya sayısı düşük olan.",
    "Zaman ve Temel Hal Kelimeleri"
  ],
  [
    "Değil",
    "Bir yargıyı veya durumu olumsuzlaştırmak için kullanılan sözcük.",
    "Zaman ve Temel Hal Kelimeleri"
  ],

  // Sayılar
  [
    "0",
    "Sıfır sayısını ifade eden işaret.",
    "Sayılar"
  ],
  [
    "1",
    "Bir sayısını ifade eden işaret.",
    "Sayılar"
  ],
  [
    "2",
    "İki sayısını ifade eden işaret.",
    "Sayılar"
  ],
  [
    "3",
    "Üç sayısını ifade eden işaret.",
    "Sayılar"
  ],
  [
    "4",
    "Dört sayısını ifade eden işaret.",
    "Sayılar"
  ],
  [
    "5",
    "Beş sayısını ifade eden işaret.",
    "Sayılar"
  ],
  [
    "6",
    "Altı sayısını ifade eden işaret.",
    "Sayılar"
  ],
  [
    "7",
    "Yedi sayısını ifade eden işaret.",
    "Sayılar"
  ],
  [
    "8",
    "Sekiz sayısını ifade eden işaret.",
    "Sayılar"
  ],
  [
    "9",
    "Dokuz sayısını ifade eden işaret.",
    "Sayılar"
  ],
  [
    "10",
    "On sayısını ifade eden işaret.",
    "Sayılar"
  ]
];

const isNumberEntry = (word) => {
  return /^\d+$/.test(word);
};

const createDictionaryEntry = (
  word,
  description,
  category,
  index
) => {
  const isNumber = isNumberEntry(word);

  return {
    id: index + 1,
    word,
    letter: isNumber
      ? "Sayılar"
      : word.charAt(0).toLocaleUpperCase("tr-TR"),
    description,
    meaning: description,
    category,
    is_quick_phrase: false,
    video_data: null,
    video_mime_type: null,
    video_url: null,
    created_at: null,
    videoAvailable: false
  };
};

const sortDictionaryEntries = (a, b) => {
  const aIsNumber = isNumberEntry(a.word);
  const bIsNumber = isNumberEntry(b.word);

  if (aIsNumber && !bIsNumber) {
    return 1;
  }

  if (!aIsNumber && bIsNumber) {
    return -1;
  }

  if (aIsNumber && bIsNumber) {
    return Number(a.word) - Number(b.word);
  }

  return a.word.localeCompare(
    b.word,
    "tr-TR",
    {
      sensitivity: "base"
    }
  );
};

export const dictionary = entries
  .map(([word, description, category], index) =>
    createDictionaryEntry(
      word,
      description,
      category,
      index
    )
  )
  .sort(sortDictionaryEntries);

const availableLetters = [
  ...new Set(
    dictionary
      .filter((item) => item.letter !== "Sayılar")
      .map((item) => item.letter)
  )
].sort((a, b) =>
  a.localeCompare(
    b,
    "tr-TR",
    {
      sensitivity: "base"
    }
  )
);

const numberFilterPosition = availableLetters.findIndex(
  (letter) => letter === "Ş"
);

export const dictionaryFilters =
  numberFilterPosition !== -1
    ? [
        "Tümü",
        ...availableLetters.slice(
          0,
          numberFilterPosition
        ),
        "Sayılar",
        ...availableLetters.slice(
          numberFilterPosition
        )
      ]
    : [
        "Tümü",
        ...availableLetters,
        "Sayılar"
      ];

export const filterDictionary = (
  items,
  searchTerm = "",
  selectedFilter = "Tümü"
) => {
  const normalizedSearch = searchTerm
    .trim()
    .toLocaleLowerCase("tr-TR");

  return items.filter((item) => {
    const normalizedWord = item.word
      .toLocaleLowerCase("tr-TR");

    const normalizedDescription = item.description
      .toLocaleLowerCase("tr-TR");

    const matchesSearch =
      normalizedSearch === "" ||
      normalizedWord.includes(normalizedSearch) ||
      normalizedDescription.includes(normalizedSearch);

    const matchesFilter =
      selectedFilter === "Tümü" ||
      item.letter === selectedFilter;

    return matchesSearch && matchesFilter;
  });
};