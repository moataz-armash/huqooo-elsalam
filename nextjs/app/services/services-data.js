// Content for the service pages. Kept in code deliberately: these six
// services change rarely, so a static page is faster, needs no CMS, and
// cannot break when a server is down. `quoteService` links each page to the
// matching selection in the quote form.
//
// `slug`, `icon`, `image` and `quoteService` are shared by both languages, so
// /services/garden-design and /en/services/garden-design are the same service
// at matching URLs. Only the words differ, and they live under `ar` and `en`.
export const SERVICES = [
  {
    slug: "seedlings-supply",
    quoteService: "plants",
    icon: "sprout",
    image: "/images/nursery-rows-v2.webp",
    ar: {
      title: "توريد الشتلات الزراعية",
      heading: "توريد الشتلات الزراعية في الرياض",
      metaTitle: "توريد الشتلات الزراعية في الرياض",
      metaDescription:
        "نوفّر شتلات زراعية بأحجام وكميات تناسب الفلل والحدائق والمزارع والمشاريع في الرياض، مع خيار التوصيل أو التوصيل مع الزراعة. اطلب عرض سعر عبر واتساب.",
      summary: "نخيل وأشجار وشجيرات وأزهار وعشب، بكميات تناسب الحدائق المنزلية والمشاريع الكبيرة.",
      imageAlt: "صفوف من الشتلات الزراعية في مشتل حقول السلام",
      intro: [
        "نوفّر في حقول السلام شتلات زراعية متنوعة تناسب الفلل والحدائق المنزلية والمزارع والمشاريع السكنية والتجارية، بأحجام مختلفة تبدأ من الشتلات الصغيرة وتصل إلى الأشجار الجاهزة للزراعة مباشرة.",
        "نساعدك على اختيار الأنواع التي تتحمل مناخ المنطقة وتناسب طبيعة موقعك ونظام الري لديك، مع مرونة في الكميات سواء كان طلبك لحديقة منزلية صغيرة أو لمشروع يحتاج مئات الشتلات.",
      ],
      includes: [
        ["النخيل", "أنواع وأحجام مختلفة تناسب المداخل والممرات والمساحات المفتوحة."],
        ["أشجار الظل والزينة", "أشجار تمنح ظلاً ومظهراً جمالياً وتتحمل الأجواء الحارة."],
        ["الأشجار المثمرة", "خيارات مناسبة للمزارع والاستراحات ومحبي الزراعة المنزلية."],
        ["الشجيرات والأسيجة", "لتحديد الحدود وتقسيم المساحات وإضافة الخصوصية."],
        ["الأزهار الموسمية", "ألوان متجددة تناسب المواسم والمناسبات والواجهات."],
        ["العشب والنجيل", "مسطحات خضراء مريحة للعين وصالحة للاستخدام اليومي."],
        ["النباتات المتسلقة", "لتغطية الجدران والمظلات وإضافة بُعد أخضر للمكان."],
      ],
      audience: [
        "ملاك الفلل والاستراحات",
        "أصحاب المزارع",
        "المقاولون والمطورون العقاريون",
        "إدارات المجمعات السكنية",
        "الشركات والمنشآت",
      ],
      faqs: [
        ["هل توفرون كميات كبيرة للمشاريع؟", "نعم، نتعامل مع طلبات المشاريع ونوفر كميات تناسب المجمعات السكنية والمشاريع التجارية. أرسل تفاصيل الأنواع والكميات المطلوبة ليصلك عرض سعر مناسب."],
        ["هل تشمل الخدمة زراعة الشتلات في الموقع؟", "يمكنك اختيار التوصيل فقط، أو التوصيل مع الزراعة في موقعك، أو الاستلام مباشرة من المشتل، وتحدد ذلك عند طلب عرض السعر."],
        ["كيف أعرف الأنواع المناسبة لموقعي؟", "أخبرنا بطبيعة الموقع ومساحته ونظام الري المتوفر، ويساعدك فريقنا على اختيار أنواع تتحمل مناخ المنطقة وتناسب استخدامك وميزانيتك."],
        ["هل الأسعار تشمل التوصيل؟", "تختلف تكلفة التوصيل حسب الموقع والكمية، ونوضّحها ضمن عرض السعر قبل أي التزام."],
      ],
    },
    en: {
      title: "Agricultural seedling supply",
      heading: "Agricultural seedling supply in Riyadh",
      metaTitle: "Agricultural Seedling Supply in Riyadh",
      metaDescription:
        "We supply agricultural seedlings in sizes and quantities to suit villas, gardens, farms and projects across Riyadh, with delivery or delivery and planting. Request a quote on WhatsApp.",
      summary: "Palms, trees, shrubs, flowers and turf, in quantities that suit home gardens and large projects alike.",
      imageAlt: "Rows of agricultural seedlings at the Huqool Alsalam nursery",
      intro: [
        "At Huqool Alsalam we supply a varied range of agricultural seedlings for villas, home gardens, farms, and residential and commercial projects, in sizes from small seedlings right through to mature trees ready to plant.",
        "We help you choose species that tolerate the regional climate and suit your site and irrigation system, with flexible quantities whether you need a small home garden or a project running to hundreds of seedlings.",
      ],
      includes: [
        ["Palms", "Various types and sizes to suit entrances, walkways and open spaces."],
        ["Shade and ornamental trees", "Trees that give shade and visual appeal while tolerating the heat."],
        ["Fruit trees", "Suitable choices for farms, rest houses and home growers."],
        ["Shrubs and hedging", "For marking boundaries, dividing spaces and adding privacy."],
        ["Seasonal flowers", "Renewed colour for seasons, occasions and frontages."],
        ["Turf and lawn grass", "Green lawns that are easy on the eye and stand up to daily use."],
        ["Climbing plants", "For covering walls and pergolas and adding a green dimension."],
      ],
      audience: [
        "Villa and rest house owners",
        "Farm owners",
        "Contractors and property developers",
        "Residential compound management",
        "Companies and institutions",
      ],
      faqs: [
        ["Do you supply large quantities for projects?", "Yes. We handle project orders and supply quantities suited to residential compounds and commercial developments. Send us the types and quantities you need and we will prepare a quote."],
        ["Does the service include planting on site?", "You can choose delivery only, delivery with planting at your site, or collection directly from the nursery. You select this when requesting your quote."],
        ["How do I know which species suit my site?", "Tell us about the site, its size and the irrigation available, and our team will help you choose species that tolerate the regional climate and suit your use and budget."],
        ["Do prices include delivery?", "Delivery cost varies with location and quantity, and we set it out clearly in the quote before any commitment."],
      ],
    },
  },
  {
    slug: "garden-design",
    quoteService: "landscape",
    icon: "flower",
    image: "/images/landscape-project-v2.webp",
    ar: {
      title: "تنسيق الحدائق",
      heading: "تنسيق الحدائق في الرياض",
      metaTitle: "تنسيق حدائق في الرياض | تصميم وتنفيذ",
      metaDescription:
        "تصميم وتنفيذ حدائق الفلل والمنازل والاستراحات في الرياض: زراعة، شبكات ري، عشب طبيعي وصناعي، إضاءة وممرات. احصل على عرض سعر لمشروعك.",
      summary: "من فكرة التصميم حتى آخر شتلة: زراعة وري وإضاءة وممرات لمساحة خضراء متكاملة.",
      imageAlt: "حديقة منسّقة من تنفيذ حقول السلام",
      intro: [
        "نحوّل المساحة الخارجية في منزلك أو استراحتك إلى حديقة مرتبة ومريحة، بدءاً من دراسة الموقع ووضع التصميم، ووصولاً إلى الزراعة وتجهيز شبكة الري والإضاءة.",
        "نعمل وفق مساحة الموقع وطبيعته والميزانية المتاحة، ونقترح عليك الحلول التي تعطي أفضل نتيجة بأقل تكلفة ممكنة، سواء كانت الحديقة أرضاً فارغة من البداية أو حديقة قائمة تحتاج إلى تجديد.",
      ],
      includes: [
        ["التصميم", "تصور واضح لتوزيع المساحات والنباتات والعناصر قبل بدء التنفيذ."],
        ["الزراعة والتشجير", "اختيار وزراعة الأشجار والشجيرات والأزهار المناسبة للموقع."],
        ["شبكة الري", "تمديد شبكة ري تحافظ على النباتات وتقلل هدر المياه."],
        ["العشب الطبيعي", "مسطحات خضراء طبيعية مع توضيح متطلبات العناية بها."],
        ["العشب الصناعي", "بديل عملي يحتاج عناية أقل ويناسب المساحات الصغيرة."],
        ["الإضاءة", "إضاءة تبرز معالم الحديقة وتجعلها صالحة للاستخدام ليلاً."],
        ["الممرات والرصف", "تنظيم الحركة داخل الحديقة وتحديد الجلسات والمسارات."],
        ["الجدران الخضراء", "استغلال الجدران لإضافة مساحة خضراء دون استهلاك الأرض."],
      ],
      audience: [
        "ملاك الفلل والمنازل",
        "الاستراحات والمزارع",
        "المجمعات السكنية",
        "المكاتب والمباني التجارية",
      ],
      faqs: [
        ["كم تكلفة تنسيق حديقة؟", "تعتمد التكلفة على مساحة الموقع وحالته والعناصر المطلوبة مثل العشب والري والإضاءة والممرات. أرسل تفاصيل مشروعك ليصلك عرض سعر مبني على احتياجك الفعلي."],
        ["هل تشمل الخدمة شبكة الري؟", "نعم، يمكن أن يشمل المشروع تمديد شبكة ري مناسبة للمساحة ونوع النباتات، ويمكنك اختيار ذلك ضمن عناصر المشروع عند طلب عرض السعر."],
        ["كم يستغرق تنفيذ الحديقة؟", "تختلف المدة باختلاف المساحة وحجم الأعمال المطلوبة، ونوضّح لك جدولاً زمنياً تقريبياً ضمن العرض بعد الاطلاع على تفاصيل الموقع."],
        ["هل تنفذون تجديد حديقة قائمة؟", "نعم، نتعامل مع الحدائق القائمة التي تحتاج إعادة تنسيق أو تجديد، كما نوفر أعمال الصيانة الدورية للحفاظ على المساحة الخضراء."],
      ],
    },
    en: {
      title: "Garden design",
      heading: "Garden design in Riyadh",
      metaTitle: "Garden Design in Riyadh | Design and Installation",
      metaDescription:
        "Design and installation of gardens for villas, homes and rest houses in Riyadh: planting, irrigation systems, natural and artificial turf, lighting and pathways. Get a quote for your project.",
      summary: "From the first sketch to the last seedling: planting, irrigation, lighting and pathways for a complete green space.",
      imageAlt: "A landscaped garden completed by Huqool Alsalam",
      intro: [
        "We turn the outdoor space at your home or rest house into an ordered, comfortable garden, starting with a survey of the site and a design, and going through to planting and installing the irrigation and lighting.",
        "We work to the size and nature of the site and the budget available, proposing the solutions that give the best result for the lowest cost, whether the garden is bare ground from the start or an existing garden in need of renewal.",
      ],
      includes: [
        ["Design", "A clear picture of how spaces, planting and features are laid out before any work starts."],
        ["Planting and trees", "Selecting and planting the trees, shrubs and flowers that suit the site."],
        ["Irrigation system", "Installing irrigation that keeps plants healthy and reduces water waste."],
        ["Natural turf", "Natural lawns, with the care they need explained up front."],
        ["Artificial turf", "A practical alternative needing less care, well suited to smaller spaces."],
        ["Lighting", "Lighting that picks out the garden's features and makes it usable at night."],
        ["Pathways and paving", "Organising movement through the garden and defining seating and routes."],
        ["Green walls", "Using walls to add greenery without giving up ground space."],
      ],
      audience: [
        "Villa and home owners",
        "Rest houses and farms",
        "Residential compounds",
        "Offices and commercial buildings",
      ],
      faqs: [
        ["How much does a garden cost to landscape?", "Cost depends on the size and condition of the site and the elements required, such as turf, irrigation, lighting and pathways. Send us your project details and we will quote against what you actually need."],
        ["Does the service include irrigation?", "Yes. The project can include irrigation sized to the area and the planting, and you can select it among the project elements when requesting a quote."],
        ["How long does a garden take?", "The time varies with the area and the scope of work. We set out an approximate schedule in the quote once we have seen the site details."],
        ["Do you renovate an existing garden?", "Yes. We work on existing gardens that need relandscaping or renewal, and we also carry out regular maintenance to keep the green space in good condition."],
      ],
    },
  },
  {
    slug: "landscape",
    quoteService: "landscape",
    icon: "mountain",
    image: "/images/nursery-hero-v2.webp",
    ar: {
      title: "اللاندسكيب",
      heading: "أعمال اللاندسكيب للمشاريع السكنية والتجارية",
      metaTitle: "أعمال اللاندسكيب للمشاريع في الرياض",
      metaDescription:
        "تنفيذ أعمال اللاندسكيب للمجمعات السكنية والمباني التجارية والمشاريع العامة: تصميم، مسطحات خضراء، أنظمة ري، إضاءة وممرات، مع إمكانية الصيانة الدورية.",
      summary: "حلول متكاملة للمساحات الخارجية في المشاريع الكبيرة، من التصميم حتى الصيانة.",
      imageAlt: "مساحات خضراء ضمن مشروع لاندسكيب",
      intro: [
        "نتولى أعمال اللاندسكيب للمساحات الخارجية في المشاريع السكنية والتجارية، حيث تحتاج المساحة إلى دراسة أوسع وتنسيق بين الزراعة وشبكات الري والإضاءة والممرات وحركة المستخدمين داخل الموقع.",
        "نعمل مع المطورين والمقاولين وإدارات المشاريع، ونوفر حلولاً قابلة للتنفيذ على مراحل بما يناسب الجدول الزمني للمشروع وميزانيته.",
      ],
      includes: [
        ["دراسة الموقع والتصميم", "قراءة طبيعة الأرض ومداخلها قبل اقتراح التوزيع المناسب."],
        ["المسطحات الخضراء", "تنفيذ المساحات الخضراء بما يناسب حجم الاستخدام المتوقع."],
        ["أنظمة الري", "شبكات ري للمساحات الكبيرة تقلل الهدر وتسهّل التشغيل."],
        ["الإضاءة الخارجية", "إضاءة الممرات والمداخل والمساحات المشتركة."],
        ["الممرات والمسارات", "تنظيم حركة المشاة وربط أجزاء المشروع ببعضها."],
        ["التشجير المحيط", "تشجير محيط المباني والمداخل والمواقف لتلطيف الأجواء."],
        ["الصيانة الدورية", "برامج عناية تحافظ على مظهر المشروع بعد التسليم."],
      ],
      audience: [
        "المطورون العقاريون",
        "شركات المقاولات",
        "المجمعات السكنية",
        "المباني التجارية والمكتبية",
        "المشاريع العامة والحكومية",
      ],
      faqs: [
        ["ما الفرق بين تنسيق الحدائق واللاندسكيب؟", "تنسيق الحدائق يتعلق غالباً بالمساحات المنزلية مثل حدائق الفلل والاستراحات، بينما تشمل أعمال اللاندسكيب المساحات الخارجية الأكبر في المشاريع، وتحتاج تخطيطاً أوسع لأنظمة الري والإضاءة وحركة المستخدمين."],
        ["هل تعملون مع المقاولين والمطورين؟", "نعم، نتعامل مع المقاولين والمطورين وإدارات المشاريع، ويمكننا العمل وفق جدول كميات أو مخططات جاهزة إن توفرت لديكم."],
        ["هل يمكن تنفيذ المشروع على مراحل؟", "نعم، يمكن تقسيم التنفيذ على مراحل تتوافق مع تسليم المشروع، ويوضَّح ذلك ضمن عرض السعر."],
        ["هل توفرون صيانة بعد التنفيذ؟", "نوفر أعمال صيانة دورية للحفاظ على المسطحات الخضراء والنباتات بعد التسليم، ويمكن الاتفاق عليها بشكل منفصل."],
      ],
    },
    en: {
      title: "Landscaping",
      heading: "Landscaping for residential and commercial projects",
      metaTitle: "Landscaping for Projects in Riyadh",
      metaDescription:
        "Landscaping for residential compounds, commercial buildings and public projects: design, green areas, irrigation systems, lighting and pathways, with ongoing maintenance available.",
      summary: "Complete solutions for outdoor space on larger projects, from design through to maintenance.",
      imageAlt: "Green areas within a landscaping project",
      intro: [
        "We take on the landscaping of outdoor space in residential and commercial projects, where the site calls for a broader study and for planting, irrigation, lighting, pathways and the movement of people to work together.",
        "We work with developers, contractors and project managers, and provide solutions that can be delivered in phases to suit the project's programme and budget.",
      ],
      includes: [
        ["Site study and design", "Reading the ground and its approaches before proposing a layout."],
        ["Green areas", "Delivering green space sized to the use it will actually get."],
        ["Irrigation systems", "Irrigation for large areas that cuts waste and is simple to operate."],
        ["Exterior lighting", "Lighting for pathways, entrances and shared areas."],
        ["Pathways and routes", "Organising pedestrian movement and connecting parts of the project."],
        ["Perimeter planting", "Planting around buildings, entrances and parking to soften the environment."],
        ["Ongoing maintenance", "Care programmes that keep the project looking right after handover."],
      ],
      audience: [
        "Property developers",
        "Contracting companies",
        "Residential compounds",
        "Commercial and office buildings",
        "Public and government projects",
      ],
      faqs: [
        ["What is the difference between garden design and landscaping?", "Garden design usually concerns domestic spaces such as villa gardens and rest houses, while landscaping covers the larger outdoor areas of a project and needs broader planning of irrigation, lighting and how people move through the site."],
        ["Do you work with contractors and developers?", "Yes. We work with contractors, developers and project managers, and we can work to a bill of quantities or to existing drawings if you have them."],
        ["Can the project be delivered in phases?", "Yes. Delivery can be divided into phases aligned with the project handover, and this is set out in the quote."],
        ["Do you provide maintenance after completion?", "We carry out regular maintenance to keep green areas and planting in good condition after handover, and this can be agreed separately."],
      ],
    },
  },
  {
    slug: "indoor-plants",
    quoteService: "indoor",
    icon: "houseplant",
    image: "/images/nursery-care-v2.webp",
    ar: {
      title: "النباتات الداخلية",
      heading: "النباتات الداخلية للمكاتب والمنازل",
      metaTitle: "نباتات داخلية للمكاتب والمنازل",
      metaDescription:
        "توريد وتنسيق النباتات الداخلية للمنازل والمكاتب والفنادق والمعارض، مع اختيار الأنواع المناسبة للإضاءة، وتوفير الأصص وخدمة العناية الدورية.",
      summary: "نباتات تناسب إضاءة المكان، مع الأصص والتنسيق وإمكانية العناية الدورية.",
      imageAlt: "العناية بالنباتات الداخلية",
      intro: [
        "النباتات الداخلية تضيف إحساساً بالراحة والحيوية للمكان، لكن نجاحها يعتمد على اختيار الأنواع التي تناسب الإضاءة المتاحة وطبيعة المكان ومستوى العناية الممكن.",
        "نساعدك على اختيار النباتات المناسبة لمساحتك سواء كانت منزلاً أو مكتباً أو مطعماً أو معرضاً، ونوفر الأصص المناسبة للديكور، مع إمكانية الاتفاق على عناية دورية تحافظ على النباتات على المدى الطويل.",
      ],
      includes: [
        ["اختيار الأنواع", "نباتات تناسب مستوى الإضاءة الطبيعية المتوفرة في المكان."],
        ["الأصص والديكور", "أصص وأحواض تناسب طابع المكان ومساحته."],
        ["التنسيق داخل المساحة", "توزيع النباتات بما يخدم شكل المكان وحركة الاستخدام."],
        ["العناية الدورية", "زيارات متابعة للري والتقليم واستبدال ما يحتاج استبدالاً."],
      ],
      audience: [
        "المنازل والشقق",
        "المكاتب والشركات",
        "الفنادق والمطاعم والمقاهي",
        "المعارض والمتاجر",
      ],
      faqs: [
        ["ما النباتات المناسبة لمكتب بإضاءة ضعيفة؟", "هناك أنواع تتحمل الإضاءة المنخفضة وتناسب المكاتب المغلقة. أخبرنا بطبيعة الإضاءة في المكان ليقترح عليك فريقنا الأنسب منها."],
        ["هل توفرون الأصص مع النباتات؟", "نعم، يمكنك طلب النباتات مع أصص وديكور مناسب، أو طلب النباتات فقط إذا كانت الأصص متوفرة لديك."],
        ["هل لديكم خدمة عناية دورية؟", "نعم، يمكن الاتفاق على زيارات دورية للعناية بالنباتات، وهي مناسبة بشكل خاص للمكاتب والمنشآت التي لا يوجد بها من يتابع النباتات يومياً."],
      ],
    },
    en: {
      title: "Indoor plants",
      heading: "Indoor plants for offices and homes",
      metaTitle: "Indoor Plants for Offices and Homes",
      metaDescription:
        "Supply and arrangement of indoor plants for homes, offices, hotels and showrooms, with species chosen to match the available light, pots provided, and an ongoing care service.",
      summary: "Plants matched to the light in your space, with pots, arrangement and optional ongoing care.",
      imageAlt: "Caring for indoor plants",
      intro: [
        "Indoor plants add a sense of comfort and life to a space, but whether they thrive depends on choosing species that suit the light available, the nature of the space, and how much care is realistic.",
        "We help you choose the right plants for your space, whether a home, an office, a restaurant or a showroom, and we supply pots that suit the interior, with the option of agreeing ongoing care that keeps the plants healthy over the long term.",
      ],
      includes: [
        ["Choosing species", "Plants matched to the level of natural light the space actually gets."],
        ["Pots and finish", "Pots and planters that suit the character and size of the space."],
        ["Arrangement in the space", "Placing plants to work with the shape of the space and how people move through it."],
        ["Ongoing care", "Follow-up visits for watering, pruning and replacing anything that needs it."],
      ],
      audience: [
        "Homes and apartments",
        "Offices and companies",
        "Hotels, restaurants and cafes",
        "Showrooms and shops",
      ],
      faqs: [
        ["Which plants suit an office with low light?", "Some species tolerate low light well and suit enclosed offices. Tell us about the light in the space and our team will suggest the most suitable."],
        ["Do you supply pots with the plants?", "Yes. You can order plants with pots and a suitable finish, or plants only if you already have pots."],
        ["Do you offer an ongoing care service?", "Yes. Regular care visits can be arranged, which suits offices and institutions in particular, where nobody looks after the plants day to day."],
      ],
    },
  },
  {
    slug: "fertilizers-pesticides",
    quoteService: "supplies",
    icon: "flask",
    image: "/images/nursery-care-v2.webp",
    ar: {
      title: "الأسمدة والمبيدات",
      heading: "الأسمدة والمبيدات الزراعية",
      metaTitle: "أسمدة ومبيدات زراعية",
      metaDescription:
        "أسمدة ومبيدات ومستلزمات تغذية النباتات وحمايتها، للاستخدام المنزلي وللمشاريع والمزارع، مع إرشادات الاستخدام المناسبة لحالة نباتاتك.",
      summary: "منتجات تغذية ووقاية للنباتات، للاستخدام المنزلي وبكميات المشاريع.",
      imageAlt: "منتجات العناية بالنباتات",
      intro: [
        "العناية بالنبات لا تتوقف عند الزراعة. التغذية السليمة والوقاية من الآفات هما ما يحافظ على النباتات خضراء وقوية على مدار السنة.",
        "نوفّر أسمدة ومبيدات ومستلزمات تربة بكميات تناسب الاستخدام المنزلي وكذلك المشاريع والمزارع، ونساعدك على تحديد المناسب لحالة نباتاتك بدل التجربة والخطأ.",
      ],
      includes: [
        ["الأسمدة", "خيارات تغذية تناسب أنواع النباتات ومراحل نموها."],
        ["المبيدات", "منتجات للتعامل مع الآفات والأمراض التي تصيب النباتات."],
        ["التربة والبيتموس", "تربة ومحسّنات تساعد على نجاح الزراعة والنمو."],
        ["إرشادات الاستخدام", "توضيح الطريقة والكمية المناسبة لتجنب الإضرار بالنبات."],
      ],
      audience: [
        "أصحاب الحدائق المنزلية",
        "المزارع",
        "شركات الصيانة وتنسيق الحدائق",
        "المشاريع والمجمعات",
      ],
      faqs: [
        ["كيف أعرف السماد المناسب لنباتاتي؟", "يعتمد ذلك على نوع النبات ومرحلة نموه وطبيعة التربة. صف لنا نباتاتك وحالتها ويساعدك فريقنا على اختيار المناسب."],
        ["نباتاتي تصفرّ أوراقها، ما الحل؟", "اصفرار الأوراق قد يكون بسبب الري أو نقص التغذية أو إصابة بآفة. أرسل لنا وصفاً أو صورة للحالة عبر واتساب لنوجّهك إلى المنتج المناسب."],
        ["هل توفرون كميات جملة للمشاريع؟", "نعم، نوفر كميات تناسب المشاريع والمزارع وشركات الصيانة، ويمكنك تحديد ذلك عند طلب عرض السعر."],
      ],
    },
    en: {
      title: "Fertilizers and pesticides",
      heading: "Agricultural fertilizers and pesticides",
      metaTitle: "Agricultural Fertilizers and Pesticides",
      metaDescription:
        "Fertilizers, pesticides and supplies for feeding and protecting plants, for home use and for projects and farms, with guidance on what suits the condition of your plants.",
      summary: "Feeding and protection products for plants, for home use and in project quantities.",
      imageAlt: "Plant care products",
      intro: [
        "Plant care does not end at planting. Proper feeding and protection from pests are what keep plants green and strong through the year.",
        "We supply fertilizers, pesticides and soil products in quantities suited to home use as well as to projects and farms, and we help you identify what suits the condition of your plants instead of working by trial and error.",
      ],
      includes: [
        ["Fertilizers", "Feeding options matched to plant types and their stage of growth."],
        ["Pesticides", "Products for dealing with the pests and diseases that affect plants."],
        ["Soil and peat moss", "Soil and improvers that help planting take and grow well."],
        ["Usage guidance", "Clear direction on method and quantity, so the plant is not harmed."],
      ],
      audience: [
        "Home garden owners",
        "Farms",
        "Maintenance and landscaping companies",
        "Projects and compounds",
      ],
      faqs: [
        ["How do I know which fertilizer my plants need?", "It depends on the type of plant, its stage of growth and the soil. Describe your plants and their condition and our team will help you choose."],
        ["My plant leaves are turning yellow, what should I do?", "Yellowing leaves can come from watering, a lack of nutrients, or a pest. Send us a description or a photo on WhatsApp and we will point you to the right product."],
        ["Do you supply wholesale quantities for projects?", "Yes. We supply quantities suited to projects, farms and maintenance companies, and you can specify this when requesting a quote."],
      ],
    },
  },
  {
    slug: "garden-tools",
    quoteService: "supplies",
    icon: "wrench",
    image: "/images/landscape-project-v2.webp",
    ar: {
      title: "الأدوات الزراعية",
      heading: "الأدوات والمستلزمات الزراعية",
      metaTitle: "أدوات ومستلزمات زراعية",
      metaDescription:
        "أدوات ومستلزمات زراعية للعناية بالحدائق والنباتات: أدوات القص والتقليم، أدوات الزراعة، مستلزمات الري، والأصص والأحواض.",
      summary: "كل ما تحتاجه للعناية بحديقتك، من أدوات التقليم إلى مستلزمات الري.",
      imageAlt: "أدوات ومستلزمات العناية بالحدائق",
      intro: [
        "الأدوات المناسبة تختصر الوقت وتحمي النبات من الضرر أثناء العناية به، خاصة في أعمال التقليم وإعادة الزراعة.",
        "نوفّر مجموعة من الأدوات والمستلزمات التي تحتاجها للعناية بحديقتك أو مشروعك، بخيارات تناسب الاستخدام المنزلي والاستخدام المهني المتكرر.",
      ],
      includes: [
        ["أدوات القص والتقليم", "مقصات وأدوات تشذيب تناسب الشجيرات والأشجار."],
        ["أدوات الحفر والزراعة", "أدوات تساعد في تجهيز التربة وزراعة الشتلات."],
        ["مستلزمات الري", "مستلزمات تساعد على إيصال المياه بانتظام للنباتات."],
        ["الأصص والأحواض", "أحجام وخامات مختلفة للاستخدام الداخلي والخارجي."],
      ],
      audience: [
        "أصحاب الحدائق المنزلية",
        "شركات تنسيق الحدائق والصيانة",
        "المزارع",
        "المجمعات والمنشآت",
      ],
      faqs: [
        ["هل الأدوات مناسبة للاستخدام المهني المتكرر؟", "نوفر خيارات للاستخدام المنزلي وأخرى تتحمل الاستخدام اليومي المتكرر. وضّح طبيعة استخدامك ليصلك العرض المناسب."],
        ["هل يمكن طلب أدوات مع شتلات في نفس الطلب؟", "نعم، يمكنك اختيار أكثر من خدمة في نفس طلب عرض السعر، ويصلنا طلبك مجمّعاً في رسالة واحدة."],
      ],
    },
    en: {
      title: "Garden tools",
      heading: "Garden tools and supplies",
      metaTitle: "Garden Tools and Supplies",
      metaDescription:
        "Tools and supplies for caring for gardens and plants: cutting and pruning tools, planting tools, irrigation supplies, and pots and planters.",
      summary: "Everything you need to look after your garden, from pruning tools to irrigation supplies.",
      imageAlt: "Garden care tools and supplies",
      intro: [
        "The right tools save time and protect the plant from damage while you care for it, particularly when pruning and replanting.",
        "We supply the tools and equipment you need to look after your garden or project, with options for home use and for repeated professional use.",
      ],
      includes: [
        ["Cutting and pruning tools", "Shears and trimming tools suited to shrubs and trees."],
        ["Digging and planting tools", "Tools that help prepare soil and plant seedlings."],
        ["Irrigation supplies", "Equipment that helps deliver water to plants consistently."],
        ["Pots and planters", "A range of sizes and materials for indoor and outdoor use."],
      ],
      audience: [
        "Home garden owners",
        "Landscaping and maintenance companies",
        "Farms",
        "Compounds and institutions",
      ],
      faqs: [
        ["Are the tools suitable for repeated professional use?", "We stock options for home use and others built for repeated daily use. Tell us how you will use them and we will quote accordingly."],
        ["Can I order tools and seedlings in the same request?", "Yes. You can select more than one service in the same quote request, and it reaches us together in a single message."],
      ],
    },
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

// Flattens a service for one language: shared fields plus that locale's words.
export const localizeService = (service, locale) =>
  service && { ...service, ...(service[locale] || service.ar) };

export const getServices = (locale) => SERVICES.map((s) => localizeService(s, locale));
export const getService = (slug, locale) =>
  localizeService(SERVICES.find((s) => s.slug === slug), locale);
