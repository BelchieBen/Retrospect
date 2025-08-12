import { IChevronRight } from "~/icons";
import { SidebarElements } from "./sidebar-elements";
import HelixPalette from "~/styles/palette";

const items = SidebarElements.navMain;

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/app/_components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/app/_components/ui/sidebar";

export function NavMain() {
  return (
    <SidebarGroup className="px-2">
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className="text-neutral90 hover:bg-neutral10 data-[active=true]:bg-teal10 data-[active=true]:text-teal90 dark:text-neutral10 dark:hover:bg-neutral30 dark:data-[active=true]:bg-teal20 dark:data-[active=true]:text-teal70"
              >
                <a
                  href={item.url}
                  className="flex items-center gap-3 rounded-md px-3 py-2"
                >
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </a>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="hover:bg-neutral10 data-[state=open]:rotate-90 dark:hover:bg-neutral30">
                      <IChevronRight color={HelixPalette.neutral90} />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="ml-4 mt-1">
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className="text-neutral70 hover:bg-neutral10 dark:text-neutral30 dark:hover:bg-neutral30"
                          >
                            <a
                              href={subItem.url}
                              className="rounded-md px-3 py-1"
                            >
                              <span className="text-sm">{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
              {item.action && (
                <SidebarMenuAction className="hover:bg-neutral10 data-[state=open]:rotate-90 dark:hover:bg-neutral30">
                  <a href={item.action.url}>
                    {/* <Icon
                      name={item.action.icon}
                      className="h-4 w-4 text-neutral60 dark:text-neutral40"
                    /> */}
                  </a>
                  <span className="sr-only">Toggle</span>
                </SidebarMenuAction>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
