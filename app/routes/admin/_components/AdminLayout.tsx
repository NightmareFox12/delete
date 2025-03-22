import type React from "react";
import {
  FaDoorOpen,
  FaHeart,
  FaHouse,
  FaSquareCaretLeft,
  FaSquareCaretRight,
  FaUser,
} from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "~/components/ui/sidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  //navigation
  const { pathname } = useLocation();
  const navigate = useNavigate();

  //constans
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
    {
      title: "Libros favoritos",
      url: "/admin/like-book",
      icon: <FaHeart />,
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent className="bg-green-700 text-white">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`${
                        pathname === item.url && "bg-green-800"
                      } p-5 hover:bg-green-800 active:bg-green-800 select-none decoration-gray-50 hover:text-white delay-75 transition-all`}
                    >
                      <Link to={item.url}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                {/* Close session  */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/");
                    }}
                    className="cursor-pointer p-5 hover:bg-green-800 active:bg-green-800 select-none decoration-gray-50 hover:text-white delay-75 transition-all"
                  >
                    <FaDoorOpen />
                    <span>Cerrar Sesión</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="w-full h-full">
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
            <FaSquareCaretLeft />
            Cerrar Barra Lateral
          </>
        ) : (
          <>
            <FaSquareCaretRight />
            Abrir Barra Lateral
          </>
        )}
      </div>
    </Button>
  );
}
