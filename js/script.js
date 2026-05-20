'use strict';

const mainNav = document.getElementById("mainNav");
const backToTopBtn = document.getElementById("backToTop");
const searchInput = document.getElementById("searchInput");
const filterPills = document.getElementById("filterPills");

let activeCategory = "All";
let searchQuery = "";

const CATEGORY_CONFIG = [
  { key: "Beach",           icon: "🏖️", label: "Beach"           },
  { key: "Island",          icon: "🏝️", label: "Island"          },
  { key: "Mountain",        icon: "⛰️", label: "Mountain"        },
  { key: "Waterfall",       icon: "💧", label: "Waterfall"       },
  { key: "Historical Site", icon: "🏛️", label: "Historical Site" },
  { key: "Food Destination",icon: "🍽️", label: "Food Destination"},
  { key: "Adventure",       icon: "🧗", label: "Adventure"       },
  { key: "Nature",          icon: "🌿", label: "Nature"          },
];

const destinations = [
  // --- BUENAVISTA (7) ---
  {
    name:         "Roca Encantada",
    municipality: "Buenavista",
    category:     "Historical Site",
    image:        "images/RocaEncantada.jpg",
    shortDesc:    "Heritage summer house of the Lopez Clan built atop a hilltop in 1910 — declared a National Heritage site.",
    fullDesc:     "One of Guimaras' most famous landmarks, Roca Encantada ('Enchanted Rock') is the summer house of the Lopez Clan built in 1910 in honor of Doña Presentacion Hofilena Lopez. It sits atop a rocky promontory overlooking the Iloilo Strait and the Siete Pecados islets, and has been declared a heritage house by the National Heritage Institute of the Philippines.",
    activities:   "Heritage tours, photography, boat tours of surrounding islets, historical sightseeing",
    bestTime:     "November to May",
    entranceFee:  "Contact local tourism office for current rates",
    openingHours: "By arrangement — contact Buenavista tourism office",
    tip:          "Accessible by boat from Buenavista port. Best combined with the Siete Pecados islets boat tour."
  },
  {
    name:         "Navalas Church",
    municipality: "Buenavista",
    category:     "Historical Site",
    image:        "images/NavalasChurch.jpg",
    shortDesc:    "Oldest and only existing heritage church in Guimaras, built in 1880 — still an active parish.",
    fullDesc:     "Built in 1880, the Navalas Church is the oldest Roman Catholic church and the only existing heritage church in Guimaras. Its architecture closely resembles the Jaro Cathedral in Iloilo City, owing to Guimaras being a parish under Jaro during the Spanish colonial period. Still an active parish and a popular pilgrimage destination.",
    activities:   "Church visit, heritage tour, photography, religious pilgrimage",
    bestTime:     "Year-round; visit during Sunday Mass for the full cultural experience",
    entranceFee:  "Free",
    openingHours: "Open daily for masses — check parish schedule for times",
    tip:          "Dress modestly — no sleeveless shirts or shorts inside the church. Visit during a Sunday morning Mass for the best atmosphere."
  },
  {
    name:         "MacArthur Wharf",
    municipality: "Buenavista",
    category:     "Historical Site",
    image:        "images/MacArthurWharf.jpg",
    shortDesc:    "Historic wharf built under Douglas MacArthur's supervision — a scenic cultural and historical landmark.",
    fullDesc:     "MacArthur Wharf (originally Santo Rosario Wharf) was constructed under the supervision of a young Douglas MacArthur during the American colonial period and remains in use today. It is a scenic waterfront gem offering tourists a blend of natural beauty and cultural experience. MacArthur survived an ambush here in 1903 while working as an engineer in Guimaras.",
    activities:   "Historical sightseeing, photography, waterfront strolls, sunset viewing",
    bestTime:     "Year-round; late afternoon is especially scenic",
    entranceFee:  "Free",
    openingHours: "Open daily",
    tip:          "Best visited in the late afternoon for golden-hour photos over the Iloilo Strait."
  },
  {
    name:         "Camp Jossman Cemetery",
    municipality: "Buenavista",
    category:     "Historical Site",
    image:        "images/CampJossman.jpg",
    shortDesc:    "American military cemetery from the Spanish–American War era — a quiet, historically significant site.",
    fullDesc:     "Camp Jossman was a United States Army cantonment constructed near Buenavista on Guimaras Island after the Spanish–American War. Named for Albert L. Jossman, a University of Michigan graduate who served in the 22nd Infantry Regiment. The cemetery is a sobering and historically significant site for visitors interested in colonial and wartime history.",
    activities:   "Historical sightseeing, quiet reflection, photography, history tours",
    bestTime:     "Year-round",
    entranceFee:  "Free",
    openingHours: "Open daily",
    tip:          "Maintain a respectful and quiet atmosphere — this is an active historical cemetery."
  },
  {
    name:         "Siete Pecados Islands",
    municipality: "Buenavista",
    category:     "Island",
    image:        "images/SietePecados.jpg",
    shortDesc:    "Seven rocky islets between Buenavista and Dumangas, Iloilo — excellent for snorkeling and boat tours.",
    fullDesc:     "Siete Pecados (Seven Sins Islets) is a group of seven rocky islets located between Buenavista, Guimaras and Dumangas, Iloilo. The islets are part of a scenic tourist zone alongside the nearby Roca Encantada heritage site. Known for clear waters and rich marine life, they are perfect for snorkeling and boat tours.",
    activities:   "Boat tours, snorkeling, photography, island hopping, marine life observation",
    bestTime:     "November to May",
    entranceFee:  "Boat hire fee applies (arrange from Buenavista port)",
    openingHours: "Day trips only",
    tip:          "Often combined with Roca Encantada. Hire a boat from the Buenavista wharf area for the full experience."
  },
  {
    name:         "Daliran Cave",
    municipality: "Buenavista",
    category:     "Adventure",
    image:        "images/DaliranCave.jpg",
    shortDesc:    "Vast cave chambers with unique rock formations — used as a WWII refuge for local civilians.",
    fullDesc:     "Daliran Cave in Sitio Daliran, Buenavista, is known for its vast chambers, unique stalactite and stalagmite formations, and refreshing underground air. During World War II, it served as a refuge for local civilians fleeing Japanese forces. Today it is a popular eco-tourism and adventure destination.",
    activities:   "Cave exploration, spelunking, history tours, photography",
    bestTime:     "Year-round; avoid visiting immediately after heavy rains",
    entranceFee:  "Small guide fee required",
    openingHours: "8:00 AM – 5:00 PM daily",
    tip:          "A local guide is required for safety. Wear closed-toed shoes and bring a flashlight. Never visit alone."
  },
  {
    name:         "Tely's Beach House",
    municipality: "Buenavista",
    category:     "Beach",
    image:        "images/Tely'sBeachHouse.jpg",
    shortDesc:    "Charming rustic beachfront accommodation with a pool in Brgy. East Valencia — quiet and relaxing.",
    fullDesc:     "Tely's Beach House is a charming rustic beachfront accommodation in Barangay East Valencia, Buenavista. It offers air-conditioned rooms and a swimming pool for overnight guests, providing a quiet and relaxing escape with direct beach access, away from the island's busier tourist hotspots.",
    activities:   "Beach swimming, pool relaxation, overnight stays, peaceful nature walks",
    bestTime:     "November to May",
    entranceFee:  "Day use and overnight rates apply",
    openingHours: "Open daily; Check-in: 2:00 PM",
    tip:          "Book in advance especially during holidays and peak weekends. A peaceful alternative to more crowded resorts."
  },

  // --- JORDAN (7) ---
  {
    name:         "Smallest Plaza in the Philippines",
    municipality: "Jordan",
    category:     "Historical Site",
    image:        "images/SmallestPlaza.jpg",
    shortDesc:    "Former Guinness World Records holder — a 200–300 sq.m. plaza with a Jose Rizal monument.",
    fullDesc:     "Located in Jordan, this tiny plaza was once recognized as the Smallest Plaza in the Philippines and held a Guinness World Records title. Centered on just 200–300 square meters, it features a statue of national hero Dr. Jose Rizal and a charming garden. A unique cultural and historical photo opportunity on every Guimaras itinerary.",
    activities:   "Photography, historical sightseeing, cultural appreciation",
    bestTime:     "Year-round",
    entranceFee:  "Free",
    openingHours: "Open daily",
    tip:          "Located near the Jordan town center — easily combined with the Trappist Abbey and Provincial Capitol in one tour."
  },
  {
    name:         "Our Lady of the Philippines Trappist Abbey",
    municipality: "Jordan",
    category:     "Historical Site",
    image:        "images/abbey.jpg",
    shortDesc:    "The only Trappist monastery in the Philippines — monks produce world-famous mango and pineapple jams.",
    fullDesc:     "Founded in 1972, Our Lady of the Philippines Trappist Abbey in Jordan is the only Trappist monastery in the Philippines. Home to around 35 Cistercian monks who live by prayer and work. The monastery is famous for its Trappist Monastic Products — pineapple and mango jams, chocolates, and other handcrafted goods sold in the gift shop. Open for visits and spiritual retreats.",
    activities:   "Spiritual retreat, purchasing monastery products, peaceful walking, prayer and reflection",
    bestTime:     "Year-round",
    entranceFee:  "Free (donations welcome)",
    openingHours: "Mon–Sat: 6:00 AM–11:00 AM & 2:00 PM–5:00 PM; Sun: 10:00 AM–11:00 AM & 2:00 PM–5:00 PM",
    tip:          "Products sell out fast — arrive in the morning. Observe silence and dress modestly inside the monastery grounds."
  },
  {
    name:         "Balaan Bukid (Holy Mountain)",
    municipality: "Jordan",
    category:     "Mountain",
    image:        "images/HolyMountain.jpg",
    shortDesc:    "558-foot pilgrimage mountain with a church and cross visible from Iloilo — site of the Pagtaltal reenactment.",
    fullDesc:     "Balaan Bukid (Holy Mountain) is a 558-foot peak in Barangay Balcon Melliza, Jordan. It features a church, a large cross visible from Iloilo City, and a Stations of the Cross trail. It is a major pilgrimage site especially during Holy Week, when the famous Pagtaltal sa Balaan Bukid — a dramatic Passion of Christ reenactment — draws thousands of pilgrims and tourists.",
    activities:   "Pilgrimage, hiking, photography, religious ceremonies, Stations of the Cross",
    bestTime:     "Year-round; Holy Week (March/April) is the most atmospheric",
    entranceFee:  "Free",
    openingHours: "Open daily",
    tip:          "Dress modestly. The climb is strenuous — take breaks at the Stations of the Cross. Start early to avoid the midday heat."
  },
  {
    name:         "Tatlong Pulo Beach",
    municipality: "Jordan",
    category:     "Island",
    image:        "images/PuloBeach.jpg",
    shortDesc:    "Three peaceful islets on Guimaras' southeastern coast — turquoise waters, limestone cliffs, unspoiled beach.",
    fullDesc:     "Tatlong Pulo Island (Three Islets) is a peaceful destination on the southeastern coast of Guimaras, known for its clear turquoise waters, dramatic limestone cliffs, and unspoiled beach setting. Accessible only by boat, it is ideal for quiet island getaways, snorkeling, and photography.",
    activities:   "Swimming, snorkeling, island hopping, photography, beach picnics",
    bestTime:     "November to May",
    entranceFee:  "Boat hire required (arrange from Jordan port)",
    openingHours: "Day trips only",
    tip:          "Best visited as part of an island hopping tour from Jordan port. Pack your own food and water — no facilities on the island."
  },
  {
    name:         "Ave Maria Island",
    municipality: "Jordan",
    category:     "Island",
    image:        "images/AveMariaIsland.jpg",
    shortDesc:    "Picture-perfect white-sand islet with crystal-clear turquoise waters — the highlight of island hopping tours.",
    fullDesc:     "Ave Maria Island is a small, stunning white-sand islet off the coast of Jordan, Guimaras. Surrounded by crystal-clear turquoise waters and accessible only by boat, it is consistently ranked as the top highlight of any Guimaras island hopping tour — ideal for swimming, snorkeling, and photography.",
    activities:   "Swimming, snorkeling, island hopping, photography, sunbathing",
    bestTime:     "November to May",
    entranceFee:  "Included in island hopping package (arrange from Jordan port)",
    openingHours: "Day trips only",
    tip:          "Apply reef-safe sunscreen and bring plenty of water. Best experienced as part of a half-day island hopping tour."
  },
  {
    name:         "The Pitstop Restaurant",
    municipality: "Jordan",
    category:     "Food Destination",
    image:        "images/ThePitstop.jpg",
    shortDesc:    "Famous for Mango Pizza — sweet Guimaras mangoes, melted cheese, and cashews on a crispy crust.",
    fullDesc:     "The Pitstop Restaurant in Jordan is one of Guimaras' most iconic dining destinations. Its legendary Mango Pizza — combining fresh Guimaras mangoes with melted cheese and crushed cashews on a crispy crust — draws food lovers from across the Philippines. The menu also features Mango Beef Bulalo, Pork Adobo with Mango Twist, and other creative mango-infused Filipino dishes.",
    activities:   "Dining, food photography, local mango-infused cuisine tasting",
    bestTime:     "Year-round; arrive early as popular dishes sell out fast",
    entranceFee:  "No entrance fee (menu prices apply)",
    openingHours: "10:00 AM – 9:00 PM daily",
    tip:          "Mango Pizza sells out fast — call ahead to reserve your order. Conveniently located near the Jordan ferry terminal."
  },
  {
    name:         "Guimaras Provincial Capitol",
    municipality: "Jordan",
    category:     "Historical Site",
    image:        "images/GuimarasCapitol.jpg",
    shortDesc:    "Provincial government seat with the iconic GUIMARAS letter installation, garden, and local museum.",
    fullDesc:     "Located in San Miguel, Jordan, the Guimaras Provincial Capitol is the official seat of the provincial government. The modern grounds feature the large 'GUIMARAS' letter installation — a must-photograph landmark — and house a museum dedicated to local history, agriculture, and Guimaras culture. A great orientation point for first-time visitors.",
    activities:   "Photography, museum visit, sightseeing, learning about provincial history and governance",
    bestTime:     "Year-round; museum open weekdays",
    entranceFee:  "Free",
    openingHours: "Monday – Friday: 8:00 AM – 5:00 PM",
    tip:          "Visit on a weekday to access the museum. The GUIMARAS letters are best photographed in the morning light."
  },

  // --- NUEVA VALENCIA (8) ---
  {
    name:         "Guisi Lighthouse",
    municipality: "Nueva Valencia",
    category:     "Historical Site",
    image:        "images/GuisiLighthouse.jpg",
    shortDesc:    "18th-century Spanish colonial lighthouse — 15-minute trek to panoramic sea views and colonial ruins.",
    fullDesc:     "The Guisi Lighthouse is an 18th-century Spanish colonial structure built to guide mariners through the Iloilo and Guimaras Strait. A 15-minute uphill trek leads to panoramic views of the surrounding seas and the ruins of a Spanish colonial outpost. The adjacent Guisi Beach offers calm, shallow waters for swimming.",
    activities:   "Hiking, panoramic photography, history tours, beachcombing at Guisi Beach",
    bestTime:     "November to April",
    entranceFee:  "Free",
    openingHours: "Open daily, sunrise to sunset",
    tip:          "Wear closed-toed shoes for the rocky uphill path. No vendors on site — bring water and snacks."
  },
  {
    name:         "St. Vincent Ferrer Church",
    municipality: "Nueva Valencia",
    category:     "Historical Site",
    image:        "images/Church.jpg",
    shortDesc:    "Historic Catholic church dedicated to Saint Vincent Ferrer, the 'Angel of Judgment' — a centuries-old parish.",
    fullDesc:     "A historic Catholic church in Nueva Valencia dedicated to Saint Vincent Ferrer (1350–1419), a renowned Spanish Dominican friar known as the 'Angel of the Judgment.' The church is an important spiritual and heritage landmark for the municipality and continues to serve the local community as an active parish.",
    activities:   "Church visit, heritage appreciation, photography, religious pilgrimage",
    bestTime:     "Year-round; especially during the town fiesta in April",
    entranceFee:  "Free",
    openingHours: "Open daily for masses",
    tip:          "Dress modestly when entering. Confirm mass schedule with the local parish office in advance."
  },
  {
    name:         "Taklong Island",
    municipality: "Nueva Valencia",
    category:     "Island",
    image:        "images/taklongisland.jpg",
    shortDesc:    "National marine park with pristine coral reefs, diverse sea life, and white-sand shores.",
    fullDesc:     "Taklong Island is the main island of the Taklong and Tandog Group of Islands Natural Park — a protected marine biodiversity zone. Formerly known as the Taklong Island National Marine Reserve, it features healthy coral reefs, diverse fish species, and pristine beaches. A model for marine conservation in the Philippines.",
    activities:   "Snorkeling, diving, birdwatching, nature walks, marine life observation",
    bestTime:     "November to May",
    entranceFee:  "Environmental fee required (paid at the barangay hall)",
    openingHours: "Day tours only — no overnight camping",
    tip:          "This is a strictly protected area — do not touch or collect corals or shells. Hire a boat from Alubihod Beach."
  },
  {
    name:         "Alubihod Beach",
    municipality: "Nueva Valencia",
    category:     "Beach",
    image:        "images/AlubihodBeach.jpg",
    shortDesc:    "Pristine white-sand cove with clear waters and rock formations — the island-hopping hub of Guimaras.",
    fullDesc:     "Alubihod Beach in Nueva Valencia is one of the most popular scenic coves in Guimaras. Known for its fine white sand, unique rock formations, and crystal-clear turquoise waters, it serves as the central hub for island hopping tours to nearby islets including Taklong Island. Lined with resorts including Raymen Beach Resort and Alobijod Cove Resort.",
    activities:   "Swimming, snorkeling, island hopping, kayaking, beach picnics, resort stays",
    bestTime:     "November to May",
    entranceFee:  "No entrance fee (resort day-use rates apply)",
    openingHours: "Open daily",
    tip:          "Arrive early to secure the best spots. Hire island hopping boats at the resort pier for tours to surrounding islets."
  },
  {
    name:         "Villa Igang Beach Resort",
    municipality: "Nueva Valencia",
    category:     "Beach",
    image:        "images/villaigang.jpg",
    shortDesc:    "Vast resort with botanical garden, natural lagoon, coral cave, diving site, and multiple beach coves.",
    fullDesc:     "Villa Igang Beach Resort is a vast, lush resort enveloped in tropical greenery along the coast of Nueva Valencia. Unique features include a botanical garden, swimming pool, natural lagoon, coral cave, dive site, and multiple small private beaches. One of the most diverse and immersive resort experiences in Guimaras.",
    activities:   "Swimming, diving, snorkeling, garden walks, lagoon exploration, overnight stays",
    bestTime:     "November to May",
    entranceFee:  "Day use and overnight rates apply",
    openingHours: "Open daily; Check-in: 2:00 PM",
    tip:          "Book in advance for overnight stays. The coral cave and natural lagoon are must-see features within the resort grounds."
  },
  {
    name:         "Andana Resort",
    municipality: "Nueva Valencia",
    category:     "Adventure",
    image:        "images/andana.jpg",
    shortDesc:    "Water park and entertainment resort in Nueva Valencia — fun-filled destination for families and groups.",
    fullDesc:     "Andana Resort Guimaras features a water park with multiple attractions, pools, and entertainment facilities for all ages. Popular with families, group tours, and corporate events, it delivers a high-energy, fun-filled holiday experience in a beachfront setting in Nueva Valencia.",
    activities:   "Water park rides, swimming pools, group entertainment, beach relaxation, events",
    bestTime:     "Year-round; peak season March–May",
    entranceFee:  "Entrance and day-use rates apply (check website for current pricing)",
    openingHours: "8:00 AM – 6:00 PM daily",
    tip:          "Arrive early on weekends and holidays — it gets very crowded. Book accommodation packages in advance."
  },
  {
    name:         "Nature's Eye Beach Resort",
    municipality: "Nueva Valencia",
    category:     "Nature",
    image:        "images/eyebeach.jpg",
    shortDesc:    "Where forest meets the sea — a unique eco-retreat in Barangay Tando, Nueva Valencia.",
    fullDesc:     "Located in Barangay Tando, Nueva Valencia, Nature's Eye Resort is a hidden paradise where lush tropical forest meets the sea. Designed for eco-conscious travelers, it offers direct beach access, forest walks, birdwatching, and a peaceful, uncrowded environment far from the typical resort scene.",
    activities:   "Nature walks, beach swimming, birdwatching, eco-tourism, relaxation",
    bestTime:     "Year-round",
    entranceFee:  "Day use and overnight rates apply",
    openingHours: "Open daily; Check-in: 2:00 PM",
    tip:          "Book ahead — it has limited rooms. Perfect for eco-conscious travelers who prefer nature over large resort amenities."
  },
  {
    name:         "Raymen Beach Resort",
    municipality: "Nueva Valencia",
    category:     "Beach",
    image:        "images/raymen.jpg",
    shortDesc:    "Well-known budget-friendly resort on Alubihod Beach — the ideal base for island hopping tours.",
    fullDesc:     "Raymen Beach Resort is a well-known, budget-friendly accommodation located directly along the famous Alubihod Beach in Nueva Valencia. One of the most popular choices for both local and foreign tourists, it offers easy access to beach activities and the island hopping tours that depart from Alubihod cove.",
    activities:   "Swimming, island hopping, beach lounging, overnight stays, snorkeling",
    bestTime:     "November to May",
    entranceFee:  "Day use and room rates apply",
    openingHours: "Open daily; Check-in: 2:00 PM",
    tip:          "Great value for money with direct Alubihod Beach access. Book 2–3 weeks ahead during peak season and Manggahan Festival in May."
  },

  // --- SAN LORENZO (7) ---
  {
    name:         "Vilches Beach Resort",
    municipality: "San Lorenzo",
    category:     "Beach",
    image:        "images/VilchesBeach.jpg",
    shortDesc:    "Modern yet authentic beachfront resort in San Lorenzo serving Filipino cuisine and home-made dishes.",
    fullDesc:     "Vilches Beach Resort is a modern yet authentic resort in San Lorenzo catering to both local and international tourists. It offers Filipino cuisine and a variety of home-made dishes in a relaxing beachfront setting. A convenient base for exploring the San Lorenzo Wind Farm and other nearby attractions.",
    activities:   "Beach swimming, dining on Filipino cuisine, relaxation, Wind Farm sightseeing",
    bestTime:     "Year-round",
    entranceFee:  "Day use and room rates apply",
    openingHours: "Open daily; Check-in: 2:00 PM",
    tip:          "Ask the staff to arrange habal-habal (motorcycle taxi) transport to the Wind Farm. Good base for a full San Lorenzo day."
  },
  {
    name:         "San Lorenzo Wind Farm",
    municipality: "San Lorenzo",
    category:     "Adventure",
    image:        "images/WindFarm.jpg",
    shortDesc:    "First wind farm in the Visayas — 54 massive turbines generating power for 48,000+ households.",
    fullDesc:     "The San Lorenzo Wind Farm is a 54 MW renewable energy facility — the first wind farm in the Visayas region. Generating over 120 gigawatt-hours of electricity annually to power more than 48,000 households, its sweeping rows of giant turbines set against green hills and blue skies have made it one of Guimaras' most photographed and visited landmarks.",
    activities:   "Photography, sightseeing, cycling tours, picnicking, renewable energy appreciation",
    bestTime:     "Year-round; late afternoon golden hour is spectacular",
    entranceFee:  "Free (no access inside turbine restricted zones)",
    openingHours: "Open daily",
    tip:          "Rent a habal-habal from Jordan town to reach the windmills. Combine with MJ Grapes Farm nearby for a complete San Lorenzo day."
  },
  {
    name:         "Holy Family Hills",
    municipality: "San Lorenzo",
    category:     "Historical Site",
    image:        "images/HolyFamilyHills.jpg",
    shortDesc:    "Hilltop religious site with life-sized biblical statues, garden chapel, and panoramic countryside views.",
    fullDesc:     "Located in Tamborong, San Lorenzo, Holy Family Hills is a spiritual landmark featuring life-sized biblical statues set along a beautiful hillside garden path, a chapel, and sweeping panoramic views of the San Lorenzo countryside. Popular as a pilgrimage destination especially during Holy Week, and open year-round for prayer, meditation, and reflection.",
    activities:   "Religious pilgrimage, meditation, photography, garden walks, spiritual reflection",
    bestTime:     "Year-round; especially Holy Week (March/April)",
    entranceFee:  "Free (donations appreciated)",
    openingHours: "6:00 AM – 6:00 PM daily",
    tip:          "Dress modestly. Wear comfortable walking shoes for the hillside garden path. Visit early morning for cooler temperatures and better light."
  },
  {
    name:         "Sapal Weaving Village",
    municipality: "San Lorenzo",
    category:     "Nature",
    image:        "images/SapalWeavingVillage.jpg",
    shortDesc:    "Community-based tourism site where weavers craft bags, hats, and mats from native 'baryos' leaves.",
    fullDesc:     "Sapal Weaving Village is a community-based tourism site in Barangay Sapal, San Lorenzo. Local artisans craft a variety of products from native Pandanus (baryos) leaves — bags, hats, wallets, mats, and slippers — using traditional weaving techniques passed down through generations. Visitors can watch the process live and purchase products directly.",
    activities:   "Live weaving demonstrations, souvenir shopping, cultural immersion, photography",
    bestTime:     "Year-round",
    entranceFee:  "Free",
    openingHours: "Monday – Saturday: 8:00 AM – 5:00 PM",
    tip:          "Buy products directly from the weavers — excellent authentic pasalubong. Great souvenirs unique to Guimaras."
  },
  {
    name:         "Tumalintinan Point",
    municipality: "San Lorenzo",
    category:     "Nature",
    image:        "images/TumalintinanPoint.jpg",
    shortDesc:    "Marine conservation area in Suclaran dedicated to eco-tourism and observing coastal biodiversity.",
    fullDesc:     "Located in Suclaran, San Lorenzo, Tumalintinan Point is an eco-tourism site dedicated to marine conservation. It serves as a destination for observing local coastal and marine biodiversity, conducting environmental education activities, and experiencing the natural beauty of Guimaras in a sustainable and responsible way.",
    activities:   "Marine conservation tours, eco-tourism, snorkeling, birdwatching, nature walks",
    bestTime:     "November to May",
    entranceFee:  "Contact San Lorenzo tourism office for current rates",
    openingHours: "Open daily during daylight hours",
    tip:          "Contact the local barangay office in advance to arrange a guided visit. Ideal for eco-conscious and educational travel."
  },
  {
    name:         "Bamboo Garden Restaurant",
    municipality: "San Lorenzo",
    category:     "Food Destination",
    image:        "images/bammboorestaurant.jpg",
    shortDesc:    "Relaxing open-air restaurant with live music, natural views, and authentic local cuisine in San Lorenzo.",
    fullDesc:     "Bamboo Garden Restaurant in San Lorenzo offers a memorable dining experience in an open-air bamboo setting surrounded by lush natural scenery. Known for great live music, a relaxed and inviting atmosphere, and authentic local Filipino cuisine made with fresh Guimaras ingredients. A popular stop after visiting the San Lorenzo Wind Farm.",
    activities:   "Dining, live music appreciation, relaxation, scenic nature views",
    bestTime:     "Year-round; evenings are especially atmospheric",
    entranceFee:  "No entrance fee (menu prices apply)",
    openingHours: "10:00 AM – 10:00 PM daily (confirm current hours)",
    tip:          "Great spot to unwind after the Wind Farm tour. Try local dishes featuring Guimaras ingredients from the seasonal menu."
  },
  {
    name:         "MJ Grapes Farm",
    municipality: "San Lorenzo",
    category:     "Nature",
    image:        "images/grapesfarm.jpg",
    shortDesc:    "Agri-tourism farm offering grape-picking experiences — often paired with the San Lorenzo Wind Farm.",
    fullDesc:     "MJ Albilar Grapes Farm is a growing agri-tourism destination in San Lorenzo, Guimaras. Visitors enjoy a unique tropical grape-picking experience and farm tours during harvest season. Often visited alongside the iconic San Lorenzo Wind Farm, it adds a fresh agricultural dimension to the typical Guimaras itinerary.",
    activities:   "Grape picking, farm tours, agri-tourism, photography",
    bestTime:     "Harvest season: typically March to May",
    entranceFee:  "Small agri-tourism fee applies",
    openingHours: "Open daily during harvest season — call ahead to confirm availability",
    tip:          "Best during grape harvest season. Easily combined with the Wind Farm for a full San Lorenzo day itinerary."
  },

  // --- SIBUNAG (4) ---
  {
    name:         "Us-Usan Reef Beach",
    municipality: "Sibunag",
    category:     "Beach",
    image:        "images/ususan.jpg",
    shortDesc:    "Called the 'Little Boracay of Guimaras' — powdery white sand, clear blue waters, peaceful seclusion.",
    fullDesc:     "Us-Usan Reef Beach in Sibunag is locally known as the 'Little Boracay of Guimaras.' It draws visitors with its powdery white sand, crystal-clear blue waters, and tranquil, laid-back atmosphere. Its relative seclusion makes it an ideal peaceful escape from more crowded destinations — perfect for day trips, reef snorkeling, and beach picnics.",
    activities:   "Swimming, snorkeling, picnicking, reef watching, peaceful day trips",
    bestTime:     "December to April",
    entranceFee:  "Minimal environmental fee",
    openingHours: "Day trips only",
    tip:          "Bring your own food and water — facilities are very limited. Accessible by boat from the Sibunag port area."
  },
  {
    name:         "Dasal Falls",
    municipality: "Sibunag",
    category:     "Waterfall",
    image:        "images/DasalFall.jpg",
    shortDesc:    "Peaceful eco-tourism waterfall in Barangay Dasal — a cool and lush inland escape from the beaches.",
    fullDesc:     "Dasal Falls is a serene nature attraction and eco-tourism site in Barangay Dasal, Sibunag. Surrounded by lush tropical vegetation and unspoiled forest, the falls offer a cool and refreshing inland retreat — a perfect contrast to Guimaras' beach destinations and a showcase of the island's quieter, greener interior.",
    activities:   "Swimming in natural pools, nature walks, photography, picnicking",
    bestTime:     "Year-round; best water flow during and after rainy season (June–October)",
    entranceFee:  "Free",
    openingHours: "Open daily",
    tip:          "Wear water-friendly shoes for the nature trail leading to the falls. A local guide is recommended for first-time visitors."
  },
  {
    name:         "Bougainvillea Garden & Farm",
    municipality: "Sibunag",
    category:     "Nature",
    image:        "images/bougainvellea.jpg",
    shortDesc:    "Colorful ornamental plant farm in Sibunag — a serene and photogenic tropical floral escape.",
    fullDesc:     "Bougainvillea Garden & Farm is a local agri-tourism destination and ornamental plant farm in Sibunag. Visitors enjoy a serene floral environment showcasing the vibrant colors and variety of tropical blooms — particularly bougainvillea. A peaceful and visually striking spot for garden enthusiasts, photographers, and nature lovers.",
    activities:   "Garden walks, flower photography, plant shopping, agri-tourism",
    bestTime:     "Year-round; peak bloom varies by season",
    entranceFee:  "Small entrance fee may apply",
    openingHours: "Open daily during daylight hours",
    tip:          "Great for photography — wide variety of colorful blooms throughout the grounds. Can purchase plants to bring home as unique souvenirs."
  },
  {
    name:         "Costa Aguada Island Resort",
    municipality: "Sibunag",
    category:     "Island",
    image:        "images/costaaguada.jpg",
    shortDesc:    "Secluded eco-resort on Inampulugan Island — lush forests, white-sand coves, complete island tranquility.",
    fullDesc:     "Costa Aguada Island Resort is a secluded eco-tourism destination on Inampulugan Island in Sibunag, Guimaras. It blends natural tranquility with comfortable resort facilities amid lush tropical forests and pristine white-sand coves. One of Guimaras' signature island getaways, perfect for those seeking a truly peaceful retreat with excellent snorkeling, kayaking, and nature exploration.",
    activities:   "Snorkeling, kayaking, island exploration, beach relaxation, birdwatching, overnight stays",
    bestTime:     "November to May",
    entranceFee:  "Day tour and overnight packages available",
    openingHours: "Check-in: 2:00 PM; Check-out: 12:00 NN",
    tip:          "Book well in advance — limited capacity fills up fast. Accessible by boat from Jordan or Sibunag ports. Truly one of Guimaras' hidden gems."
  }
];

const animObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('animated'), i * 60);
      animObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

function observeNew(el) {
  requestAnimationFrame(() => animObs.observe(el));
}

function buildCard(dest, globalIndex) {
  const fee   = dest.entranceFee.length  > 32 ? dest.entranceFee.substring(0,  32) + '…' : dest.entranceFee;
  const hours = dest.openingHours.length > 30 ? dest.openingHours.substring(0, 30) + '…' : dest.openingHours;

  const col = document.createElement('div');
  col.className = 'col-lg-4 col-md-6';
  col.setAttribute('data-animate', '');

  col.innerHTML = `
    <div class="dest-card h-100">
      <div class="dest-card-img">
        <img src="${dest.image}"
             alt="${dest.name}"
             loading="lazy"
             onerror="this.src='images/guimaras.jpg'">
        <span class="dest-card-cat">${dest.category}</span>
      </div>
      <div class="dest-card-body">
        <div class="dest-card-location">
          <i class="fas fa-map-marker-alt"></i>${dest.municipality}, Guimaras
        </div>
        <div class="dest-card-title">${dest.name}</div>
        <div class="dest-card-desc">${dest.shortDesc}</div>
        <div class="dest-card-meta">
          <span><i class="fas fa-ticket-alt"></i>${fee}</span>
          <span><i class="fas fa-clock"></i>${hours}</span>
        </div>
        <button class="btn-view-details"
                onclick="openModal(${globalIndex})">
          <i class="fas fa-eye me-2"></i>View Details
        </button>
      </div>
    </div>`;

  observeNew(col);
  return col;
}

function renderDestinations() {
  const container = document.getElementById('destContainer');
  const noRes     = document.getElementById('no-results');
  const summary   = document.getElementById('resultsSummary');
  
  if (!container) return;
  
  const q = searchQuery.toLowerCase().trim();

  // Filter processes
  const filtered = destinations.filter(dest => {
    const matchCat = activeCategory === 'All' || dest.category === activeCategory;
    const matchQ   = !q
      || dest.name.toLowerCase().includes(q)
      || dest.municipality.toLowerCase().includes(q)
      || dest.category.toLowerCase().includes(q)
      || dest.shortDesc.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  container.innerHTML = '';

  if (noRes) {
    noRes.style.display = filtered.length === 0 ? 'block' : 'none';
  }

  if (summary) {
    if (filtered.length === 0) {
      summary.textContent = 'No destinations found.';
    } else {
      summary.textContent =
        `Showing ${filtered.length} destination${filtered.length !== 1 ? 's' : ''}` +
        (activeCategory !== 'All' ? ` in "${activeCategory}"` : '') +
        (q ? ` matching "${q}"` : '');
    }
  }

  if (activeCategory === 'All' && !q) {
    CATEGORY_CONFIG.forEach(cfg => {
      const catDests = filtered.filter(d => d.category === cfg.key);
      if (catDests.length === 0) return;

      // Create Category Header
      const heading = document.createElement('div');
      heading.className = 'cat-heading';
      heading.setAttribute('data-animate', '');
      heading.innerHTML = `
        <div class="cat-heading-icon">${cfg.icon}</div>
        <h3>${cfg.label}<span class="cat-badge">${catDests.length}</span></h3>`;
      container.appendChild(heading);
      observeNew(heading);

      const row = document.createElement('div');
      row.className = 'row g-4 mb-2';
      catDests.forEach(dest => {
        row.appendChild(buildCard(dest, destinations.indexOf(dest)));
      });
      container.appendChild(row);
    });
    return;
  }

  const row = document.createElement('div');
  row.className = 'row g-4';
  filtered.forEach(dest => {
    row.appendChild(buildCard(dest, destinations.indexOf(dest)));
  });
  container.appendChild(row);
}

function openModal(idx) {
  const d = destinations[idx];

  document.getElementById('modalImg').src             = d.image;
  document.getElementById('modalTitle').textContent   = d.name;
  document.getElementById('modalCat').textContent     = d.category;

  document.getElementById('modalBody').innerHTML = `
    <p style="font-size:.93rem;line-height:1.78;color:#3a4a5a;margin-bottom:18px;">
      ${d.fullDesc}
    </p>

    <div class="modal-info-grid">
      <div class="modal-info-item">
        <div class="label">📍 Location</div>
        <div class="value">${d.municipality}, Guimaras</div>
      </div>
      <div class="modal-info-item">
        <div class="label">🏷 Category</div>
        <div class="value">${d.category}</div>
      </div>
      <div class="modal-info-item">
        <div class="label">🎟 Entrance Fee</div>
        <div class="value">${d.entranceFee || "N/A"}</div>
      </div>
      <div class="modal-info-item">
        <div class="label">🕐 Opening Hours</div>
        <div class="value">${d.openingHours || "N/A"}</div>
      </div>
    </div>

    <div class="modal-section-head">🏄 Activities</div>
    <p style="font-size:.89rem;color:#3a4a5a;line-height:1.65;">${d.activities}</p>

    <div class="modal-section-head">📅 Best Time to Visit</div>
    <p style="font-size:.89rem;color:#3a4a5a;line-height:1.65;">${d.bestTime}</p>

    <div class="modal-section-head">💡 Travel Tip</div>
    <div class="modal-tip-box">${d.tip}</div>
  `;

  new bootstrap.Modal(document.getElementById('destModal')).show();
}

if (searchInput) {
  searchInput.addEventListener('input', function () {
    searchQuery = this.value;
    renderDestinations();
  });
}

if (filterPills) {
  filterPills.addEventListener('click', function (e) {
    const pill = e.target.closest('.filter-pill');
    if (!pill) return;
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    pill.classList.add('active');
    activeCategory = pill.dataset.cat;
    renderDestinations();
  });
}

window.addEventListener('scroll', () => {
  if (mainNav) {
    mainNav.classList.toggle('scrolled', window.scrollY > 60);
  }
  if (backToTopBtn) {
    backToTopBtn.classList.toggle('visible', window.scrollY > 300);
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.querySelectorAll('[data-animate]').forEach(el => animObs.observe(el));

// Run initial execution mapping
renderDestinations();
const galleryImages = [
  {src:"images/guimaras.jpg",caption:"Guimaras Island Overview"},
  {src:"images/guimaras2.jpg",caption:"Scenic Guimaras"},
  {src:"images/guimaras3.jpg",caption:"Guimaras Coastline"},
  {src:"images/AlubihodBeach.jpg",caption:"Alubihod Beach, Nueva Valencia"},
  {src:"images/GuisiLighthouse.jpg",caption:"Guisi Lighthouse, Nueva Valencia"},
  {src:"images/HolyMountain.jpg",caption:"Balaan Bukid (Holy Mountain), Jordan"},
  {src:"images/RocaEncantada.jpg",caption:"Roca Encantada, Buenavista"},
  {src:"images/NavalasChurch.jpg",caption:"Navalas Church, Buenavista"},
  {src:"images/abbey.jpg",caption:"Trappist Abbey, Jordan"},
  {src:"images/WindFarm.jpg",caption:"San Lorenzo Wind Farm"},
  {src:"images/taklongisland.jpg",caption:"Taklong Island Marine Reserve"},
  {src:"images/ususan.jpg",caption:"Us-Usan Reef Beach, Sibunag"},
  {src:"images/costaaguada.jpg",caption:"Costa Aguada Island Resort, Sibunag"},
  {src:"images/SmallestPlaza.jpg",caption:"Smallest Plaza in the Philippines"},
  {src:"images/ThePitstop.jpg",caption:"The Pitstop Restaurant, Jordan"},
  {src:"images/DaliranCave.jpg",caption:"Daliran Cave, Buenavista"},
  {src:"images/SietePecados.jpg",caption:"Siete Pecados Islets, Buenavista"},
  {src:"images/MacArthurWharf.jpg",caption:"MacArthur Wharf, Buenavista"},
  {src:"images/HolyFamilyHills.jpg",caption:"Holy Family Hills, San Lorenzo"},
  {src:"images/SapalWeavingVillage.jpg",caption:"Sapal Weaving Village, San Lorenzo"},
  {src:"images/DasalFall.jpg",caption:"Dasal Falls, Sibunag"},
  {src:"images/bougainvellea.jpg",caption:"Bougainvillea Garden, Sibunag"},
  {src:"images/GuimarasCapitol.jpg",caption:"Guimaras Provincial Capitol, Jordan"},
  {src:"images/AveMariaIsland.jpg",caption:"Ave Maria Island, Jordan"},
  {src:"images/PuloBeach.jpg",caption:"Tatlong Pulo Beach, Jordan"},
  {src:"images/mango.jpg",caption:"Fresh Guimaras Mangoes"},
  {src:"images/mangopizza.jpg",caption:"Mango Pizza — Guimaras Specialty"},
  {src:"images/DriedMangoes.jpg",caption:"Dried Mangoes — Best Pasalubong"},
  {src:"images/culture1.jpg",caption:"Manggahan Festival"},
  {src:"images/fest2.jpg",caption:"Pagtaltal sa Balaan Bukid"},
  {src:"images/fest3.jpg",caption:"Balsahan Festival, Sibunag"},
  {src:"images/fest4.jpg",caption:"Sadsaran Festival, Nueva Valencia"},
  {src:"images/fest5.jpg",caption:"Palayag Festival, Buenavista"},
  {src:"images/andana.jpg",caption:"Andana Resort, Nueva Valencia"},
  {src:"images/raymen.jpg",caption:"Raymen Beach Resort, Alubihod"}
];

let lbIdx = 0;

(function () {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  galleryImages.forEach((img, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = `
      <img
        src="${img.src}"
        alt="${img.caption}"
        loading="lazy"
        onerror="this.src='images/guimaras.jpg'"
      >
      <div class="gallery-item-overlay">
        <i class="fas fa-expand"></i>
      </div>
    `;
    item.addEventListener("click", () => openLB(index));
    grid.appendChild(item);
  });
})();

function openLB(index) {
  lbIdx = index;
  updateLB();
  const lightbox = document.getElementById("lightbox");
  if (lightbox) lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLB() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function updateLB() {
  const img = galleryImages[lbIdx];
  const lbImg = document.getElementById("lightbox-img");
  const lbCap = document.getElementById("lb-caption");
  const lbCounter = document.getElementById("lb-counter");

  if (lbImg) lbImg.src = img.src;
  if (lbCap) lbCap.textContent = img.caption;
  if (lbCounter) lbCounter.textContent = `${lbIdx + 1} / ${galleryImages.length}`;
}

const lbClose = document.getElementById("lb-close");
const lbPrev = document.getElementById("lb-prev");
const lbNext = document.getElementById("lb-next");
const lightbox = document.getElementById("lightbox");

if (lbClose) lbClose.addEventListener("click", closeLB);

if (lbPrev) {
  lbPrev.addEventListener("click", () => {
    lbIdx = (lbIdx - 1 + galleryImages.length) % galleryImages.length;
    updateLB();
  });
}

if (lbNext) {
  lbNext.addEventListener("click", () => {
    lbIdx = (lbIdx + 1) % galleryImages.length;
    updateLB();
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLB();
  });
}

document.addEventListener("keydown", (e) => {
  if (!lightbox?.classList.contains("active")) return;
  if (e.key === "Escape") closeLB();
  if (e.key === "ArrowLeft") {
    lbIdx = (lbIdx - 1 + galleryImages.length) % galleryImages.length;
    updateLB();
  }
  if (e.key === "ArrowRight") {
    lbIdx = (lbIdx + 1) % galleryImages.length;
    updateLB();
  }
});
function submitInquiry() {
  let valid = true;

  const rules = [
    { id: "fName", check: (v) => v.length > 0, msg: "Full name is required." },
    { id: "fEmail", check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: "Please enter a valid email." },
    { id: "fContact", check: (v) => /^[0-9+\-\s]{7,}$/.test(v.replace(/\s/g, "")), msg: "Numbers only, minimum 7 digits." },
    { id: "fDest", check: (v) => v !== "", msg: "Please select a destination." },
    { id: "fDate", check: (v) => v !== "", msg: "Please select a travel date." },
    { id: "fVisitors", check: (v) => parseInt(v) >= 1, msg: "At least 1 visitor required." },
    { id: "fMessage", check: (v) => v.length > 0, msg: "Please enter your message." }
  ];

  rules.forEach((rule) => {
    const el = document.getElementById(rule.id);
    if (!el) return;

    const errEl = document.getElementById(`${rule.id}Err`);

    if (rule.check(el.value.trim())) {
      el.classList.remove("is-invalid");
    } else {
      el.classList.add("is-invalid");
      if (errEl) errEl.textContent = rule.msg;
      valid = false;
    }
  });

  if (valid) {
    const wrap = document.getElementById("inquiryFormWrap");
    const successBox = document.getElementById("formSuccess");

    if (wrap) wrap.style.display = "none";
    if (successBox) {
      successBox.style.display = "block";
      window.scrollTo({
        top: successBox.offsetTop - 100,
        behavior: "smooth"
      });
    }
  }
}

[
  "fName", "fEmail", "fContact", "fDest", "fDate", "fVisitors", "fMessage"
].forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.addEventListener("input", () => el.classList.remove("is-invalid"));
  el.addEventListener("change", () => el.classList.remove("is-invalid"));
});
