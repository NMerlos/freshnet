
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Settings, 
  MessageSquare,
  Leaf,
  Brain, // Added Brain icon
  Menu,
  X
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Vista general",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
    color: "bg-emerald-500",
    textColor: "text-emerald-600"
  },
  {
    title: "AI Agent", // New item for AI Agent
    url: createPageUrl("AgentDashboard"), // New URL for AI Agent
    icon: Brain, // Brain icon for AI Agent
    color: "bg-purple-500",
    textColor: "text-purple-600"
  },
  {
    title: "Orders",
    url: createPageUrl("Orders"),
    icon: ShoppingCart,
    color: "bg-orange-500",
    textColor: "text-orange-600"
  },
  {
    title: "Inventory",
    url: createPageUrl("Inventory"),
    icon: Package,
    color: "bg-blue-500",
    textColor: "text-blue-600"
  },
  {
    title: "Settings", // Existing item, updated color
    url: createPageUrl("Settings"),
    icon: Settings,
    color: "bg-gray-500", // Updated color for Settings
    textColor: "text-gray-600" // Updated text color for Settings
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <SidebarProvider>
        <div className="flex w-full">
          {/* Desktop Sidebar */}
          <Sidebar className="hidden lg:flex border-r-0 shadow-xl bg-white/80 backdrop-blur-md">
            <SidebarHeader className="p-8 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">FreshAgent</h2>
                  <p className="text-sm text-gray-500 font-medium">by Lorenzo</p>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent className="p-6">
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-4">
                    {navigationItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`h-16 rounded-2xl transition-all duration-300 hover:scale-105 ${
                            location.pathname === item.url 
                              ? `${item.color} text-white shadow-lg` 
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-4 px-6">
                            <item.icon className="w-6 h-6" />
                            <span className="text-lg font-semibold">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Mobile Navigation */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">FreshAgent</h2>
                  <p className="text-xs text-gray-500">by Lorenzo</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="h-10 w-10"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
            
            {isMobileMenuOpen && (
              <div className="border-t border-gray-200 bg-white p-4">
                <div className="grid grid-cols-2 gap-3">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.title}
                      to={item.url}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300 ${
                        location.pathname === item.url 
                          ? `${item.color} text-white shadow-lg` 
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="w-6 h-6" />
                      <span className="text-sm font-semibold">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <main className="flex-1 lg:ml-0 pt-20 lg:pt-0">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
