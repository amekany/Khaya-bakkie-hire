import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileUpload } from "@/components/ui/file-upload";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  MessageCircle, 
  Smartphone, 
  Key, 
  Handshake,
  Shield,
  MapPin,
  Wrench,
  Clock,
  DollarSign,
  Users,
  Star
} from "lucide-react";
import logoImage from "@assets/IMG-20250718-WA0000_1752958823169.jpg";
import bakkieImage from "@assets/IMG-20250719-WA0005_1752958823201.jpg";

interface UploadResponse {
  id: number;
  filename: string;
  originalName: string;
  url: string;
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight; // Hero section is full height
      setIsScrolled(scrollPosition > heroHeight - 100); // Trigger slightly before leaving hero
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappNumber = "+27123456789";
  const bookingMessage = "Hi, I'd like to book a bakkie";
  const quoteMessage = "Hi, I'd like to get a quote for bakkie rental";
  const quickBookMessage = "Hi Khaya, I'd like to book a bakkie. My details:\n\nName: \nDate needed: \nDuration: \nPurpose: \n\nPlease let me know availability and total cost. Thanks!";

  const createWhatsAppLink = (message: string) => {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className={`fixed w-full backdrop-blur-sm z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 border-b border-gray-100' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className={`text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              Khaya's Bakkie Hire
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#how-it-works" className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'
              }`}>How It Works</a>
              <a href="#why-choose-us" className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'
              }`}>Why Choose Us</a>
              <a href="#contact" className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'
              }`}>Contact</a>
            </div>
            <Button 
              asChild 
              className="bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-2 rounded-full transition-all hover:shadow-lg hover:scale-105"
            >
              <a href={createWhatsAppLink(bookingMessage)} target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${bakkieImage})` 
          }}
        />
        
        <div className="relative text-center max-w-4xl mx-auto px-4 text-white">
          <h1 className="text-5xl md:text-7xl font-light mb-6 animate-fade-in">
            Affordable, Local Bakkie Hire in Butterworth
          </h1>
          <p className="text-xl md:text-2xl font-light mb-12 text-gray-200">
            Fast, simple, reliable bookings via WhatsApp
          </p>
          <Button 
            asChild 
            size="lg"
            className="bg-[#25D366] hover:bg-[#20b858] text-white px-12 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-xl hover:scale-105"
          >
            <a href={createWhatsAppLink(bookingMessage)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
              <MessageCircle className="mr-3 h-6 w-6" />
              Book Now on WhatsApp
            </a>
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get on the road in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Book</h3>
              <p className="text-gray-600 leading-relaxed">
                Send us a WhatsApp message with your dates and requirements. We'll confirm availability instantly.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
                <Key className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Drive</h3>
              <p className="text-gray-600 leading-relaxed">
                Pick up your clean, well-maintained bakkie and enjoy reliable transport for your needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
                <Handshake className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Return</h3>
              <p className="text-gray-600 leading-relaxed">
                Return the bakkie at the agreed time and location. Simple, hassle-free experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Local service you can trust
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Fully Insured</h3>
                <p className="text-gray-600">
                  Complete insurance coverage for your peace of mind during every rental.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Knowledge</h3>
                <p className="text-gray-600">
                  Born and raised in Butterworth, we know the area and serve our community.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                  <Wrench className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Well Maintained</h3>
                <p className="text-gray-600">
                  Regular servicing and maintenance ensure reliable, safe transport every time.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">24/7 Support</h3>
                <p className="text-gray-600">
                  Available around the clock for emergencies and customer support.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Fair Pricing</h3>
                <p className="text-gray-600">
                  Competitive rates with no hidden fees. What you see is what you pay.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Service</h3>
                <p className="text-gray-600">
                  Family-owned business providing personalized, friendly service to every customer.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from real people
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="font-semibold text-gray-900 text-lg">Nkosana Mthembu</div>
                  <div className="text-sm text-gray-600">Local Business Owner</div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  "Excellent service! Khaya was professional and the bakkie was exactly what I needed for my deliveries. Will definitely use again."
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="font-semibold text-gray-900 text-lg">Nomsa Gqoba</div>
                  <div className="text-sm text-gray-600">Student</div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  "Perfect for my move to university! Great rates for students and Khaya was so helpful with everything. Highly recommended!"
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-0">
                <div className="mb-6">
                  <div className="font-semibold text-gray-900 text-lg">Luyolo Nkomo</div>
                  <div className="text-sm text-gray-600">Contractor</div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  "Reliable transport for all my construction jobs. The bakkie is always clean and runs perfectly. Great local service!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Ready to Book?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get in touch via WhatsApp or give us a call
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center mr-4">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">WhatsApp</div>
                      <div className="text-gray-600">+27 123 456 789</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mr-4">
                      <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Phone</div>
                      <div className="text-gray-600">+27 123 456 789</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Location</div>
                      <div className="text-gray-600">Butterworth, Eastern Cape</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="p-8 rounded-3xl shadow-xl">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Quick Booking</h3>
                  <p className="text-gray-600 mb-8">
                    Send us a message with your rental dates and we'll get back to you immediately.
                  </p>
                  
                  <Button 
                    asChild 
                    className="w-full bg-[#25D366] hover:bg-[#20b858] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:shadow-xl hover:scale-105"
                  >
                    <a href={createWhatsAppLink(quickBookMessage)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center">
                      <MessageCircle className="mr-3 h-6 w-6" />
                      Message on WhatsApp
                    </a>
                  </Button>
                  
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Usually responds within minutes
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6">
              <img 
                src={logoImage} 
                alt="Khaya's Bakkie Hire Logo" 
                className="w-full h-full object-contain rounded-2xl"
              />
            </div>
            
            <p className="text-gray-600 mb-4">
              Reliable bakkie hire service in Butterworth, Eastern Cape
            </p>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a 
                href={createWhatsAppLink(bookingMessage)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#25D366] hover:text-[#20b858] transition-colors"
              >
                <MessageCircle className="h-8 w-8" />
              </a>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>&copy; 2024 Khaya's Bakkie Hire. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
