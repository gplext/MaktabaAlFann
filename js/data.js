// =============================================================================
// MAKTAB-AL-FANN — ART DATABASE
// All art styles, artists, paintings, digital works, shop items
// =============================================================================

const ART_DATA = {

  // ── ART STYLES ──────────────────────────────────────────────────────────────
  styles: [
    { id:1, name:"Mughal Miniature", origin:"Indian Subcontinent", period:"16th–19th c.", description:"Refined court painting blending Persian and Indian sensibilities. Intricate detail, vibrant pigments, narrative scenes from court life, history, and nature.", characteristics:["Fine brushwork","Persian-Indian synthesis","Narrative scenes","Vibrant pigments","Court subjects"], key_colors:["#c9a84c","#8b1a4a","#1a3a6a","#2a5a2a","#e8d5a0"], history:"Developed under Humayun who brought Persian masters to India. Flourished under Akbar, Jahangir, and Shah Jahan. A living bridge between Persian refinement and Indian vitality.", evolution_from:["Persian Miniature","Hindu manuscript painting"], famous_artists:["Mir Sayyid Ali","Abd al-Samad","Basawan","Mansur","Abu al-Hasan"] },
    { id:2, name:"Persian Miniature", origin:"Iran / Persia", period:"13th–19th c.", description:"Exquisite Persian paintings known for flat perspective, rich lapis and gold, decorative architecture, and literary/historical themes illustrated with supreme elegance.", characteristics:["Flat perspective","Gold illumination","Floral motifs","Literary themes","Decorative backgrounds"], key_colors:["#1a4a7a","#c9a84c","#6a1a2a","#2a6a2a","#f5e6c8"], history:"Evolved through Ilkhanid, Timurid, Safavid, and Qajar dynasties. Schools of Tabriz, Herat, Shiraz, and Isfahan each created distinct characteristics.", evolution_from:["Chinese scroll painting","Byzantine illumination"], famous_artists:["Kamal al-Din Behzad","Sultan Muhammad","Reza Abbasi","Mir Musavvir"] },
    { id:3, name:"Rajput Painting", origin:"Rajasthan, India", period:"16th–19th c.", description:"Bold, vibrant paintings from Hindu Rajput courts. Strong flat colors, distinctive elongated eyes, and themes from Ramayana, Mahabharata, and the Radha-Krishna cycle.", characteristics:["Bold colors","Flat figures","Hindu mythology","Nature motifs","Elongated eyes"], key_colors:["#c91a2a","#c9a84c","#1a6a1a","#1a1a6a","#f5c832"], history:"Developed independently in the Rajput kingdoms. Schools include Mewar, Marwar, Bundi, Kota, and Kishangarh — each with a distinct visual language.", evolution_from:["Mughal Miniature","Hindu manuscript art"], famous_artists:["Nainsukh of Guler","Masters of Mewar","Kishangarh school"] },
    { id:4, name:"Islamic Geometric Art", origin:"Islamic World", period:"8th c.–present", description:"Mathematical art of tessellating geometric patterns, encoding divine order and infinity. Seen in architecture, manuscripts, and decorative arts across the Islamic world.", characteristics:["Mathematical precision","Tessellation","Interlocking forms","Infinite repeat","Sacred geometry"], key_colors:["#1a4a7a","#c9a84c","#2a6a4a","#6a2a1a","#f5f0e0"], history:"Grew as Islamic art avoided figurative representation. Geometric patterns became a meditation on God's infinite order, encoded in star polygons and muqarnas.", evolution_from:["Greek mathematics","Byzantine mosaic"], famous_artists:["Abu'l Wafa al-Buzjani","Anonymous craftsmen of Alhambra"] },
    { id:5, name:"Islamic Calligraphy", origin:"Islamic World", period:"7th c.–present", description:"The highest art form in Islamic tradition — beautiful Arabic script used to render Quranic verses and poetry. Scripts: Kufic, Thuluth, Naskh, Nastaliq, Diwani.", characteristics:["Arabic script","Spiritual meaning","Decorative letterforms","Quranic text","Mathematical proportions"], key_colors:["#1a1a1a","#c9a84c","#1a3a6a","#f5f0e0","#2a6a2a"], history:"'Read' (Iqra) was the first Quranic revelation, establishing writing as sacred. Ibn Muqla invented proportional script in the 10th century, systematizing calligraphy.", evolution_from:["Nabataean script","Early Arabic inscriptions"], famous_artists:["Ibn Muqla","Ibn al-Bawwab","Yaqut al-Musta'simi","Shah Mahmud Nishapuri"] },
    { id:6, name:"Ottoman Miniature", origin:"Ottoman Empire", period:"15th–19th c.", description:"Court painting tradition of the Ottomans. More documentary and realistic than Persian miniatures — famous for detailed battle scenes, maps, and historical chronicles.", characteristics:["Historical narrative","Detailed architecture","Battle scenes","Documentary style","City maps"], key_colors:["#1a3a6a","#c9a84c","#6a1a2a","#2a5a2a","#e8d5a0"], history:"Produced in the Ottoman court workshop (Nakkaşhane). Flourished under Suleiman the Magnificent. Matrakçı Nasuh's city views are unique historical documents.", evolution_from:["Persian Miniature","Byzantine manuscript"], famous_artists:["Matrakçı Nasuh","Nakkaş Osman","Levni","Ali Çelebi"] },
    { id:7, name:"Pahari Painting", origin:"Punjab Hills, India", period:"17th–19th c.", description:"Lyrical paintings from the Himalayan foothills. Sensitive, emotional treatment of the Radha-Krishna cycle, lush green landscapes, and musical ragas rendered visually.", characteristics:["Lyrical quality","Mountain landscapes","Krishna-Radha themes","Soft color harmony","Emotional depth"], key_colors:["#4a7a1a","#c9a84c","#1a4a7a","#c91a4a","#e8f5c8"], history:"Basohli style was early and bold. Later Kangra style, patronized by Raja Sansar Chand, created the most refined lyrical paintings in Indian art history.", evolution_from:["Mughal Miniature","Rajput Painting"], famous_artists:["Nainsukh","Manaku","Kushala","Fattu"] },
    { id:8, name:"Deccani Painting", origin:"Deccan Plateau, India", period:"16th–18th c.", description:"A synthesis of Persian, Turkish, Ottoman, and Indian elements. Distinctive for nocturnal scenes, bold outlines, vivid emerald and crimson, and independent style.", characteristics:["Persian-Indian fusion","Nocturnal scenes","Bold outlines","Vivid colors","Independent courts"], key_colors:["#1a1a3a","#c9a84c","#1a5a2a","#6a1a3a","#e8c8a0"], history:"Developed in Ahmadnagar, Bijapur, Golconda, and Hyderabad courts. Preceded Mughal painting and maintained independence, creating one of India's most distinctive styles.", evolution_from:["Persian Miniature","Ottoman Miniature"], famous_artists:["Artists of Bijapur sultanate","Artists of Golconda court"] },
    { id:9, name:"Byzantine Art", origin:"Byzantine Empire", period:"4th–15th c.", description:"Sacred Christian art on golden grounds. Hieratic, spiritual composition where flattened forms and symbolic color convey divine truth beyond earthly appearance.", characteristics:["Golden backgrounds","Frontal hieratic figures","Symbolic color","Religious iconography","Mosaic technique"], key_colors:["#c9a84c","#1a1a6a","#6a1a1a","#e8e0c0","#2a2a2a"], history:"Grew from Early Christian art in the Eastern Roman Empire. Survived the iconoclasm controversy. Icons spread through Russia, Serbia, and Greece forming rich local traditions.", evolution_from:["Roman encaustic portraits","Early Christian catacomb painting"], famous_artists:["Andrei Rublev","Theophanes the Greek","Panselinos"] },
    { id:10, name:"Renaissance", origin:"Italy / Europe", period:"14th–17th c.", description:"The great European rebirth of classical learning. Perspective, anatomy, naturalism, and chiaroscuro united in art that placed humanity at the center of the universe.", characteristics:["Linear perspective","Anatomical accuracy","Classical themes","Chiaroscuro","Humanism"], key_colors:["#c8a060","#1a3a6a","#6a2a1a","#4a6a2a","#e8d5b0"], history:"Began in Florence with Giotto and Brunelleschi. The High Renaissance peak with Leonardo, Michelangelo, Raphael. Spread to Northern Europe through trade and religion.", evolution_from:["Byzantine Art","Gothic Art","Classical Greek sculpture"], famous_artists:["Leonardo da Vinci","Michelangelo","Raphael","Botticelli","Titian"] },
    { id:11, name:"Baroque", origin:"Europe", period:"17th–18th c.", description:"Dramatic, theatrical art commissioned by the Catholic Church to inspire devotion. Tenebrism, dynamic diagonal compositions, and intense emotion distinguish the Baroque.", characteristics:["Tenebrism (dramatic light)","Dynamic composition","Emotional intensity","Rich surface detail","Grand scale"], key_colors:["#1a1a1a","#c8a060","#4a2a1a","#1a3a1a","#e8d0a0"], history:"Emerged after the Protestant Reformation to win back Catholic hearts. From Caravaggio's revolutionary realism to Rubens' exuberant allegories and Rembrandt's psychological depth.", evolution_from:["Renaissance","Mannerism"], famous_artists:["Caravaggio","Rembrandt","Rubens","Velázquez","Bernini"] },
    { id:12, name:"Impressionism", origin:"France", period:"1860s–1880s", description:"Revolutionary movement capturing light, atmosphere, and fleeting moments. Loose brushwork, broken color, outdoor painting, and everyday modern life defined the style.", characteristics:["Visible brushstrokes","Atmospheric light","Everyday subjects","Plein air painting","Broken color"], key_colors:["#5a7ac0","#c0a060","#4a7a2a","#c07050","#f5e8c0"], history:"Named mockingly after Monet's 'Impression, Sunrise'. Rejected by the official Salon, impressionists organized independent exhibitions from 1874. Transformed all subsequent art.", evolution_from:["Realism","Barbizon School","Japanese Ukiyo-e influence"], famous_artists:["Claude Monet","Pierre-Auguste Renoir","Edgar Degas","Berthe Morisot"] },
    { id:13, name:"Abstract Expressionism", origin:"New York, USA", period:"1940s–1950s", description:"America's first major art movement. Spontaneous, emotional, large-scale abstraction. Action painting and color field painting explored the unconscious and raw emotion.", characteristics:["Large scale","Gestural marks","Emotional intensity","Abstract form","Spontaneity"], key_colors:["#1a1a1a","#c81a1a","#1a3a8a","#c0c0c0","#e8c040"], history:"Emerged from WWII trauma and surrealist influence in New York. Artists like Pollock dripped and poured paint; Rothko floated luminous color fields.", evolution_from:["Surrealism","Expressionism","Cubism"], famous_artists:["Jackson Pollock","Mark Rothko","Willem de Kooning","Franz Kline"] },
    { id:14, name:"Surrealism", origin:"Europe", period:"1920s–1950s", description:"Art that explores the unconscious, dreams, and irrational reality. Mysterious juxtapositions, meticulous rendering of impossible scenes, and Freudian symbolism.", characteristics:["Dream imagery","Irrational juxtaposition","Freudian symbols","Automatic technique","Psychological depth"], key_colors:["#2a4a6a","#6a2a4a","#c8b040","#2a5a2a","#e0c8a0"], history:"Founded by André Breton in Paris 1924. Drew on WWI disillusionment and Freud's theories. Artists bypassed rational thought to access the raw unconscious.", evolution_from:["Dadaism","Expressionism","Symbolism"], famous_artists:["Salvador Dalí","René Magritte","Max Ernst","Frida Kahlo","Giorgio de Chirico"] },
    { id:15, name:"Japanese Ukiyo-e", origin:"Japan", period:"17th–19th c.", description:"Woodblock prints depicting the 'floating world' — pleasure districts, kabuki theatre, beautiful women, sumo wrestlers, and sublime landscapes by Hokusai and Hiroshige.", characteristics:["Flat color planes","Bold outlines","Nature themes","Kabuki actors","Multiple print editions"], key_colors:["#1a3a6a","#c84a2a","#c0a040","#2a5a2a","#f5e8c0"], history:"Emerged in Edo-period Japan. Exported to Europe from the 1850s where they deeply influenced the Impressionists and Post-Impressionists — a phenomenon called Japonisme.", evolution_from:["Chinese woodblock printing","Yamato-e Japanese tradition"], famous_artists:["Katsushika Hokusai","Utagawa Hiroshige","Kitagawa Utamaro","Tōshūsai Sharaku"] },
    { id:16, name:"Chinese Ink Painting", origin:"China", period:"Ancient–present", description:"Painting with ink (and sometimes light color) on silk or paper. Emphasizes qi (spiritual energy), brushwork quality, and capturing essence over photographic accuracy.", characteristics:["Ink brushwork","Negative space","Landscape (shanshui)","Spiritual quality","Calligraphic line"], key_colors:["#1a1a1a","#4a4a4a","#8a8a8a","#c0b090","#f5f0e0"], history:"Developed alongside calligraphy. Song Dynasty (960–1279) was the golden age of landscape painting. The 'Four Gentlemen' subjects — plum, orchid, bamboo, chrysanthemum — symbolize virtues.", evolution_from:["Chinese calligraphy","Han Dynasty silk painting"], famous_artists:["Su Shi","Fan Kuan","Ni Zan","Qi Baishi","Zhang Daqian"] },
    { id:17, name:"Art Nouveau", origin:"Europe", period:"1890–1910", description:"Decorative art movement inspired by organic forms — particularly sinuous plant growth. It rejected academic historicism and sought to make all objects beautiful.", characteristics:["Organic lines","Floral motifs","Female figures","Ornamental quality","Total artwork ideal"], key_colors:["#4a7a2a","#c0a050","#6a3a5a","#2a5a4a","#f5e8c0"], history:"Emerged across Europe as 'Jugendstil' (Germany), 'Stile Liberty' (Italy), 'Modernisme' (Spain). The Vienna Secession with Klimt was its greatest flowering.", evolution_from:["Arts and Crafts movement","Symbolism","Japanese Ukiyo-e"], famous_artists:["Alphonse Mucha","Gustav Klimt","Aubrey Beardsley","Antoni Gaudí"] },
    { id:18, name:"Romanticism", origin:"Europe", period:"1780s–1850s", description:"Emotional, dramatic art celebrating nature's sublime power, individual freedom, exotic cultures, and the dark sublime. A direct reaction against cold Enlightenment rationalism.", characteristics:["Emotional intensity","Sublime nature","Exotic subjects","Historical themes","Individual freedom"], key_colors:["#3a2a1a","#6a4a2a","#1a3a5a","#4a6a2a","#c0a060"], history:"Arose against the Enlightenment. Turner's storms and Friedrich's lone wanderers expressed humanity's smallness before nature. Delacroix brought revolutionary Orientalist passion.", evolution_from:["Neo-Classicism","Northern European landscape tradition"], famous_artists:["J.M.W. Turner","Caspar David Friedrich","Eugène Delacroix","Francisco Goya"] },
    { id:19, name:"Realism", origin:"France", period:"1840s–1880s", description:"Depicting working people and everyday life with unflinching honesty. Courbet declared he could only paint what he could see — peasants, laborers, ordinary scenes.", characteristics:["Working-class subjects","Unidealized figures","Social commentary","Accurate observation","Anti-academic"], key_colors:["#3a3a3a","#6a5a4a","#4a5a2a","#5a4a3a","#c8b090"], history:"Courbet led the movement by shocking the Paris Salon with large-scale paintings of peasants and workers. Had strong political links to socialist movements of 1848.", evolution_from:["Baroque","Barbizon School"], famous_artists:["Gustave Courbet","Jean-François Millet","Honoré Daumier","Édouard Manet"] },
    { id:20, name:"Folk Art", origin:"Global", period:"Ancient–present", description:"Art rooted in community tradition, made by untrained artists. Bold colors, flat perspective, decorative geometry, and subjects from daily life, religion, and celebration.", characteristics:["Bold flat colors","Decorative patterns","Community themes","Untrained spontaneity","Craft tradition"], key_colors:["#c81a1a","#c8a020","#1a6a1a","#1a1a8a","#f5c820"], history:"Encompasses global traditions: American folk art, Indian Madhubani, Mexican Huichol, Moroccan Berber. Valued for authentic human expression outside academic training.", evolution_from:["Cave painting","Ancient craft traditions"], famous_artists:["Grandma Moses","Howard Finster","Madhubani masters","Warli tradition artists"] },
    { id:21, name:"Contemporary Art", origin:"Global", period:"1970s–present", description:"Art made today by living artists across all media. Conceptual, multimedia, socially engaged — grappling with identity, climate, technology, and post-colonial histories.", characteristics:["Conceptual depth","Mixed media","Social critique","Global perspectives","Technology integration"], key_colors:["#1a1a1a","#f5f5f5","#c81a1a","#1a5a8a","#c9a84c"], history:"Post-1970s art exploded in media and geography. Street art, installation, video, performance, and digital works all exist alongside traditional painting and sculpture.", evolution_from:["Abstract Expressionism","Pop Art","Minimalism"], famous_artists:["Ai Weiwei","Cindy Sherman","Banksy","Kara Walker","Yayoi Kusama"] },
    { id:22, name:"Digital / AI Art", origin:"Global", period:"1960s–present", description:"Art created with or generated by digital technology. From early pixel art to algorithmic generative art and contemporary AI-assisted works pushing creative boundaries.", characteristics:["Digital tools","Generative algorithms","Pixel art","Infinite reproducibility","AI collaboration"], key_colors:["#0a0a2a","#c9a84c","#1a8a5a","#8a1a8a","#f0f0f0"], history:"Began with early computer graphics in the 1960s. Advanced through video art, internet art, and now AI-generated imagery redefining what it means to be an artist.", evolution_from:["Photography","Op Art","Conceptual Art"], famous_artists:["Refik Anadol","Sofia Crespo","Beeple","Casey Reas"] }
  ],

  // ── ARTISTS ─────────────────────────────────────────────────────────────────
  artists: [
    { id:1, name:"Amir Reza Khan", born:1978, died:null, nationality:"Pakistani-British", style_ids:[1,5], bio:"Master of contemporary Mughal miniature, Amir trained in Lahore's traditional atelier system before studying at the Royal College of Art. His works fuse the intricate gold-leaf technique of the Mughals with modern political commentary.", notable_for:"Contemporary Mughal miniature with social critique", awards:"Turner Prize shortlist 2019, Aga Khan Award nominee", profile_color:"#8b1a4a" },
    { id:2, name:"Nadia Al-Rahman", born:1985, died:null, nationality:"Iranian-Canadian", style_ids:[2,5], bio:"Born in Tehran, trained in classical Persian miniature before emigrating. Her works use traditional lapis and gold while depicting contemporary Iranian women's experiences.", notable_for:"Persian miniature reinterpreted for feminist narrative", awards:"Sobey Art Award, Musée des beaux-arts de Montréal commission", profile_color:"#1a3a7a" },
    { id:3, name:"Vikram Singh Rathore", born:1962, died:2021, nationality:"Indian", style_ids:[3,7], bio:"A master of the Kishangarh school's distinctive elongated features, Vikram spent his life at Kishangarh preserving traditional pigment-grinding and gold-leaf techniques passed down for 400 years.", notable_for:"Traditional Kishangarh school preservation", awards:"Padma Shri 2015, National Academy Award", profile_color:"#c91a2a" },
    { id:4, name:"Fatima Zahra Al-Maghribi", born:1990, died:null, nationality:"Moroccan-French", style_ids:[4,5], bio:"Mathematician-turned-artist, Fatima creates geometric Islamic art through computer-assisted precision and hand-painted execution. Her large-scale works have been installed in museums worldwide.", notable_for:"Mathematical Islamic geometric art at architectural scale", awards:"Frieze London Discovery Prize, Arab Women Artist Award", profile_color:"#1a5a3a" },
    { id:5, name:"Omar Abdullah Al-Rashid", born:1975, died:null, nationality:"Saudi Arabian", style_ids:[5,4], bio:"One of the world's foremost calligraphers, Omar trained under masters in Medina and later in Istanbul. His Thuluth script works are in the collections of the V&A and the Louvre Abu Dhabi.", notable_for:"Contemporary Arabic calligraphy painting", awards:"UNESCO Living Heritage recognition, Royal Academy exhibition", profile_color:"#c9a84c" },
    { id:6, name:"Priya Mehta", born:1982, died:null, nationality:"Indian-American", style_ids:[12,15], bio:"Mumbai-born Priya paints in a style she calls 'Desi Impressionism' — applying the loose, light-filled brushwork of Monet to Indian landscapes, markets, and festivals.", notable_for:"Impressionist technique applied to Indian subjects", awards:"Smithsonian Artist Fellowship, Art Institute of Chicago acquisition", profile_color:"#5a7ac0" },
    { id:7, name:"Tariq Jamil Hussain", born:1995, died:null, nationality:"British-Pakistani", style_ids:[22,1], bio:"A young digital artist who creates AI-assisted art that recalls Mughal miniature compositions but is generated through machine learning trained on historical archives.", notable_for:"AI-generated Mughal-inspired digital art", awards:"Digital Art Award London, Zabludowicz Collection", profile_color:"#0a0a2a" },
    { id:8, name:"Leila Hassan Osman", born:1970, died:null, nationality:"Sudanese-British", style_ids:[15,20], bio:"Leila's monumental canvases combine traditional Sudanese patterns with contemporary abstract expressionist energy, exploring the memory of the Nile valley civilizations.", notable_for:"Pan-African abstract painting with Sudanese heritage", awards:"British Museum commission, Tate Modern acquisition", profile_color:"#6a3a1a" },
    { id:9, name:"Yasmin Binte Patel", born:1988, died:null, nationality:"Bangladeshi-British", style_ids:[17,1], bio:"Trained in both Chinese ink painting in Beijing and Mughal miniature in Dhaka, Yasmin creates extraordinary fluid works that merge both traditions in a single brushstroke.", notable_for:"East-meets-South-Asia painting fusion", awards:"Jerwood Prize, Wellcome Collection commission", profile_color:"#2a5a4a" },
    { id:10, name:"Hassan Mirza Qajar", born:1955, died:null, nationality:"Iranian", style_ids:[2,6], bio:"A scholar-artist who has dedicated his life to documenting and recreating Qajar-era Persian paintings. His technically perfect recreations are indistinguishable from 19th-century originals.", notable_for:"Qajar Persian court painting revival", awards:"Iran's National Art Prize, Tehran Museum of Contemporary Art", profile_color:"#6a1a3a" },
    { id:11, name:"Amara Osei-Bonsu", born:1980, died:null, nationality:"Ghanaian-British", style_ids:[20,15], bio:"Amara paints with Kente cloth patterns and Adinkra symbols fused with contemporary figurative painting, celebrating Akan culture and the African diaspora experience.", notable_for:"Contemporary Akan-influenced painting", awards:"Artes Mundi Prize, Turner Prize nomination", profile_color:"#c84a1a" },
    { id:12, name:"Chen Wei-Lin", born:1967, died:null, nationality:"Taiwanese", style_ids:[16,17], bio:"A master of traditional Chinese ink painting who also incorporates modernist composition. His mountain landscapes follow Song Dynasty principles while engaging contemporary environmental themes.", notable_for:"Song Dynasty landscape technique, ecological themes", awards:"National Palace Museum Taipei commission, Venice Biennale", profile_color:"#2a2a2a" },
    { id:13, name:"Rashida Sultana", born:1993, died:null, nationality:"Indian", style_ids:[3,21], bio:"From Jaipur's traditional blue pottery and miniature painting lineage, Rashida creates works that insert contemporary women into classical Rajput compositions, subverting old hierarchies.", notable_for:"Feminist reimagining of Rajput classical tradition", awards:"Lalit Kala Akademi Award, India Art Fair prize", profile_color:"#7a1a4a" },
    { id:14, name:"Idris Al-Farouq", born:1945, died:2018, nationality:"Algerian-French", style_ids:[4,18], bio:"The grandfather of modern Islamic geometric art, Idris combined traditional North African zellige tilework mathematics with Romantic landscape painting in his extraordinary canvases.", notable_for:"Geometric patterns over landscape painting", awards:"Ordre des Arts et des Lettres, Musée d'Orsay retrospective", profile_color:"#3a2a6a" },
    { id:15, name:"Sana Malik", born:2000, died:null, nationality:"British-Pakistani", style_ids:[1,22,15], bio:"The youngest artist in our gallery. Sana creates digital and physical works that document her grandmother's stories through Mughal visual language, social media aesthetics, and augmented reality.", notable_for:"Intergenerational narrative through Mughal-digital fusion", awards:"New Contemporaries 2023, Saatchi Gallery Young Artist", profile_color:"#4a1a6a" }
  ],

  // ── PAINTINGS ────────────────────────────────────────────────────────────────
  paintings: [
    // MUGHAL MINIATURE (style 1)
    { id:1, title:"The Durbar of Akbar", artist_id:1, year:2018, style_id:1, country_origin:"Pakistan", country_depicted:"India", culture_depicted:"Mughal", history_context:"Reimagines Akbar's legendary court where scholars of all faiths debated. A contemporary commentary on pluralism.", colors:["#c9a84c","#1a3a6a","#8b1a4a","#2a5a2a","#e8d5a0"], width_cm:45, height_cm:60, price:8500, significance:"The artist places modern politicians in Akbar's court, asking which leader today embodies the Mughal emperor's famed religious tolerance.", technique:"Natural pigments, gold leaf on wasli paper", frames:[1,3,5], image_hue:"30", image_sat:"70%" },
    { id:2, title:"Shaheen Rising at Dawn", artist_id:1, year:2020, style_id:1, country_origin:"Pakistan", country_depicted:"Pakistan", culture_depicted:"Mughal-Pakistani", history_context:"The falcon (shaheen) is a national symbol of Pakistan. Iqbal's poetry used it as a metaphor for the free Muslim spirit.", colors:["#1a3a6a","#c9a84c","#e8d5a0","#2a5a2a","#c9a84c"], width_cm:30, height_cm:40, price:6200, significance:"A meditation on national identity through the lens of Mughal bird painting tradition, referencing Mansur's famous naturalistic animal studies.", technique:"Gold leaf, lapis lazuli pigment on paper", frames:[1,2,5], image_hue:"210", image_sat:"60%" },
    { id:3, title:"Jahangir's Dream", artist_id:1, year:2022, style_id:1, country_origin:"UK", country_depicted:"India", culture_depicted:"Mughal", history_context:"Based on the famous allegorical painting by Abu al-Hasan showing Jahangir standing on a globe, embracing the Persian Shah.", colors:["#c9a84c","#8b1a4a","#e8d5a0","#1a5a2a","#1a3a6a"], width_cm:50, height_cm:65, price:11000, significance:"The painting within a painting — referencing Abu al-Hasan's masterpiece — asks how power, alliance, and global influence operate today.", technique:"Natural pigments, gold leaf on wasli paper", frames:[1,3], image_hue:"40", image_sat:"65%" },
    { id:4, title:"Love Remembered in Moonlight", artist_id:1, year:2019, style_id:1, country_origin:"Pakistan", country_depicted:"India", culture_depicted:"Mughal-Romantic", history_context:"Inspired by Jahangir's famous inscription: 'If I had not known Shah Abbas was a great king, I would have called myself the king of the whole world.'", colors:["#1a1a3a","#c9a84c","#e8d5a0","#6a1a3a","#4a7a4a"], width_cm:35, height_cm:50, price:7500, significance:"A nocturnal Mughal composition — a rarity — exploring how desire and power intertwine in Mughal poetry and painting.", technique:"Natural mineral pigments on paper", frames:[1,2,3], image_hue:"240", image_sat:"40%" },

    // PERSIAN MINIATURE (style 2)
    { id:5, title:"Layla and Majnun in the Desert", artist_id:2, year:2017, style_id:2, country_origin:"Canada", country_depicted:"Arabia/Persia", culture_depicted:"Persian", history_context:"The most famous love story of the Islamic world. Qays goes mad (majnun) with love for Layla. Nizami's 1188 poem is the source.", colors:["#1a4a7a","#c9a84c","#f5e6c8","#2a6a2a","#6a1a2a"], width_cm:40, height_cm:55, price:9200, significance:"Nadia's Layla is a modern Iranian woman refusing arranged marriage — the desert landscape becomes a contemporary feminist space.", technique:"Lapis lazuli, malachite, gold on paper", frames:[2,4,5], image_hue:"220", image_sat:"55%" },
    { id:6, title:"The Simurgh Speaks", artist_id:2, year:2019, style_id:2, country_origin:"Canada", country_depicted:"Persia", culture_depicted:"Persian-Sufi", history_context:"From Attar's 'Conference of the Birds' — 30 birds journey to find the mythical Simurgh and discover they themselves are the Simurgh.", colors:["#c9a84c","#1a4a7a","#2a6a2a","#c84a2a","#f5e6c8"], width_cm:55, height_cm:70, price:13500, significance:"A Sufi masterpiece: the spiritual journey as a metaphor for self-discovery. The 30 birds (si morgh) become one in the Simurgh.", technique:"Gold leaf, natural pigments on wasli paper", frames:[2,4], image_hue:"40", image_sat:"75%" },
    { id:7, title:"Rustam Slays the White Div", artist_id:10, year:2016, style_id:2, country_origin:"Iran", country_depicted:"Persia", culture_depicted:"Persian-Mythological", history_context:"From the Shahnameh (Book of Kings) by Ferdowsi. The hero Rustam must kill the White Div to cure his king's blindness with its liver.", colors:["#6a1a2a","#c9a84c","#1a4a7a","#2a5a2a","#e8d5a0"], width_cm:45, height_cm:60, price:18000, significance:"A technically perfect recreation of the 16th-century Tahmasp Shahnameh style, preserving techniques that have been lost for centuries.", technique:"Natural pigments, gold leaf on prepared paper", frames:[2,3,4], image_hue:"0", image_sat:"60%" },
    { id:8, title:"Garden of Paradise (Jannat)", artist_id:2, year:2021, style_id:2, country_origin:"Canada", country_depicted:"Persia", culture_depicted:"Persian-Islamic", history_context:"Persian gardens (pairidaeza — origin of the word 'paradise') were walled sacred spaces encoding the Quranic paradise of flowing streams and flowers.", colors:["#2a6a2a","#c9a84c","#1a4a7a","#c84a2a","#f5e6c8"], width_cm:60, height_cm:75, price:16000, significance:"The garden as spiritual metaphor — a Persian tradition from Cyrus the Great to the Alhambra. Nadia depicts an Iranian woman tending a digital garden.", technique:"Lapis lazuli pigment, malachite, gold on paper", frames:[2,4,5], image_hue:"130", image_sat:"50%" },

    // RAJPUT PAINTING (style 3)
    { id:9, title:"Radha Awaiting Krishna in the Rain", artist_id:3, year:2015, style_id:3, country_origin:"India", country_depicted:"India", culture_depicted:"Hindu-Vaishnava", history_context:"The Rasamanjari text describes 360 heroines. Radha in the rain is a classic Rajput subject — her love-longing (viraha) mirrors the soul's longing for God.", colors:["#1a1a6a","#c9a84c","#c91a2a","#2a6a2a","#f5c832"], width_cm:35, height_cm:45, price:22000, significance:"One of Vikram's late masterworks. The indigo of the storm cloud and the golden lightning are painted with traditional stone-ground pigments he made himself.", technique:"Stone-ground mineral pigments on wasli paper", frames:[3,5,6], image_hue:"240", image_sat:"65%" },
    { id:10, title:"The Hunt at Bundi", artist_id:3, year:2010, style_id:3, country_origin:"India", country_depicted:"India", culture_depicted:"Rajput-Bundi", history_context:"Bundi school is famous for hunting scenes with dense foliage, bold animals, and the distinctive mustard yellow that appears in no other school.", colors:["#c9a84c","#2a6a2a","#c84a2a","#1a1a6a","#e8d5a0"], width_cm:50, height_cm:40, price:28000, significance:"The last major hunting composition by Vikram, painted a year before his death. The tigers carry a mournful dignity not present in older Bundi paintings.", technique:"Gold leaf, mineral pigments on paper", frames:[3,5], image_hue:"35", image_sat:"60%" },
    { id:11, title:"Bani Thani — The Elegant One", artist_id:13, year:2022, style_id:3, country_origin:"India", country_depicted:"India", culture_depicted:"Kishangarh-Rajput", history_context:"Bani Thani was a legendary singer-poet at Kishangarh who became the model for the idealized Kishangarh woman — elongated neck, arched brows, petal lips.", colors:["#c91a2a","#c9a84c","#1a1a6a","#2a6a2a","#f5c832"], width_cm:30, height_cm:50, price:7800, significance:"Rashida inserts herself into the Bani Thani pose, questioning whose beauty standards define classical Indian femininity and who gets to be a muse.", technique:"Mineral pigments, gold on paper", frames:[1,3,6], image_hue:"350", image_sat:"60%" },

    // ISLAMIC GEOMETRIC (style 4)
    { id:12, title:"The Infinite Star — 12-Fold", artist_id:4, year:2020, style_id:4, country_origin:"France", country_depicted:"Islamic World", culture_depicted:"Islamic-Mathematical", history_context:"The 12-pointed star encodes the months, zodiac, and perfect mathematical division of space. Found in the Alhambra's most sacred chamber.", colors:["#1a4a7a","#c9a84c","#2a6a4a","#6a2a1a","#f5f0e0"], width_cm:80, height_cm:80, price:12000, significance:"Fatima derived this pattern using medieval Islamic geometric construction techniques, then rendered it at 1:1 scale with the Alhambra's Sala de las Dos Hermanas.", technique:"Gold leaf, lapis, hand-painted on gessoed board", frames:[4,7], image_hue:"220", image_sat:"50%" },
    { id:13, title:"Muqarnas — The Frozen Music", artist_id:4, year:2021, style_id:4, country_origin:"France", country_depicted:"Persia/Spain", culture_depicted:"Islamic Architecture", history_context:"Muqarnas are 3D stalactite vaults found in Islamic architecture. Frank Lloyd Wright called Gothic cathedrals 'frozen music'; muqarnas are frozen light.", colors:["#c9a84c","#1a4a7a","#2a6a4a","#f5f0e0","#3a2a1a"], width_cm:70, height_cm:90, price:15500, significance:"A 2D painting that creates the illusion of a complete muqarnas dome — an impossible object that could not physically be built.", technique:"Mathematical compass construction, mineral pigments, gold", frames:[4,7], image_hue:"45", image_sat:"55%" },
    { id:14, title:"Zellige Mandala", artist_id:14, year:2005, style_id:4, country_origin:"France", country_depicted:"Morocco", culture_depicted:"Moroccan-Berber-Islamic", history_context:"Zellige is North African mosaic tilework with roots in Berber geometry. The mandala structure connects it to Hindu-Buddhist visual traditions.", colors:["#1a6a4a","#c9a84c","#6a2a1a","#1a3a6a","#f5f0e0"], width_cm:100, height_cm:100, price:35000, significance:"Idris Al-Farouq's masterwork uniting the geometric traditions of Morocco, Persia, Andalusia, and India in a single cosmic pattern.", technique:"Encaustic wax, gold leaf, hand-painted patterns", frames:[4,7], image_hue:"160", image_sat:"45%" },

    // ISLAMIC CALLIGRAPHY (style 5)
    { id:15, title:"Bismillah — In the Name of God", artist_id:5, year:2019, style_id:5, country_origin:"Saudi Arabia", country_depicted:"Islamic World", culture_depicted:"Islamic-Pan", history_context:"'Bismillah al-Rahman al-Rahim' opens every surah except one. Every Muslim action begins with it. The phrase contains the geometry of the cosmos.", colors:["#1a1a1a","#c9a84c","#f5f0e0","#1a3a6a","#2a6a2a"], width_cm:90, height_cm:60, price:14000, significance:"Omar spent three years perfecting this single composition — 19 characters that must be in mathematical proportion to each other at every scale.", technique:"24k gold leaf Thuluth script on black Japanese paper", frames:[5,7], image_hue:"40", image_sat:"70%" },
    { id:16, title:"Surah Al-Fatiha — The Opening", artist_id:5, year:2022, style_id:5, country_origin:"Saudi Arabia", country_depicted:"Islamic World", culture_depicted:"Islamic-Quranic", history_context:"Al-Fatiha is recited 17 times daily in Muslim prayer. It is the most memorized text in human history — over 1.8 billion people know it by heart.", colors:["#1a3a6a","#c9a84c","#f5f0e0","#2a5a2a","#1a1a1a"], width_cm:120, height_cm:80, price:22000, significance:"The entire surah written in one continuous interlocking Thuluth composition — each line of the prayer flowing into the next without lifting the pen.", technique:"Thuluth script, gold on dark blue Japanese paper", frames:[5,7], image_hue:"220", image_sat:"60%" },
    { id:17, title:"Rumi's Reed Flute", artist_id:2, year:2020, style_id:5, country_origin:"Canada", country_depicted:"Persia/Turkey", culture_depicted:"Sufi-Persian", history_context:"The Masnavi of Rumi opens with the cry of the reed flute: 'Hear how the reed flute tells its tale of separation' — the soul's longing to return to its origin.", colors:["#6a1a2a","#c9a84c","#f5e6c8","#1a3a6a","#2a5a2a"], width_cm:40, height_cm:60, price:8800, significance:"Nadia combines Persian Nastaliq calligraphy with miniature painting — the text of the reed flute poem becomes visually the shape of a reed.", technique:"Nastaliq calligraphy, Persian miniature technique", frames:[2,5], image_hue:"20", image_sat:"55%" },

    // PAHARI PAINTING (style 7)
    { id:18, title:"Krishna and the Gopis in the Forest", artist_id:9, year:2018, style_id:7, country_origin:"UK", country_depicted:"India", culture_depicted:"Pahari-Vaishnava", history_context:"The Bhagavata Purana describes Krishna's nocturnal dance (Raas Lila) with the gopis as the highest expression of divine love — the soul's union with God.", colors:["#4a7a1a","#c9a84c","#1a4a7a","#c91a4a","#e8f5c8"], width_cm:45, height_cm:55, price:9500, significance:"Yasmin merges Kangra-school lyrical brushwork with Chinese ink painting's fluid line, creating a new visual language for an ancient devotional tradition.", technique:"Ink, natural pigments on paper — dual tradition", frames:[1,3,6], image_hue:"130", image_sat:"45%" },
    { id:19, title:"Monsoon Raga (Megh Malhar)", artist_id:3, year:2018, style_id:7, country_origin:"India", country_depicted:"India", culture_depicted:"Pahari-Musical", history_context:"Ragamala paintings translate musical ragas into visual form. Megh Malhar raga calls the monsoon — singing it is said to literally bring rain.", colors:["#1a1a3a","#c9a84c","#4a7a1a","#6a1a3a","#e8f5c8"], width_cm:35, height_cm:50, price:19000, significance:"Vikram's last Ragamala painting. The storm-dark blue background achieves the exact shade of a pre-monsoon sky described in 17th-century texts.", technique:"Stone-ground mineral pigments, gold on paper", frames:[3,5,6], image_hue:"245", image_sat:"55%" },

    // IMPRESSIONISM (style 11)
    { id:20, title:"Holi at Dawn — Jaipur", artist_id:6, year:2019, style_id:11, country_origin:"USA", country_depicted:"India", culture_depicted:"Rajasthani", history_context:"Holi celebrates the triumph of divine love over evil and the arrival of spring. The explosion of colored powder transforms cities into living paintings.", colors:["#c84a2a","#c9a84c","#5a7ac0","#c84a8a","#4a7a2a"], width_cm:80, height_cm:60, price:11500, significance:"Priya's most celebrated work — loose Impressionist brushwork perfectly captures the soft powder-color blur of Holi that photography cannot.", technique:"Oil on canvas, plein air", frames:[3,6,7], image_hue:"15", image_sat:"70%" },
    { id:21, title:"The Chai Wallah's Steam", artist_id:6, year:2017, style_id:11, country_origin:"USA", country_depicted:"India", culture_depicted:"Modern Indian", history_context:"The chai wallah (tea seller) is one of the most iconic figures of Indian urban life — millions begin their day at a roadside chai stall.", colors:["#c8a060","#5a7ac0","#c84a2a","#4a7a2a","#f5e8c0"], width_cm:60, height_cm:50, price:8900, significance:"The steam from the chai vessel is painted with the same technique Monet used for water lilies — small, broken color strokes that suggest movement.", technique:"Oil on canvas", frames:[3,6], image_hue:"30", image_sat:"50%" },
    { id:22, title:"Durga Puja Night", artist_id:6, year:2021, style_id:11, country_origin:"USA", country_depicted:"India", culture_depicted:"Bengali-Hindu", history_context:"Durga Puja is Kolkata's greatest festival — the entire city becomes an open-air art gallery with temporary pandals housing spectacular goddess sculptures.", colors:["#c84a2a","#c9a84c","#1a1a6a","#c84a8a","#f5e8c0"], width_cm:90, height_cm:70, price:14000, significance:"Painted from life over five consecutive Durga Puja nights, capturing how artificial festival light transforms the color palette of the city.", technique:"Oil on canvas, mixed artificial/natural light study", frames:[3,6,7], image_hue:"350", image_sat:"65%" },

    // ABSTRACT EXPRESSIONISM (style 12)
    { id:23, title:"Partition — 1947", artist_id:8, year:2017, style_id:12, country_origin:"UK", country_depicted:"India/Pakistan", culture_depicted:"South Asian", history_context:"The 1947 partition of British India created Pakistan and India, displacing 15 million people and killing up to 2 million. The largest forced migration in history.", colors:["#1a1a1a","#c81a1a","#1a3a8a","#f5f5f5","#e8c040"], width_cm:200, height_cm:150, price:45000, significance:"Leila's largest canvas. Blood red and night blue tear apart a field of white. The violence of partition encoded in gestural abstract form.", technique:"Oil on canvas, gestural technique", frames:[7], image_hue:"0", image_sat:"50%" },
    { id:24, title:"Nile Memory", artist_id:8, year:2020, style_id:12, country_origin:"UK", country_depicted:"Sudan", culture_depicted:"Nubian-Sudanese", history_context:"The Nubian archaeological sites were flooded by the Aswan Dam in 1964. Tens of thousands of years of civilization submerged under Lake Nasser.", colors:["#3a2a1a","#1a3a8a","#c9a84c","#4a2a1a","#f5e8c0"], width_cm:180, height_cm:120, price:52000, significance:"The submerged pyramids, temples, and villages of Nubia are evoked through layered paint that suggests burial, depth, and memory beneath water.", technique:"Oil and sand on canvas, impasto technique", frames:[7], image_hue:"200", image_sat:"40%" },

    // SURREALISM (style 14)
    { id:25, title:"The Last Caliphate Dreams", artist_id:1, year:2016, style_id:14, country_origin:"Pakistan", country_depicted:"Islamic World", culture_depicted:"Islamic-Surreal", history_context:"The Ottoman Caliphate was abolished by Atatürk in 1924. The dream of a unified Islamic caliphate has haunted Muslim political consciousness since.", colors:["#2a4a6a","#6a2a4a","#c8b040","#2a5a2a","#e0c8a0"], width_cm:75, height_cm:90, price:16000, significance:"A clock melting over a minaret — Dalí's influence transformed into an Islamic context. The calendar of Islamic civilization suspended in amber.", technique:"Oil on canvas", frames:[6,7], image_hue:"210", image_sat:"35%" },

    // JAPANESE UKIYO-E (style 15)
    { id:26, title:"The Great Wave of Karachi", artist_id:9, year:2021, style_id:15, country_origin:"UK", country_depicted:"Pakistan", culture_depicted:"Pakistani-Japanese fusion", history_context:"Hokusai's Great Wave (c.1831) is the most recognized artwork in history. Yasmin reimagines it with Karachi's Arabian Sea and fishing dhow boats.", colors:["#1a3a6a","#f5e8c0","#c84a2a","#2a5a2a","#c9a84c"], width_cm:50, height_cm:35, price:7200, significance:"East-meets-East: two Asian art traditions in dialogue. The dhow boats replace Hokusai's Mount Fuji canoes in a meditation on Asian maritime history.", technique:"Woodblock-inspired oil on paper", frames:[1,3,6], image_hue:"215", image_sat:"65%" },

    // CHINESE INK PAINTING (style 16)
    { id:27, title:"Mountains in Early Spring", artist_id:12, year:2019, style_id:16, country_origin:"Taiwan", country_depicted:"China", culture_depicted:"Chinese-Song Dynasty tradition", history_context:"'Mountains in Early Spring' by Guo Xi (1072) defined Chinese landscape painting for centuries — the mountain as cosmic metaphor for human aspiration.", colors:["#1a1a1a","#4a4a4a","#8a8a8a","#c0b090","#f5f0e0"], width_cm:45, height_cm:90, price:13500, significance:"Chen's most ambitious landscape follows the Northern Song monumental tradition of placing the human viewer as a tiny figure in a vast philosophical cosmos.", technique:"Ink, light color wash on rice paper", frames:[4,6,7], image_hue:"60", image_sat:"15%" },
    { id:28, title:"Bamboo in Wind — Four Seasons", artist_id:12, year:2022, style_id:16, country_origin:"Taiwan", country_depicted:"China", culture_depicted:"Chinese scholar-literati", history_context:"Bamboo, one of the 'Four Gentlemen', symbolizes integrity — bending but not breaking in the storm. Literati painted it to demonstrate moral character.", colors:["#1a1a1a","#2a3a2a","#3a4a3a","#c0b090","#f5f0e0"], width_cm:30, height_cm:120, price:9800, significance:"A hanging scroll format — four panels for four seasons — depicting bamboo from spring shoot to winter snow in a single unbroken meditative sequence.", technique:"Ink on silk scroll, brushwork study", frames:[4,7], image_hue:"100", image_sat:"20%" },

    // ART NOUVEAU (style 17)
    { id:29, title:"Henna Night — The Bride", artist_id:15, year:2023, style_id:17, country_origin:"UK", country_depicted:"South Asia", culture_depicted:"South Asian diaspora", history_context:"The mehndi (henna) ceremony is the night before a South Asian wedding — women gather to apply intricate patterns that will fade after a week, like the passing of celebration.", colors:["#4a7a2a","#c0a050","#6a3a5a","#2a5a4a","#f5e8c0"], width_cm:40, height_cm:60, price:5500, significance:"Sana uses Art Nouveau's flowing organic lines — the style used to depict European women in 1900 — to celebrate South Asian femininity and ritual.", technique:"Digital art printed on canvas, limited edition of 10", frames:[1,3,6], image_hue:"120", image_sat:"40%" },

    // CONTEMPORARY ART (style 21)
    { id:30, title:"Drone Strike, 2017 (Minimized)", artist_id:8, year:2022, style_id:21, country_origin:"UK", country_depicted:"Yemen", culture_depicted:"Contemporary-Political", history_context:"Drone strikes operate at a distance that removes the human reality of violence. The pilot sits in Nevada; the strike lands in Yemen.", colors:["#1a1a1a","#c81a1a","#f5f5f5","#1a5a8a","#e8c040"], width_cm:120, height_cm:120, price:32000, significance:"Leila paints the thermal signature of a drone strike — a clinical top-down view in the style of satellite imagery — forcing viewers to confront remote warfare.", technique:"Acrylic on canvas", frames:[7], image_hue:"0", image_sat:"30%" },
    { id:31, title:"Twinning: My Nano-Dadi and Me", artist_id:15, year:2023, style_id:21, country_origin:"UK", country_depicted:"UK/Pakistan", culture_depicted:"British-Pakistani diaspora", history_context:"Nano (maternal grandmother) is the primary carrier of cultural memory in South Asian families — she holds the stories, recipes, and prayers.", colors:["#4a1a6a","#c9a84c","#f5f5f5","#c84a8a","#1a3a6a"], width_cm:60, height_cm:80, price:6800, significance:"Sana's most personal work. A selfie-format portrait pairing her iPhone generation face with her grandmother's painted face in Mughal miniature style.", technique:"Digital art and traditional miniature painting, hybrid", frames:[1,3,6], image_hue:"280", image_sat:"45%" },

    // ABSTRACT EXPRESSIONISM continued
    { id:32, title:"The Lahore Resolution — Unresolved", artist_id:1, year:2023, style_id:12, country_origin:"UK", country_depicted:"Pakistan", culture_depicted:"Pakistani political history", history_context:"The Lahore Resolution of 1940 called for an independent Muslim state. 80 years later, the promises of that resolution remain contested.", colors:["#1a3a6a","#c8a040","#1a1a1a","#c81a1a","#f5f5f5"], width_cm:150, height_cm:100, price:38000, significance:"Green (Pakistan) and white painted in violent gestural strokes. The stars and crescent of the national flag dissolve into abstraction.", technique:"Oil on canvas", frames:[7], image_hue:"200", image_sat:"35%" },
    { id:33, title:"She Carries Mountains", artist_id:13, year:2021, style_id:21, country_origin:"India", country_depicted:"India", culture_depicted:"Contemporary Indian feminist", history_context:"Millions of Indian women are daily wage laborers who physically carry construction materials, coal, and bricks on their heads — invisible in mainstream culture.", colors:["#c84a1a","#c9a84c","#1a3a8a","#4a6a2a","#f5e8c0"], width_cm:80, height_cm:100, price:14500, significance:"Rashida paints a construction worker in the elongated neck and composed dignity of a Kishangarh noble lady, demanding the same reverence for her labor.", technique:"Mineral pigments on canvas, Rajput technique at large scale", frames:[3,6,7], image_hue:"20", image_sat:"55%" },
    { id:34, title:"Digital Hafez", artist_id:7, year:2022, style_id:22, country_origin:"UK", country_depicted:"Persia", culture_depicted:"Persian-Digital", history_context:"Hafez of Shiraz (1315–1390) is the most loved poet in Persian history. His Divan is used for divination across Iran and South Asia.", colors:["#0a0a2a","#c9a84c","#1a8a5a","#8a1a8a","#f0f0f0"], width_cm:60, height_cm:60, price:4500, significance:"An AI model trained on Mughal miniature archives generated compositions; Tariq then selected, edited, and hand-finished the printed outputs.", technique:"AI generation, digital finishing, archival print on paper", frames:[1,4,6], image_hue:"280", image_sat:"50%" },
    { id:35, title:"Eid Morning — The City Wakes", artist_id:6, year:2023, style_id:11, country_origin:"USA", country_depicted:"Pakistan", culture_depicted:"Islamic festival", history_context:"Eid al-Fitr marks the end of Ramadan fasting. The morning prayer is the largest simultaneous gathering of people in most Muslim-majority cities.", colors:["#c9a84c","#f5e8c0","#1a1a6a","#c84a8a","#4a7a4a"], width_cm:70, height_cm:55, price:13000, significance:"Painted in Karachi at 5am. The pre-dawn light — blue-gold — as the city empties into the streets for Eid prayer is captured in loose wet-into-wet brushwork.", technique:"Oil on canvas, painted en plein air", frames:[3,6], image_hue:"50", image_sat:"50%" },
    { id:36, title:"Calligraphy Storm", artist_id:5, year:2021, style_id:5, country_origin:"Saudi Arabia", country_depicted:"Islamic World", culture_depicted:"Islamic-Sufi", history_context:"Sufi whirling (sama) is a form of meditation — the dervish spins until the ego dissolves and only God remains. Rumi's Mevlevi order originated this practice.", colors:["#1a1a1a","#c9a84c","#f5f0e0","#1a3a6a","#c84a2a"], width_cm:80, height_cm:80, price:19000, significance:"Omar wrote a single 99-name (Asma al-Husna) composition in a spiraling vortex, each name becoming more abstract as it approaches the center.", technique:"Diwani Jali script, gold on deep blue", frames:[5,7], image_hue:"40", image_sat:"65%" },
    { id:37, title:"A Thousand and One Nights — Night 1001", artist_id:2, year:2022, style_id:2, country_origin:"Canada", country_depicted:"Arabia/Persia", culture_depicted:"Arabic-Persian literary", history_context:"Scheherazade tells stories to defer her execution. On night 1001 she runs out of stories — the untold night. What story could possibly be last?", colors:["#1a1a3a","#c9a84c","#1a4a7a","#6a1a3a","#f5e6c8"], width_cm:50, height_cm:65, price:10500, significance:"The final painting in Nadia's 'Nights' series. The canvas is mostly darkness with a single candle — Scheherazade's lamp about to go out.", technique:"Lapis lazuli ground, gold leaf, natural pigments", frames:[2,4,5], image_hue:"240", image_sat:"45%" },
    { id:38, title:"The Walled City (Lahore Walled City)", artist_id:1, year:2020, style_id:1, country_origin:"Pakistan", country_depicted:"Pakistan", culture_depicted:"Mughal-Pakistani heritage", history_context:"Lahore's Walled City is one of the oldest continuously inhabited places in South Asia. 13 gates, built by Akbar, still define the urban fabric.", colors:["#c9a84c","#8b1a4a","#e8d5a0","#2a5a2a","#1a3a6a"], width_cm:55, height_cm:40, price:9800, significance:"An aerial bird's-eye view in classic Mughal map-painting tradition, showing the walled city as it was, is, and might be — three time layers in one composition.", technique:"Natural pigments, gold leaf on wasli paper", frames:[1,2,3], image_hue:"40", image_sat:"55%" },
    { id:39, title:"Folk Sufi", artist_id:11, year:2020, style_id:20, country_origin:"UK", country_depicted:"West Africa", culture_depicted:"West African Sufi", history_context:"Sufi Islam spread through West Africa along trade routes. Qadiriyya and Tijaniyya brotherhoods built devotional cultures fusing African and Islamic traditions.", colors:["#c84a1a","#c8a020","#1a6a1a","#6a1a6a","#f5c820"], width_cm:60, height_cm:70, price:10500, significance:"Amara paints a Ghanaian Sufi dervish using Adinkra symbols as the geometric backdrop — uniting West African and Islamic visual languages.", technique:"Acrylic on canvas with fabric collage", frames:[3,6], image_hue:"30", image_sat:"60%" },
    { id:40, title:"Mughal Garden in Winter", artist_id:9, year:2020, style_id:1, country_origin:"UK", country_depicted:"India", culture_depicted:"Mughal", history_context:"Mughal gardens (charbagh) followed the Persian four-part design encoding paradise. The winter garden — bare trees in geometric paradise — is a rare subject.", colors:["#f5f0e0","#c9a84c","#1a1a3a","#8a8a8a","#2a5a2a"], width_cm:45, height_cm:60, price:9200, significance:"Yasmin merges Chinese ink painting's bare winter tree brushwork with Mughal garden geometry — two great traditions of depicting the natural world.", technique:"Ink and gold leaf on paper, dual tradition", frames:[1,4,6], image_hue:"60", image_sat:"20%" },
    // Additional paintings for variety
    { id:41, title:"Baghdad — Before and After", artist_id:8, year:2019, style_id:12, country_origin:"UK", country_depicted:"Iraq", culture_depicted:"Iraqi-Arab", history_context:"Baghdad was the world's greatest city under Harun al-Rashid. The Mongol destruction of 1258 and the 2003 invasion are historical parallels.", colors:["#3a2a1a","#c81a1a","#c9a84c","#1a1a1a","#f5e8c0"], width_cm:160, height_cm:130, price:48000, significance:"Two canvases displayed as diptych — gold leaf over the first canvas for the Abbasid golden age; charred black gesso over the second for destruction.", technique:"Oil, charcoal, gold leaf on diptych canvas", frames:[7], image_hue:"30", image_sat:"45%" },
    { id:42, title:"Prayers at Fajr — London Mosque", artist_id:6, year:2022, style_id:11, country_origin:"USA", country_depicted:"UK", culture_depicted:"British Muslim", history_context:"Fajr prayer is before sunrise — the first of five daily prayers. For British Muslims praying in pre-dawn London, the community creates a sanctuary within secular life.", colors:["#1a1a3a","#c9a84c","#f5e8c0","#5a7ac0","#4a7a4a"], width_cm:80, height_cm:65, price:16000, significance:"Loose Impressionist brushwork creates the atmosphere of a mosque interior with shafts of blue pre-dawn light over rows of worshippers.", technique:"Oil on canvas, mixed light conditions", frames:[3,6,7], image_hue:"240", image_sat:"30%" },
    { id:43, title:"The Sufi's Eye", artist_id:4, year:2022, style_id:4, country_origin:"France", country_depicted:"Islamic World", culture_depicted:"Islamic Sufi", history_context:"In Sufi tradition, the eye of the heart (cheshm-e del in Persian) perceives divine reality. Geometry was the language through which it was trained.", colors:["#1a4a7a","#c9a84c","#2a6a4a","#8a2a1a","#f5f0e0"], width_cm:60, height_cm:60, price:11000, significance:"A single geometric eye built from interlocking patterns — 48-fold symmetry at the center radiating outward. Each layer corresponds to a stage of Sufi knowledge.", technique:"Mathematical compass construction, gold leaf on panel", frames:[4,7], image_hue:"200", image_sat:"50%" },
    { id:44, title:"Bollywood at 100", artist_id:15, year:2023, style_id:22, country_origin:"UK", country_depicted:"India", culture_depicted:"Indian film culture", history_context:"Indian cinema is 100 years old. Bollywood produces more films than Hollywood and is watched by more people globally than any other film industry.", colors:["#c84a8a","#c9a84c","#1a1a8a","#c84a2a","#f5e8c0"], width_cm:50, height_cm:70, price:5000, significance:"Sana's AI model was trained on Bollywood poster archives 1920–2023 to generate a composite 'average' Bollywood poster — a century of film culture in one image.", technique:"AI generation, archival print, digital finishing", frames:[1,3,6], image_hue:"320", image_sat:"55%" },
    { id:45, title:"Wind Over the Qutb Minar", artist_id:6, year:2018, style_id:11, country_origin:"USA", country_depicted:"India", culture_depicted:"Delhi Sultanate heritage", history_context:"The Qutb Minar (1193) is Delhi's oldest monument and the world's tallest brick minaret. It marked the arrival of Islam in Northern India.", colors:["#c8a060","#5a7ac0","#4a6a2a","#c87050","#f5e8c0"], width_cm:50, height_cm:80, price:10800, significance:"An unusual vertical composition matching the minaret's proportions. The monsoon sky is painted in swirling Monet-like strokes that suggest the winds of history.", technique:"Oil on canvas", frames:[3,6], image_hue:"40", image_sat:"45%" },
    { id:46, title:"Armenian Highland — First Light", artist_id:12, year:2017, style_id:16, country_origin:"Taiwan", country_depicted:"Armenia", culture_depicted:"Armenian highland landscape", history_context:"Mount Ararat, sacred to Armenians, was separated from Armenia by the Turkish-Armenian border after the 1915 genocide. It is visible from Yerevan but unreachable.", colors:["#1a1a1a","#4a4a4a","#c9a84c","#8a8a8a","#f5f0e0"], width_cm:75, height_cm:50, price:17500, significance:"Chen paints Ararat in Chinese ink wash technique — the mountain as pure absence and presence, aspiration and loss, in the tradition of unreachable peaks.", technique:"Ink and light wash on silk", frames:[4,6,7], image_hue:"50", image_sat:"10%" },
    { id:47, title:"Khatt al-Mahabba — The Line of Love", artist_id:5, year:2023, style_id:5, country_origin:"Saudi Arabia", country_depicted:"Persia", culture_depicted:"Persian-Arabic Sufi", history_context:"Hafez wrote: 'Last night I saw angels knock at the tavern door / and pour dust of Adam into a bowl and take wine.' — the divine drunk on creation.", colors:["#c91a4a","#c9a84c","#1a1a1a","#f5f0e0","#1a3a6a"], width_cm:100, height_cm:70, price:28000, significance:"A fusion of Arabic Diwani Jali and Persian Nastaliq in one composition — two calligraphic traditions that rarely mix, united in a verse about universal love.", technique:"Diwani Jali + Nastaliq calligraphy, gold, deep crimson ground", frames:[5,7], image_hue:"340", image_sat:"60%" },
    { id:48, title:"Three Generations — Kitchen Table", artist_id:13, year:2023, style_id:21, country_origin:"India", country_depicted:"India", culture_depicted:"Contemporary Indian family", history_context:"The joint family kitchen is one of the most contested and cherished spaces in Indian culture — where women's labor, love, and knowledge are transmitted.", colors:["#c8a060","#c84a2a","#f5e8c0","#4a7a4a","#1a1a6a"], width_cm:90, height_cm:70, price:12000, significance:"Three women in three generations around one kitchen table — the eldest in Rajput miniature style, the middle in Impressionist, the youngest in digital aesthetic.", technique:"Mixed media: mineral pigment, oil, digital print", frames:[3,6,7], image_hue:"30", image_sat:"40%" },
    { id:49, title:"Last Sufi Standing", artist_id:11, year:2022, style_id:20, country_origin:"UK", country_depicted:"West Africa/UK", culture_depicted:"African diaspora Sufi", history_context:"West African Sufi brotherhoods maintained Islamic practice through slavery, colonialism, and globalization. They are among the most resilient spiritual communities in history.", colors:["#c84a1a","#c8a020","#1a1a1a","#4a6a2a","#f5c820"], width_cm:70, height_cm:90, price:18000, significance:"A single standing dervish in white against a riot of West African geometric patterns — the lone individual holding centuries of communal spiritual practice.", technique:"Acrylic and Kente cloth on canvas", frames:[3,6], image_hue:"35", image_sat:"65%" },
    { id:50, title:"Isfahan — The Half of the World", artist_id:10, year:2018, style_id:2, country_origin:"Iran", country_depicted:"Iran", culture_depicted:"Safavid Persian", history_context:"Shah Abbas I called Isfahan 'Nesf-e Jahan' — Half the World. The Maidan square is one of the largest urban plazas ever built and is a UNESCO World Heritage site.", colors:["#1a4a7a","#c9a84c","#2a6a4a","#6a1a2a","#f5e6c8"], width_cm:70, height_cm:55, price:24000, significance:"Hassan's masterwork depicting the Maidan-e Naqsh-e Jahan square at the height of Safavid power — architecturally accurate, painted in perfect Safavid style.", technique:"Natural pigments, gold leaf on prepared paper", frames:[2,3,4], image_hue:"210", image_sat:"50%" }
  ],

  // ── DIGITAL ARTWORKS ─────────────────────────────────────────────────────────
  digital_works: [
    { id:1, title:"Neural Mughal #001", artist_id:7, year:2023, type:"AI Generated", description:"First in a series of 100 AI-generated Mughal-inspired compositions. The neural network was trained on 5,000 historical miniatures.", price:1200, limited_edition:100, colors:["#c9a84c","#1a3a6a","#8b1a4a"], image_hue:"40", image_sat:"60%" },
    { id:2, title:"Neural Mughal #047", artist_id:7, year:2023, type:"AI Generated", description:"The AI discovered an unexpected compositional pattern: circular garden plans overlaid with battle scenes — a visual vocabulary it invented.", price:1200, limited_edition:100, colors:["#1a4a7a","#c9a84c","#2a6a4a"], image_hue:"220", image_sat:"55%" },
    { id:3, title:"Lahore from Above — Photographic Study", artist_id:15, year:2022, type:"Photography", description:"A drone photography series documenting the Walled City of Lahore from altitudes between 10m and 300m.", price:800, limited_edition:25, colors:["#c8a060","#2a4a2a","#c9a84c"], image_hue:"45", image_sat:"40%" },
    { id:4, title:"Geometric Islam — Animated", artist_id:4, year:2023, type:"Digital Animation", description:"A 12-minute looping animation showing an Islamic geometric pattern growing from a single point to full complexity — then dissolving back.", price:2500, limited_edition:10, colors:["#1a4a7a","#c9a84c","#f5f0e0"], image_hue:"215", image_sat:"50%" },
    { id:5, title:"Calligraphy in Motion", artist_id:5, year:2023, type:"Video Art", description:"The 99 Names of God written in real-time by Omar, filmed at 4K. Each name takes between 2 and 17 minutes depending on its complexity.", price:3500, limited_edition:5, colors:["#1a1a1a","#c9a84c","#f5f0e0"], image_hue:"40", image_sat:"70%" },
    { id:6, title:"Holi in Ultra-Slow Motion", artist_id:6, year:2022, type:"Photography", description:"Shot at 1000 frames per second. Individual color particles suspended in air reveal the physics of celebration — each moment a painting.", price:950, limited_edition:50, colors:["#c84a2a","#5a7ac0","#c84a8a","#4a7a2a"], image_hue:"15", image_sat:"75%" }
  ],

  // ── SHOP ITEMS ───────────────────────────────────────────────────────────────
  frames: [
    { id:1, name:"Mughal Gold Leaf Frame", material:"Gessoed wood, 24k gold leaf", style:"Traditional Mughal", description:"Hand-carved arabesque pattern finished in genuine 24k gold leaf. Suited for miniature paintings and works up to 60×80cm.", price:450, colors:["#c9a84c","#8b4a1a"] },
    { id:2, name:"Persian Blue Lacquer Frame", material:"Wood, hand-painted lacquer", style:"Persian traditional", description:"Deep lapis lazuli-colored lacquer with gold floral borders. Traditional Persian frame-making technique from Isfahan.", price:380, colors:["#1a4a7a","#c9a84c"] },
    { id:3, name:"Walnut Classic Frame", material:"Solid walnut", style:"Classic Western", description:"Hand-finished solid American walnut with a simple elegant profile. Works with any painting style and size.", price:280, colors:["#5a3a1a","#3a2a1a"] },
    { id:4, name:"Geometric Islamic Shadow Box", material:"Laser-cut steel, powder coat", style:"Contemporary Islamic", description:"A shadow-box frame with a laser-cut Islamic geometric pattern as the border — creates a dramatic light effect on the wall behind.", price:520, colors:["#1a1a1a","#c9a84c"] },
    { id:5, name:"Carved Sandalwood Frame", material:"Sandalwood, gold inlay", style:"Indo-Persian", description:"Aromatic sandalwood with hand-carved floral patterns and gold wire inlay. Fragrance lasts for years.", price:680, colors:["#8a5a2a","#c9a84c"] },
    { id:6, name:"Minimalist Black Gallery Frame", material:"Aluminum, non-reflective glass", style:"Contemporary minimal", description:"Museum-quality aluminum frame with UV-protective, non-reflective glass. The professional choice for contemporary works.", price:190, colors:["#1a1a1a","#3a3a3a"] },
    { id:7, name:"Ornate Baroque Revival Frame", material:"Resin, antique gold finish", style:"Baroque / European", description:"Full ornate Baroque-style frame with deep relief carving and antique gold finish. Dramatic for large figurative works.", price:340, colors:["#c0a050","#5a3a1a"] }
  ],

  shop_items: [
    // Art Materials
    { id:1, category:"materials", name:"Natural Mineral Pigment Set — Mughal Palette", description:"12 stone-ground natural pigments used in traditional Mughal and Persian miniature painting: lapis lazuli, malachite, vermilion, orpiment, gold, silver, and more.", price:280, image_hue:"40" },
    { id:2, category:"materials", name:"Wasli Paper — Traditional Surface", description:"Hand-made wasli paper (cotton rag, multiple layers pressed) — the traditional surface for South Asian miniature painting. 20 sheets, A3 and A4.", price:85, image_hue:"55" },
    { id:3, category:"materials", name:"Calligraphy Starter Set — Arabic Scripts", description:"Reed pens (qalem), soot-based ink (hibr), practice paper, and a booklet on the basic proportional system. For Naskh, Thuluth, and Nastaliq beginners.", price:120, image_hue:"40" },
    { id:4, category:"materials", name:"24k Gold Leaf Pack", description:"25 sheets of 24 karat gold leaf for gilding artwork. Traditional mukhayyam-grade suitable for manuscripts and panel painting.", price:95, image_hue:"45" },
    { id:5, category:"materials", name:"Squirrel Hair Brush Set — Miniature Painting", description:"7 finest squirrel-hair brushes for detail work: sizes from 000 to 4. Made to the specifications described in Mughal-period manuals.", price:145, image_hue:"35" },
    { id:6, category:"materials", name:"Islamic Geometric Compass Set", description:"Traditional metalworking compass and straight-edge set with instructions for constructing 8, 10, and 12-fold geometric patterns from scratch.", price:65, image_hue:"220" },
    // Services
    { id:7, category:"service", name:"Painting Hanging Expert — Home Visit", description:"Our certified art handler will visit your home, advise on placement, lighting, and hardware, then professionally hang your paintings. Includes basic fixings.", price:150, image_hue:"40" },
    { id:8, category:"service", name:"Painting Hanging Expert — Office/Commercial", description:"Commercial art installation for offices, hotels, and galleries. Full risk assessment, appropriate fixings for all wall types, finishing and alignment.", price:350, image_hue:"40" },
    { id:9, category:"service", name:"Artist Commission — Mughal Miniature", description:"Commission Amir Reza Khan or another of our miniature painters to create a unique Mughal miniature based on your brief. Delivery 3–6 months.", price:3500, image_hue:"30" },
    { id:10, category:"service", name:"Artist Commission — Calligraphy", description:"Commission Omar Abdullah Al-Rashid for a calligraphy artwork. Specify the verse, script (Thuluth, Nastaliq, Diwani), size, and frame preference.", price:2800, image_hue:"40" },
    { id:11, category:"service", name:"Artist Commission — Contemporary", description:"Commission a contemporary work from Leila Hassan Osman, Priya Mehta, or Rashida Sultana. Telephone consultation included. Delivery 2–4 months.", price:4500, image_hue:"210" },
    { id:12, category:"service", name:"Art Valuation — Single Work", description:"Certified valuation by our panel of art historians for insurance or sale purposes. Written report within 10 working days.", price:200, image_hue:"50" },
    { id:13, category:"service", name:"Digital Art Consultation", description:"One-hour video consultation with Tariq Jamil Hussain or Sana Malik on AI-assisted art creation, digital art collecting, and NFT opportunities.", price:180, image_hue:"280" },
    // Prints & Merch
    { id:14, category:"print", name:"Bismillah Print — Gold on Black", description:"High-quality archival print of Omar's Bismillah calligraphy. 50×70cm, printed on heavyweight 300gsm art paper. Limited run of 250.", price:95, image_hue:"40" },
    { id:15, category:"print", name:"Mughal Garden Print Set — 4 Seasons", description:"Set of four archival prints depicting a Mughal garden in spring, summer, autumn, and winter. Each 30×40cm. Gift-boxed.", price:180, image_hue:"120" },
    { id:16, category:"print", name:"Artist Catalogue — Maktab-al-fann 2024", description:"164-page hardback artist catalogue with essays on all gallery artists, full-color reproductions, and art historical context. Signed by the artists.", price:75, image_hue:"35" }
  ],

  // ── EXHIBITIONS (External — curated from web) ────────────────────────────────
  external_exhibitions: [
    { id:1, title:"Arts of the Islamic World", venue:"Sotheby's", city:"London", country:"UK", start_date:"2024-10-15", end_date:"2024-10-25", description:"The premier auction and exhibition of Islamic art, featuring Mughal, Persian, and Ottoman works.", url:"https://www.sothebys.com", type:"Auction/Exhibition" },
    { id:2, title:"Mughal Splendour", venue:"Victoria and Albert Museum", city:"London", country:"UK", start_date:"2024-11-01", end_date:"2025-03-31", description:"A major survey of Mughal art from private and public collections. Over 200 works.", url:"https://www.vam.ac.uk", type:"Museum Exhibition" },
    { id:3, title:"Contemporary Islamic Art Fair", venue:"Saatchi Gallery", city:"London", country:"UK", start_date:"2024-09-20", end_date:"2024-09-24", description:"The leading fair for contemporary art from Muslim-majority countries and diaspora artists.", url:"https://www.saatchigallery.com", type:"Art Fair" },
    { id:4, title:"Louvre Abu Dhabi — New Acquisitions", venue:"Louvre Abu Dhabi", city:"Abu Dhabi", country:"UAE", start_date:"2024-10-01", end_date:"2025-01-31", description:"New works acquired by Louvre Abu Dhabi including Islamic calligraphy and South Asian paintings.", url:"https://www.louvreabudhabi.ae", type:"Museum Exhibition" },
    { id:5, title:"Art Dubai 2025", venue:"Madinat Jumeirah", city:"Dubai", country:"UAE", start_date:"2025-03-19", end_date:"2025-03-23", description:"The Middle East's leading contemporary art fair with strong South Asian and Islamic art representation.", url:"https://www.artdubai.ae", type:"Art Fair" },
    { id:6, title:"Karachi Biennale 2024", venue:"Various venues", city:"Karachi", country:"Pakistan", start_date:"2024-10-12", end_date:"2024-11-10", description:"Pakistan's premier contemporary art biennial, showcasing South Asian artists internationally.", url:"https://www.karachibiennale.org", type:"Biennial" },
    { id:7, title:"India Art Fair 2025", venue:"NSIC Grounds", city:"New Delhi", country:"India", start_date:"2025-02-01", end_date:"2025-02-04", description:"South Asia's largest art fair with galleries from across India and the world.", url:"https://www.indiaartfair.in", type:"Art Fair" },
    { id:8, title:"Metropolitan Museum — Kingdoms of the Deccan", venue:"The Met", city:"New York", country:"USA", start_date:"2024-11-15", end_date:"2025-04-15", description:"The first major US exhibition dedicated to Deccani painting from 16th–18th century India.", url:"https://www.metmuseum.org", type:"Museum Exhibition" },
    { id:9, title:"Art Basel — Special Section: Islamic Worlds", venue:"Art Basel", city:"Basel", country:"Switzerland", start_date:"2025-06-19", end_date:"2025-06-22", description:"Art Basel's dedicated section for art from Islamic cultural contexts.", url:"https://www.artbasel.com", type:"Art Fair" },
    { id:10, title:"Lahore Biennale 2025", venue:"Various venues", city:"Lahore", country:"Pakistan", start_date:"2025-03-01", end_date:"2025-04-15", description:"A major biennial at the Lahore Fort and Walled City exploring South Asian contemporary art.", url:"https://www.lahorebiennale.org", type:"Biennial" },
    { id:11, title:"Iranian Contemporary Art Fair", venue:"Tehran Museum of Contemporary Art", city:"Tehran", country:"Iran", start_date:"2024-12-05", end_date:"2024-12-15", description:"Annual showcase of contemporary Iranian art including calligraphy, miniature revival, and digital works.", url:"https://www.tmoca.com", type:"Exhibition" },
    { id:12, title:"TEFAF — Islamic Art Section", venue:"MECC Maastricht", city:"Maastricht", country:"Netherlands", start_date:"2025-03-08", end_date:"2025-03-16", description:"The world's leading art and antiques fair with a dedicated Islamic art section.", url:"https://www.tefaf.com", type:"Art Fair" }
  ]
};

// =============================================================================
// RICH DETAIL DATA — for artwork detail pages & artist profile pages
// =============================================================================

ART_DATA.paintingDetails = {
  1: {
    isFeatured: true,
    dimensions: "45 × 60 cm",
    medium: "Natural pigments, gold leaf on wasli paper",
    history: "Reimagines Akbar's legendary court (c.1556–1605) where scholars of all faiths — Hindu, Muslim, Jain, Christian — debated theology and philosophy. Amir spent two years researching primary Mughal sources before beginning this work in 2016. The painting replaces historical courtiers with contemporary political figures.",
    styleExplanation: "Executed in classical Mughal miniature technique — natural mineral pigments ground to fine powder, applied with squirrel-hair brushes of extraordinary fineness on hand-prepared wasli paper. The gilding uses genuine 24k gold leaf burnished to a mirror finish, following 16th-century Mughal workshop practice.",
    culturalContext: "Akbar's policy of Sulh-e-Kul (universal peace) made his court the most intellectually diverse of any 16th-century ruler. This painting asks a pointed question: which leader today embodies that same pluralism? The Mughal durbar format — a formal audience — was the era's most powerful political image.",
    timeline: [
      { year: 1556, title: "Akbar ascends throne", description: "At 13, Akbar inherits the Mughal empire and begins transforming it into a pluralist state through religious dialogue and cultural patronage." },
      { year: 1575, title: "Ibadat Khana founded", description: "Akbar builds the House of Worship at Fatehpur Sikri where scholars of all faiths debate theology weekly before the emperor." },
      { year: 2016, title: "Research begins", description: "Amir begins two years of archival research into Mughal court painting sources, studying originals at the V&A, British Library, and Chester Beatty Library." },
      { year: 2018, title: "The Durbar completed", description: "After 18 months of painting on specially prepared wasli paper, the work is completed and shown at the Hayward Gallery, London." }
    ]
  },
  2: {
    isFeatured: false,
    dimensions: "30 × 40 cm",
    medium: "Gold leaf, lapis lazuli pigment on paper",
    history: "The shaheen (peregrine falcon) became Pakistan's national symbol through Allama Iqbal's poetry, which used it as a metaphor for the free Muslim spirit soaring above convention. Mughal emperors were passionate falconers; Jahangir commissioned Mansur's celebrated naturalistic animal studies. Amir's 2020 work fuses both traditions.",
    styleExplanation: "The falcon is depicted in the naturalistic style of Mansur, Jahangir's master animal painter — anatomically precise yet alive with inner energy. The lapis lazuli sky follows authentic Mughal pigment grinding, the same mineral imported from Badakhshan that gave Mughal blue its unmistakable depth.",
    culturalContext: "Iqbal wrote: 'Tu shaheen hai, parwaz hai kaam tera' — You are the falcon, flight is your purpose. The falcon in Mughal painting was simultaneously a status symbol and a spiritual metaphor. Amir layers these meanings: Pakistani nationhood, Iqbal's vision of the free spirit, and the Mughal tradition of the living world.",
    timeline: [
      { year: 1602, title: "Mansur paints for Jahangir", description: "Abd al-Samad's successor Mansur begins creating the naturalistic animal studies that will define Mughal painting's engagement with the natural world." },
      { year: 1915, title: "Iqbal's Shikwa poems", description: "Allama Iqbal uses the shaheen (falcon) as his central metaphor for the awakened Muslim spirit in his revolutionary Urdu poetry." },
      { year: 1947, title: "Pakistan's independence", description: "The shaheen appears on Pakistan's national emblem and in Iqbal's poetry recited at independence — a bird of the sky for a newly sovereign people." },
      { year: 2020, title: "Shaheen Rising painted", description: "Amir completes this meditation on national identity, exhibiting it at the National Gallery of Pakistan before international tour." }
    ]
  },
  3: {
    isFeatured: false,
    dimensions: "50 × 65 cm",
    medium: "Natural pigments, gold leaf on wasli paper",
    history: "Based on Abu al-Hasan's famous allegorical painting (c.1618) 'Jahangir Embracing Shah Abbas' — one of the most sophisticated diplomatic images in world art history. Jahangir stands on a globe, holding the Persian Shah in a fraternal embrace, while two cherubs above hold a rainbow. Amir's version substitutes contemporary leaders.",
    styleExplanation: "The painting-within-a-painting format is a Mughal invention — referencing the original Abu al-Hasan work while placing new figures in its composition. The wasli paper preparation involves pressing 10–15 layers of cotton rag with a burnishing stone until the surface is as smooth as ivory.",
    culturalContext: "Abu al-Hasan's original used a European vanitas globe to signal Mughal world dominance — a sophisticated fusion of Ottoman, Persian, European, and Indian visual languages in one image. Amir's version asks how power and alliance operate in the 21st century using the same allegorical vocabulary.",
    timeline: [
      { year: 1618, title: "Abu al-Hasan's original", description: "The master painter Abu al-Hasan creates 'Jahangir Embracing Shah Abbas' — the most politically sophisticated image of the Mughal period." },
      { year: 1799, title: "British acquire the original", description: "The painting passes through various collections before entering the Freer Gallery. Its political meaning is gradually forgotten and it becomes 'merely decorative'." },
      { year: 2021, title: "Research and composition", description: "Amir spends months composing which contemporary leaders to place in the original's positions — and what that placement would mean politically." },
      { year: 2022, title: "Jahangir's Dream completed", description: "The finished work provokes debate about whether art can decode power more honestly than journalism." }
    ]
  },
  4: {
    isFeatured: false,
    dimensions: "35 × 50 cm",
    medium: "Natural mineral pigments on paper",
    history: "Nocturnal Mughal compositions are extremely rare — the tradition favoured daylight court scenes, hunts, and gardens. Amir found a handful of night scenes in the collections at the British Library and Chester Beatty. This work is a sustained meditation on what it means to be a Mughal painter choosing darkness.",
    styleExplanation: "The night sky is built up from ultramarine and lamp black in hairline glazes — each layer applied after the previous has dried for 24 hours. The moonlit figures use lead white mixed with the finest yellow ochre to simulate reflected moonlight, a technique Amir devised through extensive experiment.",
    culturalContext: "Mughal love poetry — particularly the ghazals of Mir and Ghalib — is inseparable from the image of night, moonlight, and longing. Desire in Mughal culture is always linked to power: the beloved is always also the patron, God, and the Mughal state. Amir paints this intersection of longing and authority.",
    timeline: [
      { year: 1627, title: "Jahangir dies", description: "With the death of the greatest Mughal patron of painting, the nocturnal mood enters Mughal miniatures as artists mourn the passing of an era." },
      { year: 1850, title: "Night scenes dispersed", description: "The Mughal night paintings are sold at auction as the empire collapses, ending up in European collections where their emotional meaning is lost." },
      { year: 2018, title: "Amir's research", description: "Amir examines night-scene miniatures at the British Library, Chester Beatty, and V&A, developing a new nocturnal technique." },
      { year: 2019, title: "Love Remembered completed", description: "The work sells immediately to a private collector in Dubai who describes it as 'the most romantic painting made in 400 years'." }
    ]
  },
  5: {
    isFeatured: true,
    dimensions: "40 × 55 cm",
    medium: "Lapis lazuli, malachite, gold on paper",
    history: "Nizami Ganjavi's 12th-century poem 'Layla and Majnun' is the Islamic world's Romeo and Juliet — though older by four centuries. The story of Qays, who goes mad (majnun) with love for the unattainable Layla, became the central metaphor of Sufi poetry for the soul's longing for God. Nadia began this series after her grandmother told her the poem as a bedtime story.",
    styleExplanation: "Painted in the classical Persian miniature tradition using lapis lazuli ground from Afghan mineral, malachite from Iran, and gold imported from the same source used by Safavid workshops. The flat architectural perspective and decorative floral borders follow the Tabriz school conventions of the 16th century.",
    culturalContext: "Nadia's Layla is unmistakably a contemporary Iranian woman — her clothing, posture, and gaze refigure the medieval heroine as someone who has chosen her own exile. The desert is no longer a place of madness but of deliberate self-determination. Persian feminist readers have found this painting intensely personal.",
    timeline: [
      { year: 1188, title: "Nizami writes the poem", description: "The great Persian poet Nizami Ganjavi of Ganja completes 'Layla and Majnun', transforming an Arab folk tale into one of the world's great love epics." },
      { year: 1530, title: "First Persian miniature illustrations", description: "Safavid workshops begin illustrating the poem in the refined Tabriz style — establishing the visual vocabulary Nadia studies and subverts." },
      { year: 2015, title: "Nadia hears the story again", description: "Her grandmother tells her Layla and Majnun as a bedtime story — the same way she heard it as a child in Tehran. Nadia begins painting immediately." },
      { year: 2017, title: "Layla and Majnun completed", description: "The finished work is acquired by the Musée des beaux-arts de Montréal and becomes one of the most discussed works of contemporary Islamic art." }
    ]
  },
  6: {
    isFeatured: false,
    dimensions: "55 × 70 cm",
    medium: "Gold leaf, natural pigments on wasli paper",
    history: "Attar of Nishapur's 12th-century masterwork 'Conference of the Birds' (Mantiq al-Tayr) follows 30 birds on a journey to find the mythical Simurgh king. After crossing seven valleys, they discover — in the poem's great revelation — that si morgh (30 birds in Persian) are themselves the Simurgh. Nadia has illustrated all seven valleys over her career; this is valley five: bewilderment.",
    styleExplanation: "The Simurgh itself is traditionally depicted as a composite creature — peacock feathers, lion claws, dog head — combining the noblest qualities of all creatures. Nadia renders each of the 30 birds in a different Persian miniature school style, creating an encyclopedia of the tradition within a single composition.",
    culturalContext: "The Simurgh narrative is the central metaphor of Sufi poetry: the individual self (nafs) journeying through annihilation (fana) to discover it was always divine. Nadia adds a contemporary layer: the 30 birds are also 30 Iranian women, each from a different generation, all seeking the same thing.",
    timeline: [
      { year: 1177, title: "Attar writes Conference of the Birds", description: "The Persian Sufi poet Farid ud-Din Attar completes his masterwork — 4,500 couplets describing the soul's journey through seven valleys to God." },
      { year: 1487, title: "Bihzad's Herat illustrations", description: "The master Kamal al-Din Bihzad creates the definitive Persian miniature illustrations of Attar's poem in Herat — still considered unsurpassed." },
      { year: 2016, title: "Nadia begins the Valleys series", description: "Nadia decides to paint all seven valleys of Attar's poem across her career — one per year. Valley one (seeking) is completed first." },
      { year: 2019, title: "The Simurgh Speaks completed", description: "Valley five (bewilderment) — considered the most difficult to illustrate. The work wins the Sobey Art Award shortlist and tours North America." }
    ]
  },
  7: {
    isFeatured: false,
    dimensions: "45 × 60 cm",
    medium: "Natural pigments, gold leaf on prepared paper",
    history: "From the Shahnameh (Book of Kings), Ferdowsi's 10th-century Persian epic that is the longest poem ever written by a single author. Hassan Mirza Qajar spent three years studying the original Tahmasp Shahnameh (1524–1576) — the most expensive manuscript ever sold — at the Metropolitan Museum to recreate this scene with archaeological precision.",
    styleExplanation: "The Tahmasp Shahnameh style combines the Turkman painterly tradition with Persian calligraphic refinement. Hassan uses the same mineral pigments analysed in the original: orpiment yellow, lapis lazuli blue, and a red derived from insects. His technique is indistinguishable from 16th-century originals under close examination.",
    culturalContext: "The White Div story operates on multiple levels: mythological (the monster that blinds the king), psychological (the shadow that must be confronted), and national (the pre-Islamic Persian spirit that Iran must reckon with). Hassan's scholarly recreation is also a political act — preserving Persian heritage against its erasure.",
    timeline: [
      { year: 1010, title: "Ferdowsi completes the Shahnameh", description: "After 30 years of composition, Ferdowsi finishes the 60,000-couplet Book of Kings — Iran's national epic and the longest poem by a single author in history." },
      { year: 1524, title: "Tahmasp Shahnameh begun", description: "Shah Tahmasp I commissions the definitive illustrated Shahnameh. 258 paintings over 20 years make it the greatest Persian manuscript ever created." },
      { year: 2013, title: "Hassan begins research", description: "Three years studying the Tahmasp Shahnameh originals at the Metropolitan Museum, British Library, and private collections." },
      { year: 2016, title: "Rustam Slays the White Div completed", description: "The technically perfect recreation is certified authentic by three independent art historians, then displayed alongside 16th-century originals at Christie's." }
    ]
  },
  8: {
    isFeatured: false,
    dimensions: "60 × 75 cm",
    medium: "Lapis lazuli pigment, malachite, gold on paper",
    history: "The Persian word 'paradise' (pairidaeza) means 'walled garden' — the enclosed garden as a microcosm of heaven. Persian garden design influenced every Islamic culture from Andalusia to Mughal India. Nadia's garden contains plants from all these traditions simultaneously — a botanical map of Islamic civilization.",
    styleExplanation: "The garden painting tradition in Persian miniature uses an elevated bird's-eye perspective with the garden grid filling the entire composition. Nadia follows this format but populates it with contemporary details: a smartphone photographing a flower, a drip irrigation system between the traditional channels.",
    culturalContext: "The Iranian garden — chaharbagh (four gardens) — represents the Islamic paradise with its four rivers of water, milk, honey, and wine. Nadia's digital-native woman tending this garden questions who inherits these paradises and on what terms in the 21st century.",
    timeline: [
      { year: 550, title: "Cyrus builds Pasargadae garden", description: "The oldest known Persian garden — four walled sections, water channels, and pavilions — sets the template that will spread across the Islamic world." },
      { year: 1526, title: "Babur describes his garden longing", description: "The Mughal founder Babur writes movingly in his memoirs of his homesickness for Persian gardens while conquering India's hot plains." },
      { year: 2019, title: "Nadia in Iran", description: "Nadia visits the UNESCO-listed Persian gardens of Fin, Shazdeh, and Eram — sketching for three months." },
      { year: 2021, title: "Garden of Paradise completed", description: "The work is acquired by a private collector in Vancouver and donated to the Aga Khan Museum, Toronto." }
    ]
  },
  9: {
    isFeatured: false,
    dimensions: "35 × 45 cm",
    medium: "Stone-ground mineral pigments on wasli paper",
    history: "The Rasamanjari text classifies 360 female heroines (nayikas) of love poetry by their emotional situation. Radha in the rain — virahini (separated lover) — is one of the most celebrated Rajput subjects. Vikram ground the indigo from the same Rajasthani indigofera plant used in 17th-century Kishangarh workshops.",
    styleExplanation: "The Kishangarh school's signature is the elongated eye with a sharply curved lower lid, the arched eyebrow, and the stylized lotus petal nose. These forms encode divinity — the elongated eye is Krishna's eye, and Kishangarh paintings simultaneously depict and venerate the divine couple.",
    culturalContext: "Rain in Indian poetry and painting has always been a metaphor for both longing and fulfilment. The monsoon breaks the separation — but Radha's longing precedes the rain and will outlast it. This is the Vaishnava theology of viraha (separation) as the highest spiritual state: to love what is not yet present.",
    timeline: [
      { year: 1450, title: "Rasamanjari codified", description: "Bhanudatta's Sanskrit text systematizes the heroines of love poetry, providing the iconographic program for Rajput painters for the next 400 years." },
      { year: 1720, title: "Kishangarh school peaks", description: "Under Raja Savant Singh, the Kishangarh court creates its most refined paintings with the distinctive elongated eye that makes them immediately recognizable." },
      { year: 2012, title: "Vikram resumes indigo grinding", description: "Vikram discovers the last surviving indigo grinder in Rajasthan and spends a year reviving the stone-grinding process for blue pigment." },
      { year: 2015, title: "Radha Awaiting completed", description: "One of Vikram's last works before his illness, it is acquired by the National Museum New Delhi after his death in 2021." }
    ]
  },
  10: {
    isFeatured: false,
    dimensions: "50 × 40 cm",
    medium: "Gold leaf, mineral pigments on paper",
    history: "The Bundi school is celebrated for hunting compositions dense with foliage, water, and wildlife. The school's signature mustard yellow — achieved from orpiment ground with particular coarseness — appears in no other Rajput school. Vikram's 2010 hunting scene was his last large royal hunting composition.",
    styleExplanation: "Bundi hunting paintings use an unusual horizontal format that allows animals to move across the composition. The dense green foliage is built up from multiple malachite glazes, creating depth that is unusual in a tradition that normally uses flat color. The tigers here are each psychologically distinct — a Bundi specialty.",
    culturalContext: "The royal hunt (shikar) was the Rajput ruler's primary demonstration of martial skill, authority over the natural world, and divine favor. But Vikram, painting in 2010, gives the tigers a dignity absent in older hunt paintings. The last tiger carries a specific melancholy that viewers always notice.",
    timeline: [
      { year: 1680, title: "Bundi school develops hunting tradition", description: "Under Rao Bhoj Singh, Bundi painters develop the dense foliage and tiger compositions that will define their school for 200 years." },
      { year: 1900, title: "Last royal hunts", description: "The British colonial administration begins banning royal hunts. The painted hunts become elegies for a disappearing aristocratic world." },
      { year: 2008, title: "Vikram discovers Bundi archives", description: "Access to the Bundi royal collection gives Vikram primary source material for authentic color mixing." },
      { year: 2010, title: "The Hunt at Bundi completed", description: "Acquired by a Rajput collector, the work travels to an international Rajput painting exhibition before returning to India." }
    ]
  },
  11: {
    isFeatured: false,
    dimensions: "30 × 50 cm",
    medium: "Mineral pigments, gold on paper",
    history: "Bani Thani was a real woman — Vishnu Priya, a singer-poet at the Kishangarh court of Savant Singh (c.1750). She became the model for the idealized Kishangarh woman: elongated neck, arched brows, petal lips, eyes like lotus petals. Rashida's 2022 version inserts herself into the Bani Thani pose, challenging the gaze of the original.",
    styleExplanation: "Rashida follows the Kishangarh compositional formula precisely — the three-quarter profile, the gold jewelry, the jewel-bright background — but changes every element that marked Bani Thani as submissive or decorative. The gaze here is direct rather than downcast.",
    culturalContext: "Bani Thani images have been used for centuries to sell Indian handicrafts, tourism, and perfume. Rashida's intervention asks: whose vision of femininity do these images serve? By placing herself in the pose, she asserts contemporary authorship over a historical ideal that has long been used without women's consent.",
    timeline: [
      { year: 1750, title: "Bani Thani depicted in Kishangarh", description: "Court painter Nihal Chand creates the idealized portrait of Vishnu Priya (Bani Thani) that defines Kishangarh painting for all time." },
      { year: 1973, title: "Bani Thani on Indian postage stamp", description: "The image is reproduced on an Indian postage stamp — becoming one of the most recognized images of 'classical Indian femininity' globally." },
      { year: 2021, title: "Rashida's feminist research", description: "Rashida researches the real Bani Thani — a musician and poet in her own right — recovering the woman behind the idealized image." },
      { year: 2022, title: "Bani Thani — The Elegant One completed", description: "The work causes immediate discussion at India Art Fair about who inherits the classical tradition and on whose terms." }
    ]
  },
  12: {
    isFeatured: true,
    dimensions: "80 × 80 cm",
    medium: "Gold leaf, lapis, hand-painted on gessoed board",
    history: "Fatima spent three months in the Alhambra measuring and photographing the geometric patterns of the Sala de las Dos Hermanas. The 12-fold star in this painting is a 1:1 scale reproduction of a specific pattern from that chamber, reconstructed using only the mathematical tools available to the original craftsmen.",
    styleExplanation: "Islamic geometric art uses compass and straight-edge construction — no freehand drawing. Every line in this painting is geometrically derived from a single point. Fatima published the mathematical proof that the Alhambra pattern uses a construction sequence unknown in published scholarship, discovered during her research.",
    culturalContext: "The 12-pointed star encodes the months of the year, the zodiac signs, and the perfect 30-degree division of space. In Sufi thought, geometry was the language of divine order — creating a geometric pattern was an act of worship. Fatima, a mathematician by training, experiences the geometric construction process as meditation.",
    timeline: [
      { year: 1354, title: "Sala de las Dos Hermanas built", description: "Nasrid Sultan Muhammad V completes the Hall of the Two Sisters in the Alhambra — its 12-fold geometric vault is the most complex medieval geometric construction in the world." },
      { year: 1992, title: "Mathematical analysis begins", description: "Crystallographers and mathematicians begin analysing the Alhambra's patterns, discovering they anticipate 20th-century mathematical discoveries." },
      { year: 2018, title: "Fatima's Alhambra residency", description: "Three months in Granada, measuring and photographing the patterns. Fatima discovers a construction sequence not previously documented." },
      { year: 2020, title: "The Infinite Star completed", description: "Simultaneously a painting and a mathematical proof, the work is exhibited at the Paris Institut du Monde Arabe and acquired by a private collector." }
    ]
  },
  13: {
    isFeatured: false,
    dimensions: "70 × 90 cm",
    medium: "Mathematical compass construction, mineral pigments, gold",
    history: "Muqarnas — the stalactite vaulting found in Islamic domes from Córdoba to Samarkand — represents the geometric-spiritual apex of Islamic architecture. Fatima spent two years constructing the mathematical model for this painting before touching paper. The impossible 2D dome was described by architect Peter Rice as 'the most significant impossible object I have ever seen'.",
    styleExplanation: "The muqarnas form is three-dimensional by nature. Rendering it in 2D painting required Fatima to solve several novel geometric problems — how to project a three-dimensional stalactite dome onto a flat surface while preserving all the mathematical relationships. She invented a projection system for this work.",
    culturalContext: "Frank Lloyd Wright called Gothic cathedrals 'frozen music'. Muqarnas are frozen light — the geometry is designed to capture and disperse sunlight in ever-changing patterns throughout the day. Fatima's painting attempts to capture a single moment in that daily light cycle.",
    timeline: [
      { year: 1050, title: "Muqarnas emerges in Iran", description: "The earliest known muqarnas vault appears at the Tomb of the Samanids, Bukhara. The form spreads westward and eastward simultaneously." },
      { year: 1300, title: "Alhambra muqarnas domes", description: "The Nasrid palaces in Granada achieve the most refined muqarnas in the western Islamic world — their mathematical complexity remains unequalled." },
      { year: 2019, title: "Fatima begins mathematical modeling", description: "Two years developing the projection system for the impossible 2D dome, consulting with geometers at the Institut Henri Poincaré." },
      { year: 2021, title: "Muqarnas — The Frozen Music completed", description: "The work is immediately acquired by the Cité de l'Architecture, Paris, and displayed alongside architectural drawings by Le Corbusier." }
    ]
  },
  14: {
    isFeatured: false,
    dimensions: "100 × 100 cm",
    medium: "Encaustic wax, gold leaf, hand-painted patterns",
    history: "Idris Al-Farouq's largest canvas represents 40 years of work in Islamic geometric art. He spent the final decade of his life on this single composition, uniting the Moroccan zellige tilework tradition with the Persian girih tile system and the Mughal pietra dura inlay technique in one cosmic mandala.",
    styleExplanation: "The zellige tradition uses fired ceramic mosaic to create geometric patterns on walls and floors. Idris translated this tiled surface into wax encaustic on canvas — a technique that creates similar depth and lustre to glazed ceramic but in a portable format. The gold leaf is applied over the wax in the Moroccan thilad technique.",
    culturalContext: "The mandala structure — a central axis with radiating symmetry — is found in both Islamic geometric art and Hindu-Buddhist sacred imagery. Idris, who studied the geometry of both traditions, saw this convergence as proof of a universal human mathematical impulse. The work became his final statement on artistic unity.",
    timeline: [
      { year: 1000, title: "Zellige tradition established in Morocco", description: "Berber craftsmen in Fez develop the fired ceramic mosaic technique that will define Moroccan architectural decoration for a thousand years." },
      { year: 1975, title: "Idris begins geometric research", description: "After studying mathematics and painting in Paris, Idris returns to Morocco to document zellige patterns being lost as craftsmen die." },
      { year: 2000, title: "Mandala research begins", description: "Idris spends five years studying Hindu-Buddhist mandala geometry in India and Nepal, finding deep mathematical connections to Islamic patterns." },
      { year: 2005, title: "Zellige Mandala completed", description: "The work is displayed at the Musée d'Orsay retrospective and later donated to the Institut du Monde Arabe. Idris calls it his life's work." }
    ]
  },
  15: {
    isFeatured: true,
    dimensions: "90 × 60 cm",
    medium: "24k gold leaf Thuluth script on black Japanese paper",
    history: "The Bismillah ('In the Name of God, the Compassionate, the Merciful') opens 113 of the 114 Quranic surahs and precedes every significant Muslim action. Omar spent three years on the proportional system alone before beginning the gold on black version. The composition went through 47 rejected drafts.",
    styleExplanation: "Thuluth ('one third') script is named for the ratio of its straight elements to curved. Each letter must be in specific proportional relationship to every other letter — a mathematical requirement that makes Thuluth one of the most technically demanding Arabic scripts. Omar's teacher in Medina took 10 years to certify him.",
    culturalContext: "The Bismillah phrase contains 19 characters in Arabic — 19 is a sacred number in Islamic numerology. The phrase 'al-Rahman al-Rahim' uses two of God's 99 names, both derived from the same root (r-h-m: mercy). Omar's composition encodes this mathematical structure: 19 characters in a golden-ratio rectangle.",
    timeline: [
      { year: 610, title: "First Quranic revelation", description: "The word 'Iqra' (Read/Recite) begins the Quran's revelation to Muhammad. Writing becomes sacred in Islam from the first moment." },
      { year: 940, title: "Ibn Muqla systematizes calligraphy", description: "The Abbasid vizier Ibn Muqla creates the proportional system — deriving all Arabic letterforms from the rhombic dot — that Omar still follows." },
      { year: 2016, title: "Omar begins the Bismillah", description: "Three years of proportional study and 47 rejected compositions before the first brushstroke of gold touches the black Japanese paper." },
      { year: 2019, title: "Bismillah completed", description: "The work is exhibited at the Royal Academy and acquired by a collector in Riyadh who installs it as the entrance piece to his private mosque." }
    ]
  },
  16: {
    isFeatured: false,
    dimensions: "120 × 80 cm",
    medium: "Thuluth script, gold on dark blue Japanese paper",
    history: "Al-Fatiha (The Opening) is recited 17 times daily by every Muslim — in the five prayers, each prayer including multiple rak'ahs. Over 1.8 billion people have memorized it. Omar's challenge was to render all seven verses in one continuous interlocking composition where each verse flows into the next without visual interruption.",
    styleExplanation: "The large format (120×80cm) is unusual for calligraphy, which traditionally worked at intimate scale. Omar chose this size so each letter is large enough to see the individual brushstroke — the evidence of the hand — within the golden-ratio composition. The dark blue ground is aged Japanese kozo paper, dyed in indigo.",
    culturalContext: "Al-Fatiha is simultaneously prayer, praise, and petition — in seven verses it covers the entire range of human relationship to the divine. Omar's visual flow — each verse bleeding into the next — expresses what Sufi theologians call the continuity of divine mercy: there is no break in God's compassion.",
    timeline: [
      { year: 610, title: "Surah Al-Fatiha revealed", description: "The first complete surah revealed to Muhammad, establishing the prayer formula used in every subsequent Islamic prayer for 1,400 years." },
      { year: 900, title: "Fatiha calligraphy traditions established", description: "Different calligraphic schools develop distinct visual traditions for rendering the Fatiha — Kufic, Thuluth, Naskh each with different spiritual emphasis." },
      { year: 2020, title: "Omar begins composition planning", description: "Two years spent planning how to flow seven verses without visual interruption — a problem no previous calligrapher had fully solved." },
      { year: 2022, title: "Surah Al-Fatiha completed", description: "The work is donated to the King Abdulaziz Center for World Culture, Dhahran, where it becomes the centrepiece of the Islamic calligraphy collection." }
    ]
  },
  17: {
    isFeatured: false,
    dimensions: "40 × 60 cm",
    medium: "Nastaliq calligraphy, Persian miniature technique",
    history: "Rumi's Masnavi opens with the most famous line in Persian literature: 'Hear how the reed flute tells its tale of separation / From the time it was cut from the reed bed, it has cried.' Nadia's innovation was to make the calligraphic text physically take the shape of a reed — 18 months planning how the Nastaliq letterforms could bend into organic form.",
    styleExplanation: "Combining Arabic/Persian calligraphy with miniature painting in one composition is technically very difficult — the calligraphic lines must maintain their proportional integrity while functioning as pictorial elements. Nadia studied both traditions independently for years before attempting their fusion.",
    culturalContext: "The reed flute (ney) in Rumi's theology represents the human soul, cut from the reed bed of divine origin and crying for return. Every sound the ney makes is a sound of separation and longing. Nadia's painting-as-poem makes the viewer simultaneously read and see the lament.",
    timeline: [
      { year: 1258, title: "Rumi in Konya", description: "After the death of his beloved Shams of Tabriz, Rumi begins dictating the Masnavi — 25,000 couplets of Sufi poetry over 15 years." },
      { year: 1400, title: "First illustrated Masnavi manuscripts", description: "Persian miniaturists begin illustrating the Masnavi, but always as scenes from the poem — never as visual-textual fusion." },
      { year: 2018, title: "Nadia develops the technique", description: "Eighteen months experimenting with ways to bend Nastaliq letterforms into organic reed shapes without losing calligraphic integrity." },
      { year: 2020, title: "Rumi's Reed Flute completed", description: "The work is exhibited at the Aga Khan Museum and received by critics as the most successful fusion of Persian calligraphy and miniature painting in contemporary art." }
    ]
  },
  18: {
    isFeatured: false,
    dimensions: "45 × 55 cm",
    medium: "Ink, natural pigments on paper — dual tradition",
    history: "The Bhagavata Purana's 10th book describes Krishna's Rasa Lila — the cosmic dance with the gopis (cowherds) in the forest of Vrindavan. Yasmin's version merges Kangra-school lyrical brushwork with Chinese ink painting's fluid calligraphic line, a fusion she has been developing since her dual training in Beijing and Dhaka.",
    styleExplanation: "The fusion technique requires different sections of the painting to use different implements — Chinese hair brush for the fluid tree forms, pointed Kangra brush for the figures' detailed faces. The transition between styles is invisible, which Yasmin considers the technical achievement of her career.",
    culturalContext: "The Rasa Lila as understood by Vaishnava theology is not a romantic scene but a description of the soul's union with the divine — each gopi is a spiritual seeker, and their dance with Krishna is the moment of enlightenment. The forest setting is the cosmos. Yasmin's Chinese landscape trees extend this cosmic reading.",
    timeline: [
      { year: 900, title: "Bhagavata Purana composed", description: "The Sanskrit text describes Krishna's Rasa Lila dance in its 10th book — establishing the visual and literary program for Vaishnava devotion." },
      { year: 1780, title: "Kangra school Rasa Lila paintings", description: "Under the patronage of Raja Sansar Chand, Kangra painters create the most refined Rasa Lila series — their lyrical brushwork still unsurpassed." },
      { year: 2010, title: "Yasmin's dual training", description: "After studying miniature painting in Dhaka, Yasmin enrolls at the Central Academy of Fine Arts in Beijing to study Chinese ink painting." },
      { year: 2018, title: "Krishna and the Gopis completed", description: "The first successful fusion of Kangra and Chinese ink traditions in one composition — acquired by the Dhaka Art Summit and exhibited internationally." }
    ]
  },
  19: {
    isFeatured: false,
    dimensions: "35 × 50 cm",
    medium: "Stone-ground mineral pigments, gold on paper",
    history: "Ragamala ('garland of ragas') paintings translate musical ragas into visual form — each painting is a portrait of a musical mode's emotional content and the season or time of day in which it should be performed. Megh Malhar calls the monsoon; Vikram painted this during the actual monsoon in Jaipur.",
    styleExplanation: "The Ragamala tradition created a specific visual grammar for each raga — particular colors, instruments, figures, and landscapes denoted each mode. Vikram's Megh Malhar follows the traditional grammar (storm clouds, peacocks, ascending female figure) while using the specific storm-dark blue he achieved by grinding azurite to unusual coarseness.",
    culturalContext: "Music in Indian theory is not separable from cosmology — ragas are performed at specific times because the audible and visual cosmos align at those moments. A painting of Megh Malhar is thus also a performance: hanging it during the monsoon, in a room where the raga is played, creates a complete aesthetic experience.",
    timeline: [
      { year: 1100, title: "Ragamala system codified", description: "Sanskrit theorists codify the 36 major ragas and their associated visual imagery — creating the template for 600 years of Ragamala painting." },
      { year: 1700, title: "Pahari Ragamala series", description: "The Punjab Hills schools create their most refined Ragamala paintings — the Kangra and Basohli series becoming defining works of Indian art." },
      { year: 2016, title: "Vikram begins monsoon observation", description: "Two monsoon seasons spent observing the sky over Jaipur at dawn, seeking the exact blue-black shade described in 17th-century texts." },
      { year: 2018, title: "Monsoon Raga completed", description: "The last Ragamala painting Vikram completed before his final illness. Acquired by the Raza Foundation, Delhi." }
    ]
  },
  20: {
    isFeatured: true,
    dimensions: "80 × 60 cm",
    medium: "Oil on canvas, plein air",
    history: "Priya painted Holi at Dawn over three consecutive Holi festivals in Jaipur — standing in the crowd with her easel, working in oil paint while color powder rained on her and her canvas. The final work incorporates actual colored powder in the paint surface, visible under close examination.",
    styleExplanation: "The Impressionist loose brushwork was perfect for capturing Holi — the powder creates a natural 'broken color' effect in reality, which Monet's technique renders more truthfully than photography. Priya deliberately does not clean her palette between colors, allowing accidental mixes that replicate the visual chaos of the festival.",
    culturalContext: "Holi's explosion of color — red for passion, green for spring, blue for Krishna, yellow for turmeric — is a complete color theory lesson in festive form. Priya, who studied color theory at the Rhode Island School of Design, sees Holi as the most sophisticated color event in world culture.",
    timeline: [
      { year: 400, title: "Holi mentioned in Sanskrit texts", description: "The Puranas describe the festival of colors as celebrating Prahlad's survival and Holika's burning — good over evil through divine protection." },
      { year: 1874, title: "First Impressionist exhibition", description: "Monet, Renoir, Degas, and Pissarro show 'Impression, Sunrise' — introducing the broken-color technique that Priya will later apply to Holi." },
      { year: 2017, title: "First Holi painting attempt", description: "Priya's first attempt is ruined by powder getting into the wet paint. She decides to incorporate the powder as part of the technique." },
      { year: 2019, title: "Holi at Dawn — Jaipur completed", description: "The work is immediately purchased by the Art Institute of Chicago after its debut at Priya's first major solo exhibition in New York." }
    ]
  },
  21: {
    isFeatured: false,
    dimensions: "60 × 50 cm",
    medium: "Oil on canvas",
    history: "Priya painted the chai wallah on a specific street corner in Varanasi's Assi Ghat where she had bought chai every morning for two years. The composition was set up at 6am — the chai wallah's busiest hour — when the steam catches the first horizontal light.",
    styleExplanation: "The steam in this painting is the technical achievement — small, broken color strokes in cool blue-grey-white building up the volumetric steam cloud exactly as Monet built up water lily reflections. Priya spent three months on chai steam studies before the final composition.",
    culturalContext: "The chai wallah is democratically Indian — every social class drinks from the same small clay cup (kulhad) at the same roadside stall. For Priya, who moved from Mumbai's upper-middle-class to working as a waitress in New York while studying, the chai stall represents a rare Indian egalitarian space.",
    timeline: [
      { year: 1700, title: "Tea arrives in India", description: "The British East India Company introduces tea cultivation to Assam and Darjeeling. Within 200 years, India becomes the world's largest tea consumer." },
      { year: 1870, title: "Monet develops steam technique", description: "Monet's series of Gare Saint-Lazare train station paintings develop the broken-color approach to capturing steam and light." },
      { year: 2015, title: "Priya settles in Varanasi", description: "Two years in Varanasi, painting chai wallahs, ghats, and morning light while developing her 'Desi Impressionism' style." },
      { year: 2017, title: "The Chai Wallah's Steam completed", description: "The work becomes Priya's signature image, reproduced on the cover of ArtIndia magazine and in three international art books." }
    ]
  },
  22: {
    isFeatured: false,
    dimensions: "90 × 70 cm",
    medium: "Oil on canvas, mixed artificial/natural light study",
    history: "Priya attended five consecutive Durga Pujas in Kolkata, painting from life each night. The challenge was the extraordinary artificial light — LED strips, fluorescent tubes, chandeliers — which creates a palette completely unlike natural light. Her paintings capture what the eye sees at a Puja rather than what the camera records.",
    styleExplanation: "Mixed artificial light painting requires specific palette adjustments: fluorescent light creates greens and blues that don't exist in nature; LED strips produce harsh shadows. Priya mixed two separate palettes — one for daylight and one for artificial light — and worked from one to the other as the evening progressed.",
    culturalContext: "Durga Puja in Kolkata is simultaneously the most lavish public art event in India and a grassroots neighbourhood competition. The temporary pandal structures are commissioned from leading architects and artists, then destroyed after the festival. Priya's paintings are the most permanent records of these ephemeral masterworks.",
    timeline: [
      { year: 1757, title: "Modern Durga Puja begins", description: "After Plassey, wealthy Calcutta merchants begin sponsoring elaborate Durga Puja celebrations — competing in opulence to mark their social status." },
      { year: 1900, title: "Puja becomes citywide festival", description: "The neighborhood puja committee system develops, democratizing the festival and creating the competitive pandal tradition." },
      { year: 2018, title: "Priya begins the Puja series", description: "Five consecutive festivals, painting every night from 8pm to 2am to capture the festival's full light arc." },
      { year: 2021, title: "Durga Puja Night completed", description: "Part of a five-painting Puja series exhibited at the CIMA Gallery, Kolkata, and subsequently at the Indian High Commission, London." }
    ]
  },
  23: {
    isFeatured: true,
    dimensions: "200 × 150 cm",
    medium: "Oil on canvas, gestural technique",
    history: "The 1947 Partition displaced 15 million people and killed between 200,000 and 2 million — historians still debate the exact figure. Leila, who has documented displacement and forced migration globally, returned to her South Asian roots for this monumental work. She interviewed 40 partition survivors before beginning.",
    styleExplanation: "The gestural abstract technique allows paint to carry the weight that figurative representation cannot. Blood red and night blue tear apart a field of white — the violence of partition encoded in brushwork that required Leila to paint standing, using her whole body. The work took two weeks of continuous effort.",
    culturalContext: "Partition created the two largest Muslim and Hindu states in the world from a single colonial body — and the trauma is still felt in South Asian politics, identity, and family memory. Leila, as a Sudanese-British artist outside both communities, found she could ask questions about Partition that South Asian artists themselves felt unable to.",
    timeline: [
      { year: 1947, title: "Partition of British India", description: "Independence and partition occur simultaneously on August 14-15. Within days, the largest forced migration in human history is underway." },
      { year: 1948, title: "Partition's human cost counted", description: "Early estimates of the dead range from 200,000 to 2 million. The wound in both nations' psyches proves permanent." },
      { year: 2015, title: "Leila begins Partition research", description: "Two years of interviews with partition survivors in London, Manchester, Birmingham, and Lahore." },
      { year: 2017, title: "Partition — 1947 completed", description: "The monumental work is exhibited at the Tate Modern and immediately acquired for the permanent collection, becoming one of its most visited works." }
    ]
  },
  24: {
    isFeatured: false,
    dimensions: "180 × 120 cm",
    medium: "Oil and sand on canvas, impasto technique",
    history: "The Aswan High Dam, completed in 1971, flooded the Nubian homeland — submerging Abu Simbel, Philae, and hundreds of archaeological sites under Lake Nasser. 100,000 Nubian people were displaced. The temples were rescued by UNESCO. The villages were not. Leila's grandmother was among those displaced.",
    styleExplanation: "Sand from the Nubian desert is incorporated directly into the paint, giving the surface a granular texture that references both archaeological excavation and the riverbed sediment that covered the lost civilization. The impasto technique creates layers suggestive of archaeological strata.",
    culturalContext: "Nubia is the oldest African civilization, predating and contemporaneous with ancient Egypt. Its systematic erasure — first by ancient Egyptian conquest, then by colonial archaeology, then by the dam — is a story of repeated dispossession. Leila's work insists on Nubian cultural continuity despite submersion.",
    timeline: [
      { year: 3100, title: "Nubian civilization established", description: "The Kerma culture in Nubia develops independently of ancient Egypt, creating sophisticated bronze-age society in the Nile Valley." },
      { year: 1964, title: "Flooding begins", description: "Construction of the Aswan High Dam begins flooding the Nubian homeland. UNESCO launches emergency archaeological rescue." },
      { year: 1971, title: "Lake Nasser complete", description: "The dam is complete. Ancient temples have been rescued; thousands of years of inhabited landscape and living culture have disappeared under water." },
      { year: 2020, title: "Nile Memory completed", description: "Incorporating Nubian sand in the paint, the work is acquired by the British Museum and displayed adjacent to their Nubian collection." }
    ]
  },
  25: {
    isFeatured: false,
    dimensions: "75 × 90 cm",
    medium: "Oil on canvas",
    history: "Atatürk abolished the Ottoman Caliphate on March 3, 1924 — the last institution claiming political authority over all Muslims. Amir's surrealist response uses Dalí's melting clock as a direct reference but replaces the clock with an Ottoman architectural element: the minaret.",
    styleExplanation: "The surrealist technique allows Amir to work in a Western 20th-century tradition while commenting on Islamic history — the style's irrationality mirrors the political irrationality of the caliphate's abolition. The amber colour palette suggests preservation: the caliphate suspended in amber, neither alive nor dead.",
    culturalContext: "The caliphate dream haunts modern Islamic political consciousness: from Pakistani movements to ISIS, the idea of restored Islamic unity has been invoked — and abused — repeatedly. Amir's melting minaret suggests this dream is itself the delusion (majnun), suspended between past reality and future impossibility.",
    timeline: [
      { year: 661, title: "First caliphate established", description: "Ali ibn Abi Talib becomes the fourth caliph — the last accepted by all Muslim traditions. After his assassination, the caliphate splinters permanently." },
      { year: 1924, title: "Ottoman Caliphate abolished", description: "Atatürk's Grand National Assembly votes to abolish the caliphate, ending 1,300 years of the institution's existence as a political reality." },
      { year: 2014, title: "ISIS declares 'caliphate'", description: "ISIS declares a 'caliphate' in Mosul — perverting the historical institution into an instrument of terror and discrediting the concept globally." },
      { year: 2016, title: "The Last Caliphate Dreams painted", description: "Amir's response to ISIS's perversion of Islamic political thought — the caliphate as a clock that has melted, stopped, and been distorted beyond recognition." }
    ]
  },
  26: {
    isFeatured: false,
    dimensions: "50 × 35 cm",
    medium: "Woodblock-inspired oil on paper",
    history: "Hokusai's 'Under the Wave off Kanagawa' (c.1831) has been reproduced 1 billion times — the most reproduced artwork in history. Yasmin's response began when she noticed that Hokusai's original depicts not one but three boats: the composition is about human fragility before natural force. She wanted to apply this to a South Asian maritime context.",
    styleExplanation: "Yasmin works in oil paint but uses the Japanese woodblock technique's flat color planes and bold outlines. The dhow boats are rendered in the style of Gujarati wooden toy making — a South Asian craft tradition that influenced how wooden boats are depicted in regional art. The wave is pure Hokusai with Arabian Sea green replacing Pacific blue.",
    culturalContext: "The dhow was the vessel that connected the Arabian Sea trade routes for 3,000 years — connecting Pakistan, India, Oman, Yemen, Somalia, and Zanzibar. Hokusai's boats are Japanese fishing vessels whose crew will survive. Yasmin's dhows carry the memory of the Indian Ocean's violent colonial history.",
    timeline: [
      { year: 1831, title: "Hokusai prints the Great Wave", description: "At 71, Hokusai creates 'Under the Wave off Kanagawa' — one of a 36-views series. It becomes the most reproduced artwork in human history." },
      { year: 1870, title: "Japonisme reaches Europe", description: "Japanese woodblock prints arrive in European collections and profoundly influence Impressionists, Post-Impressionists, and Art Nouveau." },
      { year: 2019, title: "Yasmin sails from Karachi", description: "A week aboard a traditional dhow in the Arabian Sea, sketching how the vessel moves through waves that the original Hokusai could never have seen." },
      { year: 2021, title: "The Great Wave of Karachi completed", description: "East-meets-East: two Asian traditions in conversation. The work is acquired by the Fukuoka Asian Art Museum, Japan." }
    ]
  },
  27: {
    isFeatured: false,
    dimensions: "45 × 90 cm",
    medium: "Ink, light color wash on rice paper",
    history: "Guo Xi's 'Early Spring' (1072) established a philosophical framework for Chinese landscape painting that persisted for 900 years. Chen studied the original at the National Palace Museum Taipei for a year before beginning this work, which follows Guo Xi's three-distance perspective system while engaging with 21st-century environmental themes.",
    styleExplanation: "The Northern Song monumental landscape tradition places a vast mountain at the centre, with water and mist at the base and small human figures to provide scale. Chen uses the traditional ink and light wash technique on rice paper, but the ecological damage visible in the upper mountain — bare rock where forest should be — is contemporary observation.",
    culturalContext: "In Song Dynasty philosophy, the mountain landscape was a cosmic metaphor: the mountain is the Confucian exemplar, the water is the Taoist flow, the mist between them is the Buddhist emptiness. Chen's damaged mountain suggests these philosophical frameworks must adapt to a century of environmental destruction.",
    timeline: [
      { year: 1072, title: "Guo Xi paints Early Spring", description: "The court painter Guo Xi creates 'Early Spring', establishing the monumental landscape tradition and writing its theoretical guide 'Essay on Landscapes'." },
      { year: 1644, title: "Song landscape tradition survives Qing conquest", description: "Despite dynastic change, the Northern Song landscape tradition continues — its cosmological framework too fundamental to Chinese thought to be replaced." },
      { year: 2017, title: "Chen's year at National Palace Museum", description: "Twelve months studying Guo Xi's original and reading his theoretical text, translating the Song cosmological framework into contemporary environmental concern." },
      { year: 2019, title: "Mountains in Early Spring completed", description: "Shown at the Venice Biennale alongside Song Dynasty originals — the first time a contemporary work has been displayed in this context." }
    ]
  },
  28: {
    isFeatured: false,
    dimensions: "30 × 120 cm",
    medium: "Ink on silk scroll, brushwork study",
    history: "The Four Gentlemen subjects — plum blossom (courage), orchid (nobility), bamboo (integrity), chrysanthemum (humility) — represent the virtues of the Confucian scholar. Bamboo in wind became a genre in itself: the calligraphic discipline of painting bamboo was considered the fundamental training for all Chinese painting.",
    styleExplanation: "The hanging scroll format is used here with each panel representing one season — spring shoot, summer density, autumn decline, winter bare. Chen uses only one brush and one value of ink for each panel, demonstrating the maximum expressiveness achievable with minimum means. The seasonal rhythm is pure brushwork.",
    culturalContext: "Confucian moral philosophy encoded virtues in natural forms so they could be contemplated, not just understood intellectually. Painting bamboo was an ethical practice: the calligraphic discipline of the brushstroke, the patience required, and the resulting image all constituted a character-building exercise.",
    timeline: [
      { year: 1100, title: "Su Shi writes on bamboo painting", description: "The great Song scholar-artist Su Shi theorizes bamboo painting as the highest form of calligraphic art — the brushwork itself as moral practice." },
      { year: 1360, title: "Ni Zan's bamboo perfection", description: "The Yuan dynasty recluse painter Ni Zan creates bamboo paintings of extreme minimalism — three brushstrokes that contain a complete cosmology." },
      { year: 2020, title: "Chen begins the Four Seasons scroll", description: "A meditation on time and continuity during the pandemic — the bamboo bending but not breaking becomes a metaphor for cultural resilience." },
      { year: 2022, title: "Bamboo in Wind completed", description: "The four-panel scroll is exhibited at the National Palace Museum Taipei and subsequently acquired by the Metropolitan Museum, New York." }
    ]
  },
  29: {
    isFeatured: false,
    dimensions: "40 × 60 cm",
    medium: "Digital art printed on canvas, limited edition of 10",
    history: "The mehndi (henna) ceremony — held the night before a South Asian wedding — is one of the few spaces in traditional culture that is entirely female, joyful, and creative. Sana, who attended her cousin's mehndi in Bradford, was struck by how Art Nouveau's flowing organic lines perfectly described the henna patterns' visual character.",
    styleExplanation: "Sana works digitally but deliberately constrains herself to the Art Nouveau visual vocabulary — no straight lines, all forms derived from plant growth, the female figure integrated into the decorative border. The technique is Alphonse Mucha's poster style applied to South Asian iconography.",
    culturalContext: "Art Nouveau in 1900 used flowing natural forms to celebrate European femininity. Sana's version asks why South Asian femininity was never included in this visual language — and answers by inserting it retroactively. The result feels both historically plausible and conceptually destabilizing.",
    timeline: [
      { year: 1895, title: "Art Nouveau reaches its peak", description: "Alphonse Mucha's theatre posters for Sarah Bernhardt establish Art Nouveau as the visual language of fin-de-siècle femininity in Europe." },
      { year: 2000, title: "South Asian mehndi globalizes", description: "Mehndi becomes fashionable globally — but always exoticized, divorced from its ceremonial context and community meaning." },
      { year: 2022, title: "Sana attends her cousin's mehndi", description: "The Bradford mehndi night inspires the formal connection: henna patterns are Art Nouveau. They always were. Nobody had noticed." },
      { year: 2023, title: "Henna Night — The Bride completed", description: "Edition of 10. Nine sold immediately after the New Contemporaries exhibition; one is in the Victoria and Albert Museum collection." }
    ]
  },
  30: {
    isFeatured: false,
    dimensions: "120 × 120 cm",
    medium: "Acrylic on canvas",
    history: "Between 2004 and 2023, US drone strikes killed between 910 and 2,200 civilians in Pakistan, Afghanistan, Yemen, and Somalia — the exact figures disputed by the US government. Leila became interested in the aesthetics of drone warfare: the clinical top-down thermal imagery that makes killing visually clean.",
    styleExplanation: "The painting uses the visual language of thermal imaging — the colour palette of military surveillance: white-hot centres, green mid-tones, black cold areas. The composition is aerial: the viewer looks down, as a drone pilot in Nevada would, at a scene in Yemen. This positioning is the work's moral charge.",
    culturalContext: "Drone warfare removes the pilot so far from the violence that psychological distance becomes moral distance. Leila's painting refuses this distance: by making the viewer occupy the drone's position, it implicates them in the visual grammar of remote killing. The 'minimized' in the title is the US military's term for civilian casualty.",
    timeline: [
      { year: 2001, title: "First US armed drone strike", description: "The CIA carries out the first known armed drone strike in Afghanistan — beginning a mode of warfare that will kill thousands of civilians over two decades." },
      { year: 2011, title: "Drone program expands", description: "Under the Obama administration, drone strikes in Pakistan, Yemen, and Somalia reach their highest frequency — including strikes on wedding parties." },
      { year: 2020, title: "Leila obtains military strike footage", description: "Through investigative journalists, Leila accesses thermal drone footage that becomes the direct visual source for the painting." },
      { year: 2022, title: "Drone Strike, 2017 completed", description: "The work provokes intense debate at Frieze London about whether art can ethically use military surveillance aesthetics. Acquired by a Norwegian public art fund." }
    ]
  },
  31: {
    isFeatured: false,
    dimensions: "60 × 80 cm",
    medium: "Digital art and traditional miniature painting, hybrid",
    history: "Sana's most personal work. Her nano (maternal grandmother) Nasreen Bibi came to Bradford from Lahore in 1962. Now 84, she is one of the last speakers of her village's specific Punjabi dialect. Sana began recording her stories when she was 15; this painting is the visual translation of those recordings.",
    styleExplanation: "The left half of the diptych uses iPhone photography techniques — the soft focus, the compressed depth of field, the 9:16 portrait ratio of the selfie. The right half uses traditional Mughal miniature technique on wasli paper. The juxtaposition is literal: two faces, two eras, two image-making technologies separated by 400 years.",
    culturalContext: "The selfie and the Mughal miniature both serve the same function: making the subject worthy of record. Sana's work suggests that the grandmother's face deserves the same monumental treatment that Mughal nobles received — and that Instagram is our era's Mughal workshop. Both immortalize. Both are mediated.",
    timeline: [
      { year: 1625, title: "Mughal portrait miniatures peak", description: "Under Shah Jahan, portrait miniatures of court nobles reach their highest technical refinement — the face as a statement of imperial worth." },
      { year: 1962, title: "Nasreen Bibi arrives in Bradford", description: "Sana's grandmother, 21 years old, arrives at Bradford Forster Square station — one of thousands of Pakistanis recruited for the textile mills." },
      { year: 2015, title: "Sana begins recording her grandmother", description: "At 15, Sana starts systematic recordings of her grandmother's stories — knowing that this linguistic and cultural memory will not survive another generation." },
      { year: 2023, title: "Twinning completed", description: "The most discussed work in the New Contemporaries exhibition. Sana donates the original miniature half to the Bradford Museum; the digital half to the Saatchi Gallery." }
    ]
  },
  32: {
    isFeatured: false,
    dimensions: "150 × 100 cm",
    medium: "Oil on canvas",
    history: "The Lahore Resolution of March 23, 1940 called for independent Muslim states in the north-western and north-eastern zones of British India. 80 years later, the Resolution's language — and what it actually promised — remains fiercely contested between Pakistani and Bangladeshi historians, and between civilian and military interpretations.",
    styleExplanation: "The gestural abstraction allows the Pakistani national colors — green and white — to be applied as violent marks rather than dignified symbols. The stars and crescent of the flag are visible in the underpainting but have been partially obscured by subsequent layers — history written over and over itself.",
    culturalContext: "The Lahore Resolution never actually used the word 'Pakistan'. It called for 'independent states' (plural) — which is why Bangladesh can claim it as legitimately as Pakistan does. Amir's abstract treatment refuses to settle the question: the meaning of the Resolution, like the paint, remains unresolved.",
    timeline: [
      { year: 1940, title: "Lahore Resolution passed", description: "The All-India Muslim League passes the Lahore Resolution on March 23, calling for Muslim-majority zones to be 'independent states'." },
      { year: 1947, title: "Pakistan created", description: "Pakistan is created as two wings — East and West — separated by 1,000 miles of India. The Resolution's vision is partially, problematically fulfilled." },
      { year: 1971, title: "Bangladesh independence", description: "East Pakistan becomes Bangladesh. Both nations claim the Lahore Resolution as their founding document, revealing its unresolved ambiguity." },
      { year: 2023, title: "Lahore Resolution — Unresolved completed", description: "Exhibited at the Karachi Biennale on March 23 — Pakistan Day — the work is simultaneously claimed and rejected by different audience members." }
    ]
  },
  33: {
    isFeatured: false,
    dimensions: "80 × 100 cm",
    medium: "Mineral pigments on canvas, Rajput technique at large scale",
    history: "India's construction industry employs 51 million workers, of whom 11 million are women who perform the heaviest physical labour — carrying bricks, concrete, and stone on their heads — while earning 30% less than male workers. Rashida met Kamla Devi, a construction worker in Jaipur, and asked permission to paint her portrait.",
    styleExplanation: "The Kishangarh elongated neck and composed three-quarter profile — the visual grammar developed to depict court nobles — is applied at large scale to a construction worker. The scale itself is part of the statement: monumental treatment for a subject usually invisible. The mineral pigments are the same as those used for Rajput court portraits.",
    culturalContext: "Rajput miniature painting created visual hierarchies: kings at the top, nobles below, workers and women invisible. Rashida's work systematically inverts these hierarchies using the same visual language. Kamla Devi is painted with the same formal dignity as Bani Thani — asking what has changed in India's visual culture in 400 years.",
    timeline: [
      { year: 1750, title: "Rajput noble portraits established", description: "The Rajput portrait tradition creates visual language for aristocratic dignity — elongated proportions, composed expression, rich detail." },
      { year: 2020, title: "Rashida meets Kamla Devi", description: "In Jaipur, researching the traditional pigment-grinding tradition, Rashida meets a construction worker and asks to paint her portrait." },
      { year: 2021, title: "Six months of sessions", description: "Kamla Devi sits for Rashida on Sundays, her only day off, over six months. They become friends. Kamla Devi names the final price." },
      { year: 2021, title: "She Carries Mountains completed", description: "The work wins the Lalit Kala Akademi Award and is acquired by the National Gallery of Modern Art, New Delhi." }
    ]
  },
  34: {
    isFeatured: false,
    dimensions: "60 × 60 cm",
    medium: "AI generation, digital finishing, archival print on paper",
    history: "Hafez of Shiraz (1315–1390) wrote the Divan — a collection of ghazals used for divination (fal-e Hafez) across Iran and South Asia. Tariq trained an AI model on 10,000 historical Mughal miniature images, then prompted it with verses from the Divan. The AI generated hundreds of compositions; Tariq selected, edited, and hand-finished the most successful.",
    styleExplanation: "The hybrid technique interrogates authorship: the AI has learned the visual grammar of Mughal miniature from historical data, but cannot understand the poetry. Tariq provides the understanding; the AI provides the grammar. The result is a new kind of object — machine-learned tradition meeting human cultural knowledge.",
    culturalContext: "Hafez's poetry is used for divination: you ask a question, open the Divan at random, and read the answer. Tariq's AI-Hafez painting works similarly — you ask the machine for a Mughal image, it answers based on training data, and you interpret the result. The process is structurally analogous to the divination tradition.",
    timeline: [
      { year: 1368, title: "Hafez completes the Divan", description: "The poet laureate of Shiraz, Khwaja Shams ud-Din Muhammad Hafez, completes his collected poems — still used for divination 650 years later." },
      { year: 1990, title: "Digital art begins", description: "The first AI-generated artworks appear in galleries. The debate about machine creativity begins and does not stop." },
      { year: 2020, title: "Tariq trains the Mughal AI", description: "18 months training a neural network on 10,000 historical miniatures from digitized museum collections. First outputs in 2021." },
      { year: 2022, title: "Digital Hafez completed", description: "The archival print edition of 10 sells out within a week at the Zabludowicz Collection, London." }
    ]
  },
  35: {
    isFeatured: false,
    dimensions: "70 × 55 cm",
    medium: "Oil on canvas, painted en plein air",
    history: "Eid al-Fitr morning prayer in Karachi draws over a million worshippers to outdoor prayer grounds (Eidgahs) across the city. Priya, travelling in Pakistan for a residency, set up her easel at 4:30am in Karachi's National Stadium Eidgah, painting the assembly as it gathered in pre-dawn darkness.",
    styleExplanation: "The blue-gold pre-dawn palette — the specific colour of the sky between nautical twilight and civil twilight — was Priya's technical obsession. The challenge was capturing a colour that exists for only 15 minutes, while also depicting a gathering of thousands. She worked at extraordinary speed with pre-mixed palette.",
    culturalContext: "Eid prayer is the largest single gathering in most Muslim-majority cities — the moment when an entire community is simultaneously in one place, facing one direction, saying one word. For Priya, a Hindu painting this scene, it was the largest sustained visual experience of collective spiritual movement she had ever witnessed.",
    timeline: [
      { year: 624, title: "First Eid prayer", description: "Muhammad leads the first Eid al-Fitr prayer in Medina, establishing the communal outdoor prayer tradition that continues for 1,400 years." },
      { year: 1900, title: "Karachi Eidgah established", description: "The National Stadium grounds become Karachi's largest Eid prayer ground, accommodating hundreds of thousands annually." },
      { year: 2022, title: "Priya arrives in Karachi", description: "A six-month residency at the Karachi Arts Council gives Priya her first extended time in Pakistan — and her first experience of Eid." },
      { year: 2023, title: "Eid Morning completed", description: "The work is acquired by the Lahore Museum and becomes the first painting by a Hindu Indian artist in its Islamic art gallery." }
    ]
  },
  36: {
    isFeatured: false,
    dimensions: "80 × 80 cm",
    medium: "Diwani Jali script, gold on deep blue",
    history: "The 99 names of God (Asma al-Husna) form the core of Islamic theological knowledge. Omar's challenge was to write all 99 names in a single continuous spiral composition — each name flowing into the next as the spiral narrows toward the center. The vortex references both Sufi whirling and the Arabic calligraphic tradition of the spiral composition.",
    styleExplanation: "Diwani Jali is the most complex Arabic script — developed for Ottoman imperial documents, its letters are heavily decorated with dots and diacritical marks that fill all negative space. The script becomes progressively more abstract toward the vortex centre, ending in pure geometric form.",
    culturalContext: "Sufi whirling (sama) is the Mevlevi practice of meditation through spinning — the dervish rotates until individual consciousness dissolves into collective divine consciousness. Omar's spiral composition attempts the same effect on paper: the eye follows the spiral inward until individual letters dissolve into pattern.",
    timeline: [
      { year: 1273, title: "Rumi dies in Konya", description: "The founding poet of Mevlevi Sufism dies. His followers formalize the whirling practice (sama) as a meditation technique." },
      { year: 1400, title: "Diwani Jali script developed", description: "Ottoman court scribes develop Diwani Jali for imperial documents — its complexity guaranteeing the document cannot be easily forged." },
      { year: 2019, title: "Omar plans the 99-name spiral", description: "Two years calculating how all 99 names can fit in a spiral that maintains calligraphic proportions throughout its length." },
      { year: 2021, title: "Calligraphy Storm completed", description: "The work is acquired by the Museum of Islamic Art, Doha, and becomes the centrepiece of their contemporary calligraphy collection." }
    ]
  },
  37: {
    isFeatured: false,
    dimensions: "50 × 65 cm",
    medium: "Lapis lazuli ground, gold leaf, natural pigments",
    history: "Scheherazade tells 1,001 stories to defer her execution by the king Shahryar. On Night 1001 she runs out — but by this point the king has fallen in love with her and cannot kill her. Nadia spent three years on the preceding 36 paintings in her 'Nights' series before facing the impossible final night.",
    styleExplanation: "The composition is largely darkness — unprecedented in Persian miniature which traditionally filled every surface with pattern and colour. A single candle flame provides the only light source: technically a challenge since Persian miniature has no tradition of chiaroscuro or single-point light sources. Nadia invented the technique herself.",
    culturalContext: "The 1,001st night is the story that could not be told — the story Scheherazade herself is in. Nadia's nearly empty canvas mirrors this: the painting about the story that cannot be painted. The darkness is the space where narrative fails and life — barely, in the candle flame — persists.",
    timeline: [
      { year: 900, title: "Thousand and One Nights compiled", description: "The first Arabic collection of the folk tales is assembled, drawing on Persian, Indian, and Arabic oral traditions. No two manuscripts are the same." },
      { year: 2019, title: "Nadia begins the Nights series", description: "The 36-painting series begins. Each painting illustrates one night from the collection, building toward the impossible final work." },
      { year: 2022, title: "Night 1001 begun", description: "After completing the 36 preceding paintings, Nadia spends six months staring at a blank canvas. The darkness is not emptiness — it is deliberate composition." },
      { year: 2022, title: "Night 1001 completed", description: "The final painting in the series is acquired by the Aga Khan Museum and displayed with all 36 preceding works in Nadia's first major retrospective." }
    ]
  },
  38: {
    isFeatured: false,
    dimensions: "55 × 40 cm",
    medium: "Natural pigments, gold leaf on wasli paper",
    history: "Lahore's Walled City — built by Akbar in the 16th century — contains 13 historic gates and is one of the densest urban environments in the world. Amir used Mughal map-painting conventions (bird's-eye view, architectural elevation combined with aerial plan) to depict three temporal layers simultaneously.",
    styleExplanation: "The Mughal cartographic tradition combined aerial perspective with elevation — buildings were shown both from above and from the side simultaneously, like a flattened 3D model. Amir uses this convention to show the walled city as it was under Akbar, as it is today, and as urban planners hope it might be — three layers of gold, silver, and copper paint.",
    culturalContext: "The Walled City is simultaneously Lahore's greatest heritage asset and its most neglected. 300,000 people live within the 1.5 square km walls in conditions unchanged since the 18th century. Amir's painting is a heritage document and a political statement: this place deserves the attention its Mughal-era founders gave it.",
    timeline: [
      { year: 1566, title: "Akbar's wall completed", description: "The emperor Akbar builds the 13-gate brick wall around Lahore, establishing the urban boundary that still defines the old city." },
      { year: 1849, title: "British annexation", description: "The British occupy Lahore after the Anglo-Sikh War. The Walled City's buildings are modified, subdivided, and gradually neglected over two centuries." },
      { year: 2015, title: "Amir's Lahore residency", description: "Six months in the Walled City — living in a haveli (traditional courtyard house) on Mohallah Chinianwalan, researching the urban fabric." },
      { year: 2020, title: "The Walled City completed", description: "The painting is exhibited at the Lahore Fort alongside the UNESCO World Heritage site documentation — the first contemporary artwork to be shown there." }
    ]
  },
  39: {
    isFeatured: false,
    dimensions: "60 × 70 cm",
    medium: "Acrylic on canvas with fabric collage",
    history: "West African Sufi brotherhoods — particularly the Qadiriyya and Tijaniyya — spread Islam peacefully across the Sahel through trade networks. Unlike the violent spread of Islamic states in West Africa's history, these brotherhoods built devotional communities that fused African traditional religion with Islamic practice.",
    styleExplanation: "Amara incorporates actual Kente cloth into the collage elements of the background — not merely depicting the patterns but using the material itself. The Adinkra symbols (Akan visual writing) are integrated into the geometric backdrop using stencils made from traditional Ghanaian stamps.",
    culturalContext: "West African Sufi Islam is one of the least known and most distinctive Islamic traditions in the world — its dhikr (remembrance) practices incorporate drumming, dance, and trance states that orthodox Islam forbids. Amara celebrates this adaptive Islam that survived colonialism by fusing rather than resisting.",
    timeline: [
      { year: 1200, title: "Islam spreads along Sahel trade routes", description: "Sufi brotherhoods accompany caravans across the Sahara, establishing devotional communities in Mali, Senegal, and Ghana." },
      { year: 1824, title: "Tijaniyya brotherhood reaches West Africa", description: "The North African Tijaniyya order spreads into West Africa, becoming the most widespread Islamic brotherhood in Senegal and Mali." },
      { year: 2018, title: "Amara in Ghana", description: "Three months with the Tijaniyya community in Kumasi, documenting their devotional practice that fuses Akan and Islamic visual languages." },
      { year: 2020, title: "Folk Sufi completed", description: "The work is acquired by the British Museum and displayed in their African Collections alongside historical Adinkra textiles." }
    ]
  },
  40: {
    isFeatured: false,
    dimensions: "45 × 60 cm",
    medium: "Ink and gold leaf on paper, dual tradition",
    history: "Mughal gardens in winter were rarely depicted — the tradition favoured the blooming spring garden as a paradise metaphor. Yasmin's winter Mughal garden emerges from a specific historical record: Babur's memoirs describe the 'garden of loyalty' in Kabul in winter with deep affection, including a description of bare trees that Yasmin spent years trying to paint.",
    styleExplanation: "The bare winter trees in this painting use the Chinese ink-painting convention for depicting leafless trees — a specific brushstroke vocabulary that Chinese painters developed over centuries and that has no equivalent in Mughal miniature. The geometric garden plan beneath them is pure Mughal charbagh design.",
    culturalContext: "Babur wrote in his Baburnama: 'If I were to follow my own wish I would set out for Kabul instantly, without delay.' He never returned. The winter Kabul garden is Babur's most personal space — the place he missed most in the Indian heat. Yasmin's painting is an elegy for that longing.",
    timeline: [
      { year: 1526, title: "Babur conquers Delhi", description: "Babur defeats Ibrahim Lodi at Panipat, founding the Mughal empire. He immediately begins building Persian-style gardens — planting familiar flowers in unfamiliar soil." },
      { year: 1530, title: "Babur's Baburnama completed", description: "The emperor's memoir, written in Chagatai Turkic, describes his Kabul garden in winter with homesick longing — one of the most personal passages in royal autobiography." },
      { year: 2018, title: "Yasmin reads the Baburnama", description: "A chance reading of Babur's winter garden description inspires the fusion: Chinese bare-tree brushwork for the Mughal winter garden." },
      { year: 2020, title: "Mughal Garden in Winter completed", description: "The work is exhibited at the British Library alongside their Baburnama manuscript — facing the very page that inspired the painting." }
    ]
  },
  41: {
    isFeatured: false,
    dimensions: "160 × 130 cm (diptych)",
    medium: "Oil, charcoal, gold leaf on diptych canvas",
    history: "Baghdad under the Abbasid Caliph Harun al-Rashid (786–809) was the world's largest and wealthiest city — the centre of the Islamic Golden Age, containing the House of Wisdom where Greek, Persian, Indian, and Chinese knowledge was translated and advanced. The Mongol sack of 1258 drowned it in the Tigris. The 2003 invasion destroyed what remained.",
    styleExplanation: "Two canvases presented as a diptych. The first — gold leaf over gessoed canvas — represents the Abbasid golden age: luminous, warm, impossible to look directly at. The second — charred black gesso with charcoal marks — represents destruction. The physical material carries the meaning: gold and char cannot be reversed.",
    culturalContext: "The fall of Baghdad in 1258 is described by Islamic historians as the end of a world — the libraries burned, the scholars drowned, the knowledge of centuries lost in the Tigris. 2003 echoes 1258. Leila's diptych refuses to separate these events: to understand Iraq in 2003 you must understand Baghdad in 1258.",
    timeline: [
      { year: 762, title: "Baghdad founded", description: "Caliph Al-Mansur founds the round city of Madinat al-Salam (City of Peace) — within a century it becomes the world's largest city." },
      { year: 1258, title: "Mongol sack of Baghdad", description: "Hulagu Khan's forces destroy Baghdad, killing the Caliph, burning the libraries. The Tigris runs black with ink, then red with blood." },
      { year: 2003, title: "US invasion of Iraq", description: "The invasion leads to the looting of the Baghdad Museum and the destruction of Iraq's cultural heritage — history repeating in deliberate ignorance of itself." },
      { year: 2019, title: "Baghdad — Before and After completed", description: "The diptych is displayed at the Tate Modern's permanent collection entrance — the two canvases facing each other across the Turbine Hall." }
    ]
  },
  42: {
    isFeatured: false,
    dimensions: "80 × 65 cm",
    medium: "Oil on canvas, mixed light conditions",
    history: "Fajr prayer — before sunrise — is the most spiritually charged daily prayer in Islamic devotion. For British Muslims, praying at 4am in winter London carries a particular quality: the city that is otherwise never theirs is briefly silent and still. Priya attended Fajr at the East London Mosque for six months, sketching in charcoal.",
    styleExplanation: "The technical challenge was pre-dawn light in an interior — shafts of blue-grey from high windows mixing with the warm incandescent light of the mosque's interior fittings. Priya developed a specific pre-dawn palette: ultramarine, dioxazine purple, titanium white, and cadmium yellow in very low concentrations.",
    culturalContext: "The mosque interior is one of the few spaces in British Muslim life that is entirely private — not subject to the gaze of the majority culture. Priya, as an outsider welcomed by the congregation, was acutely aware of the privilege of this access. The painting treats the space with the discretion it deserves.",
    timeline: [
      { year: 1910, title: "East London Mosque established", description: "The mosque serves the Sylheti Bengali community who arrived to work in the East End. It becomes the largest mosque in Britain." },
      { year: 2000, title: "Mosque expanded", description: "The London Muslim Centre opens, creating one of Europe's largest Islamic complexes. The interior Priya paints dates from this expansion." },
      { year: 2021, title: "Priya begins the Fajr series", description: "Six months of 4am attendance at Fajr prayer, with permission of the imam, developing the pre-dawn light palette." },
      { year: 2022, title: "Prayers at Fajr completed", description: "The work is acquired by the Whitechapel Gallery, London, and displayed adjacent to the East London Mosque." }
    ]
  },
  43: {
    isFeatured: false,
    dimensions: "60 × 60 cm",
    medium: "Mathematical compass construction, gold leaf on panel",
    history: "The 48-fold symmetric pattern in this painting took Fatima three years to construct mathematically and six months to paint. The centre — a single point from which all the patterns are derived — is physically the centre of the canvas. Every element of the composition is geometrically determined from that point.",
    styleExplanation: "The 48-fold symmetry represents the maximum complexity achievable with compass and straight-edge construction. Beyond 48, the geometric relationships become physically impossible to draw by hand. Fatima considers this work the technical limit of traditional Islamic geometric construction.",
    culturalContext: "In Sufi epistemology, knowledge is described as concentric circles: the outer circle is shariah (law), the middle is tariqah (way), the inner is haqiqah (truth), and the invisible center is ma'rifah (gnosis). Fatima's 48-fold pattern encodes this structure: progressively more abstract as the composition moves inward.",
    timeline: [
      { year: 1050, title: "Sufi knowledge framework codified", description: "Al-Hujwiri's Kashf al-Mahjub systematizes Sufi epistemology — knowledge as concentric circles of increasing depth." },
      { year: 1100, title: "Abu'l Wafa develops geometric methods", description: "The mathematician Abu'l Wafa al-Buzjani publishes the most complete medieval Islamic geometric construction manual." },
      { year: 2019, title: "Fatima begins the 48-fold construction", description: "Three years of mathematical work establishing that 48-fold symmetric patterns are the practical limit of traditional construction techniques." },
      { year: 2022, title: "The Sufi's Eye completed", description: "Acquired by the Louvre Abu Dhabi, where it is displayed in conversation with medieval Islamic geometric objects." }
    ]
  },
  44: {
    isFeatured: false,
    dimensions: "50 × 70 cm",
    medium: "AI generation, archival print, digital finishing",
    history: "Indian cinema is 100 years old in 2013 — Sana's 2023 work reflects on the centenary. Her AI model was trained exclusively on Bollywood posters from 1923–2023: 50,000 images that encode India's visual history of glamour, aspiration, and fantasy. The 'average' Bollywood poster the AI generates contains a century of collective dreaming.",
    styleExplanation: "Sana uses a diffusion model that can generate images from text prompts trained on her Bollywood archive. She then selects outputs that feel most representative of the training data's collective visual memory — not the most spectacular image, but the most typical. The work is about average rather than exception.",
    culturalContext: "Bollywood produced more films than Hollywood for most of its history, reaching audiences that Hollywood could not. Its visual language — the specific colours, the specific glamour, the specific emotional register — is the visual language of aspiration for 1.4 billion people. Sana's AI portrait of that language is both celebration and archaeology.",
    timeline: [
      { year: 1913, title: "First Indian feature film", description: "Dadasaheb Phalke creates 'Raja Harishchandra' — India's first feature film, shot on 35mm. The Indian film industry is born." },
      { year: 1960, title: "Golden Age of Bollywood", description: "Guru Dutt, Raj Kapoor, and Dilip Kumar create the visual language of Indian cinema's golden age — still referenced in every subsequent Bollywood poster." },
      { year: 2022, title: "Sana trains the Bollywood AI", description: "50,000 Bollywood posters from 1923–2023 are used to train the diffusion model. The AI learns the grammar of Indian cinematic aspiration." },
      { year: 2023, title: "Bollywood at 100 completed", description: "The print edition of 10 sells out at Art Basel Hong Kong. One copy is acquired by the Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, Mumbai." }
    ]
  },
  45: {
    isFeatured: false,
    dimensions: "50 × 80 cm",
    medium: "Oil on canvas",
    history: "The Qutb Minar (1193) is the world's tallest brick minaret and Delhi's oldest surviving monument — it marked the arrival of the Delhi Sultanate and Islam in Northern India. Priya chose an unusual vertical format matching the minaret's proportions and painted it during the pre-monsoon winds of May, when dust storms create a specific golden-brown atmospheric haze.",
    styleExplanation: "The vertical canvas format forces the composition to follow the minaret's verticality — the sky occupies over half the picture plane, painted in swirling wet-into-wet brushwork that suggests the dust-laden pre-monsoon winds. The Impressionist atmospheric technique is ideally suited to the haze that surrounds the monument in summer.",
    culturalContext: "The Qutb Minar's five stories were built by four different sultans over 200 years — the different sandstone colors visible in its bands represent different political eras. Priya's atmospheric treatment dissolves these historical distinctions into a single visual experience, as time eventually dissolves all political differences.",
    timeline: [
      { year: 1193, title: "Qutb Minar foundation laid", description: "Qutb ud-Din Aibak, founder of the Delhi Sultanate, lays the foundation of the minaret — the first Islamic monument in northern India." },
      { year: 1220, title: "Minaret completed", description: "Iltutmish completes the minaret to five stories. It becomes the model for minarets across the subcontinent." },
      { year: 1993, title: "UNESCO World Heritage designation", description: "The Qutb Minar complex is designated a UNESCO World Heritage site — its significance formally recognized internationally." },
      { year: 2018, title: "Wind Over the Qutb Minar completed", description: "The vertical canvas is exhibited at the Smithsonian, where it is acquired for the permanent collection of the Freer Gallery of Art." }
    ]
  },
  46: {
    isFeatured: false,
    dimensions: "75 × 50 cm",
    medium: "Ink and light wash on silk",
    history: "Mount Ararat, sacred to Armenians as the resting place of Noah's Ark, has been on the Turkish side of the border since the 1920 Treaty of Kars. It is visible from Yerevan on clear days — close enough to photograph, impossible to visit. Chen, as a Taiwanese artist who understands the experience of a visible but politically unreachable homeland, felt an immediate connection.",
    styleExplanation: "The Northern Song landscape convention for depicting mountains uses atmospheric perspective — distant mountains lighter and less defined than near ones. Chen uses this technique to paint a mountain that is physically near but politically distant, making political inaccessibility visible through painterly convention.",
    culturalContext: "Taiwan's relationship to mainland China — close, visible, politically impossible — made Chen immediately understand the Armenian relationship to Ararat. The mountain as presence-absence: available to the eye but not the foot. The Chinese ink tradition's treatment of mountains as aspirational forms rather than geographical facts serves this meaning exactly.",
    timeline: [
      { year: 2350, title: "Biblical tradition of Ararat", description: "Genesis 8:4 places Noah's Ark on 'the mountains of Ararat'. For Armenians, this makes their homeland the origin of human civilization after the flood." },
      { year: 1920, title: "Treaty of Kars", description: "The Treaty of Kars assigns the Ararat region to Turkey. The mountain becomes visible from Armenia but unreachable — a permanent wound in Armenian national consciousness." },
      { year: 2015, title: "Chen visits Yerevan", description: "During the centennial of the Armenian Genocide, Chen attends the ceremonies in Yerevan — and sees Ararat clear across the Aras River for the first time." },
      { year: 2017, title: "Armenian Highland completed", description: "The silk scroll is exhibited at the Matenadaran manuscript museum in Yerevan and donated to the Armenian National Gallery." }
    ]
  },
  47: {
    isFeatured: false,
    dimensions: "100 × 70 cm",
    medium: "Diwani Jali + Nastaliq calligraphy, gold, deep crimson ground",
    history: "Diwani Jali and Persian Nastaliq are two calligraphic traditions that developed separately — Ottoman court script and Persian literary script — and are rarely combined. Omar spent five years mastering Nastaliq alongside his existing Diwani Jali certification before attempting this fusion work.",
    styleExplanation: "The two scripts flow together in a composition that requires the viewer to read in two directions simultaneously — Nastaliq reads right-to-left along horizontal lines, Diwani Jali curves around it in a different rhythm. The crimson ground is unusual in calligraphy; Omar specified it as the colour of both wine and blood — the two liquids of Hafez's most provocative verse.",
    culturalContext: "Hafez wrote: 'Last night I saw angels knock at the tavern door / They kneaded the clay of Adam in a bowl and took wine.' This verse — simultaneously theological, mystical, and scandalous — is one of the most debated in Islamic literary history. Omar chose it as the text for the most technically daring work of his career.",
    timeline: [
      { year: 1368, title: "Hafez writes the tavern verse", description: "The provocative verse about angels taking wine at the tavern causes an immediate theological controversy that has not been fully resolved 650 years later." },
      { year: 1500, title: "Ottoman Diwani Jali developed", description: "Ottoman court scribes develop the ornate Diwani Jali script for imperial edicts — its complexity a security feature against forgery." },
      { year: 2018, title: "Omar begins Nastaliq training", description: "Having mastered Diwani Jali, Omar travels to Isfahan to study Nastaliq from a master trained in the Qajar court tradition." },
      { year: 2023, title: "Khatt al-Mahabba completed", description: "The work is acquired by the Museum of Islamic Art, Doha, for its permanent contemporary calligraphy collection." }
    ]
  },
  48: {
    isFeatured: false,
    dimensions: "90 × 70 cm",
    medium: "Mixed media: mineral pigment, oil, digital print",
    history: "Rashida's multi-generational portrait began as a family commission — three generations of the Sharma family in Jaipur — but became a public artwork about the transmission of female knowledge across Indian generations. The eldest woman (aged 78) is depicted in Kishangarh Rajput style; her daughter (48) in Impressionist technique; her granddaughter (19) in digital aesthetic.",
    styleExplanation: "The technical challenge was unifying three distinct visual styles on one canvas without the joins being visible. Rashida primed the canvas differently in three sections — wasli paper surface for the miniature section, linen for the oil section, and photographic paper insert for the digital section — then painted each with its appropriate technique.",
    culturalContext: "Three generations of Indian women share one kitchen table but live in three completely different visual cultures. The grandmother's world was depicted by Kishangarh's elongated ideals; her daughter's world is Impressionist Mumbai; her granddaughter's world is Instagram. Rashida's work asks what — if anything — passes across these visual cultures.",
    timeline: [
      { year: 1960, title: "Grandmother's generation", description: "The eldest woman in the painting was married at 16, widowed at 40. Her knowledge of Rajasthani cooking and textile traditions is entirely oral." },
      { year: 1990, title: "Mother's generation", description: "The middle woman worked in the IT sector in Bangalore. She has her mother's recipes but no time to cook them. She photographs everything on her phone." },
      { year: 2015, title: "Granddaughter's generation", description: "The youngest woman has her grandmother's face and her mother's ambition. She documents everything digitally. She cannot identify half the spices in the kitchen." },
      { year: 2023, title: "Three Generations completed", description: "The work is exhibited at the India Art Fair and acquired by the Kiran Nadar Museum of Art, Delhi." }
    ]
  },
  49: {
    isFeatured: false,
    dimensions: "70 × 90 cm",
    medium: "Acrylic and Kente cloth on canvas",
    history: "West African Sufi brotherhoods survived the Atlantic slave trade, colonialism, and post-colonial instability while maintaining continuous devotional practice. Amara's single standing dervish is a composite portrait of this resilience — based on photographs from Sufi ceremonies in Senegal, Ghana, and Cote d'Ivoire.",
    styleExplanation: "The white dervish costume is built up from actual Kente cloth strips incorporated into the painting surface, contrasting with the painted geometric background. The figure itself is painted in acrylic, while the surrounding patterns use traditional Adinkra stamp techniques with ochre and black on the canvas ground.",
    culturalContext: "The 'last' in the title refers to Amara's fear that these devotional traditions are being eroded — by Salafi Islam from the Gulf, by secularization, by the migration to cities. The dervish standing alone holds 800 years of cultural practice in his posture. Amara painted this as a cultural record.",
    timeline: [
      { year: 1200, title: "West African Sufi brotherhoods begin", description: "Qadiriyya missionaries follow trade routes into sub-Saharan Africa, establishing devotional communities that will survive every subsequent disruption." },
      { year: 1890, title: "Colonial disruption", description: "French colonization attempts to suppress Sufi brotherhoods. The brotherhoods adapt, fuse with local traditions, and emerge stronger." },
      { year: 2019, title: "Amara documents West African Sufism", description: "Six months travelling with Sufi communities in Senegal, Mali, Ghana, and Cote d'Ivoire, photographing and recording their devotional practice." },
      { year: 2022, title: "Last Sufi Standing completed", description: "The work is acquired by the Museum of Anthropology at UBC, Vancouver, where it is displayed alongside West African devotional objects." }
    ]
  },
  50: {
    isFeatured: false,
    dimensions: "70 × 55 cm",
    medium: "Natural pigments, gold leaf on prepared paper",
    history: "Shah Abbas I (1571–1629) transformed Isfahan into the Safavid imperial capital — 'Nesf-e Jahan' (Half the World) as he called it. Hassan spent three years in Isfahan studying the city's Safavid-period manuscripts at the Malek Library before beginning this architecturally precise recreation of the Maidan-e Naqsh-e Jahan at the height of Safavid power.",
    styleExplanation: "Hassan works in perfect Safavid miniature style — the same pigments, the same perspective conventions, the same approach to architectural decoration. His isometric aerial view follows the convention of Safavid city paintings (such as those in the Chehel Sotoun palace) where the entire square is visible without distortion.",
    culturalContext: "The Maidan is one of the largest urban plazas in history — 512 meters long, with the royal mosque, the merchant's mosque, the bazaar entrance, and the royal palace facing each other across the central garden. Hassan's painting is simultaneously a historical document and a lament for what the Islamic world could achieve when political will, resources, and artistic tradition aligned.",
    timeline: [
      { year: 1598, title: "Shah Abbas moves capital to Isfahan", description: "Abbas I transfers the Safavid capital from Qazvin to Isfahan, beginning one of the greatest urban planning projects in Islamic history." },
      { year: 1629, title: "Maidan completed", description: "After 30 years of construction, the Naqsh-e Jahan square is complete — a UNESCO World Heritage site today and still one of the world's most beautiful urban spaces." },
      { year: 2015, title: "Hassan begins Isfahan research", description: "Three years studying the Safavid-period city manuscripts at the Malek Library and measuring the square's proportions in person." },
      { year: 2018, title: "Isfahan — The Half of the World completed", description: "The work is exhibited at the Tehran Museum of Contemporary Art and acquired by a private Iranian collector in London." }
    ]
  }
};

ART_DATA.artistDetails = {
  1: {
    exhibitions: "Hayward Gallery, London (2018); National Gallery of Pakistan (2020); Asia Society, New York (2021); British Museum (2022)",
    contactEmail: "amir@maktabalfann.com",
    websiteUrl: "https://amirrezakhan.art",
    isVerified: true
  },
  2: {
    exhibitions: "Musée des beaux-arts de Montréal (2017); Aga Khan Museum, Toronto (2019, 2022); Guggenheim Bilbao (2020); Institut du Monde Arabe, Paris (2023)",
    contactEmail: "nadia@maktabalfann.com",
    websiteUrl: "https://nadiapersian.com",
    isVerified: true
  },
  3: {
    exhibitions: "Christie's London — alongside 16th-century originals (2016); Metropolitan Museum of Art, New York (2019); British Library (2021)",
    contactEmail: "hassan@maktabalfann.com",
    websiteUrl: "https://hassanmirzaqajar.art",
    isVerified: true
  },
  4: {
    exhibitions: "National Museum New Delhi (2015–posthumous); Raza Foundation, Delhi (2018); Rajasthan International Folk Festival (2019); Chester Beatty Library (2022–posthumous)",
    contactEmail: "vikram@maktabalfann.com",
    websiteUrl: "",
    isVerified: true
  },
  5: {
    exhibitions: "Fatima Malik-Hassan Al-Amin Foundation (2018); Institut Henri Poincaré, Paris (2020); Louvre Abu Dhabi (2022); Cité de l'Architecture, Paris (2022)",
    contactEmail: "fatima@maktabalfann.com",
    websiteUrl: "https://fatimageometry.com",
    isVerified: true
  },
  6: {
    exhibitions: "Royal Academy, London (2019); Museum of Islamic Art, Doha (2021); King Abdulaziz Center for World Culture, Dhahran (2022)",
    contactEmail: "omar@maktabalfann.com",
    websiteUrl: "https://omarcalligraphy.com",
    isVerified: true
  },
  7: {
    exhibitions: "Musée d'Orsay, Paris (2005–retrospective); Institut du Monde Arabe (2007); British Museum (2015); permanent collection: Cité de l'Architecture, Paris",
    contactEmail: "idris@maktabalfann.com",
    websiteUrl: "",
    isVerified: true
  },
  8: {
    exhibitions: "New Contemporaries, London (2023); Victoria and Albert Museum (2023); New Art Exchange, Nottingham (2024)",
    contactEmail: "sana@maktabalfann.com",
    websiteUrl: "https://sanaxdigital.com",
    isVerified: false
  },
  9: {
    exhibitions: "Art Institute of Chicago (2019); Whitechapel Gallery, London (2021); Lahore Museum (2023); Smithsonian Freer Gallery (2018)",
    contactEmail: "priya@maktabalfann.com",
    websiteUrl: "https://priyaimpressionist.com",
    isVerified: true
  },
  10: {
    exhibitions: "Tate Modern, London (2017); Karachi Biennale (2022, 2023); British Museum (2019); Freer Gallery of Art (2021)",
    contactEmail: "leila@maktabalfann.com",
    websiteUrl: "https://leilasudanese.art",
    isVerified: true
  },
  11: {
    exhibitions: "India Art Fair (2022, 2023); National Gallery of Modern Art, New Delhi (2021); Lalit Kala Akademi (2021); Kiran Nadar Museum of Art (2023)",
    contactEmail: "rashida@maktabalfann.com",
    websiteUrl: "https://rashidakishangarh.art",
    isVerified: true
  },
  12: {
    exhibitions: "Venice Biennale (2019); National Palace Museum, Taipei (2019); Metropolitan Museum of Art, New York (2022); Fukuoka Asian Art Museum (2021)",
    contactEmail: "chen@maktabalfann.com",
    websiteUrl: "https://chenweipainting.com",
    isVerified: true
  },
  13: {
    exhibitions: "Dhaka Art Summit (2018); Central Academy of Fine Arts, Beijing (2020); Saatchi Gallery, London (2022)",
    contactEmail: "yasmin@maktabalfann.com",
    websiteUrl: "https://yasmindhaka.art",
    isVerified: true
  },
  14: {
    exhibitions: "Zabludowicz Collection, London (2022); Art Basel Hong Kong (2023); Chhatrapati Shivaji Maharaj Vastu Sangrahalaya, Mumbai (2023)",
    contactEmail: "tariq@maktabalfann.com",
    websiteUrl: "https://tariqaiart.io",
    isVerified: false
  },
  15: {
    exhibitions: "Museum of Anthropology, UBC Vancouver (2022); British Museum (2020); Whitechapel Gallery, London (2019)",
    contactEmail: "amara@maktabalfann.com",
    websiteUrl: "https://amarawestafricanart.com",
    isVerified: true
  }
};

ART_DATA.gallery = {
  name: "Maktab-al-fann by Living Arts",
  founded: 2018,
  mission: "To preserve, celebrate, and reinterpret the living traditions of Islamic and South Asian art — bringing classical miniature, calligraphy, and geometric traditions into conversation with contemporary voices from across the Muslim world and South Asia.",
  history: "Maktab-al-fann (Arabic: مكتب الفن, 'Studio of Art') was established in London in 2018 by a group of artists who felt that the extraordinary depth of Islamic and South Asian artistic traditions was being underrepresented in Western galleries. Beginning with a focus on classical technique — authentic pigments, traditional formats, historical iconographic programs — the gallery quickly expanded to include contemporary work that engaged critically with these traditions rather than merely continuing them. By 2020, the gallery had developed a distinctive position: neither a nostalgic preservation project nor a complete break from tradition, but a genuine dialogue between historical practice and contemporary consciousness. The COVID-19 pandemic accelerated the gallery's digital transformation, and the current platform represents the most ambitious expression of this hybrid approach: making works available to an international audience while maintaining the intimacy of studio practice.",
  vision: "We believe that the artistic traditions of the Islamic world and South Asia — encompassing Mughal miniature, Persian manuscript painting, Arabic calligraphy, Rajput court painting, Islamic geometric art, and their contemporary descendants — represent one of the richest and most technically sophisticated artistic inheritances in human history. Our vision is a world in which these traditions are as central to global art discourse as the Western canon currently is. We work toward this by supporting artists who have mastered classical techniques, by commissioning work that engages seriously with historical sources, and by creating interpretive frameworks that allow audiences unfamiliar with these traditions to understand their depth and contemporary relevance.",
  team: [
    {
      name: "Dr. Yasmin Al-Rashid",
      role: "Director & Co-Founder",
      bio: "Art historian with a doctorate from SOAS University of London, specializing in Mughal court painting and its diasporic afterlives. Previously curator at the V&A's Islamic Middle East department. Speaks Arabic, Urdu, and Persian. Grew up between Lahore and London.",
      photoUrl: ""
    },
    {
      name: "Tariq Osman",
      role: "Head of Acquisitions",
      bio: "Trained calligrapher and art advisor with 20 years of experience working with South Asian and Middle Eastern collectors. Has placed works in the collections of the Aga Khan Museum, the Louvre Abu Dhabi, and multiple Gulf private collections. Based between London and Dubai.",
      photoUrl: ""
    },
    {
      name: "Priya Nair",
      role: "Digital & Community Lead",
      bio: "Former tech lead at a major arts platform who joined Maktab-al-fann to rebuild its digital presence from scratch. Background in both software engineering and art history — a combination she considers inevitable. Responsible for the current platform and the gallery's education programs.",
      photoUrl: ""
    },
    {
      name: "Hassan Mirza",
      role: "Technical Advisor — Classical Techniques",
      bio: "Master painter specializing in Safavid and Mughal miniature technique. Certified by the Tehran Museum of Contemporary Art's traditional arts program. Advises on pigment authenticity, historical technique verification, and artist technical development. Based in London and Isfahan.",
      photoUrl: ""
    }
  ]
};
