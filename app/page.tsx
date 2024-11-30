'use client' ;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Check, Info, FileText, Users, Calendar } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-light-orange-50">
      <main className="flex-1">
        <section className="w-full py-16">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col space-y-6">
              <h1 className="text-4xl font-extrabold text-black sm:text-5xl">Welcome to the Ultimate Blogging Platform</h1>
              <p className="text-lg text-gray-700 max-w-lg">
                Share your thoughts, explore new perspectives, and connect with bloggers worldwide.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button className="bg-orange-500 text-white px-6 py-3">Start Blogging</Button>
                <Button className="bg-white border border-orange-500 text-orange-500 px-6 py-3 hover:bg-orange-100">Explore Blogs</Button>
              </div>
            </div>
            <img
              src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s"
              alt="Blogging"
              className="w-full max-w-md mt-12 md:mt-0 md:ml-8 rounded-lg shadow-lg"
            />
          </div>
        </section>
        <section className="w-full py-16 bg-light-orange-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black">Why Choose Us?</h2>
              <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
                Experience simplicity and elegance in blogging with features designed for creators.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="flex flex-col items-center p-6 bg-white shadow-lg">
                <FileText className="h-12 w-12 text-orange-500" />
                <CardHeader className="text-center mt-4">
                  <CardTitle className="text-xl font-semibold">Easy to Use</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 text-center">
                  Create and publish your blogs effortlessly with our intuitive interface.
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center p-6 bg-white shadow-lg">
                <Users className="h-12 w-12 text-orange-500" />
                <CardHeader className="text-center mt-4">
                  <CardTitle className="text-xl font-semibold">Connect with Readers</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 text-center">
                  Engage with a community of readers and receive feedback.
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center p-6 bg-white shadow-lg">
                <Calendar className="h-12 w-12 text-orange-500" />
                <CardHeader className="text-center mt-4">
                  <CardTitle className="text-xl font-semibold">Regular Updates</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 text-center">
                  Stay updated with our regular feature enhancements and improvements.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black">What Our Users Say</h2>
              <p className="text-gray-700 mt-2 max-w-2xl mx-auto">
                Discover how our platform has transformed the blogging experience for our users.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="flex items-start p-6 bg-white shadow-lg">
                <Avatar className="flex-none">
                  <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="text-sm font-medium text-black">Jane Doe</p>
                  <p className="text-xs text-gray-500 mb-2">Content Creator</p>
                  <p className="text-gray-600">
                    "This platform has made sharing my thoughts so much easier, and connecting with my readers has never been better!"
                  </p>
                </div>
              </Card>
              <Card className="flex items-start p-6 bg-white shadow-lg">
                <Avatar className="flex-none">
                  <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="text-sm font-medium text-black">Sam Miller</p>
                  <p className="text-xs text-gray-500 mb-2">Blogger</p>
                  <p className="text-gray-600">
                    "The simplicity of the interface and the community engagement are the best features for me."
                  </p>
                </div>
              </Card>
              <Card className="flex items-start p-6 bg-white shadow-lg">
                <Avatar className="flex-none">
                  <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="text-sm font-medium text-black">Mark Johnson</p>
                  <p className="text-xs text-gray-500 mb-2">Writer</p>
                  <p className="text-gray-600">
                    "Excellent platform for writers! The updates keep getting better."
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-orange-500 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-sm">© 2023 Blogging Platform. All rights reserved.</p>
            <div className="flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="hover:text-orange-300">
                    <Info className="h-6 w-6" />
                  </TooltipTrigger>
                  <TooltipContent>About Us</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger className="hover:text-orange-300">
                    <ArrowRight className="h-6 w-6" />
                  </TooltipTrigger>
                  <TooltipContent>Contact</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;