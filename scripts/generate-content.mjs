import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = join(root, 'app/content')

const defaultFeatures = {
  tr: ['Paslanmaz çelik malzeme', 'Hijyenik tasarım', 'TSE standartlarına uygun', 'Projeye özel kapasite'],
  en: ['Stainless steel material', 'Hygienic design', 'TSE standard compliant', 'Project-specific capacity']
}

const catalog = [
  {
    id: 'paslanmaz-celik-tanklar',
    slugs: { tr: 'paslanmaz-celik-tanklar', en: 'stainless-steel-tanks' },
    shared: { icon: 'i-lucide-cylinder' },
    translations: {
      tr: { label: 'Paslanmaz Çelik Tanklar', description: 'Depolama ve proses uygulamaları için hijyenik tank çözümleri.' },
      en: { label: 'Stainless Steel Tanks', description: 'Hygienic tank solutions for storage and process applications.' }
    },
    products: [
      {
        id: 'proses-tanklari',
        slugs: { tr: 'proses-tanklari', en: 'process-tanks' },
        shared: { categoryId: 'paslanmaz-celik-tanklar' },
        translations: {
          tr: { label: 'Proses Tankları', description: 'Üretim hatları için proses tankları.', body: 'Gıda, ilaç ve kimya sektörlerine uygun paslanmaz çelik proses tankları üretiyoruz.', features: defaultFeatures.tr },
          en: { label: 'Process Tanks', description: 'Process tanks for production lines.', body: 'We manufacture stainless steel process tanks suitable for food, pharmaceutical and chemical industries.', features: defaultFeatures.en }
        }
      },
      {
        id: 'depolama-tanklari',
        slugs: { tr: 'depolama-tanklari', en: 'storage-tanks' },
        shared: { categoryId: 'paslanmaz-celik-tanklar' },
        translations: {
          tr: { label: 'Depolama Tankları', description: 'Hammadde ve ürün depolama tankları.', body: 'Kapasite ve proses gereksinimlerine göre tasarlanmış depolama tankları.', features: defaultFeatures.tr },
          en: { label: 'Storage Tanks', description: 'Raw material and product storage tanks.', body: 'Storage tanks designed according to capacity and process requirements.', features: defaultFeatures.en }
        }
      },
      {
        id: 'karistiricili-tanklar',
        slugs: { tr: 'karistiricili-tanklar', en: 'agitated-tanks' },
        shared: { categoryId: 'paslanmaz-celik-tanklar' },
        translations: {
          tr: { label: 'Karıştırıcılı Tanklar', description: 'Homojen karışım için entegre sistemler.', body: 'Karıştırıcı entegreli tank sistemleri ile homojen üretim sağlanır.', features: defaultFeatures.tr },
          en: { label: 'Agitated Tanks', description: 'Integrated systems for homogeneous mixing.', body: 'Agitator-integrated tank systems ensure homogeneous production.', features: defaultFeatures.en }
        }
      },
      {
        id: 'basincli-tanklar',
        slugs: { tr: 'basincli-tanklar', en: 'pressure-tanks' },
        shared: { categoryId: 'paslanmaz-celik-tanklar' },
        translations: {
          tr: { label: 'Basınçlı Tanklar', description: 'Basınçlı proses uygulamaları.', body: 'Basınç gerektiren prosesler için güvenli tank çözümleri.', features: defaultFeatures.tr },
          en: { label: 'Pressure Tanks', description: 'Pressurized process applications.', body: 'Safe tank solutions for processes requiring pressure.', features: defaultFeatures.en }
        }
      }
    ]
  },
  {
    id: 'reaktorler-karistiricilar',
    slugs: { tr: 'reaktorler-karistiricilar', en: 'reactors-mixers' },
    shared: { icon: 'i-lucide-flask-conical' },
    translations: {
      tr: { label: 'Reaktörler ve Karıştırıcılar', description: 'Kimyasal ve gıda prosesleri için reaktör ve karıştırıcı sistemleri.' },
      en: { label: 'Reactors and Mixers', description: 'Reactor and mixer systems for chemical and food processes.' }
    },
    products: [
      {
        id: 'reaktorler',
        slugs: { tr: 'reaktorler', en: 'reactors' },
        shared: { categoryId: 'reaktorler-karistiricilar' },
        translations: {
          tr: { label: 'Reaktörler', description: 'Kimyasal reaksiyon prosesleri.', body: 'Proses ihtiyaçlarına göre tasarlanmış paslanmaz çelik reaktör sistemleri.', features: defaultFeatures.tr },
          en: { label: 'Reactors', description: 'Chemical reaction processes.', body: 'Stainless steel reactor systems designed according to process requirements.', features: defaultFeatures.en }
        }
      },
      {
        id: 'endustriyel-karistiricilar',
        slugs: { tr: 'endustriyel-karistiricilar', en: 'industrial-mixers' },
        shared: { categoryId: 'reaktorler-karistiricilar' },
        translations: {
          tr: { label: 'Endüstriyel Karıştırıcılar', description: 'Yüksek verimli karıştırma.', body: 'Farklı viskozite ve hacim gereksinimlerine uygun karıştırıcı çözümleri.', features: defaultFeatures.tr },
          en: { label: 'Industrial Mixers', description: 'High-efficiency mixing.', body: 'Mixer solutions suitable for different viscosity and volume requirements.', features: defaultFeatures.en }
        }
      },
      {
        id: 'homojenizatorler',
        slugs: { tr: 'homojenizatorler', en: 'homogenizers' },
        shared: { categoryId: 'reaktorler-karistiricilar' },
        translations: {
          tr: { label: 'Homojenizatörler', description: 'Gıda ve kozmetik uygulamaları.', body: 'Homojen karışım gerektiren üretim hatları için özel ekipmanlar.', features: defaultFeatures.tr },
          en: { label: 'Homogenizers', description: 'Food and cosmetic applications.', body: 'Special equipment for production lines requiring homogeneous mixing.', features: defaultFeatures.en }
        }
      }
    ]
  },
  {
    id: 'filtreler-etuv-sistemleri',
    slugs: { tr: 'filtreler-etuv-sistemleri', en: 'filters-oven-systems' },
    shared: { icon: 'i-lucide-filter' },
    translations: {
      tr: { label: 'Filtreler ve Etüv Sistemleri', description: 'Filtrasyon ve ısıtma prosesleri için ekipman çözümleri.' },
      en: { label: 'Filters and Oven Systems', description: 'Equipment solutions for filtration and heating processes.' }
    },
    products: [
      {
        id: 'endustriyel-filtreler',
        slugs: { tr: 'endustriyel-filtreler', en: 'industrial-filters' },
        shared: { categoryId: 'filtreler-etuv-sistemleri' },
        translations: {
          tr: { label: 'Endüstriyel Filtreler', description: 'Sıvı ve proses filtrasyonu.', body: 'Proses kalitesini koruyan endüstriyel filtre sistemleri.', features: defaultFeatures.tr },
          en: { label: 'Industrial Filters', description: 'Liquid and process filtration.', body: 'Industrial filter systems that maintain process quality.', features: defaultFeatures.en }
        }
      },
      {
        id: 'etuv-uygulamalari',
        slugs: { tr: 'etuv-uygulamalari', en: 'oven-applications' },
        shared: { categoryId: 'filtreler-etuv-sistemleri' },
        translations: {
          tr: { label: 'Etüv Uygulamaları', description: 'Kontrollü ısıtma sistemleri.', body: 'Üretim süreçlerinde kontrollü ısıtma için etüv ve fırın uygulamaları.', features: defaultFeatures.tr },
          en: { label: 'Oven Applications', description: 'Controlled heating systems.', body: 'Oven and furnace applications for controlled heating in production processes.', features: defaultFeatures.en }
        }
      },
      {
        id: 'separator-sistemleri',
        slugs: { tr: 'separator-sistemleri', en: 'separator-systems' },
        shared: { categoryId: 'filtreler-etuv-sistemleri' },
        translations: {
          tr: { label: 'Separatör Sistemleri', description: 'Ayırma ve arıtma prosesleri.', body: 'Proses hatlarında ayırma ve arıtma için özel sistemler.', features: defaultFeatures.tr },
          en: { label: 'Separator Systems', description: 'Separation and purification processes.', body: 'Special systems for separation and purification in process lines.', features: defaultFeatures.en }
        }
      }
    ]
  },
  {
    id: 'ozel-tasarim-makineler',
    slugs: { tr: 'ozel-tasarim-makineler', en: 'custom-designed-machines' },
    shared: { icon: 'i-lucide-settings' },
    translations: {
      tr: { label: 'Özel Tasarım Makineler', description: 'Müşteri talebine göre tasarlanan proses makineleri.' },
      en: { label: 'Custom Designed Machines', description: 'Process machines designed according to customer requirements.' }
    },
    products: [
      {
        id: 'proses-hat-makineleri',
        slugs: { tr: 'proses-hat-makineleri', en: 'process-line-machines' },
        shared: { categoryId: 'ozel-tasarim-makineler' },
        translations: {
          tr: { label: 'Proses Hat Makineleri', description: 'Hat bazlı özel makineler.', body: 'Üretim hattınıza özel tasarlanmış proses makineleri.', features: defaultFeatures.tr },
          en: { label: 'Process Line Machines', description: 'Line-based custom machines.', body: 'Process machines custom-designed for your production line.', features: defaultFeatures.en }
        }
      },
      {
        id: 'dolum-hatlari',
        slugs: { tr: 'dolum-hatlari', en: 'filling-lines' },
        shared: { categoryId: 'ozel-tasarim-makineler' },
        translations: {
          tr: { label: 'Dolum Hatları', description: 'Otomatik dolum çözümleri.', body: 'Gıda, kozmetik ve kimya sektörleri için dolum hatları.', features: defaultFeatures.tr },
          en: { label: 'Filling Lines', description: 'Automatic filling solutions.', body: 'Filling lines for food, cosmetic and chemical industries.', features: defaultFeatures.en }
        }
      },
      {
        id: 'paketleme-sistemleri',
        slugs: { tr: 'paketleme-sistemleri', en: 'packaging-systems' },
        shared: { categoryId: 'ozel-tasarim-makineler' },
        translations: {
          tr: { label: 'Paketleme Sistemleri', description: 'Entegre paketleme ekipmanları.', body: 'Üretim sonrası paketleme süreçleri için özel sistemler.', features: defaultFeatures.tr },
          en: { label: 'Packaging Systems', description: 'Integrated packaging equipment.', body: 'Custom systems for post-production packaging processes.', features: defaultFeatures.en }
        }
      }
    ]
  }
]

const services = [
  {
    id: 'proje-tasarim-muhendislik',
    slugs: { tr: 'proje-tasarim-muhendislik', en: 'project-design-engineering' },
    shared: { icon: 'i-lucide-drafting-compass' },
    translations: {
      tr: {
        label: 'Proje Tasarım ve Mühendislik',
        description: 'Proses hatları için teknik tasarım, kapasite hesabı ve mühendislik desteği.',
        body: 'Müşteri ihtiyaçlarına göre proses ekipmanları, tank sistemleri ve tesisat hatları için detaylı proje tasarımı hazırlıyoruz. Kapasite, akış ve hijyen gereksinimlerini birlikte planlıyoruz.',
        features: ['Proses mühendisliği', 'Teknik çizim', 'Kapasite hesabı', 'Saha keşfi']
      },
      en: {
        label: 'Project Design and Engineering',
        description: 'Technical design, capacity calculation and engineering support for process lines.',
        body: 'We prepare detailed project designs for process equipment, tank systems and piping lines according to customer needs. We plan capacity, flow and hygiene requirements together.',
        features: ['Process engineering', 'Technical drawing', 'Capacity calculation', 'Site survey']
      }
    }
  },
  {
    id: 'uretim-imalat',
    slugs: { tr: 'uretim-imalat', en: 'production-manufacturing' },
    shared: { icon: 'i-lucide-factory' },
    translations: {
      tr: {
        label: 'Üretim ve İmalat',
        description: 'Paslanmaz çelik tank, reaktör, karıştırıcı ve özel makine imalatı.',
        body: 'Atölyemizde paslanmaz çelik tanklar, reaktörler, karıştırıcılar, filtreler ve müşteri talebine özel makineler üretiyoruz. TSE standartlarında kalite kontrol süreçleri uygulanır.',
        features: ['Paslanmaz çelik imalat', 'Kaynak kalite kontrolü', 'Özel tasarım', 'TSE uyumu']
      },
      en: {
        label: 'Production and Manufacturing',
        description: 'Stainless steel tank, reactor, mixer and custom machine manufacturing.',
        body: 'In our workshop we manufacture stainless steel tanks, reactors, mixers, filters and custom machines. Quality control processes are applied in accordance with TSE standards.',
        features: ['Stainless steel manufacturing', 'Welding quality control', 'Custom design', 'TSE compliance']
      }
    }
  },
  {
    id: 'montaj-tesis-kurulumu',
    slugs: { tr: 'montaj-tesis-kurulumu', en: 'assembly-plant-installation' },
    shared: { icon: 'i-lucide-hard-hat' },
    translations: {
      tr: {
        label: 'Montaj ve Tesis Kurulumu',
        description: 'Saha montajı, tesisat kurulumu ve devreye alma hizmetleri.',
        body: 'Üretilen ekipmanların saha montajı, borulama, otomasyon entegrasyonu ve tesis kurulum işlerini uzman ekiplerimizle gerçekleştiriyoruz.',
        features: ['Saha montajı', 'Tesisat kurulumu', 'Devreye alma', 'Proje yönetimi']
      },
      en: {
        label: 'Assembly and Plant Installation',
        description: 'On-site assembly, piping installation and commissioning services.',
        body: 'We carry out on-site assembly, piping, automation integration and plant installation with our expert teams.',
        features: ['On-site assembly', 'Piping installation', 'Commissioning', 'Project management']
      }
    }
  },
  {
    id: 'bakim-servis',
    slugs: { tr: 'bakim-servis', en: 'maintenance-service' },
    shared: { icon: 'i-lucide-wrench' },
    translations: {
      tr: {
        label: 'Bakım ve Servis',
        description: 'Periyodik bakım, revizyon ve teknik destek hizmetleri.',
        body: 'Kurulan sistemlerin uzun ömürlü ve güvenli çalışması için bakım, revizyon ve teknik servis desteği sunuyoruz.',
        features: ['Periyodik bakım', 'Yedek parça', 'Acil müdahale', 'Teknik danışmanlık']
      },
      en: {
        label: 'Maintenance and Service',
        description: 'Periodic maintenance, overhaul and technical support services.',
        body: 'We provide maintenance, overhaul and technical service support for long-lasting and safe operation of installed systems.',
        features: ['Periodic maintenance', 'Spare parts', 'Emergency response', 'Technical consulting']
      }
    }
  },
  {
    id: 'otomasyon-proses-entegrasyonu',
    slugs: { tr: 'otomasyon-proses-entegrasyonu', en: 'automation-process-integration' },
    shared: { icon: 'i-lucide-cpu' },
    translations: {
      tr: {
        label: 'Otomasyon ve Proses Entegrasyonu',
        description: 'Proses hatlarına otomasyon ve kontrol sistemleri entegrasyonu.',
        body: 'Üretim hatlarının verimli çalışması için otomasyon, sensör ve kontrol sistemlerinin proses ekipmanlarına entegrasyonunu sağlıyoruz.',
        features: ['SCADA entegrasyonu', 'Proses kontrol', 'Veri izleme', 'Hat optimizasyonu']
      },
      en: {
        label: 'Automation and Process Integration',
        description: 'Integration of automation and control systems into process lines.',
        body: 'We integrate automation, sensor and control systems into process equipment for efficient operation of production lines.',
        features: ['SCADA integration', 'Process control', 'Data monitoring', 'Line optimization']
      }
    }
  }
]

const corporate = [
  {
    id: 'hakkimizda',
    slugs: { tr: 'hakkimizda', en: 'about-us' },
    shared: { layout: 'about' },
    translations: {
      tr: {
        title: 'Hakkımızda',
        badge: 'Kurumsal',
        description: 'Aydınox Proses Makine, paslanmaz çelik proses ekipmanları ve tesis kurulumu alanında güvenilir bir çözüm ortağıdır.',
        sections: [
          { heading: 'Biz Kimiz?', body: 'Aydınox Proses Makine, proses, makine, imalat, tank ve fabrika kurulumu alanlarında proje tasarım, üretim, montaj ve servis hizmetleri sunan global odaklı bir üreticidir.' },
          { heading: 'Ne Yapıyoruz?', body: 'Paslanmaz çelik tanklar, reaktörler, karıştırıcılar, filtreler, etüv uygulamaları ve müşteri talebine özel makineler üretiyor; tesisat montaj ve otomasyon hizmetleriyle projeleri uçtan uca tamamlıyoruz.' }
        ]
      },
      en: {
        title: 'About Us',
        badge: 'Corporate',
        description: 'Aydınox Process Machinery is a trusted partner in stainless steel process equipment and plant installation.',
        sections: [
          { heading: 'Who We Are', body: 'Aydınox Process Machinery is a globally focused manufacturer offering project design, production, assembly and service in process, machinery, manufacturing, tanks and plant installation.' },
          { heading: 'What We Do', body: 'We manufacture stainless steel tanks, reactors, mixers, filters, oven applications and custom machines; we complete projects end-to-end with piping assembly and automation services.' }
        ]
      }
    }
  },
  {
    id: 'misyon-vizyon',
    slugs: { tr: 'misyon-vizyon', en: 'mission-vision' },
    shared: { layout: 'mission' },
    translations: {
      tr: {
        title: 'Misyon & Vizyon',
        badge: 'Kurumsal',
        description: 'Kaliteli, güvenilir ve yenilikçi üretim çözümleriyle sektörde öncü olma hedefimiz.',
        sections: [
          { heading: 'Misyonumuz', body: 'Müşterilerimize kaliteli, güvenilir ve yenilikçi üretim ve mühendislik çözümleri sunarak işlerini daha verimli hale getirmeyi ve başarılarını artırmayı hedefliyoruz.' },
          { heading: 'Vizyonumuz', body: 'Proses makine ve paslanmaz çelik ekipman üretiminde Türkiye\'nin ve bölgenin tercih edilen, teknolojide lider üreticilerinden biri olmak.' }
        ]
      },
      en: {
        title: 'Mission & Vision',
        badge: 'Corporate',
        description: 'Our goal is to be a leader in the industry with quality, reliable and innovative production solutions.',
        sections: [
          { heading: 'Our Mission', body: 'We aim to make our customers\' businesses more efficient and increase their success by providing quality, reliable and innovative production and engineering solutions.' },
          { heading: 'Our Vision', body: 'To be one of Turkey\'s and the region\'s preferred, technology-leading manufacturers in process machinery and stainless steel equipment production.' }
        ]
      }
    }
  },
  {
    id: 'kalite-politikasi',
    slugs: { tr: 'kalite-politikasi', en: 'quality-policy' },
    shared: { layout: 'quality' },
    translations: {
      tr: {
        title: 'Kalite Politikası',
        badge: 'Kurumsal',
        description: 'Kanunlara, yasal düzenlemelere ve müşteri beklentilerine tam uyumlu kaliteli üretim.',
        sections: [
          { heading: 'Kalite Anlayışımız', body: 'Kalite politikamız; kanunlara ve yasal düzenlemelere titizlikle uyarak, topluma, doğal çevreye ve insanlığa yararlı olma hassasiyetini göstererek, müşterilerimizin ihtiyaç ve beklentilerini karşılayacak kaliteli ve güvenli ürünler üretmektir.' },
          { heading: 'Standartlar', body: 'TSE standartlarında üretim yapıyor; gıda, ilaç, kozmetik ve kimya sektörlerinin hijyenik sistem gereksinimlerine uygun ekipman ve tesisat çözümleri sunuyoruz.' }
        ]
      },
      en: {
        title: 'Quality Policy',
        badge: 'Corporate',
        description: 'Quality production fully compliant with laws, regulations and customer expectations.',
        sections: [
          { heading: 'Our Quality Approach', body: 'Our quality policy is to produce quality and safe products that meet our customers\' needs and expectations, while strictly complying with laws and regulations and showing sensitivity to society, the environment and humanity.' },
          { heading: 'Standards', body: 'We manufacture in accordance with TSE standards; we offer equipment and piping solutions suitable for the hygienic system requirements of food, pharmaceutical, cosmetic and chemical industries.' }
        ]
      }
    }
  },
  {
    id: 'belgeler',
    slugs: { tr: 'belgeler', en: 'certificates' },
    shared: { layout: 'documents' },
    translations: {
      tr: {
        title: 'Belgeler',
        badge: 'Kurumsal',
        description: 'Kalite, güvenlik ve uygunluk belgelerimiz.',
        sections: [
          { heading: 'Sertifikalar & Uygunluk', body: 'Ürün ve hizmetlerimiz ilgili teknik standartlara uygun olarak üretilmektedir. Güncel belge listesi talep üzerine paylaşılmaktadır.' },
          { heading: 'Teknik Dokümantasyon', body: 'Montaj kılavuzları, proses şemaları ve proje dokümanları teknik ekibimiz tarafından hazırlanmaktadır.' }
        ]
      },
      en: {
        title: 'Certificates',
        badge: 'Corporate',
        description: 'Our quality, safety and compliance certificates.',
        sections: [
          { heading: 'Certificates & Compliance', body: 'Our products and services are manufactured in accordance with relevant technical standards. The current certificate list is shared upon request.' },
          { heading: 'Technical Documentation', body: 'Assembly manuals, process diagrams and project documents are prepared by our technical team.' }
        ]
      }
    }
  },
  {
    id: 'insan-kaynaklari',
    slugs: { tr: 'insan-kaynaklari', en: 'human-resources' },
    shared: { layout: 'careers' },
    translations: {
      tr: {
        title: 'İnsan Kaynakları',
        badge: 'Kurumsal',
        description: 'Aydınox ailesine katılmak ister misiniz?',
        sections: [
          { heading: 'Ekibimize Katılın', body: 'Üretim, proje mühendisliği, montaj, satış ve operasyon alanlarında deneyimli veya kariyer hedefleyen adayları ekibimize dahil etmekten memnuniyet duyarız.' },
          { heading: 'Başvuru', body: 'Özgeçmişinizi info@aydinox.com.tr adresine gönderebilir veya iletişim formu üzerinden bize ulaşabilirsiniz.' }
        ]
      },
      en: {
        title: 'Human Resources',
        badge: 'Corporate',
        description: 'Would you like to join the Aydınox family?',
        sections: [
          { heading: 'Join Our Team', body: 'We are pleased to include experienced candidates or those pursuing a career in production, project engineering, assembly, sales and operations.' },
          { heading: 'Application', body: 'You can send your CV to info@aydinox.com.tr or contact us through the contact form.' }
        ]
      }
    }
  }
]

const blogPosts = [
  {
    id: 'paslanmaz-celik-tank-secimi',
    slugs: { tr: 'paslanmaz-celik-tank-secimi', en: 'stainless-steel-tank-selection' },
    shared: { date: '2026-01-20' },
    translations: {
      tr: {
        title: 'Paslanmaz Çelik Tank Seçiminde Dikkat Edilecekler',
        excerpt: 'Proses ihtiyaçlarına göre doğru tank malzemesi ve kapasitesi nasıl belirlenir?',
        category: 'Rehber',
        body: ['Tank seçiminde proses sıcaklığı, basınç, hijyen gereksinimleri ve kapasite birlikte değerlendirilmelidir.', 'Gıda ve ilaç sektörlerinde 316L paslanmaz çelik tercih edilirken, kimya uygulamalarında proses koşullarına göre malzeme seçimi yapılmalıdır.', 'Doğru tank tasarımı hem üretim güvenliğini hem de bakım maliyetlerini doğrudan etkiler.']
      },
      en: {
        title: 'Key Considerations in Stainless Steel Tank Selection',
        excerpt: 'How to determine the right tank material and capacity according to process requirements?',
        category: 'Guide',
        body: ['Process temperature, pressure, hygiene requirements and capacity should be evaluated together in tank selection.', 'While 316L stainless steel is preferred in food and pharmaceutical industries, material selection should be made according to process conditions in chemical applications.', 'Correct tank design directly affects both production safety and maintenance costs.']
      }
    }
  },
  {
    id: 'hijyenik-proses-hatlari',
    slugs: { tr: 'hijyenik-proses-hatlari', en: 'hygienic-process-lines' },
    shared: { date: '2026-01-12' },
    translations: {
      tr: {
        title: 'Hijyenik Proses Hatları Nasıl Tasarlanır?',
        excerpt: 'Gıda ve ilaç üretiminde hijyenik sistem tasarımının temel prensipleri.',
        category: 'Mühendislik',
        body: ['Hijyenik proses hatlarında CIP (Clean-in-Place) uyumu, minimum ölü hacim ve kolay temizlenebilir yüzeyler kritik öneme sahiptir.', 'Borulama, bağlantı elemanları ve ekipman seçimi proses güvenliğini belirler.', 'Aydınox olarak tüm projelerimizde sektör standartlarına uygun hijyenik tasarım prensiplerini uyguluyoruz.']
      },
      en: {
        title: 'How to Design Hygienic Process Lines?',
        excerpt: 'Basic principles of hygienic system design in food and pharmaceutical production.',
        category: 'Engineering',
        body: ['CIP (Clean-in-Place) compatibility, minimum dead volume and easily cleanable surfaces are critical in hygienic process lines.', 'Piping, connection elements and equipment selection determine process safety.', 'At Aydınox, we apply hygienic design principles in accordance with industry standards in all our projects.']
      }
    }
  },
  {
    id: 'reaktor-sistemlerinde-guvenlik',
    slugs: { tr: 'reaktor-sistemlerinde-guvenlik', en: 'reactor-system-safety' },
    shared: { date: '2025-12-28' },
    translations: {
      tr: {
        title: 'Reaktör Sistemlerinde Güvenlik',
        excerpt: 'Kimyasal proseslerde reaktör güvenliği ve kontrol sistemleri.',
        category: 'Güvenlik',
        body: ['Reaktör sistemlerinde basınç, sıcaklık ve karıştırma kontrolü güvenli üretimin temelidir.', 'Acil durum ventilasyonu, basınç emniyet valfleri ve sensör entegrasyonu zorunlu güvenlik unsurlarıdır.', 'Proje mühendisliği aşamasında risk analizi yapılarak uygun güvenlik önlemleri planlanmalıdır.']
      },
      en: {
        title: 'Safety in Reactor Systems',
        excerpt: 'Reactor safety and control systems in chemical processes.',
        category: 'Safety',
        body: ['Pressure, temperature and mixing control in reactor systems are the foundation of safe production.', 'Emergency ventilation, pressure safety valves and sensor integration are mandatory safety elements.', 'Risk analysis should be performed during the project engineering phase and appropriate safety measures planned.']
      }
    }
  },
  {
    id: 'tse-standartlari-paslanmaz-celik',
    slugs: { tr: 'tse-standartlari-paslanmaz-celik', en: 'tse-standards-stainless-steel' },
    shared: { date: '2025-12-15' },
    translations: {
      tr: {
        title: 'TSE Standartlarında Paslanmaz Çelik Üretim',
        excerpt: 'TSE standartlarının proses ekipmanı üretimindeki önemi.',
        category: 'Kalite',
        body: ['TSE standartları, paslanmaz çelik ekipman üretiminde malzeme kalitesi, kaynak ve test prosedürlerini tanımlar.', 'Standartlara uygun üretim, müşteri denetimlerinde ve sektörel sertifikasyonlarda avantaj sağlar.', 'Aydınox olarak tüm üretim süreçlerimizde kalite kontrol ve uygunluk denetimlerini uyguluyoruz.']
      },
      en: {
        title: 'Stainless Steel Production to TSE Standards',
        excerpt: 'The importance of TSE standards in process equipment manufacturing.',
        category: 'Quality',
        body: ['TSE standards define material quality, welding and testing procedures in stainless steel equipment manufacturing.', 'Production in accordance with standards provides advantages in customer audits and industry certifications.', 'At Aydınox, we apply quality control and compliance audits in all our production processes.']
      }
    }
  },
  {
    id: 'tesis-kurulumu-proje-yonetimi',
    slugs: { tr: 'tesis-kurulumu-proje-yonetimi', en: 'plant-installation-project-management' },
    shared: { date: '2025-11-30' },
    translations: {
      tr: {
        title: 'Tesis Kurulumunda Proje Yönetimi',
        excerpt: 'Fabrika kurulum projelerinde zamanında teslim için kritik adımlar.',
        category: 'Proje',
        body: ['Tesis kurulum projelerinde detaylı planlama, ekipman üretim takvimi ve saha koordinasyonu başarıyı belirler.', 'Montaj öncesi saha hazırlığı ve tesisat altyapısı kontrolü gecikmeleri önler.', 'Uçtan uca proje yönetimi ile üretimden devreye almaya kadar tüm süreçleri koordine ediyoruz.']
      },
      en: {
        title: 'Project Management in Plant Installation',
        excerpt: 'Critical steps for on-time delivery in factory installation projects.',
        category: 'Project',
        body: ['Detailed planning, equipment production schedule and site coordination determine success in plant installation projects.', 'Pre-assembly site preparation and piping infrastructure checks prevent delays.', 'We coordinate all processes from production to commissioning with end-to-end project management.']
      }
    }
  },
  {
    id: 'kimya-sektorunde-proses-otomasyonu',
    slugs: { tr: 'kimya-sektorunde-proses-otomasyonu', en: 'process-automation-chemical-industry' },
    shared: { date: '2025-11-18' },
    translations: {
      tr: {
        title: 'Kimya Sektöründe Proses Otomasyonu',
        excerpt: 'Otomasyon entegrasyonunun üretim verimliliğine etkisi.',
        category: 'Otomasyon',
        body: ['Proses otomasyonu, üretim hatlarında tutarlılık, izlenebilirlik ve verimlilik sağlar.', 'Sensör, PLC ve SCADA entegrasyonu ile gerçek zamanlı proses kontrolü mümkündür.', 'Aydınox, ekipman üretiminin yanı sıra otomasyon entegrasyonu hizmeti de sunmaktadır.']
      },
      en: {
        title: 'Process Automation in the Chemical Industry',
        excerpt: 'The impact of automation integration on production efficiency.',
        category: 'Automation',
        body: ['Process automation provides consistency, traceability and efficiency in production lines.', 'Real-time process control is possible with sensor, PLC and SCADA integration.', 'Aydınox offers automation integration services in addition to equipment manufacturing.']
      }
    }
  }
]

function writeJson(path, data) {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n')
}

writeJson(join(contentDir, 'catalog.json'), catalog)
writeJson(join(contentDir, 'services.json'), services)
writeJson(join(contentDir, 'corporate.json'), corporate)

const blogDir = join(contentDir, 'blog')
mkdirSync(blogDir, { recursive: true })
for (const post of blogPosts) {
  writeJson(join(blogDir, `${post.id}.json`), post)
}

console.log('Content JSON files generated successfully.')
