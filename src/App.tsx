import React, { useState } from 'react';
import {
  GraduationCap,
  Globe2,
  Users,
  Building2,
  CheckCircle,
  Send,
  BookOpen,
  BriefcaseIcon,
  PhoneCall,
  Mail,
  User
} from 'lucide-react';
import { supabase } from './lib/supabase';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    highSchool: '',
    university: '',
    fieldOfWork: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // First, sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: Math.random().toString(36).slice(-8), // Generate a random password
      });

      if (authError) throw authError;

      if (!authData.user) throw new Error('No user data returned after signup');

      // Then, insert the application data
      const { error: insertError } = await supabase
        .from('applications')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            high_school: formData.highSchool,
            university: formData.university || null,
            field_of_work: formData.fieldOfWork,
            user_id: authData.user.id
          }
        ]);

      if (insertError) throw insertError;

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        highSchool: '',
        university: '',
        fieldOfWork: ''
      });

      alert('Thank you for your application! We will contact you soon.');
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitError('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-[600px]" 
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-6">Youth Advocacy Africa</h1>
            <p className="text-xl mb-8 max-w-2xl">
              Empowering African students to pursue international education and career opportunities through strategic partnerships.
            </p>
            <a href="#apply" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300">
              Apply Now
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose Youth Advocacy Africa?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <GraduationCap className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Education</h3>
              <p className="text-gray-600">Access to top-tier educational institutions worldwide</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Globe2 className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Network</h3>
              <p className="text-gray-600">Partnerships with institutions across multiple countries</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Career Support</h3>
              <p className="text-gray-600">Comprehensive guidance and placement assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Our Partners</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Building2 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Universities</h3>
              <p className="text-gray-600">Partnerships with leading universities in Europe, North America, and Asia</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <BriefcaseIcon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Companies</h3>
              <p className="text-gray-600">Connections with multinational corporations for internships and job placements</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Government Programs</h3>
              <p className="text-gray-600">Access to government-sponsored scholarship and exchange programs</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section - Integrated Web Copy */}
      <div className="py-20 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Discover Youth Advocacy Africa</h2>
          <div className="space-y-10">
            <section>
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Our Mission</h3>
              <p className="text-gray-700">
                Empowering African youth with access to global education and work opportunities,
                creating a workforce that thrives in the global economy. We match young Africans with
                universities, jobs, and skilled migration programs while providing financing, mentorship,
                and career pathways. Our reach extends beyond the U.S. to include Canada, Europe, Australia, and Asia.
              </p>
            </section>
            <section>
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">The Opportunity</h3>
              <p className="text-gray-700">
                With 200 million African youth aged 15-24—and 2.1 million aspiring to study abroad, yet only 400,000 enrolling—the demand for skilled African labor is soaring globally. Industries such as healthcare, technology, engineering, and skilled trades are hungry for talent. Africa’s university enrollment is growing at 8.6% annually, double the global average.
              </p>
            </section>
            <section>
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">The Challenges</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li><strong>Financial Barriers:</strong> Limited scholarships and private loan options.</li>
                <li><strong>Lack of Information:</strong> Many students and workers are unaware of global opportunities.</li>
                <li><strong>Work & Career Gaps:</strong> Employers struggle to connect with skilled African talent.</li>
                <li><strong>Visa & Migration Hurdles:</strong> Complex work-study and skilled migration processes.</li>
              </ul>
            </section>
            <section>
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Our Solution</h3>
              <p className="text-gray-700">
                Our platform offers comprehensive support—from financial assistance via loans and scholarships to matching you with top universities and global employers. We provide mentorship, skills development, and migration guidance to ensure every young African can confidently pursue their global future.
              </p>
            </section>
            <section>
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Where You Can Go</h3>
              <p className="text-gray-700">
                Explore opportunities in the United States (with OPT), Canada (via PGWP and Express Entry), Europe (through Germany’s Blue Card and the UK’s Skilled Worker Visa), Australia & New Zealand (via work-study programs and Global Talent Visas), and Asia (Japan & South Korea’s skilled migration pathways).
              </p>
            </section>
            <section>
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">The Impact</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li><strong>Career Boost:</strong> 90% of students who study abroad secure employment within 6 months.</li>
                <li><strong>Higher Earnings:</strong> International degrees can increase earning potential by 2-3x.</li>
                <li><strong>Diverse Talent Pools:</strong> African graduates drive global innovation.</li>
                <li><strong>Leadership Development:</strong> We’re shaping future business and political leaders with global experience.</li>
              </ul>
            </section>
            <section>
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">For Employers & Universities</h3>
              <p className="text-gray-700">
                Our partnerships give universities access to motivated, talented students and offer employers a skilled, diverse workforce. This synergy not only enhances academic environments but also fuels economic growth through skilled migration.
              </p>
            </section>
            <section>
              <h3 className="text-2xl font-semibold text-blue-800 mb-4">Join Us</h3>
              <p className="text-gray-700">
                Africa’s future is global – let’s unlock the potential together. Whether you’re a student, worker, employer, or academic institution, connect with us to explore transformative opportunities.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Application Form Section */}
      <div id="apply" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Apply Now</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {submitError}
              </div>
            )}
            
            <div className="relative">
              <User className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Mail className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <PhoneCall className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <GraduationCap className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="highSchool"
                value={formData.highSchool}
                onChange={handleChange}
                placeholder="High School Education"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Building2 className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                placeholder="University Education (if any)"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <BriefcaseIcon className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
              <select
                name="fieldOfWork"
                value={formData.fieldOfWork}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Select Field of Interest</option>
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="healthcare">Healthcare</option>
                <option value="engineering">Engineering</option>
                <option value="arts">Arts & Humanities</option>
                <option value="science">Science & Research</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 flex items-center justify-center ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              <Send className="w-5 h-5 mr-2" />
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Youth Advocacy Africa</h3>
              <p className="text-gray-400">
                Empowering African youth through global education and career opportunities.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">Email: info@youthadvocacyafrica.org</p>
              <p className="text-gray-400">Phone: +32466292088</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">Facebook</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Youth Advocacy Africa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
