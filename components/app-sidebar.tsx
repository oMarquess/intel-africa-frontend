"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavDocuments } from "@/components/nav-documents"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Get Started",
      url: "#",
      items: [
        {
          title: "Quickstart",
          url: "/dashboard/quickstart",
        },
      ],
    },
    {
      title: "Manage",
      url: "#",
      items: [
        {
          title: "Usage",
          url: "/dashboard/usage",
        },
        {
          title: "API Keys",
          url: "/dashboard/api-keys",
        },
        {
          title: "Logs",
          url: "/dashboard/logs",
        },
      ],
    },
    // {
    //   title: "Analytics",
    //   url: "/dashboard/analytics",
    // },
    // {
    //   title: "Projects",
    //   url: "/dashboard/projects",
    // },
    // {
    //   title: "Settings",
    //   url: "/dashboard/settings",
    // },
  ],
  navSecondary: [
    {
      title: "Documentation",
      url: "/docs",
    },
    {
      title: "Support",
      url: "/support",
    },
    {
      title: "Billing",
      url: "/coming-soon",
    },
  ],
  // documents: [
  //   {
  //     name: "Transcriptions",
  //     url: "/dashboard/transcriptions",
  //   },
  //   {
  //     name: "Recordings",
  //     url: "/dashboard/recordings",
  //   },
  //   {
  //     name: "Models",
  //     url: "/dashboard/models",
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard" className="flex items-center">
                <img
                  src="/Asset-4.svg"
                  alt="Intelligence Africa"
                  className="h-5 w-auto md:hidden"
                />
                <img
                  src="/Asset-3.svg"
                  alt="Intelligence Africa"
                  className="h-5 w-auto hidden md:block"
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Get Started Section */}
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {data.navMain
                .filter(item => item.title === "Get Started")
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <a href={item.url}>
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
            {data.navMain
              .filter(item => item.title === "Get Started" && item.items)
              .map((item) => (
                <SidebarMenu key={item.title}>
                  {item.items?.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton tooltip={subItem.title} asChild>
                        <a href={subItem.url} className="pl-6">
                          <span className="font-medium">{subItem.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              ))}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Manage Section */}
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {data.navMain
                .filter(item => item.title === "Manage")
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <a href={item.url}>
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
            {data.navMain
              .filter(item => item.title === "Manage" && item.items)
              .map((item) => (
                <SidebarMenu key={item.title}>
                  {item.items?.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton tooltip={subItem.title} asChild>
                        <a href={subItem.url} className="pl-6">
                          <span className="font-medium">{subItem.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              ))}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Other Navigation */}
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {data.navMain
                .filter(item => !["Get Started", "Manage"].includes(item.title))
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <a href={item.url}>
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
