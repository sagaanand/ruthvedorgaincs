export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface ValueItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const MILESTONES: Milestone[] = [
  {
    year: '2010',
    title: 'The Beginning',
    description: 'Founded with a small family farm and a vision to bring authentic organic products to Indian households. Our very first product was traditional Desi Ghee crafted strictly with the Ayurvedic Bilona method.'
  },
  {
    year: '2013',
    title: 'First Expansion',
    description: 'Introduced cold-pressed oils and natural wild honey to our product line. Expanded our direct farmer network to include 50+ dedicated organic farmers across Karnataka.'
  },
  {
    year: '2016',
    title: 'New Facility in Bengaluru',
    description: 'Established our own state-of-the-art packaging and wood-press facility in Bangalore with heritage Mara Chekku technology to ensure chemical-free extraction while preserving fragile nutrients.'
  },
  {
    year: '2019',
    title: 'National Recognition',
    description: 'Awarded "Best Organic Brand" by the National Organic Association. Expanded distribution and regular customer deliveries to 5 major states across India.'
  },
  {
    year: '2023',
    title: 'Present Day & Beyond',
    description: 'Proudly serving over 50,000 satisfied families nationwide with 15+ verified organic staples, maintaining unwavering fidelity to traditional methods, Vedic wisdom, and fair-trade farming.'
  }
];

export const VALUES: ValueItem[] = [
  {
    id: 'authenticity',
    title: 'Authenticity',
    description: 'We preserve traditional methods like Bilona ghee-making and wood-pressed oil extraction to deliver products exactly as nature and our ancestors intended.',
    iconName: 'Sparkles'
  },
  {
    id: 'purity',
    title: 'Uncompromised Purity',
    description: 'Zero chemicals, zero mineral oils, zero preservatives. Every batch is minimally handled and tested for pesticide-free wholesome purity.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'community',
    title: 'Farmer Community',
    description: 'We partner directly with native smallholder farmers across Karnataka, ensuring transparent fair-trade compensation and regenerative soil practices.',
    iconName: 'Users'
  },
  {
    id: 'sustainability',
    title: 'Eco Sustainability',
    description: 'From recyclable glass packaging to energy-conscious wood-pressing and zero chemical effluents, we tread gently on the earth at every stage.',
    iconName: 'Leaf'
  },
  {
    id: 'wellness',
    title: 'Holistic Wellness',
    description: 'Our foods are designed to nourish the Dhatus (tissues) and kindle biological vitality, drawing on centuries of time-tested Indian wellness wisdom.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'excellence',
    title: 'Rigorous Excellence',
    description: 'Continuous quality checks, food-grade glass packaging, and hygienic facilities maintain uncompromising standards from farm to table.',
    iconName: 'Award'
  }
];
