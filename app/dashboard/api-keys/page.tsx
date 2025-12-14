import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ApiKeyDialog } from "@/components/api-key-dialog"

export default function ApiKeysPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold">API keys</h1>
                    <p className="text-muted-foreground mt-2">
                      You have permission to view and manage all API keys in this project.
                    </p>
                  </div>
                  <ApiKeyDialog>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create new API key
                  </Button>
                </ApiKeyDialog>
                </div>

                {/* Security Warning */}
                <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 mb-6 dark:bg-yellow-900/20 dark:border-yellow-600">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        <strong>Security Notice:</strong> Do not share your API key with others or expose it in the browser or other client-side code. 
                        To protect your account's security, we may automatically disable any API key that has leaked publicly. 
                        View usage per API key on the <a href="/dashboard/usage" className="underline hover:no-underline">Usage page</a>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* API Keys Table */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Secret Key</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Last used</TableHead>
                        <TableHead>Created by</TableHead>
                        <TableHead>Permissions</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Production API</TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <code className="bg-muted px-2 py-1 rounded text-sm">
                            sk-••••••••••••••••••••••••••••••••
                          </code>
                        </TableCell>
                        <TableCell>Dec 1, 2024</TableCell>
                        <TableCell>2 hours ago</TableCell>
                        <TableCell>john@example.com</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Full Access</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">Delete</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Development Key</TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <code className="bg-muted px-2 py-1 rounded text-sm">
                            sk-••••••••••••••••••••••••••••••••
                          </code>
                        </TableCell>
                        <TableCell>Nov 15, 2024</TableCell>
                        <TableCell>1 day ago</TableCell>
                        <TableCell>john@example.com</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Read Only</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">Delete</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Test Key</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                            Inactive
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <code className="bg-muted px-2 py-1 rounded text-sm">
                            sk-••••••••••••••••••••••••••••••••
                          </code>
                        </TableCell>
                        <TableCell>Oct 20, 2024</TableCell>
                        <TableCell>Never</TableCell>
                        <TableCell>admin@example.com</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Full Access</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">Delete</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
