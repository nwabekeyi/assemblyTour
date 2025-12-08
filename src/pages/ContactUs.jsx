import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Color Variables
const colors = {
  primary: "#1B4B59",
  secondary: "#2E8B57",
  accent: "#FFD700",
  white: "#FFFFFF",
  lightGray: "#F8F9FA",
  darkGray: "#666666",
  green: "#28A745",
  orange: "#FF6B35",
  lightBlue: "#E3F2FD",
};

// Main Container
const Container = styled.div`
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: ${colors.darkGray};
  min-height: 100vh;
  background: ${colors.lightGray};
`;

// Header
const Header = styled.header`
  background: ${colors.white};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 16px 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  color: ${colors.primary};
  letter-spacing: -0.5px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 24px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: ${colors.darkGray};
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.primary};
  }
`;

// Hero Section
const HeroSection = styled.section`
  background: linear-gradient(
    135deg,
    ${colors.primary} 0%,
    ${colors.secondary} 100%
  );
  color: ${colors.white};
  padding: 80px 24px;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  animation: ${fadeIn} 1s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Main Content
const MainContent = styled.main`
  max-width: 1200px;
  margin: -40px auto 0;
  padding: 0 24px 80px;
  position: relative;
  z-index: 2;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

// Contact Options Section
const ContactOptions = styled.div`
  display: grid;
  gap: 24px;
`;

const OptionCard = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  padding: 32px 28px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const OptionIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${colors.lightBlue};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: ${colors.primary};
  margin-bottom: 20px;
`;

const OptionTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${colors.primary};
  margin-bottom: 12px;
`;

const OptionDescription = styled.p`
  color: ${colors.darkGray};
  line-height: 1.6;
  margin-bottom: 20px;
`;

const OptionButton = styled.button`
  background: ${colors.primary};
  color: ${colors.white};
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0f3a47;
  }
`;

// Contact Form
const FormCard = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  padding: 40px 32px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${colors.primary};
  margin-bottom: 8px;
`;

const FormSubtitle = styled.p`
  color: ${colors.darkGray};
  margin-bottom: 32px;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
  color: ${colors.primary};
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Select = styled.select`
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: ${colors.white};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 14px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = styled.button`
  background: ${colors.green};
  color: ${colors.white};
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 8px;

  &:hover {
    background: #218838;
  }
`;

// Contact Info Section
const ContactInfoSection = styled.section`
  background: ${colors.white};
  padding: 60px 24px;
  margin-top: 60px;
`;

const ContactInfoContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
`;

const InfoCard = styled.div`
  text-align: center;
  padding: 32px 20px;
`;

const InfoIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${colors.lightBlue};
  border-radius: 50%;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${colors.primary};
`;

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${colors.primary};
  margin-bottom: 12px;
`;

const InfoText = styled.p`
  color: ${colors.darkGray};
  line-height: 1.6;
`;

// Footer
const Footer = styled.footer`
  background: ${colors.primary};
  color: ${colors.white};
  padding: 40px 24px 24px;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export default function ContactUsPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo>ALA HAZRAT TOURS AND TRAVELS</Logo>
          <Nav>
            <Link to="/">Home</Link>
            <Link to="/#packages">Packages</Link>
            <Link to="/#services">Services</Link>
            <Link to="/contact">Contact</Link>
          </Nav>
        </HeaderContent>
      </Header>

      <HeroSection>
        <HeroContent>
          <HeroTitle>Contact Us</HeroTitle>
          <HeroSubtitle>
            Any question or remarks? Just write us a message!
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <MainContent>
        <ContentGrid>
          <ContactOptions>
            <OptionCard>
              <OptionIcon>💬</OptionIcon>
              <OptionTitle>Chat with us</OptionTitle>
              <OptionDescription>
                Get package information, next group departures and live chat
                with our team.
              </OptionDescription>
              <OptionButton>Start Chat</OptionButton>
            </OptionCard>

            <OptionCard>
              <OptionIcon>📝</OptionIcon>
              <OptionTitle>Leave us some feedback</OptionTitle>
              <OptionDescription>
                Good or bad, we love to hear all feedback from our valued
                customers.
              </OptionDescription>
              <OptionButton>Give Feedback</OptionButton>
            </OptionCard>

            <OptionCard>
              <OptionIcon>💼</OptionIcon>
              <OptionTitle>Looking for job?</OptionTitle>
              <OptionDescription>
                We're Hiring! Join Our Team at ALA HAZRAT TOURS Sales Group.
              </OptionDescription>
              <OptionButton>View Jobs</OptionButton>
            </OptionCard>
          </ContactOptions>

          <FormCard>
            <FormTitle>Contact Us</FormTitle>
            <FormSubtitle>
              Give us some info so the right person will contact you.
            </FormSubtitle>

            <ContactForm onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label>First Name *</Label>
                  <Input
                    type="text"
                    placeholder="Enter your first name"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Last Name *</Label>
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>Email Address *</Label>
                  <Input type="email" placeholder="Enter your email" required />
                </FormGroup>
                <FormGroup>
                  <Label>Phone Number *</Label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>Subject *</Label>
                <Select required>
                  <option value="">Select a subject</option>
                  <option value="umrah">Umrah Package Inquiry</option>
                  <option value="hajj">Hajj Package Inquiry</option>
                  <option value="visa">Visa Services</option>
                  <option value="booking">Booking Support</option>
                  <option value="other">Other</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Message *</Label>
                <TextArea placeholder="Write your message here..." required />
              </FormGroup>

              <SubmitButton type="submit">Send Message</SubmitButton>
            </ContactForm>
          </FormCard>
        </ContentGrid>
      </MainContent>

      <ContactInfoSection>
        <ContactInfoContent>
          <InfoCard>
            <InfoIcon>📧</InfoIcon>
            <InfoTitle>Email Us</InfoTitle>
            <InfoText>
              info@alahazrattours.com
              <br />
              booking@alahazrattours.com
            </InfoText>
          </InfoCard>

          <InfoCard>
            <InfoIcon>📞</InfoIcon>
            <InfoTitle>Call Us</InfoTitle>
            <InfoText>
              +91 9876543210
              <br />
              +91 9876543211
            </InfoText>
          </InfoCard>

          <InfoCard>
            <InfoIcon>📍</InfoIcon>
            <InfoTitle>Visit Us</InfoTitle>
            <InfoText>
              123 Main Street
              <br />
              Bareilly, Uttar Pradesh 243001
              <br />
              India
            </InfoText>
          </InfoCard>

          <InfoCard>
            <InfoIcon>🕒</InfoIcon>
            <InfoTitle>Office Hours</InfoTitle>
            <InfoText>
              Monday - Saturday: 9:00 AM - 7:00 PM
              <br />
              Sunday: 10:00 AM - 5:00 PM
            </InfoText>
          </InfoCard>
        </ContactInfoContent>
      </ContactInfoSection>

      <Footer>
        <FooterContent>
          <p>&copy; 2025 ALA HAZRAT TOURS AND TRAVELS. All rights reserved.</p>
        </FooterContent>
      </Footer>
    </Container>
  );
}
