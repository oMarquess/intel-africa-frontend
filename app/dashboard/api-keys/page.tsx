"use client"

import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { useApiKeys } from "@/hooks/use-api-keys"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
import { RevokeApiKeyDialog } from "@/components/revoke-api-key-dialog"
import { Spinner } from "@/components/ui/spinner"
import { apiKeyService, ApiKeyListItem } from "@/lib/api-key.service"
import { useQueryClient } from "@tanstack/react-query"

export default function ApiKeysPage() {
  const queryClient = useQueryClient()
  const {
    apiKeys,
    isLoading,
    error,
    refetch,
    revokeKey,
    isRevoking
  } = useApiKeys()

  const [revokeModalOpen, setRevokeModalOpen] = useState(false)
  const [keyToRevoke, setKeyToRevoke] = useState<ApiKeyListItem | null>(null)

  const handleRevokeKey = (key: ApiKeyListItem) => {
    if (key.status === 'revoked') return
    setKeyToRevoke(key)
    setRevokeModalOpen(true)
  }

  const confirmRevokeKey = async () => {
    if (!keyToRevoke) return

    try {
      await revokeKey(keyToRevoke.id)
      setRevokeModalOpen(false)
      setKeyToRevoke(null)
    } catch (err) {
      console.error('Failed to revoke API key:', err)
      alert(err instanceof Error ? err.message : 'Failed to revoke API key')
    }
  }

  const handleKeyCreated = () => {
    // Invalidate and refetch api-keys when a new key is created
    queryClient.invalidateQueries({ queryKey: ['api-keys'] })
  }

  return (
    <>
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
                    <ApiKeyDialog onKeyCreated={handleKeyCreated}>
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
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                          <TableHead className="px-6">Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Secret Key</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Last used</TableHead>
                          <TableHead>Expires</TableHead>
                          <TableHead>Permissions</TableHead>
                          <TableHead className="text-right pr-6">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {isLoading ? (
                          Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                              <TableCell className="px-6"><div className="h-4 w-32 bg-muted animate-pulse rounded" /></TableCell>
                              <TableCell><div className="h-5 w-20 bg-muted animate-pulse rounded-full" /></TableCell>
                              <TableCell><div className="h-4 w-24 bg-muted animate-pulse rounded" /></TableCell>
                              <TableCell><div className="h-4 w-28 bg-muted animate-pulse rounded" /></TableCell>
                              <TableCell><div className="h-4 w-24 bg-muted animate-pulse rounded" /></TableCell>
                              <TableCell><div className="h-4 w-24 bg-muted animate-pulse rounded" /></TableCell>
                              <TableCell><div className="h-5 w-24 bg-muted animate-pulse rounded-full" /></TableCell>
                              <TableCell className="text-right pr-6"><div className="h-8 w-8 bg-muted animate-pulse rounded ml-auto" /></TableCell>
                            </TableRow>
                          ))
                        ) : error ? (
                          <TableRow>
                            <TableCell colSpan={8} className="h-32 text-center px-6">
                              <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-red-600 font-medium">Error loading API keys</p>
                                <p className="text-sm text-muted-foreground">{error instanceof Error ? error.message : 'Unknown error'}</p>
                                <Button onClick={() => refetch()} variant="outline" size="sm" className="mt-2">
                                  Try Again
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : apiKeys.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="h-32 text-center px-6">
                              <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-muted-foreground">No API keys found</p>
                                <ApiKeyDialog onKeyCreated={handleKeyCreated}>
                                  <Button size="sm" className="mt-2">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create your first API key
                                  </Button>
                                </ApiKeyDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ) : (
                          apiKeys.map((key) => (
                            <TableRow key={key.id} className="hover:bg-muted/30 transition-colors">
                              <TableCell className="font-medium px-6">
                                <div className="max-w-[150px] truncate" title={key.name}>
                                  {key.name}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={apiKeyService.getStatusVariant(key.status)}
                                  className={apiKeyService.getStatusColorClasses(key.status)}
                                >
                                  {key.status.charAt(0).toUpperCase() + key.status.slice(1)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <code className="bg-muted px-2 py-1 rounded text-sm">
                                  sk-••••••••••••••
                                </code>
                              </TableCell>
                              <TableCell>{apiKeyService.formatDate(key.created_at)}</TableCell>
                              <TableCell>{apiKeyService.formatRelativeTime(key.last_used)}</TableCell>
                              <TableCell>{apiKeyService.formatExpirationPolicy(key.expiration_policy)}</TableCell>
                              <TableCell>
                                <Badge variant="secondary">
                                  {apiKeyService.formatPermission(key.permission)}
                                </Badge>
                              </TableCell>
                              <TableCell className="w-[80px] text-right pr-6">
                                <TooltipProvider>
                                  <div className="flex items-center justify-end gap-1">
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                          onClick={() => handleRevokeKey(key)}
                                          disabled={key.status === 'revoked'}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>{key.status === 'revoked' ? 'Already revoked' : 'Revoke API key'}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                </TooltipProvider>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>

      {/* Revoke API Key Modal */}
      <RevokeApiKeyDialog
        open={revokeModalOpen}
        onOpenChange={setRevokeModalOpen}
        apiKeyName={keyToRevoke?.name || ''}
        onConfirm={confirmRevokeKey}
        isRevoking={isRevoking}
      />
    </>
  )
}
