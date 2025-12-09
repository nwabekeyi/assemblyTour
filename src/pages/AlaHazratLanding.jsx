import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import {
  Phone,
  ChevronDown,
  Menu,
  X,
  MapPin,
  Calendar,
  Users,
  Search,
  Star,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModal from '../components/AuthModal';
import { PACKAGES } from '../data/packages';
import { getSession, logout } from '../utils/auth';
import mecca from '../assets/mecca.jpeg';
import heroImage from '../assets/pixday090819a-0.avif';
import PackageCard from '../components/PackageCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/* ==================== SLIDER SETTINGS ==================== */
const featuredSliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  arrows: false,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: "0px",
      },
    },
  ],
};
;

const testimonialSliderSettings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 6000,
  arrows: false,
  centerMode: true,
  centerPadding: "20px",
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: "0px",
      },
    },
  ],
};


/* ==================== COLORS ==================== */
const colors = {
  primary: '#0d9488',
  secondary: '#f97316',
  accent: '#14b8a6',
  neutral: '#0f172a',
};

/* ==================== STYLED COMPONENTS ==================== */
const Header = styled.header`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  background: rgba(13, 148, 136, 0.98);
  backdrop-filter: blur(12px);
  padding: 16px 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
`;

const NavInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.h1)`
  font-weight: 900;
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  background: linear-gradient(90deg, #fff, #fde68a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const MobileMenuToggle = styled.div`
  display: none;
  cursor:hover { cursor: pointer; }
  @media (max-width: 768px) { display: block; }
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 40px;
  align-items: center;
  @media (max-width: 768px) {
    position: fixed;
    top: 0; left: 0;
    width: 300px;
    height: 100vh;
    background: white;
    flex-direction: column;
    padding: 100px 40px;
    box-shadow: 12px 0 40px rgba(0,0,0,0.25);
    z-index: 999;
  }
`;

const NavLink = styled.a`
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: 0; height: 3px;
    bottom: -8px; left: 0;
    background: ${colors.secondary};
    transition: width 0.4s ease;
  }
  &:hover:after { width: 100%; }
  @media (max-width: 768px) { color: ${colors.neutral}; }
`;

const CTA = styled(motion.button)`
  background: ${colors.secondary};
  color: white;
  border: none;
  padding: 14px 30px;
  border-radius: 16px;
  font-weight: 800;
  font-size: 1.05rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 30px rgba(249,115,22,0.3);
`;

const Hero = styled.section`
  height: 100vh;
  background: linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)),
    url(${heroImage}) center/cover no-repeat fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
`;

const HeroContent = styled(motion.div)`
  max-width: 1100px;
  padding: 0 20px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.8rem, 8vw, 5.2rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 24px;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.4rem;
  opacity: 0.95;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
`;

const SearchCard = styled(motion.div)`
  background: white;
  border-radius: 32px;
  padding: 48px;
  margin: -120px auto 80px;
  max-width: ;
  box-shadow: 0 40px 100px rgba(0,0,0,0.18);
  position: relative;
  z-index: 10;
  @media (max-width: 768px) {
    margin: -80px 20px 60px;
    padding: 36px 24px;
    max-width: 100%;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
  align-items: end;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 700;
  color: ${colors.neutral};
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledInput = styled.input`
  padding: 18px;
  border: 2px solid ${colors.primary};
  border-radius: 16px;
  font-size: 1.05rem;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 6px rgba(13,148,136,0.15);
  }
`;

const StyledSelect = styled.select`
  padding: 18px;
  border: 2px solid ${colors.primary};
  border-radius: 16px;
  font-size: 1.05rem;
  background: white;
`;

const SearchButton = styled(motion.button)`
  grid-column: 1 / -1;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.accent});
  color: white;
  border: none;
  padding: 20px;
  border-radius: 18px;
  font-size: 1.3rem;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 10px;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px 140px;
  background: linear-gradient(rgba(255,255,255,0.94), rgba(255,255,255,0.98)),
    url(${mecca});
  background-size: cover;
  background-attachment: fixed;
  border-radius: 32px;
  margin-top: -60px;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 2rem;
  font-weight: 900;
  color: ${colors.neutral};
  margin: 100px 0 80px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    width: 120px;
    height: 6px;
    background: ${colors.secondary};
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 4px;
  }
`;

const TestimonialCard = styled(motion.div)`
  background: ${colors.neutral};
  color: white;
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
`;

const Footer = styled.footer`
  background: ${colors.neutral};
  color: white;
  padding: 100px 20px 60px;
  margin-top: 120px;
`;

const FooterGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 50px;
  text-align: center;
`;

/* ==================== MAIN APP ==================== */
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(getSession());
  const navRef = useRef(null);

  const [from, setFrom] = useState('Lagos');
  const [month, setMonth] = useState('Ramadan 2026');
  const [duration, setDuration] = useState('10');
  const [travellers, setTravellers] = useState('1 Adult');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleBook = (pkg) => {
    if (!getSession()) setAuthOpen(true);
    else alert(`Booking: ${pkg.title}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = PACKAGES.filter(p => {
      const matchesQuery = !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
      const matchesDuration = !duration || p.durationDays.toString().includes(duration);
      return matchesQuery && matchesDuration;
    });
    setResults(filtered);
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => setUser(getSession()), []);

  useEffect(() => {
    const handler = (e) => {
      if (mobileOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  return (
    <>
      {/* Header */}
      <Header>
        <NavInner>
          <Logo initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
            Assembly Travels
          </Logo>

          <MobileMenuToggle onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={34} color="white" /> : <Menu size={34} color="white" />}
          </MobileMenuToggle>

          <AnimatePresence>
            {(mobileOpen || window.innerWidth > 768) && (
              <NavLinks ref={navRef} initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}>
                <NavLink href="#packages">Packages</NavLink>
                <NavLink href="#testimonials">Testimonials</NavLink>
                <NavLink href="#contact">Contact</NavLink>

                {!user ? (
                  <CTA whileHover={{ scale: 1.08 }} onClick={() => setAuthOpen(true)}>
                    <Phone size={20} /> Book a Call
                  </CTA>
                ) : (
                  <div style={{ display: 'flex', gap: 20, alignItems: 'center', color: 'white' }}>
                    <span style={{ fontWeight: 700 }}>Hi, {user.name}</span>
                    <CTA whileHover={{ scale: 1.05 }} onClick={() => { logout(); setUser(null); }}>
                      Logout
                    </CTA>
                  </div>
                )}
              </NavLinks>
            )}
          </AnimatePresence>
        </NavInner>
      </Header>

      {/* Hero */}
      <Hero>
        <HeroContent initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}>
          <HeroTitle>
            Your Sacred Journey to <br />
            <span style={{
              background: 'linear-gradient(90deg, #f97316, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Makkah & Madinah
            </span> Begins Here
          </HeroTitle>
          <HeroSubtitle>Ministry-Approved • Nigerian Guides • Pay in Naira • Full Support</HeroSubtitle>

          <CTA as="a" href="#packages" style={{ padding: '18px 40px', fontSize: '1.3rem' }}>
            Explore Packages <ArrowRight size={24} />
          </CTA>
        </HeroContent>

        <ScrollIndicator animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown size={48} color="white" />
        </ScrollIndicator>
      </Hero>

      <Container>
        <SearchCard>
          <form onSubmit={handleSearch}>
            <Grid>
              <InputGroup>
                <Label><MapPin size={18} /> From</Label>
                <StyledSelect value={from} onChange={e => setFrom(e.target.value)}>
                  <option>Lagos</option>
                  <option>Abuja</option>
                  <option>Kano</option>
                  <option>Port Harcourt</option>
                </StyledSelect>
              </InputGroup>

              <InputGroup>
                <Label><Calendar size={18} /> Month</Label>
                <StyledSelect value={month} onChange={e => setMonth(e.target.value)}>
                  <option>Ramadan 2026</option>
                  <option>Hajj 2026</option>
                  <option>December 2025</option>
                </StyledSelect>
              </InputGroup>

              <InputGroup>
                <Label><Calendar size={18} /> Duration</Label>
                <StyledSelect value={duration} onChange={e => setDuration(e.target.value)}>
                  <option value="7">7 Days</option>
                  <option value="10">10 Days</option>
                  <option value="14">14 Days</option>
                  <option value="20">20+ Days</option>
                </StyledSelect>
              </InputGroup>

              <InputGroup>
                <Label><Users size={18} /> Travellers</Label>
                <StyledSelect value={travellers} onChange={e => setTravellers(e.target.value)}>
                  <option>1 Adult</option>
                  <option>Couple</option>
                  <option>Family</option>
                </StyledSelect>
              </InputGroup>

              <div style={{ gridColumn: '1 / -1' }}>
                <Label><Search size={18} /> Search</Label>
                <StyledInput
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="e.g. VIP, 5-star, Madinah first..."
                />
                <SearchButton type="submit">
                  <Search size={26} />
                  Find My Package
                </SearchButton>
              </div>
            </Grid>
          </form>
        </SearchCard>

        {/* Search Results */}
        {results.length > 0 && (
          <section id="results" style={{ marginBottom: 100 }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: colors.neutral }}>
              {results.length} Package{results.length > 1 ? 's' : ''} Found
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '40px',
              marginTop: '40px',
            }}>
              {results.map(pkg => (
                <motion.div key={pkg.id} whileHover={{ y: -12 }}>
                  <PackageCard p={pkg} onBook={() => handleBook(pkg)} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Packages */}
        <section id="packages">
          <SectionTitle>Featured Umrah & Hajj Packages</SectionTitle>
          <Slider {...featuredSliderSettings}>
            {PACKAGES.map(pkg => (
              <div key={pkg.id} style={{ padding: '0 15px' }}>
                <motion.div whileHover={{ y: -16 }}>
                  <PackageCard p={pkg} onBook={() => handleBook(pkg)} />
                </motion.div>
              </div>
            ))}
          </Slider>
        </section>

        {/* Testimonials */}
        <section style={{ marginTop: 140 }}>
          <SectionTitle>What Our Pilgrims Say</SectionTitle>
          <Slider {...testimonialSliderSettings}>
            {[
              { name: "Hajiya Fatima", text: "The best Umrah experience of my life.", rating: 5 },
              { name: "Alhaji Yusuf", text: "Professional and caring team.", rating: 5 },
              { name: "Sister Aisha", text: "Seamless from start to finish.", rating: 5 },
              { name: "Brother Musa", text: "5-star hotels, worth every kobo.", rating: 5 },
            ].map((t, i) => (
              <div key={i} style={{ padding: '0 20px' }}>
                <TestimonialCard>
                  <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={22} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </div>
                  <p style={{ fontSize: '1.2rem', lineHeight: 1.6, opacity: .95 }}>"{t.text}"</p>
                  <p style={{ marginTop: 'auto', fontWeight: 800, fontSize: '1.3rem' }}>— {t.name}</p>
                </TestimonialCard>
              </div>
            ))}
          </Slider>
        </section>
      </Container>

      {/* Footer */}
      <Footer>
        <FooterGrid>
          <div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900 }}>Assembly Travels & Tours Ltd</h3>
            <p>Licensed • IATA • Ministry Approved</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>+234 802 303 2496<br />+234 913 895 6599<br />assemblytravels@yahoo.com</p>
          </div>
          <div>
            <h4>Office</h4>
            <p>Suit 337, Ikeja Plaza<br />Mobolaji Bank Anthony Way<br />Ikeja, Lagos</p>
          </div>
        </FooterGrid>
        <div style={{ textAlign: 'center', marginTop: 60, opacity: .7 }}>
          © {new Date().getFullYear()} Assembly Travels. All rights reserved.
        </div>
      </Footer>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuth={setUser} />
    </>
  );
}