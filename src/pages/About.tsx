import { Award, Users, Sparkles } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">About KC Beautique</h1>
          <p className="text-xl opacity-90">
            Where beauty meets passion and expertise
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Kaylah</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                With over a decade of experience in the beauty industry, Kaylah founded KC Beautique
                with a simple mission: to provide exceptional beauty services and products that make
                every client feel confident and beautiful.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Her passion for beauty, combined with her commitment to excellence and customer care,
                has made KC Beautique the go-to destination for beauty lovers throughout Kansas City.
              </p>
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-96 rounded-lg"></div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Our talented team of beauty professionals are dedicated to providing you with
              personalized service and expert care.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TeamMember name="Kaylah" role="Founder & Lead Stylist" />
              <TeamMember name="Sarah" role="Beauty Specialist" />
              <TeamMember name="Maya" role="Skincare Expert" />
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueCard
                icon={<Sparkles className="w-12 h-12" />}
                title="Quality"
                description="We use only premium products and techniques to ensure the best results."
              />
              <ValueCard
                icon={<Award className="w-12 h-12" />}
                title="Excellence"
                description="Our team is constantly improving skills and staying current with trends."
              />
              <ValueCard
                icon={<Users className="w-12 h-12" />}
                title="Customer Care"
                description="Your satisfaction and comfort are our top priorities."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface TeamMemberProps {
  name: string;
  role: string;
}

function TeamMember({ name, role }: TeamMemberProps) {
  return (
    <div className="text-center">
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 w-32 h-32 rounded-full mx-auto mb-4"></div>
      <h3 className="text-lg font-bold text-gray-900">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  );
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="text-center">
      <div className="text-pink-600 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
