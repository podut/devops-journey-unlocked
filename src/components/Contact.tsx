import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "contact@petrupodut.dev",
      href: "mailto:contact@petrupodut.dev"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+40 XXX XXX XXX",
      href: "tel:+40XXXXXXXXX"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Romania",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/petrupodut",
      color: "hover:text-gray-400"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/petrupodut",
      color: "hover:text-blue-400"
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Get In Touch</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Work
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Together</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Ready to discuss your next DevOps project? I'm always interested in 
              challenging opportunities and innovative solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Send a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">First Name</label>
                    <Input placeholder="Your first name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Last Name</label>
                    <Input placeholder="Your last name" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input placeholder="Project collaboration, job opportunity, etc." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Tell me about your project or opportunity..."
                    rows={6}
                  />
                </div>
                <Button className="w-full shadow-glow">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.href}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors group"
                    >
                      <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary/20 transition-colors">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <p className="font-medium">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Follow Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors ${social.color} group`}
                      >
                        <div className="flex items-center space-x-3">
                          {social.icon}
                          <span className="font-medium">{social.label}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm">Currently available for new projects</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Open to freelance projects, consulting opportunities, and full-time positions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;