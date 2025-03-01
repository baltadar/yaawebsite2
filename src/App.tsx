import React, { useState } from 'react';
import {
  GraduationCap,
  Globe2,
  Users,
  Building2,
  Send,
  BookOpen,
  BriefcaseIcon,
  PhoneCall,
  Mail,
  User,
  Target,
  AlertTriangle,
  CheckCircle2
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
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: Math.random().toString(36).slice(-8),
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No user data returned after signup');

      // Insert application data
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
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header
        className="relative bg-cover bg-center h-[600px] flex items-center justify-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-6">Youth Advocacy Africa</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Empowering African students to pursue international education and career opportunities through strategic partnerships.
          </p>
          <a
            href="#apply"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition duration-300"
          >
            Apply Now
          </a>
        </div>
      </header>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Youth Advocacy Africa?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <GraduationCap className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Education</h3>
              <p className="text-gray-600">Access to top-tier institutions worldwide.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Globe2 className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Network</h3>
              <p className="text-gray-600">Partnerships across multiple countries.</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Career Support</h3>
              <p className="text-gray-600">Mentorship and placement assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Youth Advocacy Africa - with icons & concise text */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Join Youth Advocacy Africa Today </h2>
          
          {/* A simple two-column layout with icons and trimmed text */}
          <div className="md:grid md:grid-cols-2 md:gap-8 space-y-8 md:space-y-0">
            {/* Column 1 */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4 text-blue-700">
                <Target className="w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We connect African youth to global education and work opportunities—removing barriers
                with tailored financing, mentorship, and career pathways. Our reach goes beyond the U.S. 
                to Canada, Europe, Australia, and Asia.
              </p>
            </div>

            {/* Column 2 */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4 text-blue-700">
                <Globe2 className="w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">The Opportunity</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                With 200M African youth (15-24) and 2.1M aspiring to study abroad, global industries 
                in tech, healthcare, and engineering need their talent. Yet only 400K enroll abroad due 
                to financial and informational barriers.
              </p>
            </div>
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-8 mt-8 space-y-8 md:space-y-0">
            {/* Column 3 */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4 text-blue-700">
                <AlertTriangle className="w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">The Challenges</h3>
              </div>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                <li>Financial Barriers: Limited scholarships, tough loans.</li>
                <li>Information Gaps: Lack of global opportunity awareness.</li>
                <li>Career Access: Employers struggle to find African talent.</li>
                <li>Visa Hurdles: Complex work-study & migration processes.</li>
              </ul>
            </div>

            {/* Column 4 */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4 text-blue-700">
                <CheckCircle2 className="w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">Our Solution</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                We offer financing (loans, scholarships), connect you with universities & global employers, 
                and provide mentorship plus visa guidance—ensuring every African youth can confidently 
                pursue a global future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          <div className="md:grid md:grid-cols-2 md:gap-8 items-start">
            <div>
              <h3 className="flex items-center text-2xl font-semibold text-blue-800 mb-4">
                <Globe2 className="w-5 h-5 mr-2" />
                Where You Can Go
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Opportunities in the U.S. (OPT), Canada (PGWP & Express Entry), Europe (Germany’s Blue Card, UK’s Skilled Worker Visa), 
                Australia & New Zealand (work-study programs, Global Talent Visas), and Asia (Japan & South Korea).
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <h3 className="flex items-center text-2xl font-semibold text-blue-800 mb-4">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                The Impact
              </h3>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                <li>90% of students abroad find jobs within 6 months.</li>
                <li>International degrees can boost earnings by 2–3x.</li>
                <li>African graduates fuel global innovation.</li>
                <li>Building tomorrow’s leaders with global expertise.</li>
              </ul>
            </div>
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-8 items-start">
            <div className="mt-8 md:mt-0">
              <h3 className="flex items-center text-2xl font-semibold text-blue-800 mb-4">
                <Building2 className="w-5 h-5 mr-2" />
                For Employers & Universities
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our partnerships let universities tap into a motivated talent pool and give employers 
                a diverse, skilled workforce. Together, we shape inclusive campuses and fuel economic 
                growth via skilled migration.
              </p>
            </div>
            <div className="mt-8 md:mt-0">
              <h3 className="flex items-center text-2xl font-semibold text-blue-800 mb-4">
                <Users className="w-5 h-5 mr-2" />
                Join Us
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Africa’s future is global—let’s unlock that potential together. Whether you’re a student, 
                worker, employer, or academic institution, connect with us to explore transformative 
                global opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 bg-blue-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Apply Now</h2>
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
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
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
