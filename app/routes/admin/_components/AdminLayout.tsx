import type React from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHouse,
  FaOpencart,
  FaPerson,
  FaUser,
} from "react-icons/fa6";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "~/components/ui/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  
  const items = [
    {
      title: "Inicio",
      url: "/admin",
      icon: <FaHouse />,
    },
    {
      title: "Usuarios",
      url: "/admin/user",
      icon: <FaUser />,
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent className="bg-green-600 text-white">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main>
        <CustomTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default AdminLayout;

export function CustomTrigger() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button variant="ghost" onClick={toggleSidebar}>
      <div className="flex gap-2 justify-center items-center">
        {open ? (
          <>
            <FaChevronLeft />
            Cerrar Barra Lateral
          </>
        ) : (
          <>
            <FaChevronRight />
            Abrir Barra Lateral
          </>
        )}
      </div>
    </Button>
  );
}
