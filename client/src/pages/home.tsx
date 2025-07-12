import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Scissors, Slice, Palette, Calendar, Check, PlaneTakeoff, Instagram, Facebook, Twitter } from "lucide-react";

export default function Home() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: undefined,
    },
  });

  const createBookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      setShowSuccessModal(true);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit booking request",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBooking) => {
    createBookingMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-salon-light">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Slice className="text-salon-primary text-2xl mr-3" />
              <h1 className="text-2xl font-bold text-salon-dark">Luxe Salon</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-salon-dark hover:text-salon-primary transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-salon-dark hover:text-salon-primary transition-colors"
              >
                Book Now
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-salon-dark hover:text-salon-primary transition-colors"
              >
                About
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-salon-secondary/20 to-salon-primary/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-salon-dark mb-6">
            Transform Your Look,<br/>
            <span className="text-salon-primary">Elevate Your Style</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience premium salon services in a luxurious environment. Book your appointment today and let our expert stylists create your perfect look.
          </p>
          <Button 
            onClick={() => scrollToSection('contact')}
            className="bg-salon-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-salon-accent transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Calendar className="mr-3" />
            Book Your Appointment
          </Button>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-salon-dark mb-4">Our Premium Services</h3>
            <p className="text-gray-600 text-lg">Expert craftsmanship meets modern style</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-salon-light hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-salon-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Slice className="text-salon-primary text-2xl" />
              </div>
              <h4 className="text-xl font-semibold text-salon-dark mb-2">Precision Haircuts</h4>
              <p className="text-gray-600">Expert cuts tailored to your face shape and lifestyle</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-salon-light hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-salon-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="text-salon-primary text-2xl" />
              </div>
              <h4 className="text-xl font-semibold text-salon-dark mb-2">Professional Trims</h4>
              <p className="text-gray-600">Maintain your style with precision trimming services</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-salon-light hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-salon-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="text-salon-primary text-2xl" />
              </div>
              <h4 className="text-xl font-semibold text-salon-dark mb-2">Hair Coloring</h4>
              <p className="text-gray-600">From natural highlights to bold transformations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-salon-light to-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-salon-dark mb-4">Book Your Appointment</h3>
            <p className="text-gray-600 text-lg">Fill out the form below and we'll get back to you within 24 hours</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-salon-primary font-medium">Your Full Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your full name"
                          className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-salon-primary focus:outline-none transition-colors text-salon-dark"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-salon-primary font-medium">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="your@email.com"
                          className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-salon-primary focus:outline-none transition-colors text-salon-dark"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-salon-primary font-medium">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="(555) 123-4567"
                          className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-salon-primary focus:outline-none transition-colors text-salon-dark"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-salon-primary font-medium">Preferred Service</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-salon-primary transition-colors text-salon-dark">
                            <SelectValue placeholder="Select Your Preferred Service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="haircut">Precision Haircut</SelectItem>
                          <SelectItem value="trim">Professional Trim</SelectItem>
                          <SelectItem value="hair-color">Hair Coloring</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={createBookingMutation.isPending}
                  className="w-full bg-gradient-to-r from-salon-primary to-salon-accent text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center"
                >
                  {createBookingMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending Request...
                    </>
                  ) : (
                    <>
                      Book My Appointment
                      <PlaneTakeoff className="ml-3" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md">
          <DialogHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-500 text-2xl" />
            </div>
            <DialogTitle className="text-2xl font-bold text-salon-dark mb-2">
              Appointment Request Sent!
            </DialogTitle>
            <DialogDescription className="text-gray-600 mb-6">
              Thank you for choosing Luxe Salon. We'll contact you within 24 hours to confirm your appointment.
            </DialogDescription>
          </DialogHeader>
          <Button 
            onClick={() => setShowSuccessModal(false)}
            className="bg-salon-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-salon-accent transition-colors w-full"
          >
            Perfect!
          </Button>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-salon-dark text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Slice className="text-salon-accent text-2xl mr-3" />
            <h4 className="text-2xl font-bold">Luxe Salon</h4>
          </div>
          <p className="text-gray-300 mb-4">Transforming looks, elevating styles since 2010</p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="text-gray-300 hover:text-salon-accent transition-colors">
              <Instagram className="text-xl" />
            </a>
            <a href="#" className="text-gray-300 hover:text-salon-accent transition-colors">
              <Facebook className="text-xl" />
            </a>
            <a href="#" className="text-gray-300 hover:text-salon-accent transition-colors">
              <Twitter className="text-xl" />
            </a>
          </div>
          <p className="text-gray-400 text-sm">&copy; 2024 Luxe Salon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
