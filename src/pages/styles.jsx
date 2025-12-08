// src/styles.js
import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
`;

// ==================== HEADER & NAVBAR ====================
export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.scrolled ? "rgba(255,255,255,0.98)" : "transparent"};
  backdrop-filter: blur(12px);
  transition: all 0.4s ease;
  padding: 18px 0;

  @media (max-width: 480px) {
    padding: 14px 0;
  }
`;

export const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 640px) {
    padding: 0 16px;
  }
`;

export const Logo = styled.h1`
  font-size: clamp(22px, 5vw, 30px);
  font-weight: 800;
  background: linear-gradient(90deg, #0d9488, #14b8a6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  z-index: 10;
`;

export const DesktopMenu = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(20px, 3vw, 40px);

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const NavLink = styled.a`
  color: ${props => props.scrolled ? "#1e293b" : "white"};
  font-weight: 600;
  font-size: clamp(14px, 2vw, 16px);
  text-decoration: none;
  transition: color 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: #14b8a6;
  }
`;

export const CTAButton = styled.a`
  background: ${props => props.primary ? "#14b8a6" : "transparent"};
  color: white;
  border: 2px solid ${props => props.primary ? "transparent" : "white"};
  padding: clamp(10px, 2vw, 14px) clamp(20px, 3vw, 32px);
  border-radius: 50px;
  font-weight: 700;
  font-size: clamp(14px, 2vw, 16px);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.primary ? "#0d9488" : "rgba(255,255,255,0.2)"};
    transform: translateY(-3px);
  }
`;

// Mobile Menu
export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.scrolled ? "#1e293b" : "white"};
  cursor: pointer;
  z-index: 1001;
  padding: 8px;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const MobileMenuOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  z-index: 999;
  opacity: ${props => props.open ? 1 : 0};
  visibility: ${props => props.open ? "visible" : "hidden"};
  transition: all 0.4s ease;
`;

export const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 340px;
  height: 100vh;
  background: white;
  z-index: 1000;
  padding: 100px 30px 40px;
  transform: ${props => props.open ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: -15px 0 40px rgba(0, 0, 0, 0.3);
  overflow-y: auto;

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 90px 20px 40px;
  }
`;

export const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const MobileNavLink = styled.a`
  color: #1e293b;
  font-size: 22px;
  font-weight: 600;
  text-decoration: none;
  padding: 18px 0;
  border-bottom: 1px solid #e2e8f0;
  transition: color 0.3s;

  &:hover {
    color: #14b8a6;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    padding: 16px 0;
  }
`;

// ==================== HERO ====================
export const Hero = styled.section`
  height: 100vh;
  min-height: 620px;
  background: linear-gradient(rgba(0,0,0,0.68), rgba(0,0,0,0.78)),
              url('https://images.unsplash.com/photo-1586149933725-6a9c2d4c894c?w=2000&q=90') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;
`;

export const HeroContent = styled.div`
  max-width: 1000px;
  padding: 0 24px;
  animation: ${fadeInUp} 1.4s ease-out;
  z-index: 2;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(36px, 8vw, 64px);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 20px;
`;

export const HeroSubtitle = styled.p`
  font-size: clamp(18px, 4vw, 26px);
  opacity: 0.95;
  margin-bottom: 40px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${float} 3s ease-in-out infinite;
  color: white;
  opacity: 0.8;

  @media (max-width: 640px) {
    bottom: 20px;
  }
`;

// ==================== SEARCH CARD ====================
export const SearchSection = styled.section`
  margin-top: -100px;
  padding: 0 16px;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    margin-top: -70px;
  }

  @media (max-width: 480px) {
    margin-top: -50px;
    padding: 0 8px;
  }
`;

export const SearchCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: clamp(24px, 5vw, 48px) clamp(20px, 4vw, 40px);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.18);
  max-width: 1200px;
  margin: 0 auto;
`;

export const SearchForm = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: clamp(16px, 2vw, 24px);
  align-items: end;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
  font-size: clamp(14px, 2vw, 15px);
`;

export const Select = styled.select`
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #14b8a6;
    box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.15);
  }
`;

export const Input = styled.input`
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #14b8a6;
    box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.15);
  }
`;

export const SearchButton = styled.button`
  background: linear-gradient(135deg, #14b8a6, #0d9488);
  color: white;
  border: none;
  padding: 18px 20px;
  border-radius: 12px;
  font-size: clamp(16px, 2.5vw, 18px);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  height: 58px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 35px rgba(20, 184, 166, 0.4);
  }
`;

// ==================== PACKAGES ====================
export const PackagesSection = styled.section`
  padding: clamp(100px, 15vw, 160px) 20px clamp(80px, 10vw, 120px);
  background: #f8fafc;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: clamp(32px, 7vw, 48px);
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 20px;
`;

export const SectionSubtitle = styled.p`
  text-align: center;
  font-size: clamp(17px, 3vw, 20px);
  color: #64748b;
  max-width: 800px;
  margin: 0 auto 70px;
`;

export const PackagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(24px, 4vw, 48px);
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const PackageCard = styled.div`
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  position: relative;

  &:hover {
    transform: translateY(-16px);
    box-shadow: 0 30px 70px rgba(0, 0, 0, 0.2);
  }
`;

export const PopularBadge = styled.div`
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  background: #f59e0b;
  color: white;
  padding: 10px 28px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 14px;
  z-index: 10;
  white-space: nowrap;
`;

export const PackageImage = styled.div`
  height: 220px;
  background: linear-gradient(45deg, #0d9488, #14b8a6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: clamp(22px, 4vw, 28px);
  font-weight: 700;
`;

export const PackageContent = styled.div`
  padding: clamp(24px, 5vw, 36px);
`;

export const PackageTitle = styled.h3`
  font-size: clamp(20px, 4vw, 26px);
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
`;

export const PackagePrice = styled.div`
  font-size: clamp(30px, 6vw, 40px);
  font-weight: 800;
  color: #14b8a6;
  margin-bottom: 24px;
`;

export const PackageFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
`;

export const FeatureItem = styled.li`
  padding: 12px 0;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 16px;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`;

export const BookButton = styled.button`
  width: 100%;
  background: ${props => props.primary ? "#14b8a6" : "#1e293b"};
  color: white;
  border: none;
  padding: 18px;
  border-radius: 12px;
  font-size: clamp(16px, 2.5vw, 18px);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: ${props => props.primary ? "#0d9488" : "#111"};
  }
`;

// ==================== SERVICES & TESTIMONIALS & FOOTER ====================
export const ServicesSection = styled.section`
  padding: clamp(100px, 15vw, 140px) 20px;
  background: white;
`;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: clamp(32px, 5vw, 60px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const ServiceCard = styled.div`
  text-align: center;
`;

export const ServiceIcon = styled.div`
  width: 100px;
  height: 100px;
  background: #ecfdf5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 28px;
  color: #14b8a6;
`;

export const ServiceName = styled.h3`
  font-size: clamp(20px, 4vw, 24px);
  font-weight: 700;
  margin-bottom: 16px;
  color: #1e293b;
`;

export const ServiceDesc = styled.p`
  color: #64748b;
  line-height: 1.7;
  font-size: clamp(15px, 2.5vw, 16px);
`;

export const TestimonialsSection = styled.section`
  padding: clamp(100px, 15vw, 160px) 20px;
  background: linear-gradient(135deg, #0f766e, #14b8a6);
`;

export const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(24px, 4vw, 48px);
  max-width: 1200px;
  margin: 70px auto 0;
  padding: 0 16px;
`;

export const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  padding: clamp(24px, 5vw, 44px);
  border-radius: 24px;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const Stars = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 20px;
`;

export const TestimonialText = styled.p`
  font-size: clamp(16px, 3vw, 19px);
  line-height: 1.8;
  margin-bottom: 24px;
  font-style: italic;
`;

export const TestimonialAuthor = styled.p`
  font-weight: 700;
  font-size: clamp(16px, 3vw, 18px);
`;

export const Footer = styled.footer`
  background: #0f172a;
  color: white;
  padding: clamp(80px, 12vw, 120px) 20px 40px;
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: clamp(32px, 5vw, 60px);
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
`;

export const FooterColumn = styled.div``;

export const FooterTitle = styled.h3`
  font-size: clamp(20px, 4vw, 24px);
  font-weight: 700;
  margin-bottom: 28px;
  color: #14b8a6;
`;

export const FooterText = styled.p`
  color: #94a3b8;
  line-height: 1.9;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(14px, 2.5vw, 15px);
`;

export const FooterLink = styled.a`
  color: #94a3b8;
  text-decoration: none;
  display: block;
  margin-bottom: 14px;
  font-size: clamp(14px, 2.5vw, 15px);
  transition: color 0.3s;

  &:hover {
    color: white;
  }
`;

export const Copyright = styled.div`
  text-align: center;
  padding-top: 60px;
  margin-top: 80px;
  border-top: 1px solid #334155;
  color: #64748b;
  font-size: clamp(13px, 2vw, 15px);
`;