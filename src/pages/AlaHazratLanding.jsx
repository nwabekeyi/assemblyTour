import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  Phone, ChevronDown, Menu, X, MapPin, Calendar, Users, Search, Star, ArrowRight,
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
  centerMode: true,
  centerPadding: '40px',
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: '30px' } },
    { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: '20px' } },
  ],
};

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
  centerPadding: '60px',
  responsive: [
    { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: '20px' } },
  ],
};

/* ==================== COLORS ==================== */
const colors = {
  primary: '#0d9488',
  secondary: '#f97316',
  accent: '#14b8a6',
  neutral: '#0f172a',
  white: '#ffffff'
};

/* ==================== STYLED COMPONENTS ==================== */
const Header = styled.header`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  background: rgba(13, 148, 136, 0.98);
  backdrop-filter: blur(12px);
  padding: 10px 20px;
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
  font-size: clamp(1.6rem, 4.5vw, 2.4rem);
`;

const MobileMenuToggle = styled.div`
  display: none;
  cursor: pointer;
  @media (max-width: 768px) { display: block; }
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 40px;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0; left: 0;
    width: 70vw;
    max-width: 340px;
    height: 100vh;
    background: white;
    flex-direction: column;
    padding: 100px 0;
    box-shadow: 12px 0 40px rgba(0,0,0,0.25);
    z-index: 999;
    overflow-y: auto;
    justify-content: flex-start;
    gap: 28px;
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
  @media (max-width: 768px) { 
    color: ${colors.neutral};
    font-size: 1.2rem;
  }
`;

const CTA = styled(motion.button)`
  background: ${colors.secondary};
  color: white;
  border: none;
  padding: 12px 26px;
  border-radius: 16px;
  font-weight: 800;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 30px rgba(249, 115, 22, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  /* Hover Effect */
  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 20px 40px rgba(249, 115, 22, 0.5);
    background: ${colors.secondary};
    filter: brightness(1.1);
    color: white;
  }

  /* Optional: subtle shine effect on hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.6s;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: 768px) {
    padding: 14px 30px;
    font-size: 0.8rem;
    width: 60%;
    justify-content: center;
    align-self: center;
  }
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
  max-width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.4rem, 7vw, 4.8rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 20px;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.15rem;
  opacity: 0.95;
  margin-bottom: 36px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 47vw;
  transform: translateX(-50%);
`;

/* ==================== MAIN CONTAINER ==================== */
const Container = styled.div`
  max-width: 95%;
  max-width: 1400px;
  margin: 0 auto;
  background: linear-gradient(rgba(255,255,255,0.94), rgba(255,255,255,0.98)),
    url(${mecca}) center/cover fixed;
  border-radius: 32px;
  padding: 5% 20px;
  margin-top: -8%;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    border-radius: 32px;
      padding: 15% 25px;
  }

`;

/* ==================== SEARCH CARD ==================== */
const SearchCon = styled(motion.div)`
  @media (max-width: 768px) {
   
  }

    @media (max-width: 480px) {

  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  align-items: end;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 420px;
    margin: 0 auto;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 0.95rem;
  color: ${colors.neutral};
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 2px solid ${colors.primary};
  border-radius: 16px;
  font-size: 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 14px;
    font-size: 0.95rem;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 6px rgba(13,148,136,0.15);
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 16px;
  border: 2px solid ${colors.primary};
  border-radius: 16px;
  font-size: 1rem;
  background: white;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 14px;
    font-size: 0.95rem;
  }
`;

const SearchButton = styled(motion.button)`
  grid-column: 1 / -1;
  width: 100%;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.accent});
  color: white;
  border: none;
  padding: 18px;
  border-radius: 18px;
  font-size: 1.15rem;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 16px;
  }
`;

/* ==================== REST OF STYLES ==================== */
const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: 1.9rem;
  font-weight: 900;
  color: ${colors.neutral};
  position: relative;

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }

  &:after {
    content: '';
    position: absolute;
    width: 100px;
    height: 5px;
    background: ${colors.secondary};
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 4px;
  }
`;

const SliderWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 10px;

  .slick-slide > div { padding: 0 15px; }
  .slick-list { margin: 0 -15px; }
`;

const TestimonialCard = styled(motion.div)`
  background: ${colors.neutral};
  color: white;
  padding: 32px;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);

  @media (max-width: 768px) {
    padding: 20px;
    height: 170px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Footer = styled.footer`
  background: ${colors.neutral};
  color: white;
  padding: 70px 20px;
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
            {mobileOpen ? <X size={32} color="white" /> : <Menu size={32} color="white" />}
          </MobileMenuToggle>

          <AnimatePresence>
            {(mobileOpen || window.innerWidth > 768) && (
              <NavLinks
                ref={navRef}
                initial={{ x: -400 }}
                animate={{ x: 0 }}
                exit={{ x: -400 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <NavLink href="#packages">Packages</NavLink>
                <NavLink href="#testimonials">Testimonials</NavLink>
                <NavLink href="#contact">Contact</NavLink>

                {!user ? (
                  <CTA whileHover={{ scale: 1.08 }} onClick={() => setAuthOpen(true)}>
                    <Phone size={18} /> Book a Call
                  </CTA>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', color: colors.neutral }}>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Hi, {user.name}</span>
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

          <CTA as="a" href="#packages">
            Explore Packages <ArrowRight size={22} />
          </CTA>
        </HeroContent>

        <ScrollIndicator animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown size={44} color="white" />
        </ScrollIndicator>
      </Hero>

      {/* MAIN CONTENT */}
      <Container>
        <SearchCon
        >
          <form onSubmit={handleSearch}>
            <Grid>
              <InputGroup>
                <Label><MapPin size={17} /> From</Label>
                <StyledSelect value={from} onChange={e => setFrom(e.target.value)}>
                  <option>Lagos</option>
                  <option>Abuja</option>
                  <option>Kano</option>
                  <option>Port Harcourt</option>
                </StyledSelect>
              </InputGroup>

              <InputGroup>
                <Label><Calendar size={17} /> Month</Label>
                <StyledSelect value={month} onChange={e => setMonth(e.target.value)}>
                  <option>Ramadan 2026</option>
                  <option>Hajj 2026</option>
                  <option>December 2025</option>
                </StyledSelect>
              </InputGroup>

              <InputGroup>
                <Label><Calendar size={17} /> Duration</Label>
                <StyledSelect value={duration} onChange={e => setDuration(e.target.value)}>
                  <option value="7">7 Days</option>
                  <option value="10">10 Days</option>
                  <option value="14">14 Days</option>
                  <option value="20">20+ Days</option>
                </StyledSelect>
              </InputGroup>

              <InputGroup>
                <Label><Users size={17} /> Travellers</Label>
                <StyledSelect value={travellers} onChange={e => setTravellers(e.target.value)}>
                  <option>1 Adult</option>
                  <option>Couple</option>
                  <option>Family</option>
                </StyledSelect>
              </InputGroup>

              <div style={{ gridColumn: '1 / -1' }}>
                <Label><Search size={17} /> Search Package</Label>
                <StyledInput
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="e.g. VIP, 5-star, Madinah first..."
                />
                <SearchButton type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Search size={24} />
                  Find My Package
                </SearchButton>
              </div>
            </Grid>
          </form>
        </SearchCon>

        {/* Results */}
        {results.length > 0 && (
          <section id="results" style={{ marginBottom: 100 }}>
            <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: colors.neutral, fontWeight: 900 }}>
              {results.length} Package{results.length > 1 ? 's' : ''} Found
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '40px',
              marginTop: '40px',
              justifyContent: 'center',
            }}>
              {results.map(pkg => (
                <motion.div key={pkg.id} whileHover={{ y: -12 }}>
                  <PackageCard p={pkg} onBook={() => handleBook(pkg)} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        Featured Packages
        <section id="packages">
          <SectionTitle>Featured Umrah & Hajj Packages</SectionTitle>
          <SliderWrapper>
            <Slider {...featuredSliderSettings}>
              {PACKAGES.map(pkg => (
                <div key={pkg.id}>
                  <motion.div whileHover={{ y: -16 }}>
                    <PackageCard p={pkg} onBook={() => handleBook(pkg)} />
                  </motion.div>
                </div>
              ))}
            </Slider>
          </SliderWrapper>
        </section>

        {/* Testimonials */}
        <section style={{ marginTop: 140}}>
          <SectionTitle>What Our Pilgrims Say</SectionTitle>
          <SliderWrapper>
            <Slider {...testimonialSliderSettings}>
              {[
                { name: "Hajiya Fatima", text: "The best Umrah experience of my life.", rating: 5 },
                { name: "Alhaji Yusuf", text: "Professional and caring team.", rating: 5 },
                { name: "Sister Aisha", text: "Seamless from start to finish.", rating: 5 },
                { name: "Brother Musa", text: "5-star hotels, worth every kobo.", rating: 5 },
              ].map((t, i) => (
                <div key={i}>
                  <TestimonialCard>
                    <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={20} fill="#fbbf24" color="#fbbf24" />
                      ))}
                    </div>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.6, opacity: .95, margin: 0 }}>"{t.text}"</p>
                    <p style={{ marginTop: 'auto', fontWeight: 800, fontSize: '1rem' }}>— {t.name}</p>
                  </TestimonialCard>
                </div>
              ))}
            </Slider>
          </SliderWrapper>
        </section>
      </Container>

      {/* Footer */}
      <Footer>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', textAlign: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Assembly Travels & Tours Ltd</h3>
            <p>Licensed • IATA • Ministry Approved</p>
          </div>
          <div>
            <h4 style={{ fontSize: '1.3rem' }}>Contact</h4>
            <p>+234 802 303 2496<br />+234 913 895 6599<br />assemblytravels@yahoo.com</p>
          </div>
          <div>
            <h4 style={{ fontSize: '1.3rem' }}>Office</h4>
            <p>Suit 337, Ikeja Plaza<br />Mobolaji Bank Anthony Way<br />Ikeja, Lagos</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 60, opacity: .7, fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} Assembly Travels. All rights reserved.
        </div>
      </Footer>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onAuth={setUser} />
    </>
  );
}