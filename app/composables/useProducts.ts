export interface ProductSpec {
  wattage?: string
  voltage?: string
  efficiency?: string
  cell_type?: string
  warranty?: string
  capacity?: string
  mppt_range?: string
  chemistry?: string
  cycle_life?: string
  current?: string
  length?: string
  [key: string]: string | undefined
}

export interface Product {
  id: string
  name: string
  slug: string
  category: 'panel' | 'inverter' | 'battery' | 'accessory'
  price: number
  stock: number
  specs: ProductSpec
  image_url: string
  is_active: boolean
}

export const solarProductsCatalog: Product[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Goodeybest Pro Monocrystalline Solar Panel 550W',
    slug: 'goodeybest-550w-mono-panel',
    category: 'panel',
    price: 185.00,
    stock: 150,
    specs: { wattage: '550W', voltage: '49.8V', efficiency: '21.5%', cell_type: 'Half-Cut PERC Monocrystalline', warranty: '25 Years Output' },
    image_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    is_active: true
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Goodeybest Bifacial Glass Solar Panel 670W Ultra',
    slug: 'goodeybest-670w-bifacial-panel',
    category: 'panel',
    price: 240.00,
    stock: 85,
    specs: { wattage: '670W', voltage: '53.2V', efficiency: '22.8%', cell_type: 'N-Type TOPCon Dual Glass', warranty: '30 Years Output' },
    image_url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
    is_active: true
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Goodeybest Hybrid Pure Sine Wave Inverter 5.5kW 48V',
    slug: 'goodeybest-5k5w-hybrid-inverter',
    category: 'inverter',
    price: 750.00,
    stock: 40,
    specs: { wattage: '5500W', voltage: '48V DC / 230V AC', mppt_range: '120V - 450V', efficiency: '98.0%', wifi_monitoring: 'Built-in App' },
    image_url: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80',
    is_active: true
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    name: 'Goodeybest Commercial Heavy-Duty Hybrid Inverter 10kW 48V',
    slug: 'goodeybest-10kw-hybrid-inverter',
    category: 'inverter',
    price: 1450.00,
    stock: 25,
    specs: { wattage: '10000W', voltage: '48V DC / 400V 3-Phase', mppt_trackers: '2 Dual MPPT', efficiency: '98.5%', grid_tie: 'Zero Export Support' },
    image_url: 'https://images.unsplash.com/photo-1558441719-6779b6981442?auto=format&fit=crop&w=800&q=80',
    is_active: true
  },
  {
    id: '55555555-5555-5555-5555-555555555555',
    name: 'Goodeybest PowerVault Lithium LiFePO4 Battery 5.12kWh 48V',
    slug: 'goodeybest-5kwh-lifepo4-battery',
    category: 'battery',
    price: 1250.00,
    stock: 60,
    specs: { capacity: '5.12kWh (100Ah)', voltage: '51.2V', chemistry: 'LiFePO4 Premium Grade A+', cycle_life: '6000+ Cycles @ 80% DOD', bms: 'Smart CAN/RS485 BMS' },
    image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
    is_active: true
  },
  {
    id: '66666666-6666-6666-6666-666666666666',
    name: 'Goodeybest Server Rack Battery Storage Module 10.24kWh 48V',
    slug: 'goodeybest-10kwh-lifepo4-rack-battery',
    category: 'battery',
    price: 2350.00,
    stock: 30,
    specs: { capacity: '10.24kWh (200Ah)', voltage: '51.2V', chemistry: 'Lithium Iron Phosphate', cycle_life: '8000+ Cycles', expandable: 'Up to 15 Units Parallel' },
    image_url: 'https://images.unsplash.com/photo-1548611635-b6e7827d7d4a?auto=format&fit=crop&w=800&q=80',
    is_active: true
  },
  {
    id: '77777777-7777-7777-7777-777777777777',
    name: 'Goodeybest MPPT Solar Charge Controller 100A 150V',
    slug: 'goodeybest-mppt-charge-controller-100a',
    category: 'accessory',
    price: 195.00,
    stock: 90,
    specs: { current: '100A', max_pv_input: '150V DC', auto_voltage: '12V/24V/36V/48V Auto Detect', display: 'Color LCD Panel' },
    image_url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    is_active: true
  },
  {
    id: '88888888-8888-8888-8888-888888888888',
    name: 'Goodeybest Solar MC4 Connector & Heavy Cable Kit (50m 6mm²)',
    slug: 'goodeybest-mc4-cable-kit-50m',
    category: 'accessory',
    price: 85.00,
    stock: 200,
    specs: { length: '50 Meters Red + Black', wire_gauge: '6mm² (10 AWG)', rating: '1000V UV Resistant', connectors: '10 Pairs IP68 MC4 Included' },
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    is_active: true
  }
]

export const useProducts = () => {
  const getProducts = (category?: string, search?: string) => {
    let list = [...solarProductsCatalog]
    if (category && category !== 'all') {
      list = list.filter(p => p.category === category)
    }
    if (search && search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q) || JSON.stringify(p.specs).toLowerCase().includes(q))
    }
    return list
  }

  const getProductById = (id: string) => {
    return solarProductsCatalog.find(p => p.id === id) || null
  }

  return {
    products: solarProductsCatalog,
    getProducts,
    getProductById
  }
}
