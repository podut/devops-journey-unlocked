import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().optional(), // Honeypot field
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const API_KEY = "7d2f9b8a1c5e4d3a0b9c8d7e6f5a4b3c";

const Contact = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    }
  });

  const contactInfo = [
    // ... rest of contactInfo stays same
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "podutpetru@gmail.com",
      href: "mailto:podutpetru@gmail.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+40 753 863 372",
      href: "tel:+40753863372"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Romania",
      href: "#"
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      value: "Petru Podut",
      href: "https://www.linkedin.com/in/petru-podut/"
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      value: "podut",
      href: "https://github.com/podut"
    },
    {
      icon: <span className="w-5 h-5 font-bold">#</span>,
      label: "Discord",
      value: "petrupodut",
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

  const getClientFingerprint = async () => {
    // Generate a unique ID based on browser characteristics and timestamp
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx!.textBaseline = 'top';
    ctx!.font = '14px Arial';
    ctx!.fillText('Browser fingerprint', 2, 2);
    
    const fingerprint = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen: `${screen.width}x${screen.height}`,
      canvas: canvas.toDataURL(),
      timestamp: Date.now(),
      random: Math.random()
    };
    
    // Create a simple hash
    const str = JSON.stringify(fingerprint);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  };

  const onSubmit = async (data: ContactFormValues) => {
    // If honeypot is filled, ignore submission silently (likely a bot)
    if (data.website) {
      console.log("Honeypot triggered");
      reset();
      return;
    }

    const clientId = await getClientFingerprint();
    const payload = {
      ...data,
      clientId: clientId,
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('https://n8n.petrupodut.dev/webhook/contact-form', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-key': (window as any).N8N_KEY || "7d2f9b8a1c5e4d3a0b9c8d7e6f5a4b3c"
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      reset();
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        variant: "destructive",
        title: "Error sending message",
        description: "Please try again later or contact me directly via email.",
      });
    }
  };

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
                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block" htmlFor="firstName">First Name</label>
                      <Input id="firstName" {...register("firstName")} placeholder="Your first name" />
                      {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block" htmlFor="lastName">Last Name</label>
                      <Input id="lastName" {...register("lastName")} placeholder="Your last name" />
                      {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block" htmlFor="email">Email</label>
                    <Input id="email" type="email" {...register("email")} placeholder="your.email@example.com" />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block" htmlFor="subject">Subject</label>
                    <Input id="subject" {...register("subject")} placeholder="Project collaboration, job opportunity, etc." />
                    {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block" htmlFor="message">Message</label>
                    <Textarea id="message" {...register("message")} placeholder="Tell me about your project or opportunity..." rows={6} />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
                  </div>
                  {/* Honeypot field for bots - should be hidden from users */}
                  <div style={{position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden'}} aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <Input id="website" {...register("website")} autoComplete="off" tabIndex={-1} />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full shadow-glow">
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
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
                        aria-label={`Follow me on ${social.label}`}
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